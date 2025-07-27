'use dom'
import React, { useState } from 'react';

const SalesList = ({ theme }) => {
  const [filterPeriod, setFilterPeriod] = useState('today');

  const salesData = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: 'John Smith',
      items: ['Product A', 'Product B'],
      total: 149.98,
      status: 'completed',
      paymentMethod: 'Credit Card',
      date: '2024-01-15T10:30:00',
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: 'Sarah Johnson',
      items: ['Product C'],
      total: 199.99,
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      date: '2024-01-15T09:15:00',
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customer: 'Mike Wilson',
      items: ['Product A', 'Product D'],
      total: 129.98,
      status: 'completed',
      paymentMethod: 'Cash',
      date: '2024-01-14T16:45:00',
    },
    {
      id: 4,
      orderNumber: 'ORD-004',
      customer: 'Emily Davis',
      items: ['Product B', 'Product C', 'Product E'],
      total: 329.97,
      status: 'processing',
      paymentMethod: 'Credit Card',
      date: '2024-01-14T14:20:00',
    },
    {
      id: 5,
      orderNumber: 'ORD-005',
      customer: 'Robert Brown',
      items: ['Product E'],
      total: 79.99,
      status: 'cancelled',
      paymentMethod: 'PayPal',
      date: '2024-01-13T11:10:00',
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const totalRevenue = salesData
    .filter(sale => sale.status === 'completed')
    .reduce((sum, sale) => sum + sale.total, 0);

  const pendingOrders = salesData.filter(sale => sale.status === 'pending').length;
  const completedOrders = salesData.filter(sale => sale.status === 'completed').length;

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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: theme.text,
            margin: 0
          }}>
            Sales Records
          </h1>
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              background: theme.bg,
              color: theme.text,
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ padding: '16px' }}>
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
              Revenue
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
              color: theme.text,
              marginBottom: '4px'
            }}>
              {salesData.length}
            </div>
            <div style={{
              fontSize: '12px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Total Orders
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
              {pendingOrders}
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
              color: '#10b981',
              marginBottom: '4px'
            }}>
              {completedOrders}
            </div>
            <div style={{
              fontSize: '12px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Completed
            </div>
          </div>
        </div>

        {/* Sales List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {salesData.map((sale) => (
            <div
              key={sale.id}
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
                    {sale.orderNumber}
                  </h3>
                  <div style={{
                    fontSize: '14px',
                    color: theme.textSecondary,
                    marginBottom: '4px'
                  }}>
                    Customer: {sale.customer}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary
                  }}>
                    Items: {sale.items.join(', ')}
                  </div>
                </div>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: `${getStatusColor(sale.status)}20`,
                  color: getStatusColor(sale.status),
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {getStatusText(sale.status)}
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
                    Total
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: theme.text
                  }}>
                    ${sale.total.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary,
                    marginBottom: '2px'
                  }}>
                    Payment
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: theme.textSecondary
                  }}>
                    {sale.paymentMethod}
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
                    fontSize: '12px',
                    color: theme.textSecondary
                  }}>
                    {formatDate(sale.date)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesList;
