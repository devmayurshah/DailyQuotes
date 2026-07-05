import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Quote } from '../models/Quote';
import { useQuotes } from '../services/QuoteProvider';
import { Heart, Copy, Share2, Quote as QuoteIcon, X, Sparkles } from 'lucide-react';

interface QuoteCardProps {
  quote: Quote;
  index: number;
  onDismiss?: (quoteId: string) => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, index, onDismiss }) => {
  const { isFavorite, toggleFavorite, showToast } = useQuotes();
  const favorited = isFavorite(quote.id);
  const [isDismissing, setIsDismissing] = useState(false);

  // Framer motion values for gesture tracking and visual feedback
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-7, 7]);

  // Transform opacities and scales for swipe indicators
  const rightOpacity = useTransform(x, [20, 100], [0, 1]);
  const rightScale = useTransform(x, [20, 100], [0.7, 1.1]);

  const leftOpacity = useTransform(x, [-20, -100], [0, 1]);
  const leftScale = useTransform(x, [-20, -100], [0.7, 1.1]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `"${quote.text}" — ${quote.author}`;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => showToast('Quote copied to clipboard! 📋'))
        .catch(() => showToast('Failed to copy text'));
    } else {
      showToast('Copy not supported in this environment');
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `"${quote.text}" — ${quote.author}\n\nShared via Daily Quotes App`;
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Inspiration',
          text: shareText,
          url: shareUrl,
        });
        showToast('Quote shared successfully! ✨');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
            showToast('Quote copied for sharing! ✨');
          } else {
            showToast('Share not supported in this browser');
          }
        }
      }
    } else {
      // Fallback to copy
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
        showToast('Quote copied for sharing! ✨');
      } else {
        showToast('Share not supported in this browser');
      }
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(quote);
  };

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 100;
    const velocityThreshold = 500;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      // Swiped Right -> Mark as favorite & persist in SharedPreferences
      if (!favorited) {
        toggleFavorite(quote);
      } else {
        showToast('Quote is already in your favorites ♥');
      }
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      // Swiped Left -> Dismiss from view
      setIsDismissing(true);
      showToast('Quote dismissed from view ✕');
      setTimeout(() => {
        if (quote.id && onDismiss) {
          onDismiss(quote.id);
        }
      }, 250);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={
        isDismissing
          ? { opacity: 0, x: -300, height: 0, scale: 0.8, marginBottom: 0 }
          : { opacity: 1, y: 0, height: 'auto' }
      }
      transition={{ duration: 0.3, delay: isDismissing ? 0 : Math.min(index * 0.04, 0.3) }}
      className="relative select-none"
    >
      {/* Background swipe action indicators revealed during drag */}
      <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-100 dark:bg-slate-900/60 flex items-center justify-between px-6 sm:px-8 pointer-events-none overflow-hidden border border-dashed border-slate-300 dark:border-slate-700">
        {/* Left Indicator (Swiping Right -> Favorite) */}
        <motion.div
          style={{ opacity: rightOpacity, scale: rightScale }}
          className="flex items-center gap-3 text-rose-500 font-bold font-mono"
        >
          <div className="p-3 bg-rose-500 text-white rounded-2xl shadow-lg flex items-center justify-center">
            <Heart className="h-6 w-6 fill-current animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm tracking-wider uppercase font-extrabold text-rose-600 dark:text-rose-400">
              Save Favorite ♥
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Add to your collection</span>
          </div>
        </motion.div>

        {/* Right Indicator (Swiping Left -> Dismiss) */}
        <motion.div
          style={{ opacity: leftOpacity, scale: leftScale }}
          className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-bold font-mono ml-auto"
        >
          <div className="flex flex-col text-right">
            <span className="text-sm tracking-wider uppercase font-extrabold text-slate-700 dark:text-slate-300">
              Dismiss ✕
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Remove from view</span>
          </div>
          <div className="p-3 bg-slate-700 text-white rounded-2xl shadow-lg flex items-center justify-center">
            <X className="h-6 w-6" />
          </div>
        </motion.div>
      </div>

      {/* Draggable Foreground Quote Card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.65}
        dragDirectionLock={true}
        style={{ x, rotate }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.02, zIndex: 30 }}
        className="group relative rounded-[2rem] sm:rounded-[2.5rem] bg-white dark:bg-[#121212] p-6 sm:p-8 shadow-sm hover:shadow-md border border-slate-200 dark:border-white/10 transition-shadow flex flex-col justify-between cursor-grab active:cursor-grabbing z-10"
      >
        {/* Decorative background quote mark */}
        <QuoteIcon className="absolute top-6 right-6 h-16 w-16 text-slate-100 dark:text-white/5 -z-0 pointer-events-none rotate-180 transition-transform group-hover:scale-105" />

        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-serif shadow-xs">
              "
            </div>
            {favorited && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-bold font-mono border border-rose-200 dark:border-rose-800/40 animate-fadeIn">
                <Heart className="h-3.5 w-3.5 fill-current" />
                <span>Saved</span>
              </span>
            )}
          </div>
          <p className="font-serif sm:font-sans text-lg sm:text-xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed tracking-tight">
            {quote.text}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full bg-[#1A73E8] dark:bg-blue-500 inline-block"></span>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1A73E8] dark:text-blue-400 font-mono">
              — {quote.author}
            </p>
          </div>
        </div>

        {/* Action Bar (Bento Grid Buttons) */}
        <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2 sm:gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 bg-slate-100 dark:bg-slate-800/80 h-11 sm:h-12 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all font-mono"
            title="Copy Quote"
          >
            <Copy className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <span>Copy</span>
          </button>

          <button
            onClick={handleShare}
            className="flex-1 bg-slate-100 dark:bg-slate-800/80 h-11 sm:h-12 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all font-mono"
            title="Share Quote"
          >
            <Share2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <span>Share</span>
          </button>

          <button
            onClick={handleFavoriteClick}
            className={`h-11 sm:h-12 px-4 sm:px-5 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm active:scale-95 transition-all font-mono ${
              favorited
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title={favorited ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart className={`h-4 w-4 ${favorited ? 'fill-current text-white' : 'text-slate-500 dark:text-slate-400'}`} />
            <span>{favorited ? 'Saved' : 'Favorite'}</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
