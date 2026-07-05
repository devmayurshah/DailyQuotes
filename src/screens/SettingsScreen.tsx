import React, { useState } from 'react';
import { useQuotes } from '../services/QuoteProvider';
import { APP_VERSION, APP_NAME, GOOGLE_TEST_ADMOB } from '../utils/constants';
import { Moon, Sun, Monitor, Star, Share2, Info, ShieldCheck, Check, Award, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SettingsScreen: React.FC = () => {
  const { themeMode, setThemeMode, showToast } = useQuotes();
  const [showRateModal, setShowRateModal] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number>(5);

  const themeOptions = [
    { id: 'light', label: 'Light Mode', icon: Sun, desc: 'Clean, bright light theme' },
    { id: 'dark', label: 'Dark Mode', icon: Moon, desc: 'Eye-friendly OLED slate theme' },
    { id: 'system', label: 'System Default', icon: Monitor, desc: 'Follows device OS settings' },
  ] as const;

  const handleShareApp = async () => {
    const shareText = `Check out Daily Quotes! 500+ curated inspirational quotes across 10 categories.`;
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Quotes Application',
          text: shareText,
          url: shareUrl,
        });
        showToast('App link shared successfully! ✨');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
            showToast('App link copied to clipboard! Thanks for sharing! ✨');
          } else {
            showToast('Thanks for sharing Daily Quotes!');
          }
        }
      }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
      showToast('App link copied to clipboard! Thanks for sharing! ✨');
    } else {
      showToast('Thanks for sharing Daily Quotes!');
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header (Bento Style) */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-widest text-[#1A73E8] dark:text-blue-400">
          <SettingsIcon className="h-3.5 w-3.5 fill-current" />
          <span>Preferences & About</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A73E8] dark:text-blue-400 mt-0.5">
          Settings
        </h1>
      </div>

      {/* Theme Selection Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
          Appearance & Theme
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = themeMode === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => setThemeMode(opt.id)}
                className={`relative flex flex-col items-start rounded-[2rem] p-5 text-left transition-all border shadow-xs ${
                  isSelected
                    ? 'bg-blue-600/10 dark:bg-blue-600/20 border-[#1A73E8] dark:border-blue-500 shadow-sm'
                    : 'bg-white dark:bg-[#121212] border-slate-200 dark:border-white/10 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className={`rounded-2xl p-3 ${isSelected ? 'bg-[#1A73E8] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {isSelected && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A73E8] text-white shadow-xs">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{opt.label}</h3>
                <p className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-normal">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* App Actions (Rate App / Share App) */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
          Community & Feedback
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <button
            onClick={() => setShowRateModal(true)}
            className="flex items-center justify-between rounded-[2rem] bg-white dark:bg-[#121212] p-5 text-left border border-slate-200 dark:border-white/10 hover:shadow-md transition-all active:scale-98 group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 p-3.5 text-amber-500">
                <Star className="h-6 w-6 fill-amber-500" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Rate Daily Quotes</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Leave a 5-star review on Google Play</p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#1A73E8] transition-colors" />
          </button>

          <button
            onClick={handleShareApp}
            className="flex items-center justify-between rounded-[2rem] bg-white dark:bg-[#121212] p-5 text-left border border-slate-200 dark:border-white/10 hover:shadow-md transition-all active:scale-98 group shadow-xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-3.5 text-emerald-500">
                <Share2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Share App with Friends</h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Spread daily inspiration with friends</p>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#1A73E8] transition-colors" />
          </button>
        </div>
      </div>

      {/* About App Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
          About Application
        </h2>

        <div className="rounded-[2rem] bg-white dark:bg-[#121212] p-6 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A73E8] text-white font-black text-xl shadow-md font-mono">
              DQ
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{APP_NAME}</h3>
              <p className="text-xs font-mono font-bold text-[#1A73E8] dark:text-blue-400">Version {APP_VERSION}</p>
            </div>
          </div>

          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-100 dark:border-white/10">
            Designed as a clean, responsive daily quotes application featuring 500+ curated motivational quotes across 10 inspiring categories.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-2xl bg-slate-50 dark:bg-[#1A1E29] p-3.5 text-center border border-slate-200/80 dark:border-white/10">
              <p className="text-lg font-black text-slate-900 dark:text-white font-mono">500+</p>
              <p className="text-[10px] uppercase font-bold font-mono text-slate-500">Curated Quotes</p>
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-[#1A1E29] p-3.5 text-center border border-slate-200/80 dark:border-white/10">
              <p className="text-lg font-black text-slate-900 dark:text-white font-mono">10</p>
              <p className="text-[10px] uppercase font-bold font-mono text-slate-500">Curated Topics</p>
            </div>
          </div>
        </div>
      </div>

      {/* AdMob Integration Info */}
      <div className="rounded-[2rem] bg-[#0B0F19] p-6 text-white shadow-xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-blue-400 uppercase">
          <ShieldCheck className="h-4 w-4" />
          <span>AdMob Modular Readiness</span>
        </div>
        <p className="text-xs font-medium text-slate-300 leading-relaxed">
          All ad components (Banner, Native, Interstitial) are configured with Google's official test ad unit IDs in <span className="font-mono font-bold text-blue-300">src/utils/constants.ts</span> and managed by <span className="font-mono font-bold text-blue-300">AdMobService.ts</span> for seamless production replacement.
        </p>
      </div>

      {/* Rate Modal */}
      <AnimatePresence>
        {showRateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-[2.5rem] bg-white dark:bg-[#1E293B] p-7 shadow-2xl border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-500 shadow-sm">
                <Award className="h-8 w-8" />
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Enjoying Daily Quotes?
              </h3>
              <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                Tap a star to rate our daily quotes application!
              </p>

              <div className="my-6 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    className="p-1.5 transition-transform hover:scale-125 active:scale-95"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= selectedRating
                          ? 'fill-amber-400 text-amber-400 drop-shadow'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRateModal(false)}
                  className="flex-1 rounded-2xl bg-slate-100 dark:bg-slate-800 py-3 text-xs font-bold font-mono text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setShowRateModal(false);
                    showToast(`Thank you for rating Daily Quotes ${selectedRating} stars! ⭐`);
                  }}
                  className="flex-1 rounded-2xl bg-[#1A73E8] py-3 text-xs font-bold font-mono text-white shadow-md shadow-blue-500/20 hover:bg-blue-700"
                >
                  Submit Rating
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper icon component for heading
const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);
