

// Environment Configuration
const config = {
  // Development environment
  development: {
    API_BASE_URL: 'http://localhost:5000/api', // Your local backend with /api prefix
    DATABASE_URL: 'mongodb+srv://akashkhandelwal:akash18KHAN@cluster0.mgtm1ev.mongodb.net/dataplay?retryWrites=true&w=majority',
    JWT_SECRET: 'your-dev-secret',
    CORS_ORIGIN: 'http://localhost:3000'
  },

  // Production environment (Render deployment)
  production: {
    API_BASE_URL: 'https://erpwebsite.onrender.com/api', // Replace with your actual Render URL
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/your-database',
    JWT_SECRET: process.env.JWT_SECRET || 'your-prod-secret',
    CORS_ORIGIN: 'https://your-frontend-domain.com'
  },

  // Test environment
  test: {
    API_BASE_URL: 'http://localhost:5001',
    DATABASE_URL: 'mongodb://localhost:27017/test-database',
    JWT_SECRET: 'test-secret',
    CORS_ORIGIN: 'http://localhost:3001'
  }
};

// Get current environment - use development for local setup
const environment = 'development';

// Export current configuration
const currentConfig = config[environment];

export default {
  ...currentConfig,
  
  // API Configuration
  API_TIMEOUT: 30000, // 30 seconds
  API_RETRY_ATTEMPTS: 3,
  
  // Cache Configuration
  CACHE_TIMEOUT: 5 * 60 * 1000, // 5 minutes
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // File Upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  
  // Authentication
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  
  // Features
  FEATURES: {
    BILLING: true,
    ANALYTICS: true,
    USER_MANAGEMENT: true,
    FILE_UPLOAD: true,
    EMAIL_NOTIFICATIONS: true,
    PDF_GENERATION: true
  }
}; 