import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import { Rezerwacja } from '../../../models/rezerwacja.model';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormularzRezerwacjiComponent} from '../formularz-rezerwacji/formularz-rezerwacji.component';
import {Sala} from '../../../models/sala.model';

@Component({
  selector: 'app-add-rezerwacja-dialog',
  templateUrl: './add-rezerwacja-dialog.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatNativeDateModule, MatDatepickerModule, FormularzRezerwacjiComponent, MatDialogActions, MatDialogContent],
  styleUrls: ['./add-rezerwacja-dialog.component.css']
})
export class AddRezerwacjaDialogComponent {
  sala!: Sala;
  constructor(
    public dialogRef: MatDialogRef<AddRezerwacjaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { salaId: number }
  ) {}


  onRezerwacjaSubmit(rezerwacja: Rezerwacja): void {
    this.dialogRef.close(rezerwacja);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
