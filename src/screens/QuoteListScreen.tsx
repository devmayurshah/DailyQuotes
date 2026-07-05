import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useQuotes } from '../services/QuoteProvider';
import { QuoteService } from '../services/QuoteService';
import { QuoteCard } from '../widgets/QuoteCard';
import { AdMobBanner } from '../widgets/AdMobBanner';
import { AdMobNative } from '../widgets/AdMobNative';
import { ArrowLeft, Sparkles, Filter, Check } from 'lucide-react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';

export const QuoteListScreen: React.FC = () => {
  const { selectedCategory, navigateTo } = useQuotes();
  const [displayCount, setDisplayCount] = useState<number>(15);
  const [sortBy, setSortBy] = useState<'default' | 'author' | 'short'>('default');
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const loaderRef = useRef<HTMLDivElement>(null);

  const categoryQuotes = useMemo(() => {
    if (!selectedCategory) return [];
    const quotes = QuoteService.getQuotesByCategory(selectedCategory.id);
    if (sortBy === 'author') {
      return [...quotes].sort((a, b) => a.author.localeCompare(b.author));
    }
    if (sortBy === 'short') {
      return [...quotes].sort((a, b) => a.text.length - b.text.length);
    }
    return quotes;
  }, [selectedCategory, sortBy]);

  const visibleQuotes = useMemo(() => {
    return categoryQuotes
      .filter((q) => !dismissedIds.has(q.id || ''))
      .slice(0, displayCount);
  }, [categoryQuotes, displayCount, dismissedIds]);

  const handleDismissQuote = useCallback((quoteId: string) => {
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.add(quoteId);
      return next;
    });
  }, []);

  // Infinite Scrolling: Auto load 10 more quotes when scrolled to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount((prev) => Math.min(prev + 10, categoryQuotes.length));
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [categoryQuotes.length]);

  if (!selectedCategory) {
    return (
      <div className="p-6 text-center">
        <p className="text-slate-500">No category selected.</p>
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const IconComponent = (Icons as Record<string, React.ElementType>)[selectedCategory.iconName] || Icons.Sparkles;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Bar with Back Button and Category Header (Bento Style) */}
      <div className="sticky top-0 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3.5 bg-[#F0F4F8]/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white dark:bg-[#121212] text-slate-700 dark:text-slate-200 shadow-xs border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
            aria-label="Back to categories"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr ${selectedCategory.bgGradient} text-white shadow-xs`}>
              <IconComponent className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {selectedCategory.name}
              </h1>
              <p className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                {categoryQuotes.length} Curated Quotes
              </p>
            </div>
          </div>
        </div>

        {/* Filter / Sort Button */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-1.5 rounded-2xl bg-white dark:bg-[#121212] px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-mono"
          >
            <Filter className="h-3.5 w-3.5 text-[#1A73E8]" />
            <span className="hidden sm:inline">Sort:</span>
            <span className="capitalize">{sortBy}</span>
          </button>

          {showSortMenu && (
            <div className="absolute right-0 mt-2 w-44 rounded-3xl bg-white dark:bg-[#1E293B] p-2 shadow-2xl border border-slate-200 dark:border-slate-700 z-50">
              {(['default', 'author', 'short'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSortBy(opt);
                    setShowSortMenu(false);
                  }}
                  className={`w-full flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-xs font-medium transition-colors ${
                    sortBy === opt
                      ? 'bg-blue-50 text-[#1A73E8] dark:bg-blue-950/60 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="capitalize">{opt === 'default' ? 'Default Order' : opt === 'author' ? 'By Author' : 'Shortest First'}</span>
                  {sortBy === opt && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Swipe Hint Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 p-4 sm:p-5 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#1A73E8] text-white rounded-2xl shadow-xs shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono uppercase tracking-wider">
              Gesture Swipe Controls Active
            </h3>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              Swipe right <span className="text-rose-500 font-bold">♥</span> on any card to save to favorites, or swipe left <span className="text-slate-500 font-bold">✕</span> to dismiss from view.
            </p>
          </div>
        </div>
        {dismissedIds.size > 0 && (
          <button
            onClick={() => setDismissedIds(new Set())}
            className="px-3.5 py-2 rounded-2xl bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 text-xs font-bold text-[#1A73E8] dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs whitespace-nowrap font-mono transition-all self-end sm:self-center shrink-0"
          >
            Restore Dismissed ({dismissedIds.size})
          </button>
        )}
      </div>

      {/* Quote Cards List with Native Ads inserted every 10 quotes */}
      {visibleQuotes.length > 0 ? (
        <div className="space-y-4">
          {visibleQuotes.map((quote, index) => (
            <React.Fragment key={quote.id || index}>
              <QuoteCard quote={quote} index={index} onDismiss={handleDismissQuote} />
              
              {/* AdMob Native Ad Placeholder after every 10 quotes */}
              {(index + 1) % 10 === 0 && (
                <AdMobNative index={index + 1} />
              )}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className="my-12 py-10 text-center rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 p-8 shadow-sm">
          <p className="text-base font-bold text-slate-800 dark:text-slate-200">
            All visible quotes in this category have been dismissed!
          </p>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            You dismissed {dismissedIds.size} quotes from this view.
          </p>
          <button
            onClick={() => setDismissedIds(new Set())}
            className="mt-6 px-6 py-3 rounded-2xl bg-[#1A73E8] text-white font-bold font-mono text-xs shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all"
          >
            Restore All Quotes
          </button>
        </div>
      )}

      {/* Infinite Scroll Loader Target */}
      {displayCount < categoryQuotes.length && (
        <div ref={loaderRef} className="py-8 flex flex-col items-center justify-center text-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          <span className="mt-2 text-xs font-mono text-slate-400">Loading more inspirational quotes...</span>
        </div>
      )}

      {displayCount >= categoryQuotes.length && categoryQuotes.length > 0 && (
        <div className="py-6 text-center text-xs font-mono text-slate-400 dark:text-slate-500">
          ✨ You have viewed all {categoryQuotes.length} quotes in {selectedCategory.name}!
        </div>
      )}

      {/* AdMob Banner Placeholder at the bottom of the screen */}
      <div className="pt-4">
        <AdMobBanner />
      </div>
    </div>
  );
};
