import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await apiService.getReviewStats();
      setStats(data);
    } catch (err) {
      setError('Erreur lors du chargement des statistiques');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Chargement des statistiques...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-2xl shadow-lg">
                📈
              </div>
              <h2 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Statistiques d'apprentissage
              </h2>
            </div>
            <button
              onClick={loadStats}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Actualiser</span>
            </button>
          </div>

          {error && (
            <div className="bg-red-50/80 border border-red-200 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 text-sm sm:text-base">
                  ⚠️
                </div>
                <p className="text-red-700 font-medium text-sm sm:text-base">{error}</p>
              </div>
            </div>
          )}

          {stats && (
            <div className="space-y-6 sm:space-y-8">
              {/* Main Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-blue-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Total des révisions</p>
                      <p className="text-2xl sm:text-4xl font-bold">{stats.totalReviews}</p>
                      <div className="w-full bg-blue-400/30 rounded-full h-1.5 sm:h-2 mt-2 sm:mt-3">
                        <div className="bg-white h-1.5 sm:h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white/20 rounded-xl flex items-center justify-center text-xl sm:text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 ml-2 sm:ml-0">
                      📚
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-emerald-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Révisions réussies</p>
                      <p className="text-2xl sm:text-4xl font-bold">{stats.successfulReviews}</p>
                      <div className="w-full bg-emerald-400/30 rounded-full h-1.5 sm:h-2 mt-2 sm:mt-3">
                        <div className="bg-white h-1.5 sm:h-2 rounded-full" style={{width: stats.totalReviews > 0 ? `${(stats.successfulReviews / stats.totalReviews) * 100}%` : '0%'}}></div>
                      </div>
                    </div>
                    <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white/20 rounded-xl flex items-center justify-center text-xl sm:text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 ml-2 sm:ml-0">
                      ✨
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-purple-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Taux de réussite</p>
                      <p className="text-2xl sm:text-4xl font-bold">{stats.successRate}%</p>
                      <div className="w-full bg-purple-400/30 rounded-full h-1.5 sm:h-2 mt-2 sm:mt-3">
                        <div className="bg-white h-1.5 sm:h-2 rounded-full" style={{width: `${stats.successRate}%`}}></div>
                      </div>
                    </div>
                    <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white/20 rounded-xl flex items-center justify-center text-xl sm:text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 ml-2 sm:ml-0">
                      🎯
                    </div>
                  </div>
                </div>

                <div className="group relative bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-orange-100 text-xs sm:text-sm font-medium mb-1 sm:mb-2">Aujourd'hui</p>
                      <p className="text-2xl sm:text-4xl font-bold">{stats.todayReviews}</p>
                      <div className="w-full bg-orange-400/30 rounded-full h-1.5 sm:h-2 mt-2 sm:mt-3">
                        <div className="bg-white h-1.5 sm:h-2 rounded-full" style={{width: stats.todayReviews > 0 ? '100%' : '0%'}}></div>
                      </div>
                    </div>
                    <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white/20 rounded-xl flex items-center justify-center text-xl sm:text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 ml-2 sm:ml-0">
                      🔥
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="bg-white/80 rounded-2xl p-4 sm:p-6 border border-gray-200/50">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-lg">
                    📈
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">Aperçu des progrès</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 relative">
                      <svg className="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-gray-200" fill="none" stroke="currentColor" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                        <path className="text-blue-500" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${stats.totalReviews > 0 ? 100 : 0}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg sm:text-2xl font-bold text-blue-600">{stats.totalReviews}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Total révisions</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 relative">
                      <svg className="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-gray-200" fill="none" stroke="currentColor" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                        <path className="text-emerald-500" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${stats.successRate}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg sm:text-xl font-bold text-emerald-600">{stats.successRate}%</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Taux de réussite</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 relative">
                      <svg className="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-gray-200" fill="none" stroke="currentColor" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                        <path className="text-orange-500" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${stats.todayReviews > 0 ? 80 : 0}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg sm:text-2xl font-bold text-orange-600">{stats.todayReviews}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600">Aujourd'hui</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-4 sm:p-8 border border-gray-200/50 mt-6 sm:mt-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl shadow-lg">
                🧠
              </div>
              <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                À propos de la répétition espacée
              </h3>
            </div>
          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              <div className="bg-white/80 rounded-xl p-4 sm:p-6 border border-gray-200/50">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="text-lg sm:text-xl">⏰</span>
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base">Intervalles de révision</h4>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <span className="text-gray-700 text-xs sm:text-sm">1ère révision:</span>
                    <span className="font-bold text-blue-600 text-sm sm:text-base">J+1</span>
                  </div>
                  <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                    <span className="text-gray-700 text-xs sm:text-sm">2ème révision:</span>
                    <span className="font-bold text-emerald-600 text-sm sm:text-base">J+3</span>
                  </div>
                  <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <span className="text-gray-700 text-xs sm:text-sm">3ème révision:</span>
                    <span className="font-bold text-purple-600 text-sm sm:text-base">J+7</span>
                  </div>
                  <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <span className="text-gray-700 text-xs sm:text-sm">4ème révision:</span>
                    <span className="font-bold text-orange-600 text-sm sm:text-base">J+15</span>
                  </div>
                  <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
                    <span className="text-gray-700 text-xs sm:text-sm">5ème révision:</span>
                    <span className="font-bold text-indigo-600 text-sm sm:text-base">J+30</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 rounded-xl p-4 sm:p-6 border border-gray-200/50">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="text-lg sm:text-xl">🎆</span>
                  <h4 className="font-bold text-gray-800 text-sm sm:text-base">Conseils d'utilisation</h4>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">✓</div>
                    <span className="text-gray-700 text-xs sm:text-sm">Révisez quotidiennement pour de meilleurs résultats</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">✓</div>
                    <span className="text-gray-700 text-xs sm:text-sm">Soyez honnête sur votre niveau de mémorisation</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">✓</div>
                    <span className="text-gray-700 text-xs sm:text-sm">Les échecs relancent le cycle de révision</span>
                  </li>
                  <li className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">✓</div>
                    <span className="text-gray-700 text-xs sm:text-sm">La régularité est plus importante que la quantité</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;