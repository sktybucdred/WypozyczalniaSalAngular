import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Rezerwacja } from '../../models/rezerwacja.model';
import { Sala } from '../../models/sala.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

// For date-time picker
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';

@Component({
  selector: 'app-formularz-rezerwacji',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
  ],
  templateUrl: './formularz-rezerwacji.component.html',
  styleUrls: ['./formularz-rezerwacji.component.css'],
})
export class FormularzRezerwacjiComponent {
  @Input() sala!: Sala;
  @Output() submitRezerwacja = new EventEmitter<Rezerwacja>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      imie: ['', Validators.required],
      nazwisko: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      startDateTime: [null, Validators.required],
      endDateTime: [null, Validators.required],
    }, {
      validators: [this.endDateAfterStartDateValidator],
    });
  }

  endDateAfterStartDateValidator(group: FormGroup) {
    const start = group.controls['startDateTime'].value;
    const end = group.controls['endDateTime'].value;
    return start && end && start < end ? null : { endBeforeStart: true };
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newRezerwacja = new Rezerwacja(
        0, // ID will be assigned in the service
        this.sala.id,
        this.form.value.imie,
        this.form.value.nazwisko,
        this.form.value.email,
        this.form.value.startDateTime,
        this.form.value.endDateTime
      );
      this.submitRezerwacja.emit(newRezerwacja);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
