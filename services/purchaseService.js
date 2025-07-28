

import apiService from './api.js';

class PurchaseService {
  // Get all purchases
  async getPurchases(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/purchases${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Get single purchase
  async getPurchase(id) {
    try {
      return await apiService.get(`/purchases/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Create new purchase
  async createPurchase(purchaseData) {
    try {
      return await apiService.post('/purchases', purchaseData);
    } catch (error) {
      throw error;
    }
  }

  // Update purchase
  async updatePurchase(id, purchaseData) {
    try {
      return await apiService.put(`/purchases/${id}`, purchaseData);
    } catch (error) {
      throw error;
    }
  }

  // Delete purchase
  async deletePurchase(id) {
    try {
      return await apiService.delete(`/purchases/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Bulk delete purchases
  async bulkDeletePurchases(ids) {
    try {
      return await apiService.post('/purchases/bulk-delete', { ids });
    } catch (error) {
      throw error;
    }
  }

  // Get purchase statistics
  async getPurchaseStats() {
    try {
      return await apiService.get('/purchases/stats');
    } catch (error) {
      throw error;
    }
  }

  // Get purchases by vendor
  async getPurchasesByVendor(vendorId) {
    try {
      return await apiService.get(`/purchases/vendor/${vendorId}`);
    } catch (error) {
      throw error;
    }
  }

  // Get purchases by date range
  async getPurchasesByDateRange(startDate, endDate) {
    try {
      return await apiService.get(`/purchases/date-range?start=${startDate}&end=${endDate}`);
    } catch (error) {
      throw error;
    }
  }

  // Search purchases
  async searchPurchases(query, params = {}) {
    try {
      const searchParams = { ...params, q: query };
      const queryString = new URLSearchParams(searchParams).toString();
      const endpoint = `/purchases/search${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Generate PDF for purchase
  async generatePDF(id) {
    try {
      return await apiService.get(`/purchases/${id}/pdf`);
    } catch (error) {
      throw error;
    }
  }

  // Send purchase via email
  async sendPurchaseEmail(id, emailData) {
    try {
      return await apiService.post(`/purchases/${id}/send-email`, emailData);
    } catch (error) {
      throw error;
    }
  }

  // Get purchase analytics
  async getPurchaseAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/purchases/analytics${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Export purchase data
  async exportPurchases(format = 'csv', params = {}) {
    try {
      const queryString = new URLSearchParams({ ...params, format }).toString();
      const endpoint = `/purchases/export${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Get GST purchases
  async getGSTPurchases(params = {}) {
    try {
      const queryString = new URLSearchParams({ ...params, gst: true }).toString();
      const endpoint = `/purchases${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Get non-GST purchases
  async getNonGSTPurchases(params = {}) {
    try {
      const queryString = new URLSearchParams({ ...params, gst: false }).toString();
      const endpoint = `/purchases${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Update purchase status
  async updatePurchaseStatus(id, status) {
    try {
      return await apiService.patch(`/purchases/${id}/status`, { status });
    } catch (error) {
      throw error;
    }
  }

  // Get purchases by payment method
  async getPurchasesByPaymentMethod(paymentMethod) {
    try {
      return await apiService.get(`/purchases/payment-method/${paymentMethod}`);
    } catch (error) {
      throw error;
    }
  }

  // Get pending deliveries
  async getPendingDeliveries() {
    try {
      return await apiService.get('/purchases/pending-deliveries');
    } catch (error) {
      throw error;
    }
  }

  // Mark purchase as delivered
  async markAsDelivered(id, deliveryData) {
    try {
      return await apiService.patch(`/purchases/${id}/delivered`, deliveryData);
    } catch (error) {
      throw error;
    }
  }

  // Get vendor list
  async getVendors() {
    try {
      return await apiService.get('/vendors');
    } catch (error) {
      throw error;
    }
  }

  // Create vendor
  async createVendor(vendorData) {
    try {
      return await apiService.post('/vendors', vendorData);
    } catch (error) {
      throw error;
    }
  }

  // Update vendor
  async updateVendor(id, vendorData) {
    try {
      return await apiService.put(`/vendors/${id}`, vendorData);
    } catch (error) {
      throw error;
    }
  }

  // Delete vendor
  async deleteVendor(id) {
    try {
      return await apiService.delete(`/vendors/${id}`);
    } catch (error) {
      throw error;
    }
  }
}

const purchaseService = new PurchaseService();
export default purchaseService; 