// src/app/components/sala-list/sala-list.component.ts
import {Component, OnDestroy, OnInit} from '@angular/core';
import { Sala } from '../../models/sala.model';
import { SalaService } from '../../services/sala.service';
import { AuthService } from '../../services/auth.service';

import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ConfirmDeleteDialogComponent} from '../confirm-delete-dialog/confirm-delete-dialog.component';
import {AddSalaDialogComponent} from '../add-sala-dialog/add-sala-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {Subscription} from 'rxjs';


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

  constructor(
    private salaService: SalaService,
    private dialog: MatDialog,
    protected authService: AuthService
  ) {}

  ngOnInit(): void {
    this.saleSubscription = this.salaService.sale$.subscribe((sale) => {
      this.sale = sale;
    });
  }

  ngOnDestroy(): void {
    this.saleSubscription.unsubscribe();
  }
  openEditDialog(sala: Sala): void {
    const dialogRef = this.dialog.open(AddSalaDialogComponent, {
      width: '600px',
      data: { sala },
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
      data: {},
    });

    dialogRef.afterClosed().subscribe((result : Sala | undefined) => {
      if(result){
        this.salaService.addSala(result);
      }
    });
  }
  openDeleteDialog(sala: Sala): void {
      const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        width: '400px',
        data: {sala}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.salaService.deleteSala(sala.id);
        }
      });
  }
  get columnsToDisplay(): string[] {
    if (this.authService.isAdminLoggedIn()) {
      return ['id', 'nazwa', 'pojemnosc', 'udogodnienia', 'actions'];
    } else {
      return ['id', 'nazwa', 'pojemnosc', 'udogodnienia'];
    }
  }

}
