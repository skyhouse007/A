import apiService from './api.js';

class LedgerService {
  // Get all ledgers with optional filters
  async getLedgers(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/ledgers${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching ledgers:', error);
      throw error;
    }
  }

  // Get single ledger by ID
  async getLedger(id) {
    try {
      return await apiService.get(`/ledgers/${id}`);
    } catch (error) {
      console.error('Error fetching ledger:', error);
      throw error;
    }
  }

  // Create new ledger
  async createLedger(ledgerData) {
    try {
      return await apiService.post('/ledgers', ledgerData);
    } catch (error) {
      console.error('Error creating ledger:', error);
      throw error;
    }
  }

  // Update existing ledger
  async updateLedger(id, ledgerData) {
    try {
      return await apiService.put(`/ledgers/${id}`, ledgerData);
    } catch (error) {
      console.error('Error updating ledger:', error);
      throw error;
    }
  }

  // Delete ledger
  async deleteLedger(id) {
    try {
      return await apiService.delete(`/ledgers/${id}`);
    } catch (error) {
      console.error('Error deleting ledger:', error);
      throw error;
    }
  }

  // Get ledger balance
  async getLedgerBalance(id) {
    try {
      return await apiService.get(`/ledgers/${id}/balance`);
    } catch (error) {
      console.error('Error fetching ledger balance:', error);
      throw error;
    }
  }

  // Get ledger transactions
  async getLedgerTransactions(id, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/ledgers/${id}/transactions${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching ledger transactions:', error);
      throw error;
    }
  }

  // Search ledgers
  async searchLedgers(query, params = {}) {
    try {
      const searchParams = { ...params, search: query };
      return await this.getLedgers(searchParams);
    } catch (error) {
      console.error('Error searching ledgers:', error);
      throw error;
    }
  }

  // Get ledger summary
  async getLedgerSummary(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/ledgers/summary${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching ledger summary:', error);
      throw error;
    }
  }

  // Get ledgers by type
  async getLedgersByType(type, params = {}) {
    try {
      const searchParams = { ...params, type };
      return await this.getLedgers(searchParams);
    } catch (error) {
      console.error('Error fetching ledgers by type:', error);
      throw error;
    }
  }
}

const ledgerService = new LedgerService();
export default ledgerService;