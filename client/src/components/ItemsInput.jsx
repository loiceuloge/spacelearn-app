import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import { formatDate } from '../utils/dateHelpers';

const ItemsInput = () => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await apiService.getItems();
      setItems(data);
    } catch (err) {
      setError('Erreur lors du chargement des items');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError('');

    try {
      await apiService.createItem(title.trim());
      setTitle('');
      await loadItems();
    } catch (err) {
      setError('Erreur lors de la création de l\'item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (itemId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet item ?')) {
      return;
    }

    try {
      await apiService.deleteItem(itemId);
      await loadItems();
    } catch (err) {
      setError('Erreur lors de la suppression');
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
          📝 Ajouter un nouvel item d'apprentissage
        </h2>
        
        <form onSubmit={handleSubmit} className="mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'élément appris aujourd'hui..."
              className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
            >
              {loading ? 'Ajout...' : 'Ajouter'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
          Items récents ({items.length})
        </h3>
        
        {items.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500 px-4">
            <p className="text-sm sm:text-base">Aucun item enregistré pour le moment.</p>
            <p className="text-xs sm:text-sm mt-2">Ajoutez votre premier élément d'apprentissage ci-dessus !</p>
          </div>
        ) : (
            <div className="grid gap-3 sm:gap-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="group relative bg-white/70 border border-gray-200/50 rounded-xl p-4 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="relative flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
                    <div className="flex-1 w-full sm:w-auto">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                          {item.reviewCount + 1}
                        </div>
                        <h4 className="font-semibold text-gray-800 text-sm sm:text-lg group-hover:text-gray-900 flex-1">{item.title}</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-emerald-500">📅</span>
                          <span>Créé le {formatDate(item.dateCreated)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-blue-500">⏰</span>
                          <span>Prochaine: {formatDate(item.nextReviewDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                            <span className="text-xs font-semibold text-blue-700">Révision #{item.reviewCount + 1}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="self-start sm:ml-4 p-2 sm:p-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110 group-hover:bg-red-50/80"
                      title="Supprimer cet item"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default ItemsInput;