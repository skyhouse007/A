import apiService from './api.js';

class PurchaseService {
  // Get all purchases with optional filters
  async getPurchases(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/purchases${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching purchases:', error);
      throw error;
    }
  }

  // Get single purchase by ID
  async getPurchase(id) {
    try {
      return await apiService.get(`/purchases/${id}`);
    } catch (error) {
      console.error('Error fetching purchase:', error);
      throw error;
    }
  }

  // Create new purchase
  async createPurchase(purchaseData) {
    try {
      return await apiService.post('/purchases', purchaseData);
    } catch (error) {
      console.error('Error creating purchase:', error);
      throw error;
    }
  }

  // Update existing purchase
  async updatePurchase(id, purchaseData) {
    try {
      return await apiService.put(`/purchases/${id}`, purchaseData);
    } catch (error) {
      console.error('Error updating purchase:', error);
      throw error;
    }
  }

  // Delete purchase
  async deletePurchase(id) {
    try {
      return await apiService.delete(`/purchases/${id}`);
    } catch (error) {
      console.error('Error deleting purchase:', error);
      throw error;
    }
  }

  // Create purchase with file uploads
  async createPurchaseWithFiles(purchaseData, files = []) {
    try {
      const formData = new FormData();
      
      // Add purchase data
      Object.keys(purchaseData).forEach(key => {
        if (key === 'items') {
          formData.append('items', JSON.stringify(purchaseData[key]));
        } else {
          formData.append(key, purchaseData[key]);
        }
      });

      // Add files
      files.forEach((file, index) => {
        formData.append(`itemImage_${index}`, file);
      });

      return await apiService.post('/purchases', formData);
    } catch (error) {
      console.error('Error creating purchase with files:', error);
      throw error;
    }
  }

  // Get purchases by vendor
  async getPurchasesByVendor(vendorName, params = {}) {
    try {
      const searchParams = { ...params, vendorName };
      return await this.getPurchases(searchParams);
    } catch (error) {
      console.error('Error fetching purchases by vendor:', error);
      throw error;
    }
  }

  // Get purchases by date range
  async getPurchasesByDateRange(startDate, endDate, params = {}) {
    try {
      const searchParams = { 
        ...params, 
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };
      return await this.getPurchases(searchParams);
    } catch (error) {
      console.error('Error fetching purchases by date range:', error);
      throw error;
    }
  }

  // Get purchase statistics
  async getPurchaseStats(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/purchases/stats${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching purchase stats:', error);
      throw error;
    }
  }
}

const purchaseService = new PurchaseService();
export default purchaseService;