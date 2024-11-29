// src/app/services/sala.service.ts
import { Injectable } from '@angular/core';
import { Sala } from '../models/sala.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private readonly STORAGE_KEY = 'salaData';
  private saleSubject: BehaviorSubject<Sala[]> = new BehaviorSubject<Sala[]>([]);
  public sale$: Observable<Sala[]> = this.saleSubject.asObservable();

  constructor() {
    const savedSale = this.getSaleFromStorage();
    if (savedSale.length) {
      this.saleSubject.next(savedSale);
    } else {
      const initialSale: Sala[] = [
        new Sala(1, 'Sala Konferencyjna', 20, ['Projektor', 'WiFi']),
        // Add more initial Sala instances if needed
      ];
      this.saleSubject.next(initialSale);
      this.saveSaleToStorage(initialSale);
    }
  }

  // Retrieve current list of Sala
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
      sala.udogodnienia
    );
    const updatedSale = [...currentSale, newSala];
    this.saleSubject.next(updatedSale);
    this.saveSaleToStorage(updatedSale);
  }

  updateSala(updatedSala: Sala): void {
    const currentSale = this.getSale();
    const updatedSale = currentSale.map((sala) =>
      sala.id === updatedSala.id ? updatedSala : sala
    );
    this.saleSubject.next(updatedSale);
    this.saveSaleToStorage(updatedSale);
  }


  // Delete a Sala by ID
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
