import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import { FormularzSaliComponent } from '../formularz-sali/formularz-sali.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Sala } from '../../../models/sala.model';
import {Udogodnienie} from '../../../models/udogodnienie.model';
import {UdogodnieniaService} from '../../../services/udogodnienia.service';

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
export class AddSalaDialogComponent implements OnInit {
  udogodnienia: Udogodnienie[] = [];


  constructor(
    public dialogRef: MatDialogRef<AddSalaDialogComponent>,
    private udogodnieniaService: UdogodnieniaService
    ) {}

  ngOnInit() {
    this.udogodnieniaService.udogodnienia$.subscribe((udogodnienia) => {
      this.udogodnienia = udogodnienia;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSalaSubmit(sala: Sala): void {
    this.dialogRef.close(sala);
  }
}
