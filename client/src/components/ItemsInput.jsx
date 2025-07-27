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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📝 Ajouter un nouvel item d'apprentissage
        </h2>
        
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'élément appris aujourd'hui..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
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

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Items récents ({items.length})
        </h3>
        
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Aucun item enregistré pour le moment.</p>
            <p className="text-sm mt-2">Ajoutez votre premier élément d'apprentissage ci-dessus !</p>
          </div>
        ) : (
            <div className="grid gap-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="group relative bg-white/70 border border-gray-200/50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="relative flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                          {item.reviewCount + 1}
                        </div>
                        <h4 className="font-semibold text-gray-800 text-lg group-hover:text-gray-900">{item.title}</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-emerald-500">📅</span>
                          <span>Créé le {formatDate(item.dateCreated)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="text-blue-500">⏰</span>
                          <span>Prochaine: {formatDate(item.nextReviewDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                            <span className="text-xs font-semibold text-blue-700">Révision #{item.reviewCount + 1}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="ml-4 p-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 transform hover:scale-110 group-hover:bg-red-50/80"
                      title="Supprimer cet item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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