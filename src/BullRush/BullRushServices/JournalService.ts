import AsyncStorage from '@react-native-async-storage/async-storage';
import { journalSeedEntries, JournalEntry } from '../BullRushData/appContent';

const JOURNAL_KEY = 'bullrush_journal_entries';

export class JournalService {
  static async getEntries(): Promise<JournalEntry[]> {
    try {
      const stored = await AsyncStorage.getItem(JOURNAL_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      await AsyncStorage.setItem(JOURNAL_KEY, JSON.stringify(journalSeedEntries));
      return journalSeedEntries;
    } catch (error) {
      console.error('Journal load error', error);
      return journalSeedEntries;
    }
  }

  static async addEntry(entry: Omit<JournalEntry, 'id' | 'createdAt'>): Promise<JournalEntry[]> {
    const current = await this.getEntries();
    const next: JournalEntry = {
      ...entry,
      id: `entry-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [next, ...current];
    await AsyncStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
    return updated;
  }

  static async toggleFavorite(id: string): Promise<JournalEntry[]> {
    const current = await this.getEntries();
    const updated = current.map((entry) =>
      entry.id === id ? { ...entry, favorite: !entry.favorite } : entry
    );
    await AsyncStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
    return updated;
  }

  static async clearAll() {
    await AsyncStorage.removeItem(JOURNAL_KEY);
  }
}

