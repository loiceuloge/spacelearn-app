import React from 'react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'items', label: 'Nouveaux Items', icon: '✨', color: 'from-emerald-500 to-teal-600' },
    { id: 'reviews', label: 'Révisions', icon: '🔄', color: 'from-blue-500 to-indigo-600' },
    { id: 'stats', label: 'Statistiques', icon: '📈', color: 'from-purple-500 to-pink-600' }
  ];

  return (
    <nav className="relative bg-white/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex justify-center gap-1 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative group px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-blue-500/25`
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/80 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;