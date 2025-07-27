import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ItemsInput from './components/ItemsInput';
import ReviewsList from './components/ReviewsList';
import Statistics from './components/Statistics';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('items');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'items':
        return <ItemsInput />;
      case 'reviews':
        return <ReviewsList />;
      case 'stats':
        return <Statistics />;
      default:
        return <ItemsInput />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col">
      {/* Mobile App Header */}
      <header className="lg:block hidden relative bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-2xl font-bold shadow-lg">
                🧠
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SpaceLearn
              </h1>
            </div>
            <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Optimisez votre apprentissage avec la répétition espacée intelligente
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Mémorisation optimisée</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Algorithme scientifique</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Progrès personnalisé</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Compact Header */}
      <header className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm sticky top-0 z-30">
        <div className="px-4 py-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
              🧠
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SpaceLearn
            </h1>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <div className="lg:block hidden">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      {/* Main Content - Full height on mobile */}
      <main className="flex-1 py-0 lg:py-8 pb-20 lg:pb-8">
        {renderActiveComponent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Desktop Footer */}
      <footer className="lg:block hidden relative bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm">
                🧠
              </div>
              <span className="font-semibold text-gray-700 text-sm sm:text-base">SpaceLearn</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mb-2 px-2">Application de répétition espacée pour l'apprentissage optimal</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-gray-400">
              <span>Scientifiquement prouvé</span>
              <span className="hidden sm:inline">•</span>
              <span>Algorithme adaptatif</span>
              <span className="hidden sm:inline">•</span>
              <span>Mémorisation à long terme</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
