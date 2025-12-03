import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { StoreService } from '../../services/store';

@Component({
  selector: 'app-chuck-norris',
  imports: [CommonModule],
  templateUrl: './chuck-norris.html',
  styleUrl: './chuck-norris.css',
})
export class ChuckNorrisComponent implements OnInit {
  joke = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private storeService: StoreService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getJoke();
  }

  getJoke(): void {
    this.http.get<any>('https://api.chucknorris.io/jokes/random').subscribe(data => {
      this.joke = data.value;
      const user = this.authService.getCurrentUser();
      if (user) {
        this.storeService.incrementChuckNorrisViews(user);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
