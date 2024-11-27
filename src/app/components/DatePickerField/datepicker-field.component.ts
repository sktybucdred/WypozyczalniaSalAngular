import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-datepicker-field',
  template: `
    <mat-form-field appearance="fill" style="flex: 1;">
      <mat-label>{{ label }}</mat-label>
      <input matInput [matDatepicker]="picker" [formControl]="control" />
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
      <mat-error *ngIf="control.hasError('required')">
        Data jest wymagana.
      </mat-error>
    </mat-form-field>
  `,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
  ],
})
export class DatepickerFieldComponent {
  @Input() control!: FormControl;
  @Input() label!: string;
}
