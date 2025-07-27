'use dom'
import React, { useState } from 'react';

const Billing = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('invoices');
  const [searchTerm, setSearchTerm] = useState('');

  const invoicesData = [
    {
      id: 1,
      invoiceNumber: 'INV-001',
      customer: 'ABC Corporation',
      amount: 2450.00,
      status: 'paid',
      dueDate: '2024-01-20',
      issueDate: '2024-01-10',
      items: ['Consulting Services', 'Software License']
    },
    {
      id: 2,
      invoiceNumber: 'INV-002',
      customer: 'XYZ Ltd',
      amount: 1200.00,
      status: 'pending',
      dueDate: '2024-01-25',
      issueDate: '2024-01-15',
      items: ['Product Development', 'Support Services']
    },
    {
      id: 3,
      invoiceNumber: 'INV-003',
      customer: 'Tech Solutions Inc',
      amount: 3500.00,
      status: 'overdue',
      dueDate: '2024-01-05',
      issueDate: '2023-12-20',
      items: ['Hardware Installation', 'Training']
    },
    {
      id: 4,
      invoiceNumber: 'INV-004',
      customer: 'StartupCorp',
      amount: 800.00,
      status: 'draft',
      dueDate: '2024-02-01',
      issueDate: '2024-01-16',
      items: ['Consultation', 'Analysis Report']
    }
  ];

  const paymentsData = [
    {
      id: 1,
      paymentId: 'PAY-001',
      invoiceNumber: 'INV-001',
      customer: 'ABC Corporation',
      amount: 2450.00,
      method: 'Bank Transfer',
      date: '2024-01-18',
      status: 'completed'
    },
    {
      id: 2,
      paymentId: 'PAY-002',
      invoiceNumber: 'INV-005',
      customer: 'Global Enterprises',
      amount: 1800.00,
      method: 'Credit Card',
      date: '2024-01-17',
      status: 'completed'
    },
    {
      id: 3,
      paymentId: 'PAY-003',
      invoiceNumber: 'INV-002',
      customer: 'XYZ Ltd',
      amount: 600.00,
      method: 'Check',
      date: '2024-01-16',
      status: 'pending'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid':
      case 'completed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'overdue': return '#ef4444';
      case 'draft': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredInvoices = invoicesData.filter(invoice => 
    invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPayments = paymentsData.filter(payment => 
    payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = invoicesData
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const pendingAmount = invoicesData
    .filter(invoice => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  const overdueAmount = invoicesData
    .filter(invoice => invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div style={{
      background: theme.bg,
      minHeight: '100%',
      width: '100%',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: theme.cardBg,
        padding: '16px',
        borderBottom: `1px solid ${theme.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: theme.text,
          margin: '0 0 16px 0'
        }}>
          Billing & Invoices
        </h1>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <button
            onClick={() => setActiveTab('invoices')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'invoices' ? theme.accent : 'transparent',
              color: activeTab === 'invoices' ? 'white' : theme.textSecondary,
              border: `1px solid ${activeTab === 'invoices' ? theme.accent : theme.border}`,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Invoices
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'payments' ? theme.accent : 'transparent',
              color: activeTab === 'payments' ? 'white' : theme.textSecondary,
              border: `1px solid ${activeTab === 'payments' ? theme.accent : theme.border}`,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Payments
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: `1px solid ${theme.border}`,
            background: theme.bg,
            color: theme.text,
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = theme.accent;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = theme.border;
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{
            background: theme.cardBg,
            borderRadius: '12px',
            padding: '16px',
            border: `1px solid ${theme.border}`,
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#10b981',
              marginBottom: '4px'
            }}>
              ${totalRevenue.toFixed(2)}
            </div>
            <div style={{
              fontSize: '12px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Total Revenue
            </div>
          </div>

          <div style={{
            background: theme.cardBg,
            borderRadius: '12px',
            padding: '16px',
            border: `1px solid ${theme.border}`,
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#f59e0b',
              marginBottom: '4px'
            }}>
              ${pendingAmount.toFixed(2)}
            </div>
            <div style={{
              fontSize: '12px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Pending
            </div>
          </div>

          <div style={{
            background: theme.cardBg,
            borderRadius: '12px',
            padding: '16px',
            border: `1px solid ${theme.border}`,
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#ef4444',
              marginBottom: '4px'
            }}>
              ${overdueAmount.toFixed(2)}
            </div>
            <div style={{
              fontSize: '12px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Overdue
            </div>
          </div>
        </div>

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                style={{
                  background: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.border;
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = theme.cardBg;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: theme.text,
                      margin: '0 0 4px 0'
                    }}>
                      {invoice.invoiceNumber}
                    </h3>
                    <div style={{
                      fontSize: '14px',
                      color: theme.textSecondary,
                      marginBottom: '4px'
                    }}>
                      {invoice.customer}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: theme.textSecondary
                    }}>
                      Items: {invoice.items.join(', ')}
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: `${getStatusColor(invoice.status)}20`,
                    color: getStatusColor(invoice.status),
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {getStatusText(invoice.status)}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: theme.textSecondary,
                      marginBottom: '2px'
                    }}>
                      Amount
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: theme.text
                    }}>
                      ${invoice.amount.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: theme.textSecondary,
                      marginBottom: '2px'
                    }}>
                      Issue Date
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: theme.textSecondary
                    }}>
                      {new Date(invoice.issueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: theme.textSecondary,
                      marginBottom: '2px'
                    }}>
                      Due Date
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: theme.textSecondary
                    }}>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {filteredPayments.map((payment) => (
              <div
                key={payment.id}
                style={{
                  background: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.border;
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = theme.cardBg;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: theme.text,
                      margin: '0 0 4px 0'
                    }}>
                      {payment.paymentId}
                    </h3>
                    <div style={{
                      fontSize: '14px',
                      color: theme.textSecondary,
                      marginBottom: '4px'
                    }}>
                      {payment.customer}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: theme.textSecondary
                    }}>
                      Invoice: {payment.invoiceNumber}
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: `${getStatusColor(payment.status)}20`,
                    color: getStatusColor(payment.status),
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {getStatusText(payment.status)}
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: theme.textSecondary,
                      marginBottom: '2px'
                    }}>
                      Amount
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: theme.text
                    }}>
                      ${payment.amount.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: theme.textSecondary,
                      marginBottom: '2px'
                    }}>
                      Method
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: theme.textSecondary
                    }}>
                      {payment.method}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: theme.textSecondary,
                      marginBottom: '2px'
                    }}>
                      Date
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: theme.textSecondary
                    }}>
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {((activeTab === 'invoices' && filteredInvoices.length === 0) ||
          (activeTab === 'payments' && filteredPayments.length === 0)) && (
          <div style={{
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: theme.textSecondary,
              marginBottom: '8px'
            }}>
              No {activeTab} found
            </div>
            <div style={{
              fontSize: '14px',
              color: theme.textSecondary
            }}>
              Try adjusting your search criteria
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;
