'use dom'

import apiService from './api.js';

class SalesService {
  // Get all sales
  async getSales(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/sales${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Get single sale
  async getSale(id) {
    try {
      return await apiService.get(`/sales/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Create new sale
  async createSale(saleData) {
    try {
      return await apiService.post('/sales', saleData);
    } catch (error) {
      throw error;
    }
  }

  // Update sale
  async updateSale(id, saleData) {
    try {
      return await apiService.put(`/sales/${id}`, saleData);
    } catch (error) {
      throw error;
    }
  }

  // Delete sale
  async deleteSale(id) {
    try {
      return await apiService.delete(`/sales/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Bulk delete sales
  async bulkDeleteSales(ids) {
    try {
      return await apiService.post('/sales/bulk-delete', { ids });
    } catch (error) {
      throw error;
    }
  }

  // Get sales statistics
  async getSalesStats() {
    try {
      return await apiService.get('/sales/stats');
    } catch (error) {
      throw error;
    }
  }

  // Get sales by date range
  async getSalesByDateRange(startDate, endDate) {
    try {
      return await apiService.get(`/sales/date-range?start=${startDate}&end=${endDate}`);
    } catch (error) {
      throw error;
    }
  }

  // Get today's sales
  async getTodaySales() {
    try {
      return await apiService.get('/sales/today');
    } catch (error) {
      throw error;
    }
  }

  // Get sales by customer
  async getSalesByCustomer(customerId) {
    try {
      return await apiService.get(`/sales/customer/${customerId}`);
    } catch (error) {
      throw error;
    }
  }

  // Search sales
  async searchSales(query, params = {}) {
    try {
      const searchParams = { ...params, q: query };
      const queryString = new URLSearchParams(searchParams).toString();
      const endpoint = `/sales/search${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Generate PDF for sale
  async generatePDF(id) {
    try {
      return await apiService.get(`/sales/${id}/pdf`);
    } catch (error) {
      throw error;
    }
  }

  // Send sale via email
  async sendSaleEmail(id, emailData) {
    try {
      return await apiService.post(`/sales/${id}/send-email`, emailData);
    } catch (error) {
      throw error;
    }
  }

  // Get sales analytics
  async getSalesAnalytics(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/sales/analytics${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Export sales data
  async exportSales(format = 'csv', params = {}) {
    try {
      const queryString = new URLSearchParams({ ...params, format }).toString();
      const endpoint = `/sales/export${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Get GST sales
  async getGSTSales(params = {}) {
    try {
      const queryString = new URLSearchParams({ ...params, gst: true }).toString();
      const endpoint = `/sales${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Get non-GST sales
  async getNonGSTSales(params = {}) {
    try {
      const queryString = new URLSearchParams({ ...params, gst: false }).toString();
      const endpoint = `/sales${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Update sale status
  async updateSaleStatus(id, status) {
    try {
      return await apiService.patch(`/sales/${id}/status`, { status });
    } catch (error) {
      throw error;
    }
  }

  // Get sales by payment method
  async getSalesByPaymentMethod(paymentMethod) {
    try {
      return await apiService.get(`/sales/payment-method/${paymentMethod}`);
    } catch (error) {
      throw error;
    }
  }
}

const salesService = new SalesService();
export default salesService; 