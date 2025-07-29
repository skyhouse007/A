import apiService from './api.js';

class InventoryService {
  // Get all inventory items with optional filters
  async getInventory(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/inventory${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      throw error;
    }
  }

  // Get single inventory item by ID
  async getInventoryItem(id) {
    try {
      return await apiService.get(`/inventory/${id}`);
    } catch (error) {
      console.error('Error fetching inventory item:', error);
      throw error;
    }
  }

  // Create new inventory item
  async createInventoryItem(itemData) {
    try {
      return await apiService.post('/inventory', itemData);
    } catch (error) {
      console.error('Error creating inventory item:', error);
      throw error;
    }
  }

  // Update existing inventory item
  async updateInventoryItem(id, itemData) {
    try {
      return await apiService.put(`/inventory/${id}`, itemData);
    } catch (error) {
      console.error('Error updating inventory item:', error);
      throw error;
    }
  }

  // Delete inventory item
  async deleteInventoryItem(id) {
    try {
      return await apiService.delete(`/inventory/${id}`);
    } catch (error) {
      console.error('Error deleting inventory item:', error);
      throw error;
    }
  }

  // Create inventory item with file upload
  async createInventoryItemWithFile(itemData, file = null) {
    try {
      const formData = new FormData();
      
      // Add item data
      Object.keys(itemData).forEach(key => {
        formData.append(key, itemData[key]);
      });

      // Add file if provided
      if (file) {
        formData.append('photo', file);
      }

      return await apiService.post('/inventory', formData);
    } catch (error) {
      console.error('Error creating inventory item with file:', error);
      throw error;
    }
  }

  // Update inventory item with file upload
  async updateInventoryItemWithFile(id, itemData, file = null) {
    try {
      const formData = new FormData();
      
      // Add item data
      Object.keys(itemData).forEach(key => {
        formData.append(key, itemData[key]);
      });

      // Add file if provided
      if (file) {
        formData.append('photo', file);
      }

      return await apiService.put(`/inventory/${id}`, formData);
    } catch (error) {
      console.error('Error updating inventory item with file:', error);
      throw error;
    }
  }

  // Search inventory items
  async searchInventory(query, params = {}) {
    try {
      const searchParams = { ...params, search: query };
      return await this.getInventory(searchParams);
    } catch (error) {
      console.error('Error searching inventory:', error);
      throw error;
    }
  }

  // Get low stock items
  async getLowStockItems(threshold = 10) {
    try {
      const params = { lowStock: threshold };
      return await this.getInventory(params);
    } catch (error) {
      console.error('Error fetching low stock items:', error);
      throw error;
    }
  }

  // Get inventory by vendor
  async getInventoryByVendor(vendorName, params = {}) {
    try {
      const searchParams = { ...params, vendorName };
      return await this.getInventory(searchParams);
    } catch (error) {
      console.error('Error fetching inventory by vendor:', error);
      throw error;
    }
  }

  // Get inventory statistics
  async getInventoryStats() {
    try {
      return await apiService.get('/inventory/stats');
    } catch (error) {
      console.error('Error fetching inventory stats:', error);
      throw error;
    }
  }

  // Update stock quantity
  async updateStock(id, quantity, operation = 'set') {
    try {
      const data = { quantity, operation }; // operation: 'set', 'add', 'subtract'
      return await apiService.patch(`/inventory/${id}/stock`, data);
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  }

  // Generate barcode for item
  async generateBarcode(id) {
    try {
      return await apiService.post(`/inventory/${id}/barcode`);
    } catch (error) {
      console.error('Error generating barcode:', error);
      throw error;
    }
  }

  // Get barcode image
  async getBarcodeImage(id) {
    try {
      const response = await fetch(`${apiService.baseURL}/inventory/${id}/barcode/image`, {
        headers: await apiService.getHeaders(),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.blob();
    } catch (error) {
      console.error('Error fetching barcode image:', error);
      throw error;
    }
  }
}

const inventoryService = new InventoryService();
export default inventoryService;