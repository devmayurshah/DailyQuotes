import React from 'react';
import { AdMobService } from '../services/AdMobService';
import { Info } from 'lucide-react';

export const AdMobBanner: React.FC = () => {
  const adUnitId = AdMobService.getBannerAdUnitId();

  return (
    <div className="my-4 w-full rounded-2xl bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-800/80 dark:to-blue-950/40 p-3 border border-slate-200 dark:border-slate-700/80 shadow-sm flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-1">
        <span className="rounded bg-blue-600 dark:bg-blue-500 px-1.5 py-0.5 text-[9px] text-white">Ad</span>
        <span>Google AdMob Banner Placeholder</span>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
        Test Ad Unit ID: <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{adUnitId}</span>
      </p>
      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
        Google AdMob Responsive Banner
      </p>
    </div>
  );
};
