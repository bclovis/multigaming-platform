import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store';
import { AuthService } from '../../services/auth';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-memory',
  imports: [CommonModule],
  templateUrl: './memory.html',
  styleUrl: './memory.css',
})
export class MemoryComponent implements OnInit {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  moves = 0;
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
    const emojis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const values = [...emojis, ...emojis];
    
    this.cards = values
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }));
    
    this.flippedCards = [];
    this.moves = 0;
    this.isGameOver = false;
  }

  flipCard(card: Card) {
    if (card.isFlipped || card.isMatched || this.flippedCards.length === 2) {
      return;
    }

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.checkMatch();
    }
  }

  checkMatch() {
    setTimeout(() => {
      const [card1, card2] = this.flippedCards;
      
      if (card1.value === card2.value) {
        card1.isMatched = true;
        card2.isMatched = true;
        
        if (this.cards.every(c => c.isMatched)) {
          this.isGameOver = true;
          const username = this.authService.getCurrentUser();
          if (username) {
            this.storeService.updateMemoryBestScore(username, Math.max(0, 100 - this.moves));
          }
        }
      } else {
        card1.isFlipped = false;
        card2.isFlipped = false;
      }
      
      this.flippedCards = [];
    }, 1000);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
