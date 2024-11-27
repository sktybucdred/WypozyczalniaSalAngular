import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sala } from '../../models/sala.model';
import {Validators, FormBuilder, FormGroup, FormArray, ReactiveFormsModule, FormControl} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {DatepickerFieldComponent} from '../DatePickerField/datepicker-field.component';

@Component({
  selector: 'app-formularz-sali',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DatepickerFieldComponent,
  ],
  templateUrl: './formularz-sali.component.html',
  styleUrls: ['./formularz-sali.component.css'],
})
export class FormularzSaliComponent {
  @Input() sala: Sala | null = null;
  @Output() submitSala: EventEmitter<Sala>  = new EventEmitter<Sala>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      nazwa: [this.sala ? this.sala.nazwa : '', Validators.required],
      pojemnosc: [this.sala ? this.sala.pojemnosc : null, [Validators.required, Validators.min(1)]],
      udogodnienia: [this.sala ? this.sala.udogodnienia.join(', ') : ''],
      dostepnosc: this.fb.array<FormControl>(
        this.sala && this.sala.dostepnosc.length > 0
          ? this.sala.dostepnosc.map(date => this.fb.control(date, Validators.required))
          : [this.fb.control(null, Validators.required)]
      ),
    });
  }
  get dostepnosc(): FormArray {
    return this.form.get('dostepnosc') as FormArray<FormControl>;
  }
  addDate(): void {
    this.dostepnosc.push(this.fb.control(null, Validators.required));
  }
  removeDate(index: number): void {
    if (this.dostepnosc.length > 1) {
      this.dostepnosc.removeAt(index);
    }
  }
  onSubmit(): void {
    if (this.form.valid) {
      const udogodnieniaArray = this.form.value.udogodnienia
        .split(',')
        .map((u: string) => u.trim())
        .filter((u: string) => u !== '');

      const dostepnoscArray = this.form.value.dostepnosc.map((d: Date) => d);

      const nowaSala = new Sala(
        this.sala?.id || 0,
        this.form.value.nazwa,
        this.form.value.pojemnosc,
        udogodnieniaArray,
        dostepnoscArray
      );
      this.submitSala.emit(nowaSala);
    } else {
      // Optionally, mark all fields as touched to trigger validation messages
      this.form.markAllAsTouched();
    }
  }
}
