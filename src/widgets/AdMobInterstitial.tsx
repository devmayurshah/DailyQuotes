import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AdMobService } from '../services/AdMobService';
import { X, ShieldAlert, Sparkles, Trophy, ArrowRight } from 'lucide-react';

interface AdMobInterstitialProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdMobInterstitial: React.FC<AdMobInterstitialProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(3);
  const adUnitId = AdMobService.getInterstitialAdUnitId();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setCountdown(3);
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#111827] p-6 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-center"
          >
            {/* Top Bar with Ad Badge and Close Button */}
            <div className="flex items-center justify-between mb-6">
              <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-sm">
                AdMob Interstitial Ad
              </span>
              {countdown > 0 ? (
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Skip in {countdown}s
                </div>
              ) : (
                <button
                  onClick={onClose}
                  className="rounded-full bg-slate-100 dark:bg-slate-800 p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="Close Ad"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Ad Graphic & Content */}
            <div className="my-6 flex flex-col items-center justify-center">
              <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-xl shadow-blue-500/30">
                <Trophy className="h-10 w-10 text-white animate-pulse" />
                <span className="absolute -bottom-2 -right-2 rounded-full bg-amber-400 p-1.5 text-slate-900 shadow">
                  <Sparkles className="h-4 w-4 fill-current" />
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Daily Quotes Pro Experience
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Unlock exclusive daily inspirational notifications, custom quote themes, and an ad-free reading experience!
              </p>
            </div>

            {/* Test ID info */}
            <div className="my-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 text-left border border-slate-200/80 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <ShieldAlert className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span className="truncate">Test Unit: {adUnitId}</span>
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                Triggered automatically every 5th category opened.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  alert('Thank you for trying Daily Quotes! This simulates clicking the Interstitial Ad.');
                  onClose();
                }}
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Premium</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              {countdown === 0 && (
                <button
                  onClick={onClose}
                  className="w-full rounded-2xl py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  Continue to Quote List
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
