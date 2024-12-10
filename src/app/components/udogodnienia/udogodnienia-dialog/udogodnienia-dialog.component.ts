// udogodnienia-dialog.component.ts
import {Component, inject, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialog} from '@angular/material/dialog';
import { UdogodnieniaService } from '../../../services/udogodnienia.service';
import { AuthService } from '../../../services/auth.service';
import { Udogodnienie } from '../../../models/udogodnienie.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {AddUdogodnienieDialogComponent} from '../add-udogodnienie-dialog/add-udogodnienie-dialog.component';
import {EditUdogodnienieDialogComponent} from '../edit-udogodnienie-dialog/edit-udogodnienie-dialog.component';

@Component({
  selector: 'app-udogodnienia-dialog',
  templateUrl: './udogodnienia-dialog.component.html',
  styleUrls: ['./udogodnienia-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions
  ]
})
export class UdogodnieniaDialogComponent {
  udogodnienia: Udogodnienie[] = [];

  // Bezpośrednie wstrzyknięcie AuthService
  private authService = inject(AuthService);

  constructor(
    public dialogRef: MatDialogRef<UdogodnieniaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private udogodnieniaService: UdogodnieniaService,
    private dialog: MatDialog
  ) {
    this.udogodnieniaService.udogodnienia$.subscribe((data: Udogodnienie[]) => {
      this.udogodnienia = data;
    });
  }
  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AddUdogodnienieDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: Udogodnienie | undefined) => {
      if (result) {
        this.udogodnieniaService.addUdogodnienie(result);
      }
    });
  }
  openEditDialog(udogodnienie: Udogodnienie): void{
    const dialogRef = this.dialog.open(EditUdogodnienieDialogComponent, {
      width: '600px',
      data: {udogodnienie}
    });

    dialogRef.afterClosed().subscribe((result: Udogodnienie | undefined) => {
      if (result) {
        this.udogodnieniaService.updateUdogodnienie(result);
      }
    });
  }
  deleteUdogodnienie(id: number): void {
    this.udogodnieniaService.deleteUdogodnienie(id);
  }

  // Funkcja zamykająca dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Funkcja trackBy dla *ngFor
  trackById(index: number, item: Udogodnienie): number {
    return item.id;
  }

  // Metoda do sprawdzania, czy użytkownik jest adminem
  isAdmin(): boolean {
    return this.authService.isAdminLoggedIn();
  }
}
