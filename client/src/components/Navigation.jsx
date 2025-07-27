import React from 'react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'items', label: 'Nouveaux Items', shortLabel: 'Items', icon: '✨', color: 'from-emerald-500 to-teal-600' },
    { id: 'reviews', label: 'Révisions', shortLabel: 'Révisions', icon: '🔄', color: 'from-blue-500 to-indigo-600' },
    { id: 'stats', label: 'Statistiques', shortLabel: 'Stats', icon: '📈', color: 'from-purple-500 to-pink-600' }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="lg:block hidden relative bg-white/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="relative max-w-6xl mx-auto px-2 sm:px-6">
          <div className="flex justify-center gap-1 sm:gap-2 py-2 sm:py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative group px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-blue-500/25`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/80 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                  <span className="text-sm sm:text-lg">{tab.icon}</span>
                  <span className="text-xs sm:text-sm">
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </span>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg sm:rounded-xl"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200/50 z-50">
        <div className="safe-area-pb px-2 py-2">
          <div className="flex justify-around items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 min-w-[80px] ${
                  activeTab === tab.id
                    ? 'transform scale-105'
                    : 'transform scale-100'
                }`}
              >
                <div className={`flex flex-col items-center gap-1 ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  <div className={`text-2xl transition-all duration-300 ${
                    activeTab === tab.id ? 'transform scale-110' : ''
                  }`}>
                    {tab.icon}
                  </div>
                  <span className={`text-xs font-medium transition-all duration-300 ${
                    activeTab === tab.id ? 'text-blue-600 font-semibold' : 'text-gray-500'
                  }`}>
                    {tab.shortLabel}
                  </span>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;