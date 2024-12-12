import { Component, inject, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Sala } from '../../../models/sala.model';
import { AuthService } from '../../../services/auth.service';
import { Udogodnienie } from '../../../models/udogodnienie.model';
import { RezerwacjeService } from '../../../services/rezerwacje.service';
import { Rezerwacja } from '../../../models/rezerwacja.model';
import { AddRezerwacjaDialogComponent } from '../../add-rezerwacja-dialog/add-rezerwacja-dialog.component';
import { SalaService } from '../../../services/sala.service';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-sala-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule
  ],
  templateUrl: './details-sala-dialog.component.html',
  standalone: true,
  styleUrls: ['./details-sala-dialog.component.css']
})
export class DetailsSalaDialogComponent implements OnInit, OnDestroy {
  sala!: Sala;
  rezerwacje: Rezerwacja[] = [];
  authService = inject(AuthService);
  rezerwacjeService = inject(RezerwacjeService);
  dialog = inject(MatDialog);
  salaService = inject(SalaService);
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<DetailsSalaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sala: Sala }
  ) {
    // Subscribe to reservations stream
    this.subscriptions.push(this.rezerwacjeService.rezerwacje$.subscribe((rezerwacje) => {
        this.rezerwacje = this.filterRezerwacjeBySala(rezerwacje);
    }));

    // Subscribe to sala updates to keep sala data fresh
    this.subscriptions.push(this.salaService.sale$.subscribe(sale => {
        const updatedSala = sale.find(s => s.id === this.data.sala.id);
        if (updatedSala) {
            this.sala = updatedSala;
            this.rezerwacje = this.filterRezerwacjeBySala(this.rezerwacjeService.getRezerwacje());
        }
    }));
  }

  ngOnInit(): void {
    this.sala = this.data.sala;
    // Initial load of reservations
    this.rezerwacje = this.filterRezerwacjeBySala(this.rezerwacjeService.getRezerwacje());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getUdogodnieniaNames(udogodnienia: Udogodnienie[] | null | undefined): string {
    if (!udogodnienia || udogodnienia.length === 0) {
      return 'Brak udogodnień'; // Tekst wyświetlany, gdy brak udogodnień
    }
    return udogodnienia.map((u) => u.nazwa).join(', ');
  }

  getRezerwacjeDates(rezerwacje: Rezerwacja[]): string {
    if (!rezerwacje || rezerwacje.length === 0) {
      return 'Brak rezerwacji';
    }
    return rezerwacje.map((r) => r.startDateTime).join(', ');
  }

  onAddRezerwacja(): void {
    const dialogRef = this.dialog.open(AddRezerwacjaDialogComponent, {
      width: '600px',
      data: { sala: this.sala }
    });

    dialogRef.afterClosed().subscribe((result: Rezerwacja | undefined) => {
      if (result) {
        // Create new reservation
        const newRezerwacja = this.rezerwacjeService.addRezerwacja(result);
        // Update sala with the new reservation
        this.salaService.addRezerwacjaToSala(this.sala, newRezerwacja);
        // Update local reference and trigger change detection
        this.rezerwacje.push(newRezerwacja);

        this.dialogRef.close();
      }
    });
  }

  onDeleteRezerwacja(rezerwacjaId: number): void {
    this.rezerwacjeService.deleteRezerwacja(rezerwacjaId);
    this.salaService.removeRezerwacjaFromSala(this.sala, rezerwacjaId);
    this.rezerwacje = this.rezerwacje.filter(rezerwacja => rezerwacja.id !== rezerwacjaId);
  }


  private filterRezerwacjeBySala(rezerwacje: Rezerwacja[]): Rezerwacja[] {
    if (!this.sala || !this.sala.rezerwacje) {
      return [];
    }

    const salaRezerwacje = rezerwacje.filter(rezerwacja =>
      this.sala.rezerwacje.some(r => r.id === rezerwacja.id)
    );

    // Sortujemy rezerwacje według daty rozpoczęcia od najwcześniejszej
    salaRezerwacje.sort((a, b) => {
      return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
    });

    return salaRezerwacje;
  }
}
