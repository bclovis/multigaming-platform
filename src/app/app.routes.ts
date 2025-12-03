import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { ChuckNorrisComponent } from './pages/chuck-norris/chuck-norris';
import { MemoryComponent } from './pages/memory/memory';
import { GuessComponent } from './pages/guess/guess';
import { ProfileComponent } from './pages/profile/profile';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'chuck-norris',
    component: ChuckNorrisComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'memory',
    component: MemoryComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'guess',
    component: GuessComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    canActivate: [AuthGuard]
  }
];