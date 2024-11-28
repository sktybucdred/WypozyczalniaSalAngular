import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminLoggedIn = false;

  // Dane logowania administratora
  private adminCredentials = {
    username: 'admin',
    password: 'admin123',
  };

  constructor() {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    this.adminLoggedIn = loggedIn === 'true';
  }

  login(username: string, password: string): boolean {
    if (
      username === this.adminCredentials.username &&
      password === this.adminCredentials.password
    ) {
      this.adminLoggedIn = true;
      localStorage.setItem('adminLoggedIn', 'true');
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.adminLoggedIn = false;
    localStorage.removeItem('adminLoggedIn');
  }


  isAdminLoggedIn(): boolean {
    return this.adminLoggedIn;
  }
}
