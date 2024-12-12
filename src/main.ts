import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(AppRoutes),
  provideAnimations(), provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
