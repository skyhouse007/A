import apiService from './api.js';

class BillingService {
  // Get all invoices for the current user
  async getInvoices(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/invoices${queryString ? `?${queryString}` : ''}`;
      return await apiService.get(endpoint);
    } catch (error) {
      throw error;
    }
  }

  // Get a single invoice by ID
  async getInvoice(id) {
    try {
      return await apiService.get(`/invoices/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Create a new invoice
  async createInvoice(invoiceData) {
    try {
      return await apiService.post('/invoices', invoiceData);
    } catch (error) {
      throw error;
    }
  }

  // Update an existing invoice
  async updateInvoice(id, invoiceData) {
    try {
      return await apiService.put(`/invoices/${id}`, invoiceData);
    } catch (error) {
      throw error;
    }
  }

  // Delete an invoice
  async deleteInvoice(id) {
    try {
      return await apiService.delete(`/invoices/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Get invoice statistics
  async getInvoiceStats() {
    try {
      return await apiService.get('/invoices/stats');
    } catch (error) {
      throw error;
    }
  }

  // Send invoice via email
  async sendInvoice(id, emailData) {
    try {
      return await apiService.post(`/invoices/${id}/send`, emailData);
    } catch (error) {
      throw error;
    }
  }

  // Generate PDF for invoice
  async generatePDF(id) {
    try {
      return await apiService.get(`/invoices/${id}/pdf`);
    } catch (error) {
      throw error;
    }
  }

  // Get customers list
  async getCustomers() {
    try {
      return await apiService.get('/customers');
    } catch (error) {
      throw error;
    }
  }

  // Create a new customer
  async createCustomer(customerData) {
    try {
      return await apiService.post('/customers', customerData);
    } catch (error) {
      throw error;
    }
  }

  // Update customer
  async updateCustomer(id, customerData) {
    try {
      return await apiService.put(`/customers/${id}`, customerData);
    } catch (error) {
      throw error;
    }
  }

  // Delete customer
  async deleteCustomer(id) {
    try {
      return await apiService.delete(`/customers/${id}`);
    } catch (error) {
      throw error;
    }
  }

  // Get invoice templates
  async getTemplates() {
    try {
      return await apiService.get('/templates');
    } catch (error) {
      throw error;
    }
  }

  // Save invoice template
  async saveTemplate(templateData) {
    try {
      return await apiService.post('/templates', templateData);
    } catch (error) {
      throw error;
    }
  }
}

const billingService = new BillingService();
export default billingService;
