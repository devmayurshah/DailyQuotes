import { Quote } from '../models/Quote';
import { StorageService } from './StorageService';
import motivationQuotes from '../assets/quotes/motivation.json';
import successQuotes from '../assets/quotes/success.json';
import lifeQuotes from '../assets/quotes/life.json';
import happinessQuotes from '../assets/quotes/happiness.json';
import loveQuotes from '../assets/quotes/love.json';
import friendshipQuotes from '../assets/quotes/friendship.json';
import businessQuotes from '../assets/quotes/business.json';
import studyQuotes from '../assets/quotes/study.json';
import leadershipQuotes from '../assets/quotes/leadership.json';
import positiveThinkingQuotes from '../assets/quotes/positive_thinking.json';

type RawQuote = { text: string; author: string };

const categoryQuotesMap: Record<string, RawQuote[]> = {
  motivation: motivationQuotes as RawQuote[],
  success: successQuotes as RawQuote[],
  life: lifeQuotes as RawQuote[],
  happiness: happinessQuotes as RawQuote[],
  love: loveQuotes as RawQuote[],
  friendship: friendshipQuotes as RawQuote[],
  business: businessQuotes as RawQuote[],
  study: studyQuotes as RawQuote[],
  leadership: leadershipQuotes as RawQuote[],
  positive_thinking: positiveThinkingQuotes as RawQuote[],
};

/**
 * Service for offline quote retrieval, filtering, and search.
 * All quotes are loaded from local assets JSON files.
 */
export class QuoteService {
  private static allQuotesCache: Quote[] | null = null;

  /**
   * Returns all quotes for a specific category ID.
   */
  static getQuotesByCategory(categoryId: string): Quote[] {
    const rawQuotes = categoryQuotesMap[categoryId] || [];
    return rawQuotes.map((q, index) => ({
      id: `${categoryId}_${index}`,
      text: q.text,
      author: q.author || 'Anonymous',
      category: categoryId,
    }));
  }

  /**
   * Returns all 500+ quotes across all categories.
   */
  static getAllQuotes(): Quote[] {
    if (this.allQuotesCache) return this.allQuotesCache;

    const all: Quote[] = [];
    Object.keys(categoryQuotesMap).forEach((catId) => {
      const quotes = this.getQuotesByCategory(catId);
      all.push(...quotes);
    });

    this.allQuotesCache = all;
    return all;
  }

  /**
   * Offline search across all categories by text or author.
   */
  static searchQuotes(query: string): Quote[] {
    if (!query.trim()) return [];
    const lower = query.toLowerCase().trim();
    const all = this.getAllQuotes();
    
    return all.filter(
      (q) =>
        q.text.toLowerCase().includes(lower) ||
        q.author.toLowerCase().includes(lower)
    );
  }

  /**
   * Returns the quote of the day, randomly selected from all categories.
   * Stores the date and selected quote locally in SharedPreferences/localStorage
   * to ensure the same quote isn't shown multiple days in a row without a significant number of quotes available.
   */
  static getDailyQuote(forceNew = false): Quote {
    const all = this.getAllQuotes();
    if (!all.length) {
      return { id: 'fallback', text: 'Inspiration is everywhere.', author: 'Anonymous', category: 'motivation' };
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const storedData = StorageService.getDailyQuoteData();

    // If we have a stored quote for today and not forcing new, return it
    if (!forceNew && storedData && storedData.date === todayStr && storedData.quote) {
      return storedData.quote;
    }

    // Get recent history of shown quotes (last 150 quotes)
    const history = storedData?.history || [];

    // Filter available quotes to avoid repeating recently shown ones
    let available = all.filter((q) => q.id && !history.includes(q.id));
    if (available.length < 10) {
      // If we're running low on unshown quotes, reset history or fall back to all quotes
      available = all;
    }

    // Randomly select a quote from available candidates
    const randomIndex = Math.floor(Math.random() * available.length);
    const selected = available[randomIndex] || all[0];

    // Update history
    const newHistory = [selected.id || '', ...history].slice(0, 150);

    // Persist to local storage
    StorageService.saveDailyQuoteData({
      date: todayStr,
      quote: selected,
      history: newHistory,
    });

    return selected;
  }
}
