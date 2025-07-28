import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import useAxios from "../hooks/useAxios";

const PurchaseList = ({ theme }) => {
  const [purchases, setPurchases] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    vendorName: "",
    startDate: "",
    endDate: "",
    gstType: "all",
  });
  const [sortBy, setSortBy] = useState("purchaseDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({});
  const [deleting, setDeleting] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    fetchPurchases();
    fetchStats();
  }, [currentPage, filters, sortBy, sortOrder]);

  const fetchPurchases = async () => {
    try {
      setLoading(true);

      // Mock purchases data for demo purposes (since no backend is available)
      const mockPurchases = [
        {
          _id: "1",
          date: "2024-01-15",
          vendorName: "ABC Suppliers",
          totalAmount: 150000,
          status: "completed",
          invoiceNumber: "PO-001",
          items: [
            { name: "Office Supplies", quantity: 100, price: 500 },
            { name: "Computer Hardware", quantity: 10, price: 10000 }
          ],
          gst: 27000,
          description: "Monthly office supplies and hardware"
        },
        {
          _id: "2",
          date: "2024-01-10",
          vendorName: "XYZ Trading Co.",
          totalAmount: 75000,
          status: "pending",
          invoiceNumber: "PO-002",
          items: [
            { name: "Raw Materials", quantity: 50, price: 1200 },
            { name: "Packaging", quantity: 200, price: 75 }
          ],
          gst: 13500,
          description: "Raw materials for production"
        },
        {
          _id: "3",
          date: "2024-01-08",
          vendorName: "Global Electronics",
          totalAmount: 200000,
          status: "completed",
          invoiceNumber: "PO-003",
          items: [
            { name: "Laptops", quantity: 5, price: 35000 },
            { name: "Monitors", quantity: 10, price: 15000 }
          ],
          gst: 36000,
          description: "IT equipment for new office"
        },
        {
          _id: "4",
          date: "2024-01-05",
          vendorName: "Modern Textiles",
          totalAmount: 50000,
          status: "cancelled",
          invoiceNumber: "PO-004",
          items: [
            { name: "Fabric", quantity: 100, price: 400 },
            { name: "Thread", quantity: 50, price: 200 }
          ],
          gst: 9000,
          description: "Textile materials order"
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setPurchases(mockPurchases);
      setTotalPages(1);
    } catch (err) {
      console.error("Failed to load purchases", err);
      setPurchases([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Mock stats data for demo purposes (since no backend is available)
      const mockStats = {
        summary: {
          totalPurchases: 4,
          totalAmount: 475000,
          totalGST: 85500,
          avgPurchaseValue: 118750
        },
        thisMonth: {
          purchases: 4,
          amount: 475000
        },
        lastMonth: {
          purchases: 6,
          amount: 320000
        },
        pending: 1,
        completed: 2,
        cancelled: 1
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      setStats(mockStats);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Purchase",
      "Are you sure you want to delete this purchase?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Mock API call for demo purposes (since no backend is available)
              await new Promise(resolve => setTimeout(resolve, 300));
              setPurchases(prev => prev.filter(p => p._id !== id));
              fetchStats();
            } catch (err) {
              console.error("Failed to delete purchase", err);
              Alert.alert("Error", "Failed to delete purchase");
            }
          }
        }
      ]
    );
  };

  const handleDeleteAll = async () => {
    Alert.alert(
      "Delete All Purchases",
      "Are you sure you want to delete ALL listed purchases? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              // Mock API call for demo purposes (since no backend is available)
              await new Promise(resolve => setTimeout(resolve, 500));
              setPurchases([]);
              setTotalPages(1);
            } catch (err) {
              Alert.alert("Error", "Failed to delete all purchases.");
              console.error(err);
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-IN');
    } catch {
      return 'Invalid Date';
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#f59e0b',
      'completed': '#10b981',
      'cancelled': '#ef4444'
    };
    return colors[status?.toLowerCase()] || '#6b7280';
  };

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.bg,
        padding: 64
      }}>
        <ActivityIndicator size="large" color={theme.accent} />
        <Text style={{
          marginTop: 16,
          fontSize: 16,
          color: theme.text,
          fontWeight: '600'
        }}>
          Loading purchases...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: theme.bg
    }}>
      <View style={{ padding: 16 }}>
        {/* Header with Stats */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 24,
            fontWeight: '700',
            color: theme.text,
            marginBottom: 16
          }}>
            Purchase Management
          </Text>
          
          {/* Stats Cards */}
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 16
          }}>
            <View style={{
              backgroundColor: theme.cardBg,
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.border,
              flex: 1,
              minWidth: 160
            }}>
              <View style={{
                width: 32,
                height: 32,
                backgroundColor: '#3b82f6',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
              }}>
                <Text style={{ color: 'white', fontSize: 16 }}>📦</Text>
              </View>
              <Text style={{
                fontSize: 12,
                color: theme.textSecondary,
                fontWeight: '500',
                marginBottom: 4
              }}>
                Total Purchases
              </Text>
              <Text style={{
                fontSize: 20,
                fontWeight: '700',
                color: theme.text
              }}>
                {stats.summary?.totalPurchases || 0}
              </Text>
            </View>

            <View style={{
              backgroundColor: theme.cardBg,
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.border,
              flex: 1,
              minWidth: 160
            }}>
              <View style={{
                width: 32,
                height: 32,
                backgroundColor: '#10b981',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
              }}>
                <Text style={{ color: 'white', fontSize: 16 }}>💰</Text>
              </View>
              <Text style={{
                fontSize: 12,
                color: theme.textSecondary,
                fontWeight: '500',
                marginBottom: 4
              }}>
                Total Amount
              </Text>
              <Text style={{
                fontSize: 20,
                fontWeight: '700',
                color: theme.text
              }}>
                {formatCurrency(stats.summary?.totalAmount || 0)}
              </Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={{
          backgroundColor: theme.cardBg,
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.border,
          marginBottom: 16
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.text
            }}>
              Filters
            </Text>
            <TouchableOpacity
              onPress={() => setFilters({ status: "", vendorName: "", startDate: "", endDate: "", gstType: "all" })}
            >
              <Text style={{
                fontSize: 14,
                color: theme.accent,
                fontWeight: '500'
              }}>
                Clear All
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ gap: 12 }}>
            <TextInput
              placeholder="Search vendor..."
              placeholderTextColor={theme.textSecondary}
              value={filters.vendorName}
              onChangeText={(value) => handleFilterChange('vendorName', value)}
              style={{
                padding: 12,
                borderWidth: 1,
                borderColor: theme.border,
                borderRadius: 8,
                backgroundColor: theme.cardBg,
                fontSize: 14,
                color: theme.text
              }}
            />
          </View>
        </View>

        {/* Delete All Button */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 16
        }}>
          <TouchableOpacity
            onPress={handleDeleteAll}
            disabled={deleting || purchases.length === 0}
            style={{
              backgroundColor: deleting || purchases.length === 0 ? '#9ca3af' : '#ef4444',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 14,
              fontWeight: '600'
            }}>
              {deleting ? 'Deleting...' : 'Delete All'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Purchases List */}
        <View style={{
          backgroundColor: theme.cardBg,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.border,
          overflow: 'hidden'
        }}>
          {purchases.length === 0 ? (
            <View style={{
              padding: 32,
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 16,
                color: theme.textSecondary,
                textAlign: 'center'
              }}>
                No purchases found
              </Text>
            </View>
          ) : (
            <View>
              {purchases.map((purchase) => (
                <View key={purchase._id}>
                  <TouchableOpacity
                    onPress={() => toggleExpand(purchase._id)}
                    style={{
                      padding: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: theme.border + '50'
                    }}
                  >
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start'
                    }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: theme.text,
                          marginBottom: 4
                        }}>
                          {purchase.invoiceNumber || `PO-${purchase._id.slice(-6)}`}
                        </Text>
                        <Text style={{
                          fontSize: 14,
                          color: theme.textSecondary,
                          marginBottom: 2
                        }}>
                          {purchase.vendorName || 'N/A'}
                        </Text>
                        <Text style={{
                          fontSize: 12,
                          color: theme.textSecondary,
                          marginBottom: 8
                        }}>
                          {formatDate(purchase.date)} • {purchase.items?.length || 0} items
                        </Text>
                        <View style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8
                        }}>
                          <View style={{
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 12,
                            backgroundColor: getStatusColor(purchase.status) + '20'
                          }}>
                            <Text style={{
                              fontSize: 12,
                              fontWeight: '600',
                              color: getStatusColor(purchase.status)
                            }}>
                              {purchase.status || 'Pending'}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: theme.text,
                          marginBottom: 4
                        }}>
                          {formatCurrency(purchase.totalAmount)}
                        </Text>
                        <Text style={{
                          fontSize: 12,
                          color: expanded[purchase._id] ? theme.accent : theme.textSecondary
                        }}>
                          {expanded[purchase._id] ? '▼' : '▶'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>

                  {/* Expanded Details */}
                  {expanded[purchase._id] && (
                    <View style={{
                      backgroundColor: theme.bg + '50',
                      padding: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: theme.border + '50'
                    }}>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: theme.text,
                        marginBottom: 8
                      }}>
                        Items:
                      </Text>
                      {purchase.items?.map((item, idx) => (
                        <View key={idx} style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 4
                        }}>
                          <Text style={{
                            fontSize: 14,
                            color: theme.text,
                            flex: 1
                          }}>
                            {item.name} (x{item.quantity})
                          </Text>
                          <Text style={{
                            fontSize: 14,
                            color: theme.text,
                            fontWeight: '500'
                          }}>
                            {formatCurrency(item.price * item.quantity)}
                          </Text>
                        </View>
                      ))}
                      
                      <View style={{
                        marginTop: 12,
                        paddingTop: 12,
                        borderTopWidth: 1,
                        borderTopColor: theme.border
                      }}>
                        <Text style={{
                          fontSize: 12,
                          color: theme.textSecondary,
                          marginBottom: 4
                        }}>
                          Description: {purchase.description || 'N/A'}
                        </Text>
                        <Text style={{
                          fontSize: 12,
                          color: theme.textSecondary
                        }}>
                          GST: {formatCurrency(purchase.gst)}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => handleDelete(purchase._id)}
                        style={{
                          marginTop: 12,
                          backgroundColor: '#ef4444',
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 6,
                          alignSelf: 'flex-start'
                        }}
                      >
                        <Text style={{
                          color: 'white',
                          fontSize: 12,
                          fontWeight: '600'
                        }}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Pagination */}
        {totalPages > 1 && (
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
            paddingHorizontal: 16
          }}>
            <Text style={{
              fontSize: 14,
              color: theme.textSecondary
            }}>
              Page {currentPage} of {totalPages}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: currentPage === 1 ? theme.border : theme.accent,
                  borderRadius: 6
                }}
              >
                <Text style={{
                  color: currentPage === 1 ? theme.textSecondary : 'white',
                  fontSize: 14,
                  fontWeight: '500'
                }}>
                  Previous
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: currentPage === totalPages ? theme.border : theme.accent,
                  borderRadius: 6
                }}
              >
                <Text style={{
                  color: currentPage === totalPages ? theme.textSecondary : 'white',
                  fontSize: 14,
                  fontWeight: '500'
                }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PurchaseList;
