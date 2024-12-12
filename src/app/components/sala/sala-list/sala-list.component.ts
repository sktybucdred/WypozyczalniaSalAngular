// src/app/components/sala-list/sala-list.component.ts
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { Sala } from '../../../models/sala.model';
import { SalaService } from '../../../services/sala.service';
import { AuthService } from '../../../services/auth.service';

import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ConfirmDeleteDialogComponent} from '../../confirm-delete-dialog/confirm-delete-dialog.component';
import {AddSalaDialogComponent} from '../add-sala-dialog/add-sala-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {EditSalaDialogComponent} from '../edit-sala-dialog/edit-sala-dialog.component';
import {DetailsSalaDialogComponent} from '../details-sala-dialog/details-sala-dialog.component';
import {UdogodnieniaDialogComponent} from '../../udogodnienia/udogodnienia-dialog/udogodnienia-dialog.component';
import {Udogodnienie} from '../../../models/udogodnienie.model';


@Component({
  selector: 'app-sala-list',
  templateUrl: './sala-list.component.html',
  styleUrls: ['./sala-list.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatTableModule],
})
export class SalaListComponent implements OnInit, OnDestroy {
  sale: Sala[] = [];
  private saleSubscription!: Subscription;
  columnsToDisplay: string[] = ['nazwa', 'pojemnosc', 'udogodnienia', 'actions'];
  private salaService = inject(SalaService);
  private dialog: MatDialog = inject(MatDialog);
  protected authService = inject(AuthService);

  ngOnInit(): void {
    this.saleSubscription = this.salaService.sale$.subscribe((sale) => {
      this.sale = sale;
    });

    if (this.authService.isAdminLoggedIn()) {
      this.columnsToDisplay.unshift('id');
    }
  }

  ngOnDestroy(): void {
    this.saleSubscription.unsubscribe();
  }

  openEditDialog(sala: Sala): void {
    const dialogRef = this.dialog.open(EditSalaDialogComponent, {
      width: '600px',
      data: {sala},
    });

    dialogRef.afterClosed().subscribe((result: Sala | undefined) => {
      if (result) {
        this.salaService.updateSala(result);
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AddSalaDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: Sala | undefined) => {
      if (result) {
        this.salaService.addSala(result);
      }
    });
  }

  openDetailsDialog(sala: Sala): void {
    const dialogRef = this.dialog.open(DetailsSalaDialogComponent, {
      width: '600px',
      data: {sala},
    });
  }

  openDeleteDialog(sala: Sala): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: {sala}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.salaService.deleteSala(sala.id);
      }
    });
  }

  openUdogodnieniaDialog(): void {
    const dialogRef = this.dialog.open(UdogodnieniaDialogComponent, {
      width: '600',
    });
  }
  getUdogodnieniaNames(udogodnienia: Udogodnienie[] | null | undefined): string {
    if (!udogodnienia || udogodnienia.length === 0) {
      return 'Brak udogodnień'; // Tekst wyświetlany, gdy brak udogodnień
    }
    return udogodnienia.map((u) => u.nazwa).join(', ');
  }

}
