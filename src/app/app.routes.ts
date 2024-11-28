import { Routes } from '@angular/router';
import { SalaListComponent } from './components/sala-list/sala-list.component';
import {LoginComponent} from './components/login/login.component';


export const AppRoutes: Routes = [
  { path: '', redirectTo: '/sale', pathMatch: 'full' },
  { path: 'sale', component: SalaListComponent },
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
/*
  { path: 'dodaj-sala', component: AddSalaDialogComponent },
  { path: 'usun-sala/:id', component: ConfirmDeleteDialogComponent },
*/

];
