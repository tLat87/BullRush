import AsyncStorage from '@react-native-async-storage/async-storage';
import { DreamStats } from '../BullRushData/gameData';

const STATS_KEY = 'dream_catcher_stats';

export class StatsService {
  static async getStats(): Promise<DreamStats> {
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
      totalDreams: 0,
      lucidDreams: 0,
      dreamRecallRate: 0,
      currentStreak: 0,
      longestStreak: 0,
      techniquesCompleted: 0,
      favoriteCategory: 'lucid-dreaming',
      averageDreamLength: 0,
      lastDreamDate: '',
      realityChecksToday: 0,
    };
  }

  static async saveStats(stats: DreamStats): Promise<void> {
    try {
      await AsyncStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  }

  static async updateDreamRecord(
    isLucid: boolean,
    category: string
  ): Promise<DreamStats> {
    const stats = await this.getStats();
    const today = new Date().toISOString().split('T')[0];
    
    // Update dream count
    stats.totalDreams += 1;
    if (isLucid) {
      stats.lucidDreams += 1;
    }
    
    // Update recall rate
    stats.dreamRecallRate = (stats.totalDreams / 30) * 100; // Assuming 30 days
    
    // Update streak
    if (stats.lastDreamDate === today) {
      // Already recorded today, no streak change
    } else if (stats.lastDreamDate === this.getYesterday()) {
      // Consecutive day
      stats.currentStreak += 1;
    } else {
      // Streak broken
      stats.currentStreak = 1;
    }
    
    if (stats.currentStreak > stats.longestStreak) {
      stats.longestStreak = stats.currentStreak;
    }
    
    // Update last dream date
    stats.lastDreamDate = today;
    
    await this.saveStats(stats);
    return stats;
  }

  static async updateTechniqueCompletion(techniqueId: number): Promise<DreamStats> {
    const stats = await this.getStats();
    stats.techniquesCompleted += 1;
    await this.saveStats(stats);
    return stats;
  }

  static async updateRealityCheck(): Promise<DreamStats> {
    const stats = await this.getStats();
    stats.realityChecksToday += 1;
    await this.saveStats(stats);
    return stats;
  }

  static async updateFavoriteCategory(category: string): Promise<DreamStats> {
    const stats = await this.getStats();
    stats.favoriteCategory = category;
    await this.saveStats(stats);
    return stats;
  }

  private static getYesterday(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
  }

  static async resetStats(): Promise<void> {
    const defaultStats: DreamStats = {
      totalDreams: 0,
      lucidDreams: 0,
      dreamRecallRate: 0,
      currentStreak: 0,
      longestStreak: 0,
      techniquesCompleted: 0,
      favoriteCategory: 'lucid-dreaming',
      averageDreamLength: 0,
      lastDreamDate: '',
      realityChecksToday: 0,
    };
    
    await this.saveStats(defaultStats);
  }
}

