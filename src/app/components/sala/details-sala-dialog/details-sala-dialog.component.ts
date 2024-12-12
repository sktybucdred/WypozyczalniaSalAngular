import {Component, inject, Inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Sala} from '../../../models/sala.model';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-details-sala-dialog',
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,],
  templateUrl: './details-sala-dialog.component.html',
  standalone: true,
  styleUrl: './details-sala-dialog.component.css'
})
export class DetailsSalaDialogComponent implements OnInit {
  sala!: Sala;
  authService = inject(AuthService);
  constructor(
    public dialogRef: MatDialogRef<DetailsSalaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sala: Sala }
  ) {}
  ngOnInit(): void {
    this.sala = this.data.sala;
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  //to be implemented
/*  onReserve(): void {
    this.dialogRef.close();
  }*/

}
