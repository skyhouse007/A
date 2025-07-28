import config from '../config/config.js';

// API Configuration
const API_BASE_URL = config.API_BASE_URL;

// API Service Class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
    // Try to get token from localStorage if available
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        this.token = localStorage.getItem('authToken');
      }
    } catch (error) {
      console.log('localStorage not available:', error);
    }
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('authToken', token);
      }
    } catch (error) {
      console.log('localStorage not available:', error);
    }
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('authToken');
      }
    } catch (error) {
      console.log('localStorage not available:', error);
    }
  }

  // Get headers for requests
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        headers: this.getHeaders(),
        ...options,
      };

      // Merge headers properly
      if (options.headers) {
        config.headers = { ...config.headers, ...options.headers };
      }

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      // Don't throw error for initial connection attempts
      if (endpoint === '/auth/me' && error.message.includes('fetch')) {
        return null;
      }
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    let body;
    let headers = this.getHeaders();
    
    // Handle FormData
    if (data instanceof FormData) {
      body = data;
      // Remove Content-Type header to let browser set it with boundary
      delete headers['Content-Type'];
    } else {
      body = JSON.stringify(data);
    }
    
    return this.request(endpoint, {
      method: 'POST',
      body,
      headers,
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // PATCH request
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
