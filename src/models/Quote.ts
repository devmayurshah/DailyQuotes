export interface Quote {
  id?: string;
  text: string;
  author: string;
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
  quoteCount: number;
  color: string;
  bgGradient: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AdMobConfig {
  bannerAdUnitId: string;
  nativeAdUnitId: string;
  interstitialAdUnitId: string;
  isTestMode: boolean;
}

export interface AppState {
  favorites: Quote[];
  themeMode: ThemeMode;
  searchQuery: string;
  selectedCategory: Category | null;
  currentScreen: 'home' | 'list' | 'favorites' | 'search' | 'settings';
  categoryOpenCount: number;
}
