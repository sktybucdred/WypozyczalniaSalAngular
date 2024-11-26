import { Component, OnInit } from '@angular/core';
import { Sala } from '../../models/sala.model';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-sala-list',
  templateUrl: './sala-list.component.html',
  styleUrls: ['./sala-list.component.css'],
})
export class SalaListComponent implements OnInit {
  sale: Sala[] = [];

  constructor(private salaService: SalaService) {}

  ngOnInit(): void {
    this.sale = this.salaService.getSale();
  }
}
