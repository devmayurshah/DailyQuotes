import React, { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0F19] transition-colors pb-24 font-sans text-slate-800 dark:text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        {children}
      </div>
    </div>
  );
};
