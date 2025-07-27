'use dom'
import React, { useState } from 'react';

const InventoryList = ({ theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const inventoryData = [
    {
      id: 1,
      name: 'Product A',
      sku: 'SKU-001',
      category: 'Electronics',
      stock: 150,
      price: 99.99,
      status: 'in_stock',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Product B',
      sku: 'SKU-002',
      category: 'Clothing',
      stock: 25,
      price: 49.99,
      status: 'low_stock',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      name: 'Product C',
      sku: 'SKU-003',
      category: 'Electronics',
      stock: 0,
      price: 199.99,
      status: 'out_of_stock',
      lastUpdated: '2024-01-13'
    },
    {
      id: 4,
      name: 'Product D',
      sku: 'SKU-004',
      category: 'Home & Garden',
      stock: 75,
      price: 29.99,
      status: 'in_stock',
      lastUpdated: '2024-01-15'
    },
    {
      id: 5,
      name: 'Product E',
      sku: 'SKU-005',
      category: 'Sports',
      stock: 12,
      price: 79.99,
      status: 'low_stock',
      lastUpdated: '2024-01-12'
    }
  ];

  const categories = ['all', 'Electronics', 'Clothing', 'Home & Garden', 'Sports'];

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'in_stock': return '#10b981';
      case 'low_stock': return '#f59e0b';
      case 'out_of_stock': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'in_stock': return 'In Stock';
      case 'low_stock': return 'Low Stock';
      case 'out_of_stock': return 'Out of Stock';
      default: return 'Unknown';
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
          Inventory Management
        </h1>

        {/* Search and Filter */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '12px',
          marginBottom: '0'
        }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
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
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              background: theme.bg,
              color: theme.text,
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ padding: '16px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
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
              color: theme.text,
              marginBottom: '4px'
            }}>
              {inventoryData.length}
            </div>
            <div style={{
              fontSize: '12px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Total Items
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
              color: '#10b981',
              marginBottom: '4px'
            }}>
              {inventoryData.filter(item => item.status === 'in_stock').length}
            </div>
            <div style={{
              fontSize: '12px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              In Stock
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
              {inventoryData.filter(item => item.status === 'low_stock').length}
            </div>
            <div style={{
              fontSize: '12px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Low Stock
            </div>
          </div>
        </div>

        {/* Inventory List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {filteredInventory.map((item) => (
            <div
              key={item.id}
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
                    {item.name}
                  </h3>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary,
                    marginBottom: '4px'
                  }}>
                    SKU: {item.sku} • {item.category}
                  </div>
                </div>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: `${getStatusColor(item.status)}20`,
                  color: getStatusColor(item.status),
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase'
                }}>
                  {getStatusText(item.status)}
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
                    Stock
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: theme.text
                  }}>
                    {item.stock} units
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary,
                    marginBottom: '2px'
                  }}>
                    Price
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: theme.text
                  }}>
                    ${item.price}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary,
                    marginBottom: '2px'
                  }}>
                    Updated
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: theme.textSecondary
                  }}>
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInventory.length === 0 && (
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
              No items found
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

export default InventoryList;
