'use dom'
import React, { useState } from 'react';

const Customers = ({ theme }) => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'ABC Corporation',
      email: 'contact@abccorp.com',
      phone: '+1 234-567-8900',
      address: '123 Business Ave, NY 10001',
      type: 'Enterprise',
      status: 'active',
      joinDate: '2023-06-15',
      totalOrders: 12,
      totalSpent: 15600
    },
    {
      id: 2,
      name: 'Tech Solutions Ltd',
      email: 'info@techsolutions.com',
      phone: '+1 234-567-8901',
      address: '456 Tech Street, CA 90210',
      type: 'Business',
      status: 'active',
      joinDate: '2023-08-22',
      totalOrders: 8,
      totalSpent: 12400
    },
    {
      id: 3,
      name: 'StartupCorp',
      email: 'hello@startupcorp.com',
      phone: '+1 234-567-8902',
      address: '789 Innovation Blvd, TX 73301',
      type: 'Startup',
      status: 'inactive',
      joinDate: '2023-11-10',
      totalOrders: 3,
      totalSpent: 2800
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    type: 'Business'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const customerTypes = ['Business', 'Enterprise', 'Startup', 'Individual'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: Date.now(),
      ...formData,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: 0
    };
    setCustomers(prev => [...prev, newCustomer]);
    setFormData({ name: '', email: '', phone: '', address: '', type: 'Business' });
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || customer.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status) => {
    return status === 'active' ? '#10b981' : '#6b7280';
  };

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
          Customer Management
        </h1>

        {/* Search and Filter */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '12px'
        }}>
          <input
            type="text"
            placeholder="Search customers..."
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
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
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
            <option value="all">All Types</option>
            {customerTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Add Customer Form */}
        <form onSubmit={handleSubmit} style={{
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: theme.text,
            marginBottom: '16px'
          }}>
            Add New Customer
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <input
              type="text"
              placeholder="Customer Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
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
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
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
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
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
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
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
              {customerTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              background: theme.bg,
              color: theme.text,
              fontSize: '14px',
              outline: 'none',
              marginBottom: '16px'
            }}
          />

          <button
            type="submit"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              background: theme.accent,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Add Customer
          </button>
        </form>

        {/* Customers List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '16px'
        }}>
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                padding: '20px',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
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
                    {customer.name}
                  </h3>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: theme.bg,
                    fontSize: '12px',
                    color: theme.textSecondary
                  }}>
                    {customer.type}
                  </span>
                </div>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: `${getStatusColor(customer.status)}20`,
                  color: getStatusColor(customer.status),
                  fontSize: '12px',
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}>
                  {customer.status}
                </span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <p style={{
                  fontSize: '14px',
                  color: theme.textSecondary,
                  margin: '0 0 4px 0'
                }}>
                  📧 {customer.email}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: theme.textSecondary,
                  margin: '0 0 4px 0'
                }}>
                  📞 {customer.phone}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: theme.textSecondary,
                  margin: 0
                }}>
                  📍 {customer.address}
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '16px',
                paddingTop: '16px',
                borderTop: `1px solid ${theme.border}`
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: theme.text
                  }}>
                    {customer.totalOrders}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary
                  }}>
                    Orders
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: theme.accent
                  }}>
                    ${customer.totalSpent.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary
                  }}>
                    Total Spent
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary,
                    marginBottom: '2px'
                  }}>
                    Joined
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary
                  }}>
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
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
              No customers found
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

export default Customers;
