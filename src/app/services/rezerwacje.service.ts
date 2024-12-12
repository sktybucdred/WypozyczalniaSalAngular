import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Rezerwacja } from '../models/rezerwacja.model';

@Injectable({
  providedIn: 'root',
})
export class RezerwacjeService {
  private readonly STORAGE_KEY = 'rezerwacjeData';
  private rezerwacjeSubject: BehaviorSubject<Rezerwacja[]> = new BehaviorSubject<Rezerwacja[]>([]);
  public rezerwacje$: Observable<Rezerwacja[]> = this.rezerwacjeSubject.asObservable();

  constructor() {
    const savedRezerwacje = this.getRezerwacjeFromStorage();
    this.rezerwacjeSubject.next(savedRezerwacje);
  }

  getRezerwacje(): Rezerwacja[] {
    return this.rezerwacjeSubject.getValue();
  }

  addRezerwacja(rezerwacja: Rezerwacja): Rezerwacja {
    const currentRezerwacje = this.getRezerwacje();
    const newId = currentRezerwacje.length > 0
      ? Math.max(...currentRezerwacje.map((r) => r.id)) + 1
      : 1;

    const newRezerwacja = new Rezerwacja(
      newId,
      rezerwacja.imie,
      rezerwacja.nazwisko,
      rezerwacja.email,
      rezerwacja.startDateTime,
      rezerwacja.endDateTime
    );

    const updatedRezerwacje = [...currentRezerwacje, newRezerwacja];
    this.rezerwacjeSubject.next(updatedRezerwacje);
    this.saveRezerwacjeToStorage(updatedRezerwacje);

    return newRezerwacja;
  }

  updateRezerwacja(updatedRezerwacja: Rezerwacja): void {
    const currentRezerwacje = this.getRezerwacje();
    const updatedRezerwacje = currentRezerwacje.map((rezerwacja) =>
      rezerwacja.id === updatedRezerwacja.id ? updatedRezerwacja : rezerwacja
    );
    this.rezerwacjeSubject.next(updatedRezerwacje);
    this.saveRezerwacjeToStorage(updatedRezerwacje);
  }

  deleteRezerwacja(id: number): void {
    const currentRezerwacje = this.getRezerwacje();
    const updatedRezerwacje = currentRezerwacje.filter(rezerwacja => rezerwacja.id !== id);
    this.rezerwacjeSubject.next(updatedRezerwacje);
    this.saveRezerwacjeToStorage(updatedRezerwacje);
  }

  private saveRezerwacjeToStorage(rezerwacje: Rezerwacja[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rezerwacje));
  }

  private getRezerwacjeFromStorage(): Rezerwacja[] {
    const rezerwacjeJson = localStorage.getItem(this.STORAGE_KEY);
    return rezerwacjeJson ? JSON.parse(rezerwacjeJson) : [];
  }
}
