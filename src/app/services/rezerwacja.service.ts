import { Injectable } from '@angular/core';
import { Rezerwacja } from '../models/rezerwacja.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RezerwacjaService {
  private rezerwacjeSubject: BehaviorSubject<Rezerwacja[]> = new BehaviorSubject<Rezerwacja[]>([]);
  public rezerwacje$: Observable<Rezerwacja[]> = this.rezerwacjeSubject.asObservable();

  constructor() {
    // Initialize with empty array or some test data
    this.rezerwacjeSubject.next([]);
  }

  getRezerwacje(): Rezerwacja[] {
    return this.rezerwacjeSubject.getValue();
  }

  addRezerwacja(rezerwacja: Rezerwacja): void {
    const currentRezerwacje = this.getRezerwacje();
    const newId = currentRezerwacje.length > 0 ? Math.max(...currentRezerwacje.map(r => r.id)) + 1 : 1;
    const newRezerwacja = new Rezerwacja(
      newId,
      rezerwacja.salaId,
      rezerwacja.imie,
      rezerwacja.nazwisko,
      rezerwacja.email,
      rezerwacja.startDateTime,
      rezerwacja.endDateTime
    );
    this.rezerwacjeSubject.next([...currentRezerwacje, newRezerwacja]);
  }

  // Optionally, implement methods to update and delete reservations
}
