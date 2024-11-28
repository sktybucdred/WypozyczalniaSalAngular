import { Routes } from '@angular/router';
import { SalaListComponent } from './components/sala-list/sala-list.component';
import {ConfirmDeleteDialogComponent} from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import {AddSalaDialogComponent} from './components/add-sala-dialog/add-sala-dialog.component';


export const AppRoutes: Routes = [
  { path: '', redirectTo: '/sale', pathMatch: 'full' },
  { path: 'sale', component: SalaListComponent },
/*
  { path: 'dodaj-sala', component: AddSalaDialogComponent },
  { path: 'usun-sala/:id', component: ConfirmDeleteDialogComponent },
*/

];
