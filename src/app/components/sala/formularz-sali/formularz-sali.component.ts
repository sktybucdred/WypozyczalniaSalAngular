import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Sala } from '../../../models/sala.model';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {Udogodnienie} from '../../../models/udogodnienie.model';

@Component({
  selector: 'app-formularz-sali',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './formularz-sali.component.html',
  styleUrls: ['./formularz-sali.component.css'],
})
export class FormularzSaliComponent implements OnInit {
  @Input() sala?: Sala;
  @Input() udogodnienia: Udogodnienie[] = [];
  @Output() submitSala: EventEmitter<Sala> = new EventEmitter<Sala>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.sala?.id || null],
      nazwa: [this.sala?.nazwa || '', [Validators.required, Validators.minLength(3)]],
      pojemnosc: [this.sala?.pojemnosc || null, [Validators.required, Validators.min(1)]],
      udogodnienia: [this.sala?.udogodnienia.map((u) => u.id) || []],
    });
  }

  onSubmit(): void {
    const formValue = this.form.value;
    const sala: Sala = {
      id: formValue.id,
      nazwa: formValue.nazwa,
      pojemnosc: formValue.pojemnosc,
      udogodnienia: this.udogodnienia.filter((u) =>
        formValue.udogodnienia.includes(u.id)
      ),
      rezerwacje: [],
    };
    this.submitSala.emit(sala);
  }
}
