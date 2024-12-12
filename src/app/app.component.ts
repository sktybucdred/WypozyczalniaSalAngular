// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations'; // Import provideAnimations
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatToolbarModule } from '@angular/material/toolbar';
import {AuthService} from './services/auth.service'; // Example: Import MatToolbarModule
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [
    provideAnimations(),
  ],
})
export class AppComponent {
  constructor(public authService: AuthService) {
  }
  title = 'SalaWynajmu';

  logout(): void {
    this.authService.logout();
  }
}
