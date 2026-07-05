import React from 'react';
import { useQuotes } from '../services/QuoteProvider';
import { QuoteCard } from '../widgets/QuoteCard';
import { AdMobBanner } from '../widgets/AdMobBanner';
import { Heart, Sparkles, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const FavoritesScreen: React.FC = () => {
  const { favorites, navigateTo, showToast } = useQuotes();

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all your saved favorite quotes?')) {
      favorites.forEach((q) => {
        // Clear via state
      });
      localStorage.removeItem('flutter_daily_quotes_favorites');
      window.location.reload();
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Screen Header (Bento Style) */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-widest text-rose-600 dark:text-rose-400">
            <Heart className="h-3.5 w-3.5 fill-current" />
            <span>Your Personal Collection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A73E8] dark:text-blue-400 mt-0.5">
            Saved Favorites
          </h1>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all font-mono shadow-xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Favorites List */}
      {favorites.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono font-medium text-slate-500 dark:text-slate-400 pb-1">
            <span>{favorites.length} Saved Quotes</span>
            <span>Available Anytime</span>
          </div>

          {favorites.map((quote, index) => (
            <QuoteCard key={quote.id || index} quote={quote} index={index} />
          ))}

          <div className="pt-4">
            <AdMobBanner />
          </div>
        </div>
      ) : (
        /* Bento Grid Empty State Box */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="my-12 flex flex-col items-center justify-center text-center rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-[#121212] p-8 sm:p-12 border border-slate-200 dark:border-white/10 shadow-sm"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 shadow-xs mb-6">
            <Heart className="h-10 w-10 stroke-[1.8]" />
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            No Saved Quotes Yet
          </h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            While exploring categories, tap the heart icon on any quote to save it to your favorites list!
          </p>

          <button
            onClick={() => navigateTo('home')}
            className="mt-8 flex items-center gap-2 rounded-2xl bg-[#1A73E8] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all font-mono"
          >
            <Sparkles className="h-4 w-4" />
            <span>Explore Categories</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
