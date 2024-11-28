import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import { FormularzSaliComponent } from '../formularz-sali/formularz-sali.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Sala } from '../../models/sala.model';

@Component({
  selector: 'app-add-sala-dialog',
  standalone: true,
  imports: [
    FormularzSaliComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './add-sala-dialog.component.html',
  styleUrls: ['./add-sala-dialog.component.css'],
})
export class AddSalaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddSalaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sala?: Sala }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSalaSubmit(sala: Sala): void {
    this.dialogRef.close(sala);
  }
}
