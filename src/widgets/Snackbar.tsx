import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info } from 'lucide-react';

interface SnackbarProps {
  message: string | null;
}

export const Snackbar: React.FC<SnackbarProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-sm rounded-2xl bg-[#1E293B] px-4 py-3 text-white shadow-xl shadow-black/30 border border-slate-700 flex items-center gap-3"
        >
          <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0" />
          <span className="text-sm font-medium tracking-wide flex-1">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
