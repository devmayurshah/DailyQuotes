import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { Quote, Category, ThemeMode } from '../models/Quote';
import { StorageService } from './StorageService';
import { QuoteService } from './QuoteService';
import { AdMobService } from './AdMobService';
import { getEffectiveTheme } from '../utils/theme';
import { CATEGORIES } from '../utils/constants';

interface QuoteContextType {
  favorites: Quote[];
  themeMode: ThemeMode;
  effectiveTheme: 'light' | 'dark';
  currentScreen: 'home' | 'list' | 'favorites' | 'search' | 'settings';
  selectedCategory: Category | null;
  searchQuery: string;
  toastMessage: string | null;
  showInterstitialAd: boolean;
  showExitPrompt: boolean;
  dailyQuote: Quote;
  refreshDailyQuote: (forceNew?: boolean) => void;
  toggleFavorite: (quote: Quote) => void;
  isFavorite: (quoteId: string | undefined) => boolean;
  setThemeMode: (mode: ThemeMode) => void;
  navigateTo: (screen: 'home' | 'list' | 'favorites' | 'search' | 'settings', category?: Category) => void;
  setSearchQuery: (query: string) => void;
  showToast: (message: string) => void;
  closeInterstitial: () => void;
  closeExitPrompt: () => void;
  executeExitApp: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Quote[]>(() => StorageService.getFavorites());
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => StorageService.getThemeMode());
  const [currentScreen, setCurrentScreen] = useState<'home' | 'list' | 'favorites' | 'search' | 'settings'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showInterstitialAd, setShowInterstitialAd] = useState<boolean>(false);
  const [showExitPrompt, setShowExitPrompt] = useState<boolean>(false);
  const [dailyQuote, setDailyQuote] = useState<Quote>(() => QuoteService.getDailyQuote());

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  }, []);

  const lastBackPressRef = useRef<number>(0);
  const currentScreenRef = useRef(currentScreen);
  const selectedCategoryRef = useRef(selectedCategory);
  const showExitPromptRef = useRef(showExitPrompt);

  useEffect(() => {
    currentScreenRef.current = currentScreen;
  }, [currentScreen]);

  useEffect(() => {
    selectedCategoryRef.current = selectedCategory;
  }, [selectedCategory]);

  useEffect(() => {
    showExitPromptRef.current = showExitPrompt;
  }, [showExitPrompt]);

  const refreshDailyQuote = useCallback((forceNew = false) => {
    const newQuote = QuoteService.getDailyQuote(forceNew);
    setDailyQuote(newQuote);
    if (forceNew) {
      showToast('Generated fresh Quote of the Day! ✨');
    }
  }, []);

  useEffect(() => {
    AdMobService.initialize();

    // Initialize browser history stack with a root and trap state so back clicks don't close app
    try {
      window.history.replaceState({ screen: 'home', root: true }, '', '');
      window.history.pushState({ screen: 'home', trap: true }, '', '');
    } catch (e) {}
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;

      // 1. If Exit Prompt modal is visible, pressing back cancels/closes the modal
      if (showExitPromptRef.current) {
        setShowExitPrompt(false);
        try {
          window.history.pushState({ screen: 'home', trap: true }, '', '');
        } catch (e) {}
        return;
      }

      // 2. If we popped to a state representing another valid screen in history
      if (state && state.screen && state.screen !== 'home') {
        setCurrentScreen(state.screen);
        if (state.categoryId) {
          const cat = CATEGORIES.find((c) => c.id === state.categoryId);
          if (cat) setSelectedCategory(cat);
        }
        return;
      }

      // 3. If we are currently NOT on home (e.g. viewing quotes list, favorites, search, settings),
      // single back click returns to the previous menu (home)
      if (currentScreenRef.current !== 'home') {
        setCurrentScreen('home');
        setSelectedCategory(null);
        try {
          window.history.pushState({ screen: 'home', trap: true }, '', '');
        } catch (e) {}
        return;
      }

      // 4. Otherwise, user is currently ON home and clicked back!
      const now = Date.now();
      const timeDiff = now - lastBackPressRef.current;

      if (timeDiff > 2500 || lastBackPressRef.current === 0) {
        // First back click on home: warn user and re-push trap state
        lastBackPressRef.current = now;
        showToast('Press back again to exit');
        try {
          window.history.pushState({ screen: 'home', trap: true }, '', '');
        } catch (e) {}
      } else {
        // Double back click within 2.5s: prompt to exit app!
        lastBackPressRef.current = 0;
        setShowExitPrompt(true);
        try {
          window.history.pushState({ screen: 'home', trap: true }, '', '');
        } catch (e) {}
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [showToast]);

  // Update document body dark/light classes
  const effectiveTheme = getEffectiveTheme(themeMode);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (effectiveTheme === 'dark') {
        root.classList.add('dark');
        document.body.style.backgroundColor = '#0B0F19';
      } else {
        root.classList.remove('dark');
        document.body.style.backgroundColor = '#F8FAFC';
      }
    }
  }, [effectiveTheme]);

  const toggleFavorite = useCallback((quote: Quote) => {
    if (!quote.id) return;
    setFavorites((prev) => {
      const exists = prev.some((q) => q.id === quote.id);
      let updated: Quote[];
      if (exists) {
        updated = prev.filter((q) => q.id !== quote.id);
        showToast('Removed from favorites');
      } else {
        updated = [quote, ...prev];
        showToast('Added to favorites ♥');
      }
      StorageService.saveFavorites(updated);
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (quoteId: string | undefined) => {
      if (!quoteId) return false;
      return favorites.some((q) => q.id === quoteId);
    },
    [favorites]
  );

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    StorageService.saveThemeMode(mode);
    showToast(`Theme changed to ${mode}`);
  }, []);

  const navigateTo = useCallback(
    (screen: 'home' | 'list' | 'favorites' | 'search' | 'settings', category?: Category) => {
      if (screen === currentScreenRef.current && (!category || category.id === selectedCategoryRef.current?.id)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (screen === 'list' && category) {
        setSelectedCategory(category);
        // Trigger AdMob Interstitial every 5th category opened
        AdMobService.onCategoryOpened(() => {
          setShowInterstitialAd(true);
        });
      }
      setCurrentScreen(screen);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        window.history.pushState({ screen, categoryId: category?.id }, '', '');
      } catch (e) {}
    },
    []
  );

  const closeInterstitial = useCallback(() => {
    setShowInterstitialAd(false);
  }, []);

  const closeExitPrompt = useCallback(() => {
    setShowExitPrompt(false);
  }, []);

  const executeExitApp = useCallback(() => {
    setShowExitPrompt(false);
    showToast('Exiting application...');

    setTimeout(() => {
      // 1. Android WebView / Javascript bridges
      if ((window as any).AndroidInterface && typeof (window as any).AndroidInterface.exitApp === 'function') {
        (window as any).AndroidInterface.exitApp();
        return;
      }
      if ((window as any).Android && typeof (window as any).Android.close === 'function') {
        (window as any).Android.close();
        return;
      }
      if ((window as any).flutter_inappwebview && typeof (window as any).flutter_inappwebview.callHandler === 'function') {
        (window as any).flutter_inappwebview.callHandler('exitApp');
        return;
      }
      // 2. Cordova / Capacitor / PhoneGap
      if ((navigator as any).app && typeof (navigator as any).app.exitApp === 'function') {
        (navigator as any).app.exitApp();
        return;
      }
      // 3. Browser window.close()
      try {
        window.close();
      } catch (e) {}

      // 4. Force browser history back beyond trap states
      try {
        window.history.go(-10);
      } catch (e) {}

      // 5. Ultimate fallback if window.close() is blocked by browser security
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 300);
    }, 200);
  }, [showToast]);

  return (
    <QuoteContext.Provider
      value={{
        favorites,
        themeMode,
        effectiveTheme,
        currentScreen,
        selectedCategory,
        searchQuery,
        toastMessage,
        showInterstitialAd,
        showExitPrompt,
        dailyQuote,
        refreshDailyQuote,
        toggleFavorite,
        isFavorite,
        setThemeMode,
        navigateTo,
        setSearchQuery,
        showToast,
        closeInterstitial,
        closeExitPrompt,
        executeExitApp,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuotes = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuotes must be used within a QuoteProvider');
  }
  return context;
};
