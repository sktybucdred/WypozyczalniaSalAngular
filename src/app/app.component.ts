// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations'; // Import provideAnimations
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatToolbarModule } from '@angular/material/toolbar'; // Example: Import MatToolbarModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
  ],
  providers: [
    provideAnimations(),
  ],
})
export class AppComponent {
  title = 'SalaWynajmu';
}
