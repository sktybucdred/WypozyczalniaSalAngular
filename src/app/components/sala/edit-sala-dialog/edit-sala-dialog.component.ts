import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent, MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Sala} from '../../../models/sala.model';
import {FormularzSaliComponent} from '../formularz-sali/formularz-sali.component';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-edit-sala-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormularzSaliComponent,
    MatButtonModule,
    MatDialogModule,
  ],

  templateUrl: './edit-sala-dialog.component.html',
  styleUrl: './edit-sala-dialog.component.css'
})
export class EditSalaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditSalaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sala: Sala }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSalaSubmit(sala: Sala): void {
    this.dialogRef.close(sala);
  }
}

