// src/app/services/sala.service.ts
import { Injectable } from '@angular/core';
import { Sala } from '../models/sala.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  // Initialize with an empty array or pre-populated data
  private saleSubject: BehaviorSubject<Sala[]> = new BehaviorSubject<Sala[]>([]);
  public sale$: Observable<Sala[]> = this.saleSubject.asObservable();

  constructor() {
    // Optionally, initialize with some data
    const initialSale: Sala[] = [
      new Sala(1, 'Sala Konferencyjna', 20, ['Projektor', 'WiFi'], [new Date('2024-05-20'), new Date('2024-05-21')]),
      // Add more initial Sala instances if needed
    ];
    this.saleSubject.next(initialSale);
  }

  // Retrieve current list of Sala
  getSale(): Sala[] {
    return this.saleSubject.getValue();
  }

  // Add a new Sala
  addSala(sala: Sala): void {
    const currentSale = this.getSale();
    // Assign a unique ID; in a real app, the backend would handle this
    const newId = currentSale.length > 0 ? Math.max(...currentSale.map(s => s.id)) + 1 : 1;
    sala.id = newId;
    this.saleSubject.next([...currentSale, sala]);
  }

  // Delete a Sala by ID
  deleteSala(id: number): void {
    const currentSale = this.getSale();
    const updatedSale = currentSale.filter(sala => sala.id !== id);
    this.saleSubject.next(updatedSale);
  }

  // Optionally, implement updateSala if editing is needed
  updateSala(updatedSala: Sala): void {
    const currentSale = this.getSale();
    const index = currentSale.findIndex(sala => sala.id === updatedSala.id);
    if (index !== -1) {
      currentSale[index] = updatedSala;
      this.saleSubject.next([...currentSale]);
    }
  }
}
