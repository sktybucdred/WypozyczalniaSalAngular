import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sala } from '../../models/sala.model';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-formularz-sali',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './formularz-sali.component.html',
  styleUrls: ['./formularz-sali.component.css'],
})
export class FormularzSaliComponent {
  @Input() sala: Sala | undefined = undefined;
  @Output() submitSala: EventEmitter<Sala> = new EventEmitter<Sala>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nazwa: [this.sala?.nazwa || '', Validators.required],
      pojemnosc: [this.sala?.pojemnosc || null, [Validators.required, Validators.min(1)]],
      udogodnienia: [this.sala?.udogodnienia.join(', ') || ''],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const udogodnieniaArray = this.form.value.udogodnienia
        .split(',')
        .map((u: string) => u.trim())
        .filter((u: string) => u !== '');

      const nowaSala = new Sala(
        this.sala?.id || 0,
        this.form.value.nazwa,
        this.form.value.pojemnosc,
        udogodnieniaArray
      );
      this.submitSala.emit(nowaSala);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
