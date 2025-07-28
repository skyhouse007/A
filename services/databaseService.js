

import apiService from './api.js';

class DatabaseService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Cache management
  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  getCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  clearCache() {
    this.cache.clear();
  }

  // Generic CRUD operations
  async create(collection, data) {
    try {
      const response = await apiService.post(`/${collection}`, data);
      this.clearCache(); // Clear cache when data changes
      return response;
    } catch (error) {
      throw error;
    }
  }

  async read(collection, id = null, params = {}) {
    try {
      const cacheKey = `${collection}_${id || 'list'}_${JSON.stringify(params)}`;
      const cached = this.getCache(cacheKey);
      
      if (cached) {
        return cached;
      }

      const endpoint = id ? `/${collection}/${id}` : `/${collection}`;
      const queryString = new URLSearchParams(params).toString();
      const fullEndpoint = `${endpoint}${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiService.get(fullEndpoint);
      this.setCache(cacheKey, response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(collection, id, data) {
    try {
      const response = await apiService.put(`/${collection}/${id}`, data);
      this.clearCache(); // Clear cache when data changes
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(collection, id) {
    try {
      const response = await apiService.delete(`/${collection}/${id}`);
      this.clearCache(); // Clear cache when data changes
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Specific database operations for your models
  async getUsers(params = {}) {
    return this.read('users', null, params);
  }

  async getUser(id) {
    return this.read('users', id);
  }

  async createUser(userData) {
    return this.create('users', userData);
  }

  async updateUser(id, userData) {
    return this.update('users', id, userData);
  }

  async deleteUser(id) {
    return this.delete('users', id);
  }

  // Dashboard data
  async getDashboardData() {
    try {
      const cacheKey = 'dashboard_data';
      const cached = this.getCache(cacheKey);
      
      if (cached) {
        return cached;
      }

      const response = await apiService.get('/dashboard');
      this.setCache(cacheKey, response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Analytics data
  async getAnalytics(params = {}) {
    try {
      const cacheKey = `analytics_${JSON.stringify(params)}`;
      const cached = this.getCache(cacheKey);
      
      if (cached) {
        return cached;
      }

      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/analytics${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiService.get(endpoint);
      this.setCache(cacheKey, response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Search functionality
  async search(collection, query, params = {}) {
    try {
      const searchParams = { ...params, q: query };
      return this.read(collection, null, searchParams);
    } catch (error) {
      throw error;
    }
  }

  // Bulk operations
  async bulkCreate(collection, dataArray) {
    try {
      const response = await apiService.post(`/${collection}/bulk`, dataArray);
      this.clearCache();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async bulkUpdate(collection, updates) {
    try {
      const response = await apiService.put(`/${collection}/bulk`, updates);
      this.clearCache();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async bulkDelete(collection, ids) {
    try {
      const response = await apiService.delete(`/${collection}/bulk`, { ids });
      this.clearCache();
      return response;
    } catch (error) {
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService; 