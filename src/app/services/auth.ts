import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'current-user';

  constructor(private router: Router) {}

  login(username: string): void {
    localStorage.setItem(this.USER_KEY, username);
    this.router.navigate(['/home']);
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  getCurrentUser(): string {
    return localStorage.getItem(this.USER_KEY) || '';
  }
}

