import config from '../config/config.js';

// API Configuration
const API_BASE_URL = config.API_BASE_URL;

// API Service Class
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
    this.getTokenCallback = null; // Callback to get fresh Clerk token
  }

  // Set token getter callback (for Clerk integration)
  setTokenGetter(callback) {
    this.getTokenCallback = callback;
  }

  // Set authentication token (legacy support)
  setToken(token) {
    this.token = token;
  }

  // Clear authentication token
  clearToken() {
    this.token = null;
    this.getTokenCallback = null;
  }

  // Get fresh token (prioritize Clerk callback)
  async getFreshToken() {
    if (this.getTokenCallback) {
      try {
        return await this.getTokenCallback();
      } catch (error) {
        console.error('Error getting fresh token:', error);
        return null;
      }
    }
    return this.token;
  }

  // Test backend connection
  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL}/test`);
      return response.ok;
    } catch (error) {
      console.error('Backend connection test failed:', error);
      return false;
    }
  }

  // Get headers for requests
  async getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    const token = await this.getFreshToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = await this.getHeaders();
      const config = {
        headers,
        ...options,
      };

      // Merge headers properly
      if (options.headers) {
        config.headers = { ...config.headers, ...options.headers };
      }

      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized - Please login again');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      // Don't throw error for initial connection attempts
      if (endpoint.includes('/dashboard') && error.message.includes('fetch')) {
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
    let headers = await this.getHeaders();
    
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
