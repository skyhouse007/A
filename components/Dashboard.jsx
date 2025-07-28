import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import DashboardKPIs from './DashboardKPIs.jsx';

const Dashboard = ({ sales, inventory, theme, onNavigate }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
      setCurrentTime(new Date());
    }, 1000);
  };

  const quickActions = [
    {
      name: "New Sale",
      description: "Record transaction",
      color: "#10b981",
      icon: "💰",
      page: "sales",
      action: () => onNavigate ? onNavigate('sales') : console.log('New Sale')
    },
    {
      name: "Inventory",
      description: "Manage stock",
      color: "#3b82f6",
      icon: "📦",
      page: "inventoryList",
      action: () => onNavigate ? onNavigate('inventoryList') : console.log('Inventory')
    },
    {
      name: "Purchase Orders",
      description: "Create purchase order",
      color: "#f59e0b",
      icon: "🛒",
      page: "purchaseForm",
      action: () => onNavigate ? onNavigate('purchaseForm') : console.log('Purchase Order')
    },
    {
      name: "Profit & Loss",
      description: "Financial reports",
      color: "#8b5cf6",
      icon: "📊",
      page: "profitLoss",
      action: () => onNavigate ? onNavigate('profitLoss') : console.log('Reports')
    },
    {
      name: "Cash Entry",
      description: "Manage cash flow",
      color: "#10b981",
      icon: "💵",
      page: "cashEntry",
      action: () => onNavigate ? onNavigate('cashEntry') : console.log('Cash Entry')
    },
    {
      name: "Vendors",
      description: "Manage suppliers",
      color: "#f59e0b",
      icon: "🏢",
      page: "vendors",
      action: () => onNavigate ? onNavigate('vendors') : console.log('Vendors')
    },
    {
      name: "Ledger",
      description: "View ledger details",
      color: "#3b82f6",
      icon: "📋",
      page: "ledger",
      action: () => onNavigate ? onNavigate('ledger') : console.log('Ledger')
    },
    {
      name: "Reminders",
      description: "Task & reminders",
      color: "#8b5cf6",
      icon: "⏰",
      page: "reminders",
      action: () => onNavigate ? onNavigate('reminders') : console.log('Reminders')
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "sale",
      title: "Sale #12456",
      description: "$2,340.00 • Premium Package Deal",
      time: "2 minutes ago",
      status: "completed",
      color: "#10b981",
      page: "salesList",
      icon: "💰"
    },
    {
      id: 2,
      type: "inventory",
      title: "Low Stock Alert",
      description: "Product C: Only 5 units remaining",
      time: "15 minutes ago",
      status: "warning",
      color: "#f59e0b",
      page: "inventoryList",
      icon: "⚠️"
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      description: "Invoice INV-001 • $1,200.00",
      time: "1 hour ago",
      status: "completed",
      color: "#3b82f6",
      page: "billing",
      icon: "💳"
    },
    {
      id: 4,
      type: "purchase",
      title: "Purchase Order Created",
      description: "PO-789 • Tech Supplies Co.",
      time: "2 hours ago",
      status: "pending",
      color: "#8b5cf6",
      page: "purchaseList",
      icon: "🛒"
    },
    {
      id: 5,
      type: "vendor",
      title: "New Vendor Added",
      description: "ABC Corp • Electronics Supplier",
      time: "3 hours ago",
      status: "completed",
      color: "#10b981",
      page: "vendors",
      icon: "🏢"
    },
    {
      id: 6,
      type: "cash",
      title: "Cash Entry",
      description: "Office Supplies • $245.00",
      time: "4 hours ago",
      status: "completed",
      color: "#f59e0b",
      page: "cashEntry",
      icon: "💵"
    },
    {
      id: 7,
      type: "reminder",
      title: "Payment Due Reminder",
      description: "Invoice INV-002 due tomorrow",
      time: "5 hours ago",
      status: "pending",
      color: "#ef4444",
      page: "reminders",
      icon: "⏰"
    },
    {
      id: 8,
      type: "document",
      title: "Invoice Generated",
      description: "INV-003 • Customer XYZ",
      time: "6 hours ago",
      status: "completed",
      color: "#3b82f6",
      page: "document",
      icon: "📄"
    }
  ];

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'completed': return '#dcfce7';
      case 'warning': return '#fef3c7';
      case 'pending': return '#e0e7ff';
      default: return '#f3f4f6';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case 'completed': return '#166534';
      case 'warning': return '#92400e';
      case 'pending': return '#3730a3';
      default: return '#374151';
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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <View>
            <Text style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.text,
              marginBottom: 4
            }}>
              Dashboard
            </Text>
            <Text style={{
              fontSize: 14,
              color: theme.textSecondary
            }}>
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <Text style={{
              fontSize: 12,
              color: theme.textSecondary,
              marginTop: 2
            }}>
              Last updated: {currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleRefresh}
            disabled={refreshing}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: theme.border,
              opacity: refreshing ? 0.6 : 1
            }}
          >
            <Text style={{
              color: theme.textSecondary,
              fontSize: 16
            }}>
              ↻
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Container - Scrollable */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.accent}
          />
        }
      >
        {/* KPI Cards */}
        <DashboardKPIs theme={theme} onNavigate={onNavigate} />

        {/* Quick Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 12
          }}>
            Quick Actions
          </Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12
          }}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.action}
                style={{
                  backgroundColor: theme.cardBg,
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 12,
                  padding: 16,
                  width: '48%',
                  minWidth: 160,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12
                }}>
                  <View style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: `${action.color}20`,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text style={{ fontSize: 16 }}>{action.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: theme.text,
                      marginBottom: 2
                    }}>
                      {action.name}
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: theme.textSecondary
                    }}>
                      {action.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '600',
              color: theme.text
            }}>
              Recent Activities
            </Text>
            <TouchableOpacity
              onPress={() => onNavigate ? onNavigate('reminders') : console.log('View All Activities')}
            >
              <Text style={{
                fontSize: 14,
                color: theme.accent,
                fontWeight: '500'
              }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{
            gap: 8
          }}>
            {recentActivities.slice(0, 6).map((activity) => (
              <TouchableOpacity
                key={activity.id}
                onPress={() => onNavigate ? onNavigate(activity.page) : console.log(`Navigate to ${activity.page}`)}
                style={{
                  backgroundColor: theme.cardBg,
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 12,
                  padding: 16,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.05,
                  shadowRadius: 2.22,
                  elevation: 3,
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 12
                }}>
                  <View style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: `${activity.color}20`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2
                  }}>
                    <Text style={{ fontSize: 14 }}>{activity.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 4
                    }}>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: theme.text,
                        flex: 1
                      }}>
                        {activity.title}
                      </Text>
                      <Text style={{
                        fontSize: 12,
                        color: theme.textSecondary,
                        marginLeft: 8
                      }}>
                        {activity.time}
                      </Text>
                    </View>
                    <Text style={{
                      fontSize: 13,
                      color: theme.textSecondary,
                      marginBottom: 8,
                      lineHeight: 18
                    }}>
                      {activity.description}
                    </Text>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <View style={{
                        alignSelf: 'flex-start',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 6,
                        backgroundColor: getStatusBackgroundColor(activity.status)
                      }}>
                        <Text style={{
                          fontSize: 11,
                          fontWeight: '500',
                          textTransform: 'capitalize',
                          color: getStatusTextColor(activity.status)
                        }}>
                          {activity.status}
                        </Text>
                      </View>
                      <Text style={{
                        fontSize: 11,
                        color: theme.accent,
                        fontWeight: '500'
                      }}>
                        Tap to view →
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
