import React from 'react';
import { useQuotes } from '../services/QuoteProvider';
import { Home, Heart, Search, Settings } from 'lucide-react';
import { motion } from 'motion/react';

interface NavItem {
  id: 'home' | 'favorites' | 'search' | 'settings';
  label: string;
  icon: React.ElementType;
  badge?: number;
}

export const BottomNavBar: React.FC = () => {
  const { currentScreen, navigateTo, favorites } = useQuotes();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'favorites', label: 'Favorites', icon: Heart, badge: favorites.length },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-xl bg-white/95 dark:bg-[#121212]/95 backdrop-blur-lg border-t border-slate-200 dark:border-white/10 px-4 py-2 sm:px-6 sm:py-2.5 shadow-xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id || (item.id === 'home' && currentScreen === 'list');
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className="relative flex flex-col items-center justify-center min-w-[64px] py-1 text-xs font-medium transition-colors"
            >
              {/* Material 3 Active Indicator Pill */}
              <div className="relative flex items-center justify-center px-5 py-1.5 rounded-full transition-all">
                {isActive && (
                  <motion.div
                    layoutId="m3-nav-pill"
                    className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-950/80"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className={`relative z-10 h-5 w-5 sm:h-6 sm:w-6 transition-colors ${
                    isActive
                      ? 'text-[#1A73E8] dark:text-blue-400 stroke-[2.5]'
                      : 'text-slate-500 dark:text-slate-400 stroke-[1.8]'
                  }`}
                />
                
                {/* Favorites Badge */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 z-20 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold font-mono text-white shadow-xs">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              <span
                className={`mt-1 text-[11px] sm:text-xs transition-colors ${
                  isActive ? 'text-[#1A73E8] dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 font-semibold'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
