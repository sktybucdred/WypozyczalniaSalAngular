import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { Sala } from '../../../models/sala.model';
import { SalaService } from '../../../services/sala.service';
import { Rezerwacja } from '../../../models/rezerwacja.model';
import { AddRezerwacjaDialogComponent } from '../../rezerwacja/add-rezerwacja-dialog/add-rezerwacja-dialog.component';
import {ZmienKolorDyrektywa} from '../../../zmien-kolor.dyrektywa';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-details-sala-dialog',
  templateUrl: './details-sala-dialog.component.html',
  styleUrls: ['./details-sala-dialog.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatTableModule, MatSelectModule, MatSelect, MatOption, MatFormField, ZmienKolorDyrektywa],
})
export class DetailsSalaDialogComponent implements OnInit {
  sala!: Sala;
  rezerwacje: Rezerwacja[] = [];
  constructor(
    private salaService: SalaService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { sala: Sala },
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sala = this.data.sala;
    this.rezerwacje = this.sala.rezerwacje || [];
  }

  onCancel(): void {
    this.dialog.closeAll();
  }
  openAddRezerwacjaDialog(): void {
    const dialogRef = this.dialog.open(AddRezerwacjaDialogComponent, {
      width: '500px',
      data: { salaId: this.sala.id },
    });

    dialogRef.afterClosed().subscribe((result: Rezerwacja | undefined) => {
      if (result) {
        try {
          this.salaService.addRezerwacja(this.sala.id, result);
          this.rezerwacje = this.salaService.getSalaById(this.sala.id)?.rezerwacje || [];
        } catch (error) {
          alert((error as Error).message);
        }
      }
    });
  }

  deleteRezerwacja(rezerwacjaId: number): void {
    this.salaService.deleteRezerwacja(this.sala.id, rezerwacjaId);
    this.rezerwacje = this.salaService.getSalaById(this.sala.id)?.rezerwacje || [];
  }
}
