import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import { formatDate, isPastDue, getDaysFromNow } from '../utils/dateHelpers';

const ReviewsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadItemsDueToday();
  }, []);

  const loadItemsDueToday = async () => {
    setLoading(true);
    try {
      const data = await apiService.getItemsDueToday();
      setItems(data);
    } catch (err) {
      setError('Erreur lors du chargement des révisions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (itemId, success) => {
    try {
      // Update the item
      await apiService.updateItemAfterReview(itemId, success);
      
      // Create a review record
      await apiService.createReview(itemId, success);
      
      // Reload the list
      await loadItemsDueToday();
    } catch (err) {
      setError('Erreur lors de la mise à jour de la révision');
      console.error(err);
    }
  };

  const getStatusBadge = (item) => {
    const daysFromNow = getDaysFromNow(item.nextReviewDate);
    
    if (isPastDue(item.nextReviewDate)) {
      return (
        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
          En retard ({Math.abs(daysFromNow)} jour{Math.abs(daysFromNow) > 1 ? 's' : ''})
        </span>
      );
    } else if (daysFromNow === 0) {
      return (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
          À réviser aujourd'hui
        </span>
      );
    } else {
      return (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
          Programmé dans {daysFromNow} jour{daysFromNow > 1 ? 's' : ''}
        </span>
      );
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl"></div>
          <div className="relative flex justify-center items-center py-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              <span className="text-gray-700 font-medium">Chargement des révisions...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl"></div>
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                🔄
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Révisions du jour
              </h2>
            </div>
            <button
              onClick={loadItemsDueToday}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Actualiser</span>
            </button>
          </div>

          {error && (
            <div className="bg-red-50/80 border border-red-200 rounded-xl p-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                  ⚠️
                </div>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Aucune révision prévue !
              </h3>
              <p className="text-gray-600 mb-6">
                Vous êtes à jour avec vos révisions. Excellent travail !
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl text-emerald-700 font-medium">
                <span>✨</span>
                <span>Continuez comme ça !</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {items.length}
                  </div>
                  <p className="text-blue-800 font-semibold">
                    {items.length} élément{items.length > 1 ? 's' : ''} à réviser aujourd'hui
                  </p>
                </div>
              </div>

              {items.map((item) => (
                <div
                  key={item._id}
                  className="group relative bg-white/70 border border-gray-200/50 rounded-xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            {item.reviewCount + 1}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900">
                            {item.title}
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <span className="text-blue-500">📅</span>
                            <span>Créé le {formatDate(item.dateCreated)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <span className="text-indigo-500">🔄</span>
                            <span>Révision #{item.reviewCount + 1}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(item)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleReview(item._id, true)}
                        className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                      >
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                          ✅
                        </div>
                        <span>Je me souviens</span>
                      </button>
                      <button
                        onClick={() => handleReview(item._id, false)}
                        className="px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                      >
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                          ❌
                        </div>
                        <span>À revoir</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsList;