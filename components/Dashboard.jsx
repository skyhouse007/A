'use dom'
import React, { useState, useEffect } from 'react';
import DashboardKPIs from './DashboardKPIs.jsx';

const Dashboard = ({ sales, inventory }) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  const quickActions = [
    {
      name: "New Sale",
      description: "Record transaction",
      icon: "💰",
      color: "#10b981",
      action: () => console.log('New Sale')
    },
    {
      name: "Add Stock",
      description: "Update inventory",
      icon: "📦",
      color: "#3b82f6",
      action: () => console.log('Add Stock')
    },
    {
      name: "Create Invoice",
      description: "Bill customer",
      icon: "📄",
      color: "#f59e0b",
      action: () => console.log('Create Invoice')
    },
    {
      name: "View Reports",
      description: "Analytics & insights",
      icon: "📊",
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
    }
  ];

  return (
    <div style={{
      background: '#f8fafc',
      minHeight: 'calc(100vh - 140px)', // Account for header and bottom nav
      paddingBottom: '20px'
    }}>
      {/* Header with Refresh */}
      <div style={{
        background: 'white',
        padding: '16px',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: '60px',
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
              color: '#111827',
              margin: '0 0 4px 0'
            }}>
              Business Overview
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>
              Today, {new Date().toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: refreshing ? '#f3f4f6' : 'transparent',
              border: '1px solid #d1d5db',
              cursor: refreshing ? 'not-allowed' : 'pointer',
              fontSize: '18px',
              transition: 'all 0.2s ease',
              opacity: refreshing ? 0.6 : 1
            }}
          >
            🔄
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ padding: '16px 16px 0 16px' }}>
        <DashboardKPIs />
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '0 16px' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#111827',
          marginBottom: '12px'
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          marginBottom: '24px'
        }}>
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                e.target.style.borderColor = action.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                e.target.style.borderColor = '#e5e7eb';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: `${action.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  {action.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '2px'
                  }}>
                    {action.name}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#6b7280'
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
      <div style={{ padding: '0 16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827'
          }}>
            Recent Activities
          </h2>
          <button style={{
            fontSize: '14px',
            color: '#3b82f6',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500'
          }}>
            View All
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
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
                      color: '#111827',
                      margin: 0
                    }}>
                      {activity.title}
                    </h3>
                    <span style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      flexShrink: 0,
                      marginLeft: '8px'
                    }}>
                      {activity.time}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '13px',
                    color: '#6b7280',
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
  );
};

export default Dashboard;
