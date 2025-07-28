'use dom'
import React, { useState } from 'react';

const Orders = ({ theme }) => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      customer: 'ABC Corporation',
      items: [
        { name: 'Website Development', quantity: 1, price: 2500 },
        { name: 'SEO Package', quantity: 1, price: 800 }
      ],
      total: 3300,
      status: 'processing',
      orderDate: '2024-01-15',
      deliveryDate: '2024-02-15',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      customer: 'Tech Solutions Ltd',
      items: [
        { name: 'Mobile App Development', quantity: 1, price: 5000 }
      ],
      total: 5000,
      status: 'completed',
      orderDate: '2024-01-10',
      deliveryDate: '2024-02-10',
      paymentMethod: 'Credit Card'
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-003',
      customer: 'StartupCorp',
      items: [
        { name: 'Consultation', quantity: 5, price: 150 },
        { name: 'Logo Design', quantity: 1, price: 500 }
      ],
      total: 1250,
      status: 'pending',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-25',
      paymentMethod: 'PayPal'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#10b981';
      case 'processing': return '#3b82f6';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = orders.filter(order => order.status === 'completed')
                           .reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const processingOrders = orders.filter(order => order.status === 'processing').length;

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
          Order Management
        </h1>

        {/* Search and Filter */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '12px'
        }}>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              background: theme.bg,
              color: theme.text,
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              background: theme.bg,
              color: theme.text,
              fontSize: '14px',
              outline: 'none'
            }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
              fontSize: '20px',
              fontWeight: '700',
              color: '#10b981',
              marginBottom: '4px'
            }}>
              ${totalRevenue.toLocaleString()}
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
              fontSize: '20px',
              fontWeight: '700',
              color: theme.text,
              marginBottom: '4px'
            }}>
              {orders.length}
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
              fontSize: '20px',
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
              fontSize: '20px',
              fontWeight: '700',
              color: '#3b82f6',
              marginBottom: '4px'
            }}>
              {processingOrders}
            </div>
            <div style={{
              fontSize: '12px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Processing
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: theme.text,
                    margin: '0 0 4px 0'
                  }}>
                    {order.orderNumber}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: theme.textSecondary,
                    margin: 0
                  }}>
                    Customer: {order.customer}
                  </p>
                </div>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: `${getStatusColor(order.status)}20`,
                  color: getStatusColor(order.status),
                  fontSize: '12px',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {order.status}
                </span>
              </div>

              <div style={{
                background: theme.bg,
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px'
              }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: theme.text,
                  marginBottom: '8px'
                }}>
                  Items:
                </h4>
                {order.items.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    color: theme.textSecondary,
                    marginBottom: '4px'
                  }}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
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
                    fontSize: '18px',
                    fontWeight: '700',
                    color: theme.text
                  }}>
                    ${order.total.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary,
                    marginBottom: '2px'
                  }}>
                    Order Date
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: theme.textSecondary
                  }}>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary,
                    marginBottom: '2px'
                  }}>
                    Delivery
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: theme.textSecondary
                  }}>
                    {new Date(order.deliveryDate).toLocaleDateString()}
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
                    {order.paymentMethod}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
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
              No orders found
            </div>
            <div style={{
              fontSize: '14px',
              color: theme.textSecondary
            }}>
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
