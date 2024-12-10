import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Udogodnienie} from '../models/udogodnienie.model';

@Injectable({
  providedIn: 'root'
})
export class UdogodnieniaService {
  private readonly STORAGE_KEY = 'udogodnieniaData';
  private udogodnieniaSubject: BehaviorSubject<Udogodnienie[]> = new BehaviorSubject<Udogodnienie[]>([]);
  public udogodnienia$ = this.udogodnieniaSubject.asObservable();
  constructor() {
    const savedUdogodnienia = this.getUdogodnieniaFromStorage();
    if(savedUdogodnienia.length)
    {
      this.udogodnieniaSubject.next(savedUdogodnienia);
    } else
    {
      const initialUdogodnienia: Udogodnienie[] = [
        new Udogodnienie(1, 'Projektor', "Projektor do wyświetlania obrazów"),
        new Udogodnienie(2, 'WiFi', "Dostęp do internetu"),
        new Udogodnienie(3, 'Klimatyzacja', "Klimatyzacja w sali"),
        new Udogodnienie(4, 'Tablica', "Tablica do pisania"),
        new Udogodnienie(5, 'Głośniki', "Głośniki do odtwarzania dźwięku"),
        new Udogodnienie(6, 'Mikrofon', "Mikrofon do mówienia"),
        new Udogodnienie(7, 'Laptop', "Laptop do prezentacji"),
        new Udogodnienie(8, 'Telewizor', "Telewizor do wyświetlania obrazów"),
        new Udogodnienie(9, 'Flipchart', "Flipchart do pisania"),
        new Udogodnienie(10, 'Kamera', "Kamera do nagrywania"),
      ];
      this.udogodnieniaSubject.next(initialUdogodnienia);
      this.saveUdogodnieniaToStorage(initialUdogodnienia);
    }
  }
  getUdogodnienia(): Udogodnienie[] {
    return this.udogodnieniaSubject.getValue();
  }
  addUdogodnienie(udogodnienie: Udogodnienie): void {
    const currentUdogodnienia = this.getUdogodnienia();
    const newId = currentUdogodnienia.length > 0 ? Math.max(...currentUdogodnienia.map((u) => u.id)) + 1 : 1;
    const newUdogodnienie = new Udogodnienie(
      newId,
      udogodnienie.nazwa,
      udogodnienie.opis
    );
    const updatedUdogodnienia = [...currentUdogodnienia, newUdogodnienie];
    this.udogodnieniaSubject.next(updatedUdogodnienia);
    this.saveUdogodnieniaToStorage(updatedUdogodnienia);
  }
  updateUdogodnienie(updatedUdogodnienie: Udogodnienie): void {
    const currentUdogodnienia = this.getUdogodnienia();
    const updatedUdogodnienia = currentUdogodnienia.map((udogodnienie) =>
      udogodnienie.id === updatedUdogodnienie.id ? updatedUdogodnienie : udogodnienie
    );
    this.udogodnieniaSubject.next(updatedUdogodnienia);
    this.saveUdogodnieniaToStorage(updatedUdogodnienia);
  }

  deleteUdogodnienie(id: number): void {
    const currentUdogodnienia = this.getUdogodnienia();
    const updatedUdogodnienia = currentUdogodnienia.filter(udogodnienie => udogodnienie.id !== id);
    this.udogodnieniaSubject.next(updatedUdogodnienia);
    this.saveUdogodnieniaToStorage(updatedUdogodnienia);
  }

  private saveUdogodnieniaToStorage(udogodnienia: Udogodnienie[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(udogodnienia));
  }
  private getUdogodnieniaFromStorage(): Udogodnienie[] {
    const udogodnieniaJson = localStorage.getItem(this.STORAGE_KEY);
    return udogodnieniaJson ? JSON.parse(udogodnieniaJson) : [];
  }
}
