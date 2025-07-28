

import apiService from './api.js';

class InventoryService {
  // Get all inventory items
  async getInventory(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/inventory${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Get single inventory item
  async getInventoryItem(id) {
    try {
      return await apiService.get(`/inventory/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Create new inventory item
  async createInventoryItem(itemData) {
    try {
      return await apiService.post('/inventory', itemData);
    } catch (error) {
      throw error;
    }
  }

  // Update inventory item
  async updateInventoryItem(id, itemData) {
    try {
      return await apiService.put(`/inventory/${id}`, itemData);
    } catch (error) {
      throw error;
    }
  }

  // Delete inventory item
  async deleteInventoryItem(id) {
    try {
      return await apiService.delete(`/inventory/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Bulk delete inventory items
  async bulkDeleteInventoryItems(ids) {
    try {
      return await apiService.post('/inventory/bulk-delete', { ids });
    } catch (error) {
      throw error;
    }
  }

  // Get inventory statistics
  async getInventoryStats() {
    try {
      return await apiService.get('/inventory/stats');
    } catch (error) {
      throw error;
    }
  }

  // Search inventory items
  async searchInventory(query, params = {}) {
    try {
      const searchParams = { ...params, q: query };
      const queryString = new URLSearchParams(searchParams).toString();
      const endpoint = `/inventory/search${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Update stock levels
  async updateStock(id, stockData) {
    try {
      return await apiService.patch(`/inventory/${id}/stock`, stockData);
    } catch (error) {
      throw error;
    }
  }

  // Get low stock alerts
  async getLowStockAlerts() {
    try {
      return await apiService.get('/inventory/low-stock');
    } catch (error) {
      throw error;
    }
  }

  // Get out of stock items
  async getOutOfStockItems() {
    try {
      return await apiService.get('/inventory/out-of-stock');
    } catch (error) {
      throw error;
    }
  }

  // Export inventory data
  async exportInventory(format = 'csv') {
    try {
      return await apiService.get(`/inventory/export?format=${format}`);
    } catch (error) {
      throw error;
    }
  }

  // Import inventory data
  async importInventory(fileData) {
    try {
      return await apiService.post('/inventory/import', fileData);
    } catch (error) {
      throw error;
    }
  }

  // Get inventory categories
  async getCategories() {
    try {
      return await apiService.get('/inventory/categories');
    } catch (error) {
      throw error;
    }
  }

  // Get inventory suppliers
  async getSuppliers() {
    try {
      return await apiService.get('/inventory/suppliers');
    } catch (error) {
      throw error;
    }
  }
}

const inventoryService = new InventoryService();
export default inventoryService; 