// src/app/components/sala-list/sala-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Sala } from '../../models/sala.model';
import { SalaService } from '../../services/sala.service';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ConfirmDeleteDialogComponent} from '../confirm-delete-dialog/confirm-delete-dialog.component';
import {AddSalaDialogComponent} from '../add-sala-dialog/add-sala-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-sala-list',
  templateUrl: './sala-list.component.html',
  styleUrls: ['./sala-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, MatDialogModule, MatButtonModule, MatIconModule, MatTableModule],
})
export class SalaListComponent implements OnInit {
  sale: Sala[] = [];

  constructor(private salaService: SalaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.salaService.sale$.subscribe((sale) => {
      this.sale = sale;
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

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AddSalaDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result : Sala | undefined) => {
      if(result){
        this.salaService.addSala(result);
      }
    });
  }
}
