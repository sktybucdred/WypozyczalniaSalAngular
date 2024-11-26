// src/app/components/sala-add/sala-add.component.ts
import { Component } from '@angular/core';
import { Sala } from '../../models/sala.model';
import { SalaService } from '../../services/sala.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sala-add',
  templateUrl: './sala-add.component.html',
  styleUrls: ['./sala-add.component.css'],
})
export class SalaAddComponent {
  nazwa: string = '';
  pojemnosc: number | null = null;
  udogodnienia: string = '';
  dostepnosc: string = '';

  constructor(private salaService: SalaService, private router: Router) {}

  onSubmit(): void {
    if (this.nazwa && this.pojemnosc !== null) {
      const nowyId = this.salaService.getSale().length + 1;
      const udogodnieniaArray = this.udogodnienia.split(',').map((u) => u.trim());
      const dostepnoscArray = this.dostepnosc
        .split(',')
        .map((d) => new Date(d.trim()));
      const nowaSala = new Sala(
        nowyId,
        this.nazwa,
        this.pojemnosc,
        udogodnieniaArray,
        dostepnoscArray
      );
      this.salaService.addSala(nowaSala);
      this.router.navigate(['/saly']);
    } else {
      alert('Proszę uzupełnić wszystkie wymagane pola.');
    }
  }
}
