import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

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
    <View style={{
      backgroundColor: theme.bg,
      flex: 1
    }}>
      {/* Header */}
      <View style={{
        backgroundColor: theme.cardBg,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.border
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '700',
          color: theme.text,
          marginBottom: 16
        }}>
          Billing & Invoices
        </Text>

        {/* Tabs */}
        <View style={{
          flexDirection: 'row',
          gap: 8,
          marginBottom: 16
        }}>
          <TouchableOpacity
            onPress={() => setActiveTab('invoices')}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor: activeTab === 'invoices' ? theme.accent : 'transparent',
              borderWidth: 1,
              borderColor: activeTab === 'invoices' ? theme.accent : theme.border
            }}
          >
            <Text style={{
              fontSize: 14,
              fontWeight: '500',
              color: activeTab === 'invoices' ? 'white' : theme.textSecondary
            }}>
              Invoices
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('payments')}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor: activeTab === 'payments' ? theme.accent : 'transparent',
              borderWidth: 1,
              borderColor: activeTab === 'payments' ? theme.accent : theme.border
            }}
          >
            <Text style={{
              fontSize: 14,
              fontWeight: '500',
              color: activeTab === 'payments' ? 'white' : theme.textSecondary
            }}>
              Payments
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <TextInput
          placeholder={`Search ${activeTab}...`}
          placeholderTextColor={theme.textSecondary}
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={{
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 8,
            padding: 12,
            backgroundColor: theme.bg,
            color: theme.text,
            fontSize: 14
          }}
        />
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* Summary Cards */}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 24
        }}>
          <View style={{
            backgroundColor: theme.cardBg,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.border,
            minWidth: 120,
            flex: 1,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#10b981',
              marginBottom: 4
            }}>
              ${totalRevenue.toFixed(2)}
            </Text>
            <Text style={{
              fontSize: 12,
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              textAlign: 'center'
            }}>
              Total Revenue
            </Text>
          </View>

          <View style={{
            backgroundColor: theme.cardBg,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.border,
            minWidth: 120,
            flex: 1,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#f59e0b',
              marginBottom: 4
            }}>
              ${pendingAmount.toFixed(2)}
            </Text>
            <Text style={{
              fontSize: 12,
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              textAlign: 'center'
            }}>
              Pending
            </Text>
          </View>

          <View style={{
            backgroundColor: theme.cardBg,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: theme.border,
            minWidth: 120,
            flex: 1,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#ef4444',
              marginBottom: 4
            }}>
              ${overdueAmount.toFixed(2)}
            </Text>
            <Text style={{
              fontSize: 12,
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              textAlign: 'center'
            }}>
              Overdue
            </Text>
          </View>
        </View>

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <View style={{ gap: 8 }}>
            {filteredInvoices.map((invoice) => (
              <TouchableOpacity
                key={invoice.id}
                style={{
                  backgroundColor: theme.cardBg,
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 12,
                  padding: 16
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 12
                }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: theme.text,
                      marginBottom: 4
                    }}>
                      {invoice.invoiceNumber}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: theme.textSecondary,
                      marginBottom: 4
                    }}>
                      {invoice.customer}
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: theme.textSecondary
                    }}>
                      Items: {invoice.items.join(', ')}
                    </Text>
                  </View>
                  <View style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 6,
                    backgroundColor: `${getStatusColor(invoice.status)}20`
                  }}>
                    <Text style={{
                      color: getStatusColor(invoice.status),
                      fontSize: 11,
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {getStatusText(invoice.status)}
                    </Text>
                  </View>
                </View>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <View>
                    <Text style={{
                      fontSize: 12,
                      color: theme.textSecondary,
                      marginBottom: 2
                    }}>
                      Amount
                    </Text>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: theme.text
                    }}>
                      ${invoice.amount.toFixed(2)}
                    </Text>
                  </View>
                  <View>
                    <Text style={{
                      fontSize: 12,
                      color: theme.textSecondary,
                      marginBottom: 2
                    }}>
                      Due Date
                    </Text>
                    <Text style={{
                      fontSize: 13,
                      color: theme.textSecondary
                    }}>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <View style={{ gap: 8 }}>
            {filteredPayments.map((payment) => (
              <TouchableOpacity
                key={payment.id}
                style={{
                  backgroundColor: theme.cardBg,
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 12,
                  padding: 16
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 12
                }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: theme.text,
                      marginBottom: 4
                    }}>
                      {payment.paymentId}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: theme.textSecondary,
                      marginBottom: 4
                    }}>
                      {payment.customer}
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: theme.textSecondary
                    }}>
                      Invoice: {payment.invoiceNumber}
                    </Text>
                  </View>
                  <View style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 6,
                    backgroundColor: `${getStatusColor(payment.status)}20`
                  }}>
                    <Text style={{
                      color: getStatusColor(payment.status),
                      fontSize: 11,
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {getStatusText(payment.status)}
                    </Text>
                  </View>
                </View>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <View>
                    <Text style={{
                      fontSize: 12,
                      color: theme.textSecondary,
                      marginBottom: 2
                    }}>
                      Amount
                    </Text>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: theme.text
                    }}>
                      ${payment.amount.toFixed(2)}
                    </Text>
                  </View>
                  <View>
                    <Text style={{
                      fontSize: 12,
                      color: theme.textSecondary,
                      marginBottom: 2
                    }}>
                      Method
                    </Text>
                    <Text style={{
                      fontSize: 13,
                      color: theme.textSecondary
                    }}>
                      {payment.method}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Empty State */}
        {((activeTab === 'invoices' && filteredInvoices.length === 0) ||
          (activeTab === 'payments' && filteredPayments.length === 0)) && (
          <View style={{
            backgroundColor: theme.cardBg,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
            padding: 32,
            alignItems: 'center'
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.textSecondary,
              marginBottom: 8
            }}>
              No {activeTab} found
            </Text>
            <Text style={{
              fontSize: 14,
              color: theme.textSecondary,
              textAlign: 'center'
            }}>
              Try adjusting your search criteria
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Billing;
