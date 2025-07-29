import apiService from './api.js';

class VendorService {
  // Get all vendors with optional filters
  async getVendors(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/vendors${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      throw error;
    }
  }

  // Get single vendor by ID
  async getVendor(id) {
    try {
      return await apiService.get(`/vendors/${id}`);
    } catch (error) {
      console.error('Error fetching vendor:', error);
      throw error;
    }
  }

  // Create new vendor
  async createVendor(vendorData) {
    try {
      return await apiService.post('/vendors', vendorData);
    } catch (error) {
      console.error('Error creating vendor:', error);
      throw error;
    }
  }

  // Update existing vendor
  async updateVendor(id, vendorData) {
    try {
      return await apiService.put(`/vendors/${id}`, vendorData);
    } catch (error) {
      console.error('Error updating vendor:', error);
      throw error;
    }
  }

  // Delete vendor
  async deleteVendor(id) {
    try {
      return await apiService.delete(`/vendors/${id}`);
    } catch (error) {
      console.error('Error deleting vendor:', error);
      throw error;
    }
  }

  // Search vendors
  async searchVendors(query, params = {}) {
    try {
      const searchParams = { ...params, search: query };
      return await this.getVendors(searchParams);
    } catch (error) {
      console.error('Error searching vendors:', error);
      throw error;
    }
  }

  // Get vendor statistics
  async getVendorStats() {
    try {
      return await apiService.get('/vendors/stats');
    } catch (error) {
      console.error('Error fetching vendor stats:', error);
      throw error;
    }
  }

  // Get vendor transactions
  async getVendorTransactions(vendorId, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/vendors/${vendorId}/transactions${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching vendor transactions:', error);
      throw error;
    }
  }
}

const vendorService = new VendorService();
export default vendorService;