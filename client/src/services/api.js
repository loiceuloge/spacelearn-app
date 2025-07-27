const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

class ApiService {
  async makeRequest(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Items API
  async createItem(title) {
    return this.makeRequest('/items', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });
  }

  async getItems() {
    return this.makeRequest('/items');
  }

  async getItemsDueToday() {
    return this.makeRequest('/items/due-today');
  }

  async updateItemAfterReview(itemId, success) {
    return this.makeRequest(`/items/${itemId}/review`, {
      method: 'PUT',
      body: JSON.stringify({ success }),
    });
  }


  async deleteItem(itemId) {
    return this.makeRequest(`/items/${itemId}`, {
      method: 'DELETE',
    });
  }

  // Reviews API
  async createReview(itemId, success, difficulty = 3) {
    return this.makeRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify({ itemId, success, difficulty }),
    });
  }

  async getReviewsForItem(itemId) {
    return this.makeRequest(`/reviews/item/${itemId}`);
  }

  async getReviewStats() {
    return this.makeRequest('/reviews/stats');
  }

  // Health check
  async healthCheck() {
    return this.makeRequest('/health');
  }
}

export default new ApiService();