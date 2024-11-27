import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormularzSaliComponent} from '../formularz-sali/formularz-sali.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {Sala} from '../../models/sala.model';

@Component({
  selector: 'app-add-sala-dialog',
  standalone: true,
  imports:[
    FormularzSaliComponent,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ],
  templateUrl: './add-sala-dialog.component.html',
  styleUrls: ['./add-sala-dialog.component.css']
})
export class AddSalaDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddSalaDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }
  onSalaSubmit(sala: Sala): void {
    this.dialogRef.close(sala);
  }
}
