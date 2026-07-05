import React from 'react';
import { useQuotes } from '../services/QuoteProvider';
import { CATEGORIES } from '../utils/constants';
import { CategoryCard } from '../widgets/CategoryCard';
import { QuoteOfTheDayWidget } from '../widgets/QuoteOfTheDayWidget';
import { motion } from 'motion/react';
import { Sparkles, Compass, Trophy } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { navigateTo } = useQuotes();

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top App Header (Bento Grid Style) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A73E8] dark:text-blue-400 tracking-tight">
            Daily Quotes
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-xs sm:text-sm mt-0.5">
            Daily Inspiration & Motivation
          </p>
        </div>
        <div className="flex items-center gap-2.5 ml-auto">
          <button
            onClick={() => navigateTo('search')}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-[#121212] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs border border-slate-200 dark:border-white/10"
            aria-label="Search quotes"
          >
            <svg className="w-4 h-4 text-[#1A73E8] dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs font-bold font-mono">Search Quotes</span>
          </button>
        </div>
      </div>

      {/* Quote of the Day Hero Widget */}
      <QuoteOfTheDayWidget />

      {/* Category Section Header */}
      <div className="pt-2 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Categories
          </h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-0.5 font-mono">
            Explore 500+ Quotes
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-[#1A73E8] dark:text-blue-400 bg-white dark:bg-[#121212] px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs">
          10 Topics
        </span>
      </div>

      {/* Categories Card Grid Layout */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 pb-4">
        {CATEGORIES.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </div>
  );
};
