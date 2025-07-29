import apiService from './api.js';

class TransactionService {
  // Get all transactions with optional filters
  async getTransactions(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/transactions${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  // Get single transaction by ID
  async getTransaction(id) {
    try {
      return await apiService.get(`/transactions/${id}`);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  }

  // Create new transaction
  async createTransaction(transactionData) {
    try {
      return await apiService.post('/transactions', transactionData);
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }

  // Update existing transaction
  async updateTransaction(id, transactionData) {
    try {
      return await apiService.put(`/transactions/${id}`, transactionData);
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw error;
    }
  }

  // Delete transaction
  async deleteTransaction(id) {
    try {
      return await apiService.delete(`/transactions/${id}`);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  }

  // Create cash in transaction
  async createCashIn(cashInData) {
    try {
      const transactionData = {
        ...cashInData,
        type: 'cash_in',
        date: new Date().toISOString()
      };
      return await this.createTransaction(transactionData);
    } catch (error) {
      console.error('Error creating cash in transaction:', error);
      throw error;
    }
  }

  // Create cash out transaction
  async createCashOut(cashOutData) {
    try {
      const transactionData = {
        ...cashOutData,
        type: 'cash_out',
        date: new Date().toISOString()
      };
      return await this.createTransaction(transactionData);
    } catch (error) {
      console.error('Error creating cash out transaction:', error);
      throw error;
    }
  }

  // Get transactions by type
  async getTransactionsByType(type, params = {}) {
    try {
      const searchParams = { ...params, type };
      return await this.getTransactions(searchParams);
    } catch (error) {
      console.error('Error fetching transactions by type:', error);
      throw error;
    }
  }

  // Get transactions by date range
  async getTransactionsByDateRange(startDate, endDate, params = {}) {
    try {
      const searchParams = { 
        ...params, 
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };
      return await this.getTransactions(searchParams);
    } catch (error) {
      console.error('Error fetching transactions by date range:', error);
      throw error;
    }
  }

  // Get transaction statistics
  async getTransactionStats(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/transactions/stats${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching transaction stats:', error);
      throw error;
    }
  }

  // Get cash flow summary
  async getCashFlowSummary(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/transactions/cash-flow${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Error fetching cash flow summary:', error);
      throw error;
    }
  }
}

const transactionService = new TransactionService();
export default transactionService;