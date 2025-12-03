import { Injectable } from '@angular/core';

export interface UserStats{
  username : String;
  chuckNorrisViews: number;
  memoryBestScore: number;
  guessBestScore: number;
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly STATS_KEY = 'users-stats';

  constructor() { }
  
  private getAllStats(): UserStats[] {
  const data = localStorage.getItem(this.STATS_KEY);
  return data ? JSON.parse(data) : [];
  }

  private saveAllStats(stats: UserStats[]): void {
  localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
  }

  getUserStats(username: string): UserStats {
  const allStats = this.getAllStats();
  const userStats = allStats.find(s => s.username === username);

  if (userStats) {
    return userStats;
  }

  const newStats: UserStats = {
    username,
    chuckNorrisViews: 0,
    memoryBestScore: 0,
    guessBestScore: 0
  };
  allStats.push(newStats);
  this.saveAllStats(allStats);
  return newStats;
}

incrementChuckNorrisViews(username: string): void {
  const allStats = this.getAllStats();
  const userStats = allStats.find(s => s.username === username);

  if (userStats) {
    userStats.chuckNorrisViews++;
    this.saveAllStats(allStats);
  }
}

updateMemoryBestScore(username: string, score: number): void {
  const allStats = this.getAllStats();
  const userStats = allStats.find(s => s.username === username);

  if (userStats && score > userStats.memoryBestScore) {
    userStats.memoryBestScore = score;
    this.saveAllStats(allStats);
  }
}

updateGuessBestScore(username: string, score: number): void {
  const allStats = this.getAllStats();
  const userStats = allStats.find(s => s.username === username);

  if (userStats && score > userStats.guessBestScore) {
    userStats.guessBestScore = score;
    this.saveAllStats(allStats);
  }
}

getLeaderboard(): UserStats[] {
  return this.getAllStats();
}

}