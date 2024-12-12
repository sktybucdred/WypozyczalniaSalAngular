// src/app/services/sala.service.ts
import { inject, Injectable } from '@angular/core';
import { Sala } from '../models/sala.model';
import { BehaviorSubject, Observable } from 'rxjs';
import {UdogodnieniaService} from './udogodnienia.service';
import {Udogodnienie} from '../models/udogodnienie.model';
import { RezerwacjeService } from './rezerwacje.service';
import { Rezerwacja } from '../models/rezerwacja.model';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private readonly STORAGE_KEY = 'salaData';
  private saleSubject: BehaviorSubject<Sala[]> = new BehaviorSubject<Sala[]>([]);
  public sale$: Observable<Sala[]> = this.saleSubject.asObservable();
  private rezerwacjeService = inject(RezerwacjeService);

  constructor(private udogodnieniaService: UdogodnieniaService) {
    const savedSale = this.getSaleFromStorage();
    this.saleSubject.next(savedSale);

    // Subskrybuj zmiany w udogodnieniach
    this.udogodnieniaService.udogodnienia$.subscribe((udogodnienia) => {
      this.syncUdogodnienia(udogodnienia);
    });

    // Subskrybuj zmiany w rezerwacjach
    this.rezerwacjeService.rezerwacje$.subscribe((rezerwacje: Rezerwacja[]) => {
      this.syncRezerwacje(rezerwacje);
    });
  }
  private syncUdogodnienia(udogodnienia: Udogodnienie[]): void {
    const currentSale = this.getSale();
    const updatedSale = currentSale.map((sala) => {
      const updatedUdogodnienia = sala.udogodnienia.filter((u) =>
        udogodnienia.some((updatedU) => updatedU.id === u.id)
      ).map((u) => {
        const updated = udogodnienia.find((updatedU) => updatedU.id === u.id);
        return updated || u;
      });
      return { ...sala, udogodnienia: updatedUdogodnienia };
    });
    this.saleSubject.next(updatedSale);
    this.saveSaleToStorage(updatedSale);
  }

  private syncRezerwacje(rezerwacje: Rezerwacja[]): void {
    const currentSale = this.getSale();
    const updatedSale = currentSale.map((sala) => {
      // Add null check and provide empty array as fallback
      const currentRezerwacje = sala.rezerwacje || [];
      const updatedRezerwacje = currentRezerwacje.filter((r) =>
        rezerwacje.some((updatedR) => updatedR.id === r.id)
      ).map((r) => {
        const updated = rezerwacje.find((updatedR) => updatedR.id === r.id);
        return updated || r;
      });
      return { ...sala, rezerwacje: updatedRezerwacje };
    });
    this.saleSubject.next(updatedSale);
    this.saveSaleToStorage(updatedSale);
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
      sala.udogodnienia || [],
      sala.rezerwacje || [] // Ensure rezerwacje is initialized
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

  addRezerwacjaToSala(sala: Sala, rezerwacja: Rezerwacja): void {
    const currentSale = this.getSale();
    const salaToUpdate = currentSale.find(s => s.id === sala.id);
    
    if (salaToUpdate) {
      if (!salaToUpdate.rezerwacje) {
        salaToUpdate.rezerwacje = [];
      }
      salaToUpdate.rezerwacje.push(rezerwacja);
      
      this.updateSala(salaToUpdate);
    }
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
