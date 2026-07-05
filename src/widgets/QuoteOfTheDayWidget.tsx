import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useQuotes } from '../services/QuoteProvider';
import { CATEGORIES } from '../utils/constants';
import { Quote as QuoteIcon, Flame, Heart, Share2, Copy, RefreshCw, Calendar, Check } from 'lucide-react';

export const QuoteOfTheDayWidget: React.FC = () => {
  const { dailyQuote, toggleFavorite, isFavorite, showToast, refreshDailyQuote } = useQuotes();
  const [isRotating, setIsRotating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!dailyQuote) return null;

  const isFav = isFavorite(dailyQuote.id);
  const category = CATEGORIES.find((c) => c.id === dailyQuote.category);
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  const handleCopy = () => {
    const textToCopy = `"${dailyQuote.text}" — ${dailyQuote.author}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('Quote copied to clipboard! 📋');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Daily Quote of the Day',
      text: `"${dailyQuote.text}" — ${dailyQuote.author}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('Quote shared successfully! 🚀');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleRefresh = () => {
    setIsRotating(true);
    refreshDailyQuote(true);
    setTimeout(() => setIsRotating(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#1A73E8] via-blue-600 to-indigo-700 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/15 border border-blue-400/30 flex flex-col justify-between"
    >
      {/* Background watermark icon */}
      <QuoteIcon className="absolute top-4 right-6 h-32 w-32 text-white/10 -z-0 pointer-events-none rotate-180" />

      {/* Top Bar: Badge, Date, and Actions */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-bold tracking-wider uppercase font-mono shadow-xs">
            <Flame className="h-3.5 w-3.5 text-amber-300 fill-current animate-pulse" />
            <span>Quote of the Day</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/20 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-blue-100 font-mono">
            <Calendar className="h-3 w-3 text-blue-200" />
            <span>{todayFormatted}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={handleCopy}
            className="rounded-2xl bg-white/15 hover:bg-white/25 p-2.5 backdrop-blur-md transition-all shadow-xs active:scale-95 text-white"
            title="Copy Quote"
            aria-label="Copy Quote"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
          </button>

          <button
            onClick={handleShare}
            className="rounded-2xl bg-white/15 hover:bg-white/25 p-2.5 backdrop-blur-md transition-all shadow-xs active:scale-95 text-white"
            title="Share Quote"
            aria-label="Share Quote"
          >
            <Share2 className="h-4 w-4" />
          </button>

          <button
            onClick={() => toggleFavorite(dailyQuote)}
            className={`rounded-2xl p-2.5 backdrop-blur-md transition-all shadow-xs active:scale-95 ${
              isFav ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            title="Save Favorite"
            aria-label="Save Favorite"
          >
            <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleRefresh}
            className="rounded-2xl bg-white/15 hover:bg-white/25 p-2.5 backdrop-blur-md transition-all shadow-xs active:scale-95 text-white ml-1"
            title="Generate Another Daily Quote"
            aria-label="Generate Another Daily Quote"
          >
            <RefreshCw className={`h-4 w-4 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Quote Body with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={dailyQuote.id || dailyQuote.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 my-2"
        >
          <p className="font-serif sm:font-sans text-lg sm:text-2xl font-semibold leading-relaxed text-white tracking-tight drop-shadow-xs">
            "{dailyQuote.text}"
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Footer: Author and Category Tag */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-100 font-mono">
          — {dailyQuote.author}
        </p>
        {category && (
          <span className="text-[11px] font-bold uppercase tracking-widest bg-white/20 text-white px-3 py-1 rounded-xl backdrop-blur-sm font-mono">
            {category.name}
          </span>
        )}
      </div>
    </motion.div>
  );
};
