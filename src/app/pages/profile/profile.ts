import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { StoreService, UserStats } from '../../services/store';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent implements OnInit {
  username = '';
  stats: UserStats | null = null;

  constructor(
    private authService: AuthService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getCurrentUser();
    this.stats = this.storeService.getUserStats(this.username);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
