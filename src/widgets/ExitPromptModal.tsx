import React from 'react';
import { LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExitPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ExitPromptModal: React.FC<ExitPromptModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="bg-white dark:bg-[#121212] rounded-[2rem] max-w-sm w-full p-6 sm:p-7 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Icon Header */}
          <div className="flex items-center gap-3.5 mb-5">
            <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/50 p-3.5 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30">
              <LogOut className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Exit Application
              </h3>
              <p className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                Daily Quotes Wisdom
              </p>
            </div>
          </div>

          {/* Message */}
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed mb-7">
            Are you sure you want to exit <span className="font-bold text-slate-800 dark:text-white">Daily Quotes</span>? You can return anytime for your daily dose of inspiration.
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onClose}
              className="w-full rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3 text-xs font-bold font-mono text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 text-center"
            >
              Stay in App
            </button>
            <button
              onClick={onConfirm}
              className="w-full rounded-2xl bg-rose-600 hover:bg-rose-700 px-4 py-3 text-xs font-bold font-mono text-white shadow-lg shadow-rose-600/20 transition-all active:scale-95 text-center flex items-center justify-center gap-1.5"
            >
              <span>Yes, Exit</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
