// src/app/services/sala.service.ts
import { Injectable } from '@angular/core';
import { Sala } from '../models/sala.model';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private saly: Sala[] = [
    new Sala(
      1,
      'Sala Konferencyjna A',
      20,
      ['Projektor', 'Tablica', 'WiFi'],
      [new Date('2024-12-01'), new Date('2024-12-05')]
    ),
    new Sala(
      2,
      'Sala Konferencyjna B',
      15,
      ['Tablica', 'WiFi'],
      [new Date('2024-12-10'), new Date('2024-12-15')]
    ),
  ];

  constructor() {}

  getSale(): Sala[] {
    return this.saly;
  }

  addSala(sala: Sala): void {
    this.saly.push(sala);
  }

  // Możesz dodać więcej metod, np. usuwanie czy edycja sal
}
