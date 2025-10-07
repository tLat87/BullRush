import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameStats } from '../data/gameData';

const STATS_KEY = 'bull_rush_stats';

export class StatsService {
  static async getStats(): Promise<GameStats> {
    try {
      const statsJson = await AsyncStorage.getItem(STATS_KEY);
      if (statsJson) {
        return JSON.parse(statsJson);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
    
    // Return default stats if none exist
    return {
      totalScore: 0,
      levelsCompleted: 0,
      bullRushCompleted: false,
      bullRushBestScore: 0,
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      averageTime: 0,
    };
  }

  static async saveStats(stats: GameStats): Promise<void> {
    try {
      await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  }

  static async updateLevelCompletion(level: number, score: number): Promise<GameStats> {
    const stats = await this.getStats();
    
    // Update level completion
    if (level > stats.levelsCompleted) {
      stats.levelsCompleted = level;
    }
    
    // Update total score
    stats.totalScore += score;
    
    await this.saveStats(stats);
    return stats;
  }

  static async updateBullRushCompletion(score: number): Promise<GameStats> {
    const stats = await this.getStats();
    
    stats.bullRushCompleted = true;
    if (score > stats.bullRushBestScore) {
      stats.bullRushBestScore = score;
    }
    
    stats.totalScore += score;
    
    await this.saveStats(stats);
    return stats;
  }

  static async updateQuestionResult(
    isCorrect: boolean, 
    responseTime: number
  ): Promise<GameStats> {
    const stats = await this.getStats();
    
    stats.totalQuestionsAnswered += 1;
    if (isCorrect) {
      stats.correctAnswers += 1;
    }
    
    // Update average response time
    const totalTime = stats.averageTime * (stats.totalQuestionsAnswered - 1) + responseTime;
    stats.averageTime = totalTime / stats.totalQuestionsAnswered;
    
    await this.saveStats(stats);
    return stats;
  }

  static async resetStats(): Promise<void> {
    const defaultStats: GameStats = {
      totalScore: 0,
      levelsCompleted: 0,
      bullRushCompleted: false,
      bullRushBestScore: 0,
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      averageTime: 0,
    };
    
    await this.saveStats(defaultStats);
  }
}

