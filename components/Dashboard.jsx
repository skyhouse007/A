import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import DashboardKPIs from './DashboardKPIs.jsx';

const Dashboard = ({ sales, inventory, theme }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const quickActions = [
    {
      name: "New Sale",
      description: "Record transaction",
      color: "#10b981",
      action: () => console.log('New Sale')
    },
    {
      name: "Add Stock",
      description: "Update inventory",
      color: "#3b82f6",
      action: () => console.log('Add Stock')
    },
    {
      name: "Create Invoice",
      description: "Bill customer",
      color: "#f59e0b",
      action: () => console.log('Create Invoice')
    },
    {
      name: "View Reports",
      description: "Analytics & insights",
      color: "#8b5cf6",
      action: () => console.log('View Reports')
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "sale",
      title: "Sale #12456",
      description: "$2,340.00 • Product A, B",
      time: "2 minutes ago",
      status: "completed",
      color: "#10b981"
    },
    {
      id: 2,
      type: "inventory",
      title: "Stock Alert",
      description: "Product C: 5 units left",
      time: "15 minutes ago",
      status: "warning",
      color: "#f59e0b"
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      description: "Invoice INV-001 • $1,200",
      time: "1 hour ago",
      status: "completed",
      color: "#3b82f6"
    },
    {
      id: 4,
      type: "order",
      title: "New Purchase Order",
      description: "PO-789 • Supplier ABC",
      time: "2 hours ago",
      status: "pending",
      color: "#8b5cf6"
    },
    {
      id: 5,
      type: "customer",
      title: "New Customer",
      description: "ABC Corp registered",
      time: "3 hours ago",
      status: "completed",
      color: "#10b981"
    },
    {
      id: 6,
      type: "expense",
      title: "Office Supplies",
      description: "Expense: $245.00",
      time: "4 hours ago",
      status: "pending",
      color: "#f59e0b"
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
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
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
        <DashboardKPIs theme={theme} />

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
                  width: '48%'
                }}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12
                }}>
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: action.color
                  }} />
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
            <TouchableOpacity>
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
            {recentActivities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
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
                  alignItems: 'flex-start',
                  gap: 12
                }}>
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: activity.color,
                    marginTop: 6
                  }} />
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
