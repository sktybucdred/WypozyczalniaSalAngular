import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    if (this.authService.login(this.username, this.password)) {
      // Po udanym logowaniu przekieruj na stronę główną lub inną
      this.router.navigate(['/']);
    } else {
      this.errorMessage = 'Nieprawidłowy login lub hasło';
    }
  }
  onLogout(): void {
    this.authService.logout();
  }
}
