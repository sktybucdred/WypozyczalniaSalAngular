import { Component, Inject, inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Udogodnienie } from '../../../models/udogodnienie.model';
import { UdogodnieniaService } from '../../../services/udogodnienia.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-udogodnienie-dialog',
  templateUrl: './add-udogodnienie-dialog.component.html',
  styleUrls: ['./add-udogodnienie-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent
  ]
})
export class AddUdogodnienieDialogComponent {
  udogodnienieForm: FormGroup;
  private udogodnieniaService = inject(UdogodnieniaService);

  constructor(
    public dialogRef: MatDialogRef<AddUdogodnienieDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.udogodnienieForm = this.fb.group({
      nazwa: ['', Validators.required],
      opis: ['', Validators.required]
    });
  }

  addUdogodnienie() {
    if (this.udogodnienieForm.valid) {
      const newUdogodnienie: Udogodnienie = {
        id: 0,
        nazwa: this.udogodnienieForm.value.nazwa,
        opis: this.udogodnienieForm.value.opis
      };
      this.udogodnieniaService.addUdogodnienie(newUdogodnienie);
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
