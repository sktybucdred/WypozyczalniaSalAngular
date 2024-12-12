import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Rezerwacja } from '../../models/rezerwacja.model';
import { Sala } from '../../models/sala.model';
import { RezerwacjeService } from '../../services/rezerwacje.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-rezerwacja-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-rezerwacja-dialog.component.html',
  styleUrls: ['./add-rezerwacja-dialog.component.css']
})
export class AddRezerwacjaDialogComponent implements OnInit {
  rezerwacjaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rezerwacjeService: RezerwacjeService,
    public dialogRef: MatDialogRef<AddRezerwacjaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sala: Sala }
  ) {
    this.rezerwacjaForm = this.fb.group(
      {
        imie: ['', Validators.required],
        nazwisko: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        startDate: ['', Validators.required],
        startTime: ['', Validators.required],
        endDate: ['', Validators.required],
        endTime: ['', Validators.required],
      },
      {
        validators: [this.dateRangeValidator, this.conflictValidator]
      }
    );
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.rezerwacjaForm.invalid) {
      return; // Jeśli formularz jest niepoprawny, zakończ działanie
    }

    const formValues = this.rezerwacjaForm.value;
    const startDateTime = new Date(formValues.startDate);
    const [startHours, startMinutes] = formValues.startTime.split(':');
    startDateTime.setHours(startHours, startMinutes);

    const endDateTime = new Date(formValues.endDate);
    const [endHours, endMinutes] = formValues.endTime.split(':');
    endDateTime.setHours(endHours, endMinutes);

    const newRezerwacja: Rezerwacja = {
      id: 0, // This will be set by the service
      imie: formValues.imie,
      nazwisko: formValues.nazwisko,
      email: formValues.email,
      startDateTime,
      endDateTime
    };
    this.dialogRef.close(newRezerwacja);
  }

  private dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const startDate = group.get('startDate')?.value;
    const startTime = group.get('startTime')?.value;
    const endDate = group.get('endDate')?.value;
    const endTime = group.get('endTime')?.value;

    if (!startDate || !startTime || !endDate || !endTime) {
      return null; // Pozwól innym walidatorom zwrócić błąd
    }

    const startDateTime = new Date(startDate);
    const [startHours, startMinutes] = startTime.split(':');
    startDateTime.setHours(startHours, startMinutes);

    const endDateTime = new Date(endDate);
    const [endHours, endMinutes] = endTime.split(':');
    endDateTime.setHours(endHours, endMinutes);

    return endDateTime >= startDateTime ? null : { invalidDateRange: true };
  }

  private conflictValidator = (group: FormGroup): { [key: string]: any } | null => {
    const startDate = group.get('startDate')?.value;
    const startTime = group.get('startTime')?.value;
    const endDate = group.get('endDate')?.value;
    const endTime = group.get('endTime')?.value;

    if (!startDate || !startTime || !endDate || !endTime) {
      return null; // Pozwól innym walidatorom zwrócić błąd
    }

    const startDateTime = new Date(startDate);
    const [startHours, startMinutes] = startTime.split(':');
    startDateTime.setHours(+startHours, +startMinutes);

    const endDateTime = new Date(endDate);
    const [endHours, endMinutes] = endTime.split(':');
    endDateTime.setHours(+endHours, +endMinutes);

    // Pobierz rezerwacje tylko dla bieżącej sali
    const salaRezerwacje = this.data.sala.rezerwacje || [];

    const conflictingRezerwacje = salaRezerwacje.filter((r) => {
      const rStart = new Date(r.startDateTime);
      const rEnd = new Date(r.endDateTime);
      return (
        (startDateTime >= rStart && startDateTime < rEnd) ||
        (endDateTime > rStart && endDateTime <= rEnd) ||
        (startDateTime <= rStart && endDateTime >= rEnd)
      );
    });

    return conflictingRezerwacje.length === 0 ? null : { conflict: true };
  };
}
