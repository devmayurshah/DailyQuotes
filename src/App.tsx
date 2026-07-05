/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { QuoteProvider, useQuotes } from './services/QuoteProvider';
import { HomeScreen } from './screens/HomeScreen';
import { QuoteListScreen } from './screens/QuoteListScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { SearchScreen } from './screens/SearchScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { BottomNavBar } from './widgets/BottomNavBar';
import { AppLayout } from './widgets/AppLayout';
import { Snackbar } from './widgets/Snackbar';
import { AdMobInterstitial } from './widgets/AdMobInterstitial';
import { ExitPromptModal } from './widgets/ExitPromptModal';

const MainContent: React.FC = () => {
  const {
    currentScreen,
    toastMessage,
    showInterstitialAd,
    closeInterstitial,
    showExitPrompt,
    closeExitPrompt,
    executeExitApp,
  } = useQuotes();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'list':
        return <QuoteListScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'search':
        return <SearchScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <>
      <AppLayout>
        {renderScreen()}
      </AppLayout>

      <BottomNavBar />
      <Snackbar message={toastMessage} />
      <AdMobInterstitial isOpen={showInterstitialAd} onClose={closeInterstitial} />
      <ExitPromptModal
        isOpen={showExitPrompt}
        onClose={closeExitPrompt}
        onConfirm={executeExitApp}
      />
    </>
  );
};

export default function App() {
  return (
    <QuoteProvider>
      <MainContent />
    </QuoteProvider>
  );
}

