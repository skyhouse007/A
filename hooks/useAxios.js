'use dom'

import { useCallback } from 'react';
import apiService from '../services/api.js';

const useAxios = () => {
  const get = useCallback(async (endpoint, config = {}) => {
    try {
      const response = await apiService.get(endpoint);
      return { data: response, status: 200 };
    } catch (error) {
      throw error;
    }
  }, []);

  const post = useCallback(async (endpoint, data = {}, config = {}) => {
    try {
      const response = await apiService.post(endpoint, data);
      return { data: response, status: 200 };
    } catch (error) {
      throw error;
    }
  }, []);

  const put = useCallback(async (endpoint, data = {}, config = {}) => {
    try {
      const response = await apiService.put(endpoint, data);
      return { data: response, status: 200 };
    } catch (error) {
      throw error;
    }
  }, []);

  const del = useCallback(async (endpoint, config = {}) => {
    try {
      const response = await apiService.delete(endpoint);
      return { data: response, status: 200 };
    } catch (error) {
      throw error;
    }
  }, []);

  const patch = useCallback(async (endpoint, data = {}, config = {}) => {
    try {
      const response = await apiService.patch(endpoint, data);
      return { data: response, status: 200 };
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    get,
    post,
    put,
    delete: del,
    patch,
  };
};

export default useAxios; 