import { useAuth, useUser } from '@clerk/clerk-expo';
import apiService from './api.js';

class AuthService {
  constructor() {
    this.clerkAuth = null;
    this.clerkUser = null;
  }

  // Initialize Clerk hooks (to be called from components)
  initializeClerk(auth, user) {
    this.clerkAuth = auth;
    this.clerkUser = user;
  }

  // User registration - handled by Clerk
  async register(userData) {
    throw new Error('Registration should be handled through Clerk SignUp component');
  }

  // User login - handled by Clerk
  async login(credentials) {
    throw new Error('Login should be handled through Clerk SignIn component');
  }

  // User logout
  async logout() {
    try {
      if (this.clerkAuth) {
        await this.clerkAuth.signOut();
      }
      apiService.clearToken();
    } catch (error) {
      console.error('Logout error:', error);
      // Clear token anyway
      apiService.clearToken();
    }
  }

  // Get current user profile
  async getCurrentUser() {
    try {
      if (this.clerkUser?.user) {
        return {
          id: this.clerkUser.user.id,
          email: this.clerkUser.user.primaryEmailAddress?.emailAddress,
          name: this.clerkUser.user.fullName || this.clerkUser.user.firstName,
          firstName: this.clerkUser.user.firstName,
          lastName: this.clerkUser.user.lastName,
          imageUrl: this.clerkUser.user.imageUrl,
        };
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  // Update user profile - handled by Clerk
  async updateProfile(userData) {
    try {
      if (this.clerkUser?.user) {
        await this.clerkUser.user.update(userData);
        return await this.getCurrentUser();
      }
      throw new Error('No user available for update');
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.clerkAuth?.isSignedIn || false;
  }

  // Get Clerk session token
  async getToken() {
    try {
      if (this.clerkAuth?.getToken) {
        return await this.clerkAuth.getToken();
      }
      return null;
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  }

  // Clear stored token
  clearToken() {
    apiService.clearToken();
  }

  // Get user ID for API calls
  getUserId() {
    return this.clerkUser?.user?.id || null;
  }

  // Check if user is loaded
  isLoaded() {
    return this.clerkAuth?.isLoaded || false;
  }

  // Check if user is loading
  isLoading() {
    return !this.clerkAuth?.isLoaded;
  }
}

// Create singleton instance
const authService = new AuthService();

// Hook to use auth service with Clerk
export const useAuthService = () => {
  const auth = useAuth();
  const user = useUser();

  // Initialize the service with Clerk hooks
  authService.initializeClerk(auth, user);

  return {
    authService,
    isSignedIn: auth.isSignedIn,
    isLoaded: auth.isLoaded,
    user: user.user,
    signOut: auth.signOut,
  };
};

export default authService;
