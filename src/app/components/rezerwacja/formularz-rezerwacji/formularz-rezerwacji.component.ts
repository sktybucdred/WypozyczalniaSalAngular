import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Rezerwacja } from '../../../models/rezerwacja.model';
import { Sala } from '../../../models/sala.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  templateUrl: './formularz-rezerwacji.component.html',
  styleUrls: ['./formularz-rezerwacji.component.css'],
})
export class FormularzRezerwacjiComponent implements OnInit {
  @Input() sala!: Sala;
  @Output() submitRezerwacja = new EventEmitter<Rezerwacja>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        imie: ['', Validators.required],
        nazwisko: ['', Validators.required],
        startDate: ['', [Validators.required, this.dateValidator]],
        endDate: ['', [Validators.required, this.dateValidator]],
      },
      { validators: this.dateRangeValidator }
    );
  }

  dateValidator(control: any) {
    const value = control.value;
    if (!value) return null;
    const isValid = /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(Date.parse(value));
    return isValid ? null : { invalidDate: true };
  }

  dateRangeValidator(formGroup: FormGroup) {
    const start = formGroup.get('startDate')?.value;
    const end = formGroup.get('endDate')?.value;
    if (!start || !end) return null;
    return new Date(start) <= new Date(end) ? null : { endBeforeStart: true };
  }

  onSubmit(): void {
    if (this.form.valid) {
      // Pobranie wartości jako stringi
      const startDateString = this.form.value.startDate.trim();
      const endDateString = this.form.value.endDate.trim();

      // Tworzenie rezerwacji bez konwersji dat na obiekty Date
      const rezerwacja = new Rezerwacja(
        0, // ID zostanie ustawione przez serwis
        this.sala.id,
        this.form.value.imie,
        this.form.value.nazwisko,
        startDateString,
        endDateString
      );

      // Emitowanie rezerwacji do rodzica
      this.submitRezerwacja.emit(rezerwacja);
    } else {
      console.error('Formularz jest nieprawidłowy', this.form.errors);
    }
  }

}
