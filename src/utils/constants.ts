import { Category, AdMobConfig } from '../models/Quote';

export const CATEGORIES: Category[] = [
  {
    id: 'motivation',
    name: 'Motivation',
    description: 'Fuel your fire and push past your limits',
    iconName: 'Zap',
    quoteCount: 40,
    color: '#2563EB', // Material 3 Blue
    bgGradient: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'success',
    name: 'Success',
    description: 'Wisdom on achieving excellence and victory',
    iconName: 'Trophy',
    quoteCount: 40,
    color: '#D97706', // Amber Gold
    bgGradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'life',
    name: 'Life',
    description: 'Reflections on the beauty and journey of living',
    iconName: 'Compass',
    quoteCount: 40,
    color: '#059669', // Emerald Green
    bgGradient: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'happiness',
    name: 'Happiness',
    description: 'Finding joy, gratitude, and peace in every day',
    iconName: 'Smile',
    quoteCount: 40,
    color: '#E11D48', // Rose Pink
    bgGradient: 'from-rose-500 to-pink-600',
  },
  {
    id: 'love',
    name: 'Love',
    description: 'Deep sentiments of affection and human connection',
    iconName: 'Heart',
    quoteCount: 40,
    color: '#DC2626', // Red
    bgGradient: 'from-red-500 to-rose-700',
  },
  {
    id: 'friendship',
    name: 'Friendship',
    description: 'Celebrating companionship and loyal bonds',
    iconName: 'Users',
    quoteCount: 40,
    color: '#7C3AED', // Violet Purple
    bgGradient: 'from-violet-600 to-purple-700',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Entrepreneurial mindset, leadership, and strategy',
    iconName: 'Briefcase',
    quoteCount: 40,
    color: '#0284C7', // Sky Blue
    bgGradient: 'from-sky-600 to-blue-800',
  },
  {
    id: 'study',
    name: 'Study',
    description: 'Knowledge, education, and the pursuit of wisdom',
    iconName: 'BookOpen',
    quoteCount: 40,
    color: '#4F46E5', // Indigo
    bgGradient: 'from-indigo-600 to-blue-700',
  },
  {
    id: 'leadership',
    name: 'Leadership',
    description: 'Guiding others with integrity and vision',
    iconName: 'Award',
    quoteCount: 40,
    color: '#B45309', // Deep Amber
    bgGradient: 'from-amber-600 to-yellow-700',
  },
  {
    id: 'positive_thinking',
    name: 'Positive Thinking',
    description: 'Optimism, hope, and maintaining bright attitudes',
    iconName: 'Sun',
    quoteCount: 40,
    color: '#EA580C', // Orange
    bgGradient: 'from-orange-500 to-amber-600',
  },
];

export const GOOGLE_TEST_ADMOB: AdMobConfig = {
  bannerAdUnitId: 'ca-app-pub-3940256099942544/6300978111',
  nativeAdUnitId: 'ca-app-pub-3940256099942544/2247696110',
  interstitialAdUnitId: 'ca-app-pub-3940256099942544/1033173712',
  isTestMode: true,
};

export const APP_VERSION = 'Version 1.0.0';
export const APP_NAME = 'Daily Quotes';
export const STORAGE_KEY_FAVORITES = 'flutter_daily_quotes_favorites';
export const STORAGE_KEY_THEME = 'flutter_daily_quotes_theme_mode';
export const STORAGE_KEY_DAILY_QUOTE = 'flutter_daily_quotes_daily_quote_data';
