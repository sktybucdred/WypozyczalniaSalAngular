import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormularzSaliComponent} from '../../sala/formularz-sali/formularz-sali.component';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {Udogodnienie} from '../../../models/udogodnienie.model';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-udogodnienie-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule, // Dla formularzy reaktywnych
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle
  ],
  templateUrl: './edit-udogodnienie-dialog.component.html',
  standalone: true,
  styleUrl: './edit-udogodnienie-dialog.component.css'
})
export class EditUdogodnienieDialogComponent {
  udogodnienieForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<EditUdogodnienieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { udogodnienie: Udogodnienie },
    private fb: FormBuilder
  ) {
    this.udogodnienieForm = this.fb.group({
      nazwa: [this.data.udogodnienie.nazwa, Validators.required],
      opis: [this.data.udogodnienie.opis, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.udogodnienieForm.valid) {
      this.dialogRef.close(this.udogodnienieForm.value);
    }
  }
}

