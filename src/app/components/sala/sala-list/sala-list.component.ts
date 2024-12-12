// src/app/components/sala-list/sala-list.component.ts
import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Sala } from '../../../models/sala.model';
import { SalaService } from '../../../services/sala.service';
import { AuthService } from '../../../services/auth.service';

import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ConfirmDeleteDialogComponent} from '../../confirm-delete-dialog/confirm-delete-dialog.component';
import {AddSalaDialogComponent} from '../add-sala-dialog/add-sala-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {EditSalaDialogComponent} from '../edit-sala-dialog/edit-sala-dialog.component';
import {DetailsSalaDialogComponent} from '../details-sala-dialog/details-sala-dialog.component';
import {UdogodnieniaDialogComponent} from '../../udogodnienia/udogodnienia-dialog/udogodnienia-dialog.component';
import {Udogodnienie} from '../../../models/udogodnienie.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { ZmienKolorDyrektywa } from '../../../directives/zmien-kolor.directive';

@Component({
  selector: 'app-sala-list',
  templateUrl: './sala-list.component.html',
  styleUrls: ['./sala-list.component.css'],
  standalone: true,
  imports: [ZmienKolorDyrektywa, MatSortModule, MatLabel, CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatTableModule, MatFormField, MatPaginator, MatInput, MatSort],
})
export class SalaListComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Sala> = new MatTableDataSource<Sala>();
  private saleSubscription!: Subscription;
  columnsToDisplay: string[] = ['nazwa', 'pojemnosc', 'udogodnienia', 'actions'];
  private salaService = inject(SalaService);
  private dialog: MatDialog = inject(MatDialog);
  protected authService = inject(AuthService);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.saleSubscription = this.salaService.sale$.subscribe((sale) => {
      this.dataSource.data = sale;
      // Resetujemy filtrowanie po aktualizacji danych
      this.applyFilter('');
    });

    if (this.authService.isAdminLoggedIn()) {
      this.columnsToDisplay.unshift('id');
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.saleSubscription.unsubscribe();
  }
  applyFilter(event: Event | string) {
    let filterValue: string;
    if (typeof event === 'string') {
      filterValue = event.trim().toLowerCase();
    } else {
      const input = event.target as HTMLInputElement;
      filterValue = input.value.trim().toLowerCase();
    }
    this.dataSource.filter = filterValue;
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
      width: '800px',
      maxWidth: '800px',
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
