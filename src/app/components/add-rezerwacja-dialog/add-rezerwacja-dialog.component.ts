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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-rezerwacja-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatIconModule
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
    console.log('AddRezerwacjaDialogComponent constructor called');
    console.log('Received data:', data);

    this.rezerwacjaForm = this.fb.group({
      imie: ['', Validators.required],
      nazwisko: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('AddRezerwacjaDialogComponent ngOnInit called');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.rezerwacjaForm.valid) {
      const newRezerwacja: Rezerwacja = {
        id: 0, // This will be set by the service
        ...this.rezerwacjaForm.value
      };
      this.dialogRef.close(newRezerwacja);
    }
  }
}
