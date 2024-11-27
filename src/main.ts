import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(AppRoutes)],
}).catch((err) => console.error(err));
