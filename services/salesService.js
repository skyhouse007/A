import apiService from './api.js';

class SalesService {
  // Get all sales with optional filters
  async getSales(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/sales${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching sales:', error);
      throw error;
    }
  }

  // Get single sale by ID
  async getSale(id) {
    try {
      return await apiService.get(`/sales/${id}`);
    } catch (error) {
      console.error('Error fetching sale:', error);
      throw error;
    }
  }

  // Create new sale
  async createSale(saleData) {
    try {
      return await apiService.post('/sales', saleData);
    } catch (error) {
      console.error('Error creating sale:', error);
      throw error;
    }
  }

  // Update existing sale
  async updateSale(id, saleData) {
    try {
      return await apiService.put(`/sales/${id}`, saleData);
    } catch (error) {
      console.error('Error updating sale:', error);
      throw error;
    }
  }

  // Delete sale
  async deleteSale(id) {
    try {
      return await apiService.delete(`/sales/${id}`);
    } catch (error) {
      console.error('Error deleting sale:', error);
      throw error;
    }
  }

  // Get sales statistics
  async getSalesStats(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/sales/stats/summary${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching sales stats:', error);
      throw error;
    }
  }

  // Get sales PDF
  async getSalePDF(id) {
    try {
      const response = await fetch(`${apiService.baseURL}/sales/pdf/${id}`, {
        headers: await apiService.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.blob();
    } catch (error) {
      console.error('Error fetching sale PDF:', error);
      throw error;
    }
  }

  // Create sale with file uploads
  async createSaleWithFiles(saleData, files = []) {
    try {
      const formData = new FormData();
      
      // Add sale data
      Object.keys(saleData).forEach(key => {
        if (key === 'items') {
          formData.append('items', JSON.stringify(saleData[key]));
        } else {
          formData.append(key, saleData[key]);
        }
      });

      // Add files
      files.forEach((file, index) => {
        formData.append(`itemImage_${index}`, file);
      });

      return await apiService.post('/sales', formData);
    } catch (error) {
      console.error('Error creating sale with files:', error);
      throw error;
    }
  }

  // Get sales by customer
  async getSalesByCustomer(customerName, params = {}) {
    try {
      const searchParams = { ...params, customerName };
      return await this.getSales(searchParams);
    } catch (error) {
      console.error('Error fetching sales by customer:', error);
      throw error;
    }
  }

  // Get sales by date range
  async getSalesByDateRange(startDate, endDate, params = {}) {
    try {
      const searchParams = { 
        ...params, 
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };
      return await this.getSales(searchParams);
    } catch (error) {
      console.error('Error fetching sales by date range:', error);
      throw error;
    }
  }

  // Get sales by status
  async getSalesByStatus(status, params = {}) {
    try {
      const searchParams = { ...params, status };
      return await this.getSales(searchParams);
    } catch (error) {
      console.error('Error fetching sales by status:', error);
      throw error;
    }
  }
}

const salesService = new SalesService();
export default salesService;