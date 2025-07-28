import apiService from './api.js';

class AuthService {
  // User registration
  async register(userData) {
    try {
      const response = await apiService.post('/auth/register', userData);
      if (response.token) {
        apiService.setToken(response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  // User login
  async login(credentials) {
    try {
      const response = await apiService.post('/auth/login', credentials);
      if (response.token) {
        apiService.setToken(response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  // User logout
  async logout() {
    try {
      await apiService.post('/auth/logout');
      apiService.clearToken();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiService.clearToken();
    }
  }

  // Get current user profile
  async getCurrentUser() {
    try {
      return await apiService.get('/auth/me');
    } catch (error) {
      throw error;
    }
  }

  // Update user profile
  async updateProfile(userData) {
    try {
      return await apiService.put('/auth/profile', userData);
    } catch (error) {
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!apiService.token;
  }

  // Get stored token
  getToken() {
    return apiService.token;
  }
}

const authService = new AuthService();
export default authService;
