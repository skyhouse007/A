import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';

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
          Inventory Management
        </Text>

        {/* Search and Filter */}
        <View style={{
          flexDirection: 'row',
          gap: 12,
          marginBottom: 0
        }}>
          <TextInput
            placeholder="Search products..."
            placeholderTextColor={theme.textSecondary}
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.bg,
              color: theme.text,
              fontSize: 14
            }}
          />
          <View style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: theme.bg,
            minWidth: 120
          }}>
            {/* Note: In a real app, you'd use a proper picker component */}
            <TouchableOpacity
              style={{
                padding: 12,
                alignItems: 'center'
              }}
            >
              <Text style={{
                color: theme.text,
                fontSize: 14
              }}>
                {filterCategory === 'all' ? 'All Categories' : filterCategory}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
              fontSize: 20,
              fontWeight: '700',
              color: theme.text,
              marginBottom: 4
            }}>
              {inventoryData.length}
            </Text>
            <Text style={{
              fontSize: 12,
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              textAlign: 'center'
            }}>
              Total Items
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
              fontSize: 20,
              fontWeight: '700',
              color: '#10b981',
              marginBottom: 4
            }}>
              {inventoryData.filter(item => item.status === 'in_stock').length}
            </Text>
            <Text style={{
              fontSize: 12,
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              textAlign: 'center'
            }}>
              In Stock
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
              fontSize: 20,
              fontWeight: '700',
              color: '#f59e0b',
              marginBottom: 4
            }}>
              {inventoryData.filter(item => item.status === 'low_stock').length}
            </Text>
            <Text style={{
              fontSize: 12,
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              textAlign: 'center'
            }}>
              Low Stock
            </Text>
          </View>
        </View>

        {/* Inventory List */}
        <View style={{ gap: 8 }}>
          {filteredInventory.map((item) => (
            <TouchableOpacity
              key={item.id}
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
                    {item.name}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    marginBottom: 4
                  }}>
                    SKU: {item.sku} • {item.category}
                  </Text>
                </View>
                <View style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                  backgroundColor: `${getStatusColor(item.status)}20`
                }}>
                  <Text style={{
                    color: getStatusColor(item.status),
                    fontSize: 11,
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {getStatusText(item.status)}
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
                    Stock
                  </Text>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: theme.text
                  }}>
                    {item.stock} units
                  </Text>
                </View>
                <View>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    marginBottom: 2
                  }}>
                    Price
                  </Text>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: theme.text
                  }}>
                    ${item.price}
                  </Text>
                </View>
                <View>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    marginBottom: 2
                  }}>
                    Updated
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary
                  }}>
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredInventory.length === 0 && (
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
              No items found
            </Text>
            <Text style={{
              fontSize: 14,
              color: theme.textSecondary,
              textAlign: 'center'
            }}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default InventoryList;
