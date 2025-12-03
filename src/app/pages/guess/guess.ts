import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-guess',
  imports: [CommonModule, FormsModule],
  templateUrl: './guess.html',
  styleUrl: './guess.css',
})
export class GuessComponent implements OnInit {
  targetNumber = 0;
  guess = 0;
  message = '';
  attempts = 0;
  isGameOver = false;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.targetNumber = Math.floor(Math.random() * 100) + 1;
    this.guess = 0;
    this.message = 'Devine un nombre entre 1 et 100 !';
    this.attempts = 0;
    this.isGameOver = false;
  }

  checkGuess() {
    if (this.guess < 1 || this.guess > 100) {
      this.message = 'Entre un nombre entre 1 et 100 !';
      return;
    }

    this.attempts++;

    if (this.guess === this.targetNumber) {
      this.message = `Gagne en ${this.attempts} coups !`;
      this.isGameOver = true;
      const username = this.authService.getCurrentUser();
      if (username) {
        this.storeService.updateGuessBestScore(username, 100 - this.attempts);
      }
    } else if (this.guess < this.targetNumber) {
      this.message = 'Plus grand !';
    } else {
      this.message = 'Plus petit !';
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
