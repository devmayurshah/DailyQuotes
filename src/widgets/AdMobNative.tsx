import React from 'react';
import { AdMobService } from '../services/AdMobService';
import { useQuotes } from '../services/QuoteProvider';
import { Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface AdMobNativeProps {
  index?: number;
}

export const AdMobNative: React.FC<AdMobNativeProps> = ({ index }) => {
  const adUnitId = AdMobService.getNativeAdUnitId();
  const { showToast } = useQuotes();

  return (
    <div className="my-4 w-full rounded-3xl bg-gradient-to-br from-blue-600/10 via-slate-50 to-indigo-50 dark:from-blue-900/20 dark:via-slate-800/90 dark:to-slate-900 p-5 border-2 border-dashed border-blue-300 dark:border-blue-700/60 shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase text-white shadow-sm">
            Ad
          </span>
          <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            AdMob Native Ad Placeholder
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
          Position: #{index || 10}
        </span>
      </div>

      <div className="flex items-start gap-4 my-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
          DQ
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
            Daily Quotes Pro & Premium Features
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            Experience unlimited inspiration, custom quote widgets, and an ad-free reading environment for your daily motivation.
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>{adUnitId}</span>
        </div>
        <button
          onClick={() => showToast('Simulated AdMob click: Opening sponsored link...')}
          className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
        >
          <span>Learn More</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
