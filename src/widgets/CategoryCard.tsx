import React from 'react';
import { motion } from 'motion/react';
import { Category } from '../models/Quote';
import { useQuotes } from '../services/QuoteProvider';
import * as Icons from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  index: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  const { navigateTo } = useQuotes();

  // Dynamic Lucide Icon Resolution
  const IconComponent = (Icons as Record<string, React.ElementType>)[category.iconName] || Icons.Sparkles;

  // Bento Grid pastel tinted palette mapping
  const bentoThemes: Record<string, { bg: string; border: string; badgeBg: string; badgeText: string; titleText: string }> = {
    motivation: { bg: 'bg-blue-50/90 dark:bg-blue-950/30', border: 'border-blue-100 dark:border-blue-900/40', badgeBg: 'bg-blue-100/80 dark:bg-blue-900/50', badgeText: 'text-blue-700 dark:text-blue-300', titleText: 'text-blue-950 dark:text-blue-100' },
    success: { bg: 'bg-indigo-50/90 dark:bg-indigo-950/30', border: 'border-indigo-100 dark:border-indigo-900/40', badgeBg: 'bg-indigo-100/80 dark:bg-indigo-900/50', badgeText: 'text-indigo-700 dark:text-indigo-300', titleText: 'text-indigo-950 dark:text-indigo-100' },
    life: { bg: 'bg-emerald-50/90 dark:bg-emerald-950/30', border: 'border-emerald-100 dark:border-emerald-900/40', badgeBg: 'bg-emerald-100/80 dark:bg-emerald-900/50', badgeText: 'text-emerald-700 dark:text-emerald-300', titleText: 'text-emerald-950 dark:text-emerald-100' },
    happiness: { bg: 'bg-amber-50/90 dark:bg-amber-950/30', border: 'border-amber-100 dark:border-amber-900/40', badgeBg: 'bg-amber-100/80 dark:bg-amber-900/50', badgeText: 'text-amber-700 dark:text-amber-300', titleText: 'text-amber-950 dark:text-amber-100' },
    love: { bg: 'bg-rose-50/90 dark:bg-rose-950/30', border: 'border-rose-100 dark:border-rose-900/40', badgeBg: 'bg-rose-100/80 dark:bg-rose-900/50', badgeText: 'text-rose-700 dark:text-rose-300', titleText: 'text-rose-950 dark:text-rose-100' },
    friendship: { bg: 'bg-purple-50/90 dark:bg-purple-950/30', border: 'border-purple-100 dark:border-purple-900/40', badgeBg: 'bg-purple-100/80 dark:bg-purple-900/50', badgeText: 'text-purple-700 dark:text-purple-300', titleText: 'text-purple-950 dark:text-purple-100' },
    business: { bg: 'bg-sky-50/90 dark:bg-sky-950/30', border: 'border-sky-100 dark:border-sky-900/40', badgeBg: 'bg-sky-100/80 dark:bg-sky-900/50', badgeText: 'text-sky-700 dark:text-sky-300', titleText: 'text-sky-950 dark:text-sky-100' },
    study: { bg: 'bg-violet-50/90 dark:bg-violet-950/30', border: 'border-violet-100 dark:border-violet-900/40', badgeBg: 'bg-violet-100/80 dark:bg-violet-900/50', badgeText: 'text-violet-700 dark:text-violet-300', titleText: 'text-violet-950 dark:text-violet-100' },
    leadership: { bg: 'bg-orange-50/90 dark:bg-orange-950/30', border: 'border-orange-100 dark:border-orange-900/40', badgeBg: 'bg-orange-100/80 dark:bg-orange-900/50', badgeText: 'text-orange-700 dark:text-orange-300', titleText: 'text-orange-950 dark:text-orange-100' },
    positive_thinking: { bg: 'bg-yellow-50/90 dark:bg-yellow-950/30', border: 'border-yellow-100 dark:border-yellow-900/40', badgeBg: 'bg-yellow-100/80 dark:bg-yellow-900/50', badgeText: 'text-yellow-700 dark:text-yellow-300', titleText: 'text-yellow-950 dark:text-yellow-100' },
  };

  const theme = bentoThemes[category.id] || { bg: 'bg-slate-50 dark:bg-slate-800/50', border: 'border-slate-100 dark:border-slate-700/50', badgeBg: 'bg-slate-200/80 dark:bg-slate-700', badgeText: 'text-slate-700 dark:text-slate-200', titleText: 'text-slate-900 dark:text-white' };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onClick={() => navigateTo('list', category)}
      className={`group relative w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] ${theme.bg} p-5 sm:p-6 text-left shadow-sm hover:shadow-md border ${theme.border} transition-all active:scale-[0.98] flex flex-col justify-between h-48 sm:h-52`}
    >
      {/* Subtle colorful glow gradient in corner */}
      <div
        className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${category.bgGradient} opacity-15 dark:opacity-20 blur-xl transition-transform group-hover:scale-150`}
      />

      <div className="relative z-10 flex items-start justify-between w-full">
        <div
          className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-tr ${category.bgGradient} text-white shadow-md shadow-black/10 group-hover:scale-110 transition-transform`}
        >
          <IconComponent className="h-6 w-6 sm:h-7 sm:w-7 stroke-[2.2]" />
        </div>

        <span className={`rounded-full ${theme.badgeBg} ${theme.badgeText} px-3 py-1 text-xs font-bold tracking-wider uppercase font-mono shadow-xs`}>
          {category.quoteCount} Quotes
        </span>
      </div>

      <div className="relative z-10 mt-auto">
        <h3 className={`font-sans text-lg sm:text-xl font-bold tracking-tight ${theme.titleText} group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors`}>
          {category.name}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-1 font-medium">
          {category.description}
        </p>
      </div>

      {/* Material 3 indicator arrow */}
      <div className="absolute right-4 bottom-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600 dark:text-blue-400">
        <Icons.ChevronRight className="h-5 w-5" />
      </div>
    </motion.button>
  );
};
