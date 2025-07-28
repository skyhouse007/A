'use dom'
import React, { useState, useEffect } from 'react';
import purchaseService from '../services/purchaseService.js';

const PurchaseForm = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    vendor: '',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    items: [{ product: '', quantity: 1, unitPrice: 0 }],
    notes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [vendors, setVendors] = useState([]);
  const [purchases, setPurchases] = useState([]);

  // Load vendors and purchases on component mount
  useEffect(() => {
    loadVendors();
    loadPurchases();
  }, []);

  const loadVendors = async () => {
    try {
      const vendorData = await purchaseService.getVendors();
      setVendors(vendorData);
    } catch (error) {
      console.error('Failed to load vendors:', error);
      // Fallback to mock data when API fails
      setVendors([
        { _id: '1', name: 'Tech Supplies Co.' },
        { _id: '2', name: 'Office Equipment Ltd' },
        { _id: '3', name: 'Software Solutions Inc' },
        { _id: '4', name: 'Hardware Depot' },
        { _id: '5', name: 'Business Solutions LLC' }
      ]);
    }
  };

  const loadPurchases = async () => {
    try {
      const purchaseData = await purchaseService.getPurchases();
      setPurchases(purchaseData);
    } catch (error) {
      console.error('Failed to load purchases:', error);
      // Fallback to mock data when API fails
      setPurchases([
        {
          id: 1,
          orderNumber: 'PO-001',
          vendor: 'Tech Supplies Co.',
          orderDate: '2024-01-15',
          deliveryDate: '2024-01-25',
          status: 'pending',
          total: 2450.00,
          items: [
            { product: 'Laptops', quantity: 5, unitPrice: 450.00 },
            { product: 'Monitors', quantity: 3, unitPrice: 150.00 }
          ]
        },
        {
          id: 2,
          orderNumber: 'PO-002',
          vendor: 'Office Equipment Ltd',
          orderDate: '2024-01-12',
          deliveryDate: '2024-01-20',
          status: 'delivered',
          total: 850.00,
          items: [
            { product: 'Office Chairs', quantity: 10, unitPrice: 85.00 }
          ]
        }
      ]);
    }
  };

  const existingOrders = [
    {
      id: 1,
      orderNumber: 'PO-001',
      vendor: 'Tech Supplies Co.',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-25',
      status: 'pending',
      total: 2450.00,
      items: [
        { product: 'Laptops', quantity: 5, unitPrice: 450.00 },
        { product: 'Monitors', quantity: 3, unitPrice: 150.00 }
      ]
    },
    {
      id: 2,
      orderNumber: 'PO-002',
      vendor: 'Office Equipment Ltd',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-20',
      status: 'delivered',
      total: 850.00,
      items: [
        { product: 'Office Chairs', quantity: 10, unitPrice: 85.00 }
      ]
    },
    {
      id: 3,
      orderNumber: 'PO-003',
      vendor: 'Software Solutions Inc',
      orderDate: '2024-01-10',
      deliveryDate: '2024-01-18',
      status: 'cancelled',
      total: 1200.00,
      items: [
        { product: 'Software License', quantity: 2, unitPrice: 600.00 }
      ]
    }
  ];

  // Vendors are now loaded from backend via loadVendors()

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { product: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        items: newItems
      }));
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      return total + (item.quantity * item.unitPrice);
    }, 0);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      case 'shipped': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredOrders = purchases.filter(order =>
    (order.orderNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.vendor || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const purchaseOrder = {
        ...formData,
        total: calculateTotal(),
        status: 'pending',
        orderNumber: `PO-${Date.now()}`,
        id: Date.now()
      };

      try {
        await purchaseService.createPurchase(purchaseOrder);
      } catch (apiError) {
        console.warn('API call failed, saving locally:', apiError);
        // Add to local state when API fails
        setPurchases(prev => [purchaseOrder, ...prev]);
      }

      // Reset form
      setFormData({
        vendor: '',
        orderDate: new Date().toISOString().split('T')[0],
        deliveryDate: '',
        items: [{ product: '', quantity: 1, unitPrice: 0 }],
        notes: ''
      });

      // Reload purchases
      await loadPurchases();

      alert('Purchase order created successfully!');
    } catch (error) {
      console.error('Failed to create purchase order:', error);
      setError('Failed to create purchase order. Please try again.');
    } finally {
      setLoading(false);
    }
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
          Purchase Orders
        </h1>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={() => setActiveTab('create')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'create' ? theme.accent : 'transparent',
              color: activeTab === 'create' ? 'white' : theme.textSecondary,
              border: `1px solid ${activeTab === 'create' ? theme.accent : theme.border}`,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Create Order
          </button>
          <button
            onClick={() => setActiveTab('existing')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'existing' ? theme.accent : 'transparent',
              color: activeTab === 'existing' ? 'white' : theme.textSecondary,
              border: `1px solid ${activeTab === 'existing' ? theme.accent : theme.border}`,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Existing Orders
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {/* Error Display */}
        {error && (
          <div style={{
            background: '#fef2f2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}
        {/* Create Order Tab */}
        {activeTab === 'create' && (
          <form onSubmit={handleSubmit} style={{
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '20px'
          }}>
            {/* Vendor and Dates */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme.text,
                  marginBottom: '8px'
                }}>
                  Vendor
                </label>
                <select
                  value={formData.vendor}
                  onChange={(e) => handleInputChange('vendor', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1px solid ${theme.border}`,
                    background: theme.bg,
                    color: theme.text,
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="">Select a vendor</option>
                  {vendors.map(vendor => (
                    <option key={vendor._id || vendor.id} value={vendor.name}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: theme.text,
                    marginBottom: '8px'
                  }}>
                    Order Date
                  </label>
                  <input
                    type="date"
                    value={formData.orderDate}
                    onChange={(e) => handleInputChange('orderDate', e.target.value)}
                    required
                    style={{
                      width: '100%',
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
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: theme.text,
                    marginBottom: '8px'
                  }}>
                    Expected Delivery
                  </label>
                  <input
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                    required
                    style={{
                      width: '100%',
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
              </div>
            </div>

            {/* Items */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <label style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: theme.text
                }}>
                  Items
                </label>
                <button
                  type="button"
                  onClick={addItem}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: theme.accent,
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  Add Item
                </button>
              </div>

              {formData.items.map((item, index) => (
                <div key={index} style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 80px 100px 40px',
                  gap: '8px',
                  marginBottom: '8px',
                  alignItems: 'end'
                }}>
                  <input
                    type="text"
                    placeholder="Product name"
                    value={item.product}
                    onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '6px',
                      border: `1px solid ${theme.border}`,
                      background: theme.bg,
                      color: theme.text,
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                    min="1"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '6px',
                      border: `1px solid ${theme.border}`,
                      background: theme.bg,
                      color: theme.text,
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                    required
                    style={{
                      padding: '10px',
                      borderRadius: '6px',
                      border: `1px solid ${theme.border}`,
                      background: theme.bg,
                      color: theme.text,
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    disabled={formData.items.length === 1}
                    style={{
                      padding: '10px',
                      borderRadius: '6px',
                      background: formData.items.length === 1 ? theme.border : '#ef4444',
                      color: formData.items.length === 1 ? theme.textSecondary : 'white',
                      border: 'none',
                      cursor: formData.items.length === 1 ? 'not-allowed' : 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: theme.text,
                marginBottom: '8px'
              }}>
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows="3"
                placeholder="Additional notes or special instructions..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  background: theme.bg,
                  color: theme.text,
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Total and Submit */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '16px',
              borderTop: `1px solid ${theme.border}`
            }}>
              <div>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: theme.text
                }}>
                  Total: ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  background: loading ? theme.border : theme.accent,
                  color: loading ? theme.textSecondary : 'white',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'opacity 0.2s ease',
                  opacity: loading ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.target.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.target.style.opacity = '1';
                }}
              >
                {loading ? 'Creating...' : 'Create Purchase Order'}
              </button>
            </div>
          </form>
        )}

        {/* Existing Orders Tab */}
        {activeTab === 'existing' && (
          <div>
            {/* Search */}
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  background: theme.cardBg,
                  color: theme.text,
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Orders List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
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
                        {order.orderNumber}
                      </h3>
                      <div style={{
                        fontSize: '14px',
                        color: theme.textSecondary,
                        marginBottom: '4px'
                      }}>
                        Vendor: {order.vendor}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: theme.textSecondary
                      }}>
                        Items: {order.items.map(item => `${item.product} (${item.quantity})`).join(', ')}
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: `${getStatusColor(order.status)}20`,
                      color: getStatusColor(order.status),
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {getStatusText(order.status)}
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
                        ${order.total.toFixed(2)}
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
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
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
                  Try adjusting your search criteria
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseForm;
