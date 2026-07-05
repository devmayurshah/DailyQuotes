import { Quote, ThemeMode } from '../models/Quote';
import { STORAGE_KEY_FAVORITES, STORAGE_KEY_THEME, STORAGE_KEY_DAILY_QUOTE } from '../utils/constants';

export interface DailyQuoteStorageData {
  date: string; // YYYY-MM-DD format
  quote: Quote;
  history: string[]; // List of quote IDs shown in recent days
}

/**
 * Simulates Flutter's SharedPreferences for offline persistence.
 * Stores favorites and theme preference in localStorage.
 */
export class StorageService {
  static getFavorites(): Quote[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_FAVORITES);
      if (!data) return [];
      return JSON.parse(data) as Quote[];
    } catch (error) {
      console.error('Failed to read favorites from SharedPreferences:', error);
      return [];
    }
  }

  static saveFavorites(favorites: Quote[]): boolean {
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error('Failed to write favorites to SharedPreferences:', error);
      return false;
    }
  }

  static getThemeMode(): ThemeMode {
    try {
      const mode = localStorage.getItem(STORAGE_KEY_THEME);
      if (mode === 'light' || mode === 'dark' || mode === 'system') {
        return mode;
      }
      return 'system';
    } catch {
      return 'system';
    }
  }

  static saveThemeMode(mode: ThemeMode): boolean {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, mode);
      return true;
    } catch {
      return false;
    }
  }

  static getDailyQuoteData(): DailyQuoteStorageData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY_DAILY_QUOTE);
      if (!data) return null;
      return JSON.parse(data) as DailyQuoteStorageData;
    } catch (error) {
      console.error('Failed to read daily quote from SharedPreferences:', error);
      return null;
    }
  }

  static saveDailyQuoteData(data: DailyQuoteStorageData): boolean {
    try {
      localStorage.setItem(STORAGE_KEY_DAILY_QUOTE, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save daily quote to SharedPreferences:', error);
      return false;
    }
  }
}
