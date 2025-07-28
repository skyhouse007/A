import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authService from '../services/authService.js';
import billingService from '../services/billingService.js';
import databaseService from '../services/databaseService.js';

// Initial state
const initialState = {
  // Authentication
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Billing data
  invoices: [],
  customers: [],
  templates: [],
  currentInvoice: null,

  // Dashboard data
  dashboardData: null,
  analytics: null,

  // UI state
  sidebarCollapsed: false,
  currentPage: 'dashboard',
  theme: 'light',

  // API state
  apiConnected: false,
  lastSync: null
};

// Action types
const ACTIONS = {
  // Authentication
  SET_USER: 'SET_USER',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',

  // Billing
  SET_INVOICES: 'SET_INVOICES',
  SET_CUSTOMERS: 'SET_CUSTOMERS',
  SET_TEMPLATES: 'SET_TEMPLATES',
  SET_CURRENT_INVOICE: 'SET_CURRENT_INVOICE',
  ADD_INVOICE: 'ADD_INVOICE',
  UPDATE_INVOICE: 'UPDATE_INVOICE',
  DELETE_INVOICE: 'DELETE_INVOICE',

  // Dashboard
  SET_DASHBOARD_DATA: 'SET_DASHBOARD_DATA',
  SET_ANALYTICS: 'SET_ANALYTICS',

  // UI
  SET_SIDEBAR_COLLAPSED: 'SET_SIDEBAR_COLLAPSED',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_THEME: 'SET_THEME',

  // API
  SET_API_CONNECTED: 'SET_API_CONNECTED',
  SET_LAST_SYNC: 'SET_LAST_SYNC'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    
    case ACTIONS.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    case ACTIONS.SET_INVOICES:
      return { ...state, invoices: action.payload };
    
    case ACTIONS.SET_CUSTOMERS:
      return { ...state, customers: action.payload };
    
    case ACTIONS.SET_TEMPLATES:
      return { ...state, templates: action.payload };
    
    case ACTIONS.SET_CURRENT_INVOICE:
      return { ...state, currentInvoice: action.payload };
    
    case ACTIONS.ADD_INVOICE:
      return { ...state, invoices: [...state.invoices, action.payload] };
    
    case ACTIONS.UPDATE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.map(invoice =>
          invoice.id === action.payload.id ? action.payload : invoice
        )
      };
    
    case ACTIONS.DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(invoice => invoice.id !== action.payload)
      };
    
    case ACTIONS.SET_DASHBOARD_DATA:
      return { ...state, dashboardData: action.payload };
    
    case ACTIONS.SET_ANALYTICS:
      return { ...state, analytics: action.payload };
    
    case ACTIONS.SET_SIDEBAR_COLLAPSED:
      return { ...state, sidebarCollapsed: action.payload };
    
    case ACTIONS.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    
    case ACTIONS.SET_API_CONNECTED:
      return { ...state, apiConnected: action.payload };
    
    case ACTIONS.SET_LAST_SYNC:
      return { ...state, lastSync: action.payload };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check authentication on app start
  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      try {
        if (isMounted) {
          dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        }
        
        if (authService.isAuthenticated()) {
          const user = await authService.getCurrentUser();
          if (isMounted && user) {
            dispatch({ type: ACTIONS.SET_USER, payload: user });
            dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
            dispatch({ type: ACTIONS.SET_API_CONNECTED, payload: true });
          } else if (isMounted) {
            // Clear invalid token
            authService.clearToken();
            dispatch({ type: ACTIONS.SET_API_CONNECTED, payload: false });
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        authService.clearToken();
      } finally {
        if (isMounted) {
          dispatch({ type: ACTIONS.SET_LOADING, payload: false });
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // Authentication actions
  const login = async (credentials) => {
    let isMounted = true;
    try {
      if (isMounted) {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        dispatch({ type: ACTIONS.CLEAR_ERROR });
      }
      
      const response = await authService.login(credentials);
      if (isMounted) {
        dispatch({ type: ACTIONS.SET_USER, payload: response.user });
        dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
        dispatch({ type: ACTIONS.SET_API_CONNECTED, payload: true });
      }
      
      return response;
    } catch (error) {
      if (isMounted) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
      throw error;
    } finally {
      if (isMounted) {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: ACTIONS.SET_USER, payload: null });
      dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: false });
      dispatch({ type: ACTIONS.SET_API_CONNECTED, payload: false });
    }
  };

  const register = async (userData) => {
    let isMounted = true;
    try {
      if (isMounted) {
        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        dispatch({ type: ACTIONS.CLEAR_ERROR });
      }
      
      const response = await authService.register(userData);
      if (isMounted) {
        dispatch({ type: ACTIONS.SET_USER, payload: response.user });
        dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
        dispatch({ type: ACTIONS.SET_API_CONNECTED, payload: true });
      }
      
      return response;
    } catch (error) {
      if (isMounted) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
      throw error;
    } finally {
      if (isMounted) {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    }
  };

  // Billing actions
  const loadInvoices = async (params = {}) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const invoices = await billingService.getInvoices(params);
      dispatch({ type: ACTIONS.SET_INVOICES, payload: invoices });
      dispatch({ type: ACTIONS.SET_LAST_SYNC, payload: new Date().toISOString() });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const createInvoice = async (invoiceData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const invoice = await billingService.createInvoice(invoiceData);
      dispatch({ type: ACTIONS.ADD_INVOICE, payload: invoice });
      return invoice;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const updateInvoice = async (id, invoiceData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const invoice = await billingService.updateInvoice(id, invoiceData);
      dispatch({ type: ACTIONS.UPDATE_INVOICE, payload: invoice });
      return invoice;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const deleteInvoice = async (id) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      await billingService.deleteInvoice(id);
      dispatch({ type: ACTIONS.DELETE_INVOICE, payload: id });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Dashboard actions
  const loadDashboardData = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const data = await databaseService.getDashboardData();
      dispatch({ type: ACTIONS.SET_DASHBOARD_DATA, payload: data });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // UI actions
  const setSidebarCollapsed = (collapsed) => {
    dispatch({ type: ACTIONS.SET_SIDEBAR_COLLAPSED, payload: collapsed });
  };

  const setCurrentPage = (page) => {
    dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page });
  };

  const setTheme = (theme) => {
    dispatch({ type: ACTIONS.SET_THEME, payload: theme });
  };

  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  // Direct setUser function for manual user updates
  const setUser = (user) => {
    dispatch({ type: ACTIONS.SET_USER, payload: user });
  };

  // Context value
  const value = {
    ...state,
    // Authentication
    login,
    logout,
    register,
    setUser,
    
    // Billing
    loadInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    
    // Dashboard
    loadDashboardData,
    
    // UI
    setSidebarCollapsed,
    setCurrentPage,
    setTheme,
    clearError,
    
    // Services
    authService,
    billingService,
    databaseService
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
