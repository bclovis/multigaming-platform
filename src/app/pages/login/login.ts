import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Inject } from '@angular/core'; 



@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  username = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {
    if (this.username.trim()) {
      this.authService.login(this.username);
    }
  }
}