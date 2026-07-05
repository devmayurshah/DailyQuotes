import React, { useState, useMemo } from 'react';
import { useQuotes } from '../services/QuoteProvider';
import { QuoteService } from '../services/QuoteService';
import { QuoteCard } from '../widgets/QuoteCard';
import { AdMobBanner } from '../widgets/AdMobBanner';
import { Search as SearchIcon, X, Sparkles, Filter } from 'lucide-react';
import { CATEGORIES } from '../utils/constants';

export const SearchScreen: React.FC = () => {
  const { searchQuery, setSearchQuery } = useQuotes();
  const [selectedCatFilter, setSelectedCatFilter] = useState<string | null>(null);

  const searchResults = useMemo(() => {
    let results = QuoteService.searchQuotes(searchQuery);
    if (selectedCatFilter) {
      results = results.filter((q) => q.category === selectedCatFilter);
    }
    return results;
  }, [searchQuery, selectedCatFilter]);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header (Bento Style) */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-widest text-[#1A73E8] dark:text-blue-400">
          <Sparkles className="h-3.5 w-3.5 fill-current" />
          <span>Instant Search</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A73E8] dark:text-blue-400 mt-0.5">
          Search Quotes
        </h1>
      </div>

      {/* Bento Grid Search Bar */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-slate-400">
          <SearchIcon className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by keyword, topic, or author (e.g. Steve Jobs, success)..."
          className="w-full rounded-[2rem] bg-white dark:bg-[#121212] py-4 pl-14 pr-12 text-sm text-slate-900 dark:text-white placeholder-slate-400 shadow-sm border border-slate-200 dark:border-white/10 focus:border-[#1A73E8] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-slate-500 dark:text-slate-400 mb-2.5">
          <Filter className="h-3.5 w-3.5 text-[#1A73E8]" />
          <span>Filter by Category:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCatFilter(null)}
            className={`rounded-2xl px-3.5 py-1.5 text-xs font-bold transition-all font-mono shadow-xs ${
              selectedCatFilter === null
                ? 'bg-[#1A73E8] text-white'
                : 'bg-white dark:bg-[#121212] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCatFilter(selectedCatFilter === cat.id ? null : cat.id)}
              className={`rounded-2xl px-3.5 py-1.5 text-xs font-bold transition-all font-mono shadow-xs ${
                selectedCatFilter === cat.id
                  ? 'bg-[#1A73E8] text-white'
                  : 'bg-white dark:bg-[#121212] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Status */}
      {searchQuery.trim() && (
        <div className="flex items-center justify-between text-xs font-mono font-medium text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
          <span>Found {searchResults.length} matching quotes</span>
          <span>Query: "{searchQuery}"</span>
        </div>
      )}

      {/* Results List */}
      {searchQuery.trim() ? (
        searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((quote, index) => (
              <QuoteCard key={quote.id || index} quote={quote} index={index} />
            ))}
            <div className="pt-4">
              <AdMobBanner />
            </div>
          </div>
        ) : (
          <div className="my-12 py-8 text-center rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 p-8 shadow-sm">
            <p className="text-base font-bold text-slate-800 dark:text-slate-200">
              No quotes found for "{searchQuery}"
            </p>
            <p className="mt-1 text-xs text-slate-500 font-medium">
              Try searching for a different keyword or author name.
            </p>
          </div>
        )
      ) : (
        /* Initial Search Prompt State (Bento Style) */
        <div className="my-8 rounded-[2rem] sm:rounded-[2.5rem] bg-indigo-600 p-8 text-center text-white shadow-xl border border-indigo-500">
          <h3 className="text-lg font-extrabold tracking-tight">
            Search 500+ Inspirational Quotes
          </h3>
          <p className="mt-2 text-xs text-indigo-100 max-w-md mx-auto leading-relaxed font-medium">
            Type any word above to search across Motivation, Success, Leadership, Love, Happiness, and more. Instantly find the wisdom you need!
          </p>
        </div>
      )}
    </div>
  );
};
