import { ThemeMode } from '../models/Quote';

export const getEffectiveTheme = (mode: ThemeMode): 'light' | 'dark' => {
  if (mode === 'system') {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  return mode;
};

// Material 3 style helper classes
export const m3Colors = {
  light: {
    bg: 'bg-[#F8FAFC]',
    surface: 'bg-white',
    surfaceVariant: 'bg-[#F1F5F9]',
    surfaceContainer: 'bg-[#E2E8F0]/60',
    primary: 'bg-[#2563EB]', // Blue
    onPrimary: 'text-white',
    textPrimary: 'text-[#0F172A]',
    textSecondary: 'text-[#475569]',
    border: 'border-[#E2E8F0]',
    cardHover: 'hover:shadow-md hover:border-[#CBD5E1]',
    fab: 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/25',
  },
  dark: {
    bg: 'bg-[#0B0F19]',
    surface: 'bg-[#111827]',
    surfaceVariant: 'bg-[#1F2937]',
    surfaceContainer: 'bg-[#1E293B]/70',
    primary: 'bg-[#3B82F6]', // Light Blue for dark mode M3
    onPrimary: 'text-white',
    textPrimary: 'text-[#F8FAFC]',
    textSecondary: 'text-[#94A3B8]',
    border: 'border-[#1F2937]',
    cardHover: 'hover:shadow-lg hover:border-[#334155]',
    fab: 'bg-[#3B82F6] text-white shadow-lg shadow-blue-600/30',
  },
};
