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
      new Sala(1, 'Sala Konferencyjna', 20, ['Projektor', 'WiFi']),
      // Add more initial Sala instances if needed
    ];
    this.saleSubject.next(initialSale);
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
    this.saleSubject.next([...currentSale, newSala]);
  }

  updateSala(updatedSala: Sala): void {
    const currentSale = this.getSale();
    const updatedSale = currentSale.map((sala) =>
      sala.id === updatedSala.id ? updatedSala : sala
    );
    this.saleSubject.next(updatedSale);
  }


  // Delete a Sala by ID
  deleteSala(id: number): void {
    const currentSale = this.getSale();
    const updatedSale = currentSale.filter(sala => sala.id !== id);
    this.saleSubject.next(updatedSale);
  }

}
