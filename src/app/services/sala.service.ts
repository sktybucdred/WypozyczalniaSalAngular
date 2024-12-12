// src/app/services/sala.service.ts
import { Injectable } from '@angular/core';
import { Sala } from '../models/sala.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UdogodnieniaService } from './udogodnienia.service';
import { Udogodnienie } from '../models/udogodnienie.model';
import { Rezerwacja } from '../models/rezerwacja.model';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private readonly STORAGE_KEY = 'salaData';
  private saleSubject: BehaviorSubject<Sala[]> = new BehaviorSubject<Sala[]>([]);
  public sale$: Observable<Sala[]> = this.saleSubject.asObservable();

  constructor(private udogodnieniaService: UdogodnieniaService) {
    const savedSale = this.getSaleFromStorage();
    this.saleSubject.next(savedSale);

    // Subskrybuj zmiany w udogodnieniach i synchronizuj je
    this.udogodnieniaService.udogodnienia$.subscribe((udogodnienia) => {
      this.syncUdogodnienia(udogodnienia);
    });
  }

  private syncUdogodnienia(udogodnienia: Udogodnienie[]): void {
    const currentSale = this.getSale();
    const updatedSale = currentSale.map((sala) => {
      const updatedUdogodnienia = sala.udogodnienia
        .filter((u) =>
          udogodnienia.some((updatedU) => updatedU.id === u.id)
        )
        .map((u) => {
          const updated = udogodnienia.find((updatedU) => updatedU.id === u.id);
          return updated || u;
        });
      return { ...sala, udogodnienia: updatedUdogodnienia };
    });
    this.saleSubject.next(updatedSale);
    this.saveSaleToStorage(updatedSale);
  }

  sortSale(field: keyof Sala, order: 'asc' | 'desc'): void {
    const sortedSale = [...this.saleSubject.getValue()].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (valueA == null) return 1;
      if (valueB == null) return -1;

      // Sortowanie według typu pola
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return order === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Fallback dla innych typów
      if (valueA < valueB) return order === 'asc' ? -1 : 1;
      if (valueA > valueB) return order === 'asc' ? 1 : -1;
      return 0;
    });
    this.saleSubject.next(sortedSale);
  }

  getSale(): Sala[] {
    return this.saleSubject.getValue();
  }

  addSala(sala: Sala): void {
    const currentSale = this.getSale();
    const newId = currentSale.length > 0 ? Math.max(...currentSale.map((s) => s.id)) + 1 : 1;
    const newSala = new Sala(
      newId,
      sala.nazwa,
      sala.pojemnosc,
      sala.udogodnienia,
      []
    );
    const updatedSale = [...currentSale, newSala];
    this.saleSubject.next(updatedSale);
    this.saveSaleToStorage(updatedSale);
  }

  addRezerwacja(salaId: number, rezerwacja: Rezerwacja): void {
    const sale = this.getSale();
    const sala = sale.find((s) => s.id === salaId);

    if (!sala) {
      throw new Error('Sala nie znaleziona');
    }

    sala.rezerwacje = sala.rezerwacje || [];

    // Sprawdzenie konfliktu
    if (this.isConflict(salaId, rezerwacja)) {
      throw new Error('Konflikt rezerwacji');
    }

    // Dodanie rezerwacji
    const newId = sala.rezerwacje.length > 0 ? Math.max(...sala.rezerwacje.map((r) => r.id)) + 1 : 1;
    rezerwacja.id = newId;
    sala.rezerwacje.push(rezerwacja);

    this.saleSubject.next(sale);
    this.saveSaleToStorage(sale);
  }

  getSalaById(id: number): Sala | undefined {
    return this.getSale().find((sala) => sala.id === id);
  }

  isConflict(salaId: number, rezerwacja: Rezerwacja): boolean {
    const sala = this.getSalaById(salaId);
    if (!sala || !sala.rezerwacje) return false;

    return sala.rezerwacje.some((r) =>
      (rezerwacja.startDateTime >= r.startDateTime && rezerwacja.startDateTime < r.endDateTime) ||
      (rezerwacja.endDateTime > r.startDateTime && rezerwacja.endDateTime <= r.endDateTime) ||
      (rezerwacja.startDateTime <= r.startDateTime && rezerwacja.endDateTime >= r.endDateTime)
    );
  }

  deleteRezerwacja(salaId: number, rezerwacjaId: number): void {
    const sale = this.getSale();
    const sala = sale.find((s) => s.id === salaId);

    if (!sala || !sala.rezerwacje) {
      throw new Error('Sala lub rezerwacja nie znaleziona');
    }

    sala.rezerwacje = sala.rezerwacje.filter((r) => r.id !== rezerwacjaId);

    this.saleSubject.next(sale);
    this.saveSaleToStorage(sale);
  }

  updateSala(updatedSala: Sala): void {
    const currentSale = this.getSale();
    const updatedSale = currentSale.map((sala) =>
      sala.id === updatedSala.id ? updatedSala : sala
    );
    this.saleSubject.next(updatedSale);
    this.saveSaleToStorage(updatedSale);
  }

  deleteSala(id: number): void {
    const currentSale = this.getSale();
    const updatedSale = currentSale.filter(sala => sala.id !== id);
    this.saleSubject.next(updatedSale);
    this.saveSaleToStorage(updatedSale);
  }

  private saveSaleToStorage(sale: Sala[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sale));
  }

  private getSaleFromStorage(): Sala[] {
    const saleJson = localStorage.getItem(this.STORAGE_KEY);
    return saleJson ? JSON.parse(saleJson) : [];
  }
}
