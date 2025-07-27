'use dom'
import React, { useState } from 'react';
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
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: theme.text,
              margin: '0 0 4px 0'
            }}>
              Dashboard
            </h1>
            <p style={{
              fontSize: '14px',
              color: theme.textSecondary,
              margin: 0
            }}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'transparent',
              border: `1px solid ${theme.border}`,
              cursor: refreshing ? 'not-allowed' : 'pointer',
              color: theme.textSecondary,
              transition: 'all 0.2s ease',
              opacity: refreshing ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!refreshing) {
                e.target.style.background = theme.border;
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <span style={{
              display: 'inline-block',
              transform: refreshing ? 'rotate(360deg)' : 'rotate(0deg)',
              transition: 'transform 1s ease'
            }}>
              ↻
            </span>
          </button>
        </div>
      </div>

      {/* Content Container - Scrollable */}
      <div style={{
        padding: '16px',
        paddingBottom: '24px'
      }}>
        {/* KPI Cards */}
        <DashboardKPIs theme={theme} />

        {/* Quick Actions */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: theme.text,
            marginBottom: '12px',
            margin: '0 0 12px 0'
          }}>
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px'
          }}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                style={{
                  background: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.borderColor = action.color;
                  e.target.style.boxShadow = `0 4px 12px ${action.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.borderColor = theme.border;
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: action.color
                  }}></div>
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: theme.text,
                      marginBottom: '2px'
                    }}>
                      {action.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: theme.textSecondary
                    }}>
                      {action.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: theme.text,
              margin: 0
            }}>
              Recent Activities
            </h2>
            <button style={{
              fontSize: '14px',
              color: theme.accent,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              View All
            </button>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
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
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = theme.cardBg;
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: activity.color,
                    marginTop: '6px',
                    flexShrink: 0
                  }}></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '4px'
                    }}>
                      <h3 style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: theme.text,
                        margin: 0
                      }}>
                        {activity.title}
                      </h3>
                      <span style={{
                        fontSize: '12px',
                        color: theme.textSecondary,
                        flexShrink: 0,
                        marginLeft: '8px'
                      }}>
                        {activity.time}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '13px',
                      color: theme.textSecondary,
                      margin: '0 0 8px 0',
                      lineHeight: '1.4'
                    }}>
                      {activity.description}
                    </p>
                    <div style={{
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      background: activity.status === 'completed' ? '#dcfce7' :
                                 activity.status === 'warning' ? '#fef3c7' :
                                 activity.status === 'pending' ? '#e0e7ff' : '#f3f4f6',
                      color: activity.status === 'completed' ? '#166534' :
                             activity.status === 'warning' ? '#92400e' :
                             activity.status === 'pending' ? '#3730a3' : '#374151'
                    }}>
                      {activity.status}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
