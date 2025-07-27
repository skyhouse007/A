'use dom'
import React, { useState, useEffect } from 'react';
import DashboardKPIs from './DashboardKPIs.jsx';

const Dashboard = ({ sales, inventory }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 'analytics', name: 'Analytics', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 'insights', name: 'AI Insights', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: 'reports', name: 'Reports', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }
  ];

  const recentActivities = [
    {
      id: 1,
      title: "New Order Received",
      description: "Order #ORD-2024-001 for $2,450",
      time: "2 minutes ago",
      type: "order",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
      id: 2,
      title: "Inventory Alert",
      description: "Product XYZ stock running low (5 units left)",
      time: "15 minutes ago",
      type: "alert",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
    },
    {
      id: 3,
      title: "Payment Processed",
      description: "Invoice #INV-2024-045 paid ($1,200)",
      time: "1 hour ago",
      type: "payment",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
    },
    {
      id: 4,
      title: "AI Analysis Complete",
      description: "Weekly sales trends analyzed",
      time: "2 hours ago",
      type: "ai",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
    }
  ];

  const quickActions = [
    {
      name: "Create Invoice",
      description: "Generate new billing invoice",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      action: () => console.log('Create Invoice')
    },
    {
      name: "Add Inventory",
      description: "Register new stock items",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      action: () => console.log('Add Inventory')
    },
    {
      name: "Sales Entry",
      description: "Record new sales transaction",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      action: () => console.log('Sales Entry')
    },
    {
      name: "Generate Report",
      description: "Create business analytics report",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      action: () => console.log('Generate Report')
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      padding: '2rem',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
    }}>
      
      {/* Dashboard Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
          backdropFilter: 'blur(20px) saturate(150%)',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '900',
            color: 'white',
            marginBottom: '0.5rem',
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Enterprise Dashboard
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(148, 163, 184, 0.9)',
            fontWeight: '500',
            letterSpacing: '0.5px'
          }}>
            Real-time business intelligence and analytics platform
          </p>
          
          {/* Modern Tab Navigation */}
          <div style={{ 
            marginTop: '2rem',
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '16px',
                  background: activeTab === tab.id ? tab.gradient : 'rgba(148, 163, 184, 0.1)',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: activeTab === tab.id ? 'white' : 'rgba(148, 163, 184, 0.8)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeTab === tab.id ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: activeTab === tab.id ? '0 8px 25px rgba(0, 0, 0, 0.15)' : 'none'
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs Section */}
      <DashboardKPIs />

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        
        {/* Sales Chart */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
          backdropFilter: 'blur(20px) saturate(150%)',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated background gradient */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1.5rem',
              letterSpacing: '-0.5px'
            }}>
              Sales Performance
            </h3>
            
            <div style={{ 
              height: '300px', 
              display: 'flex', 
              alignItems: 'end', 
              gap: '1rem',
              justifyContent: 'space-between',
              marginBottom: '1rem'
            }}>
              {sales?.map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  flex: 1
                }}>
                  <div style={{
                    width: '100%',
                    height: `${(item.sales / 25000) * 240}px`,
                    background: `linear-gradient(180deg, ${
                      index % 4 === 0 ? '#667eea, #764ba2' :
                      index % 4 === 1 ? '#f093fb, #f5576c' :
                      index % 4 === 2 ? '#4facfe, #00f2fe' :
                      '#43e97b, #38f9d7'
                    })`,
                    borderRadius: '12px 12px 4px 4px',
                    marginBottom: '0.5rem',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scaleY(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scaleY(1)';
                  }}
                  ></div>
                  <span style={{ 
                    color: 'rgba(148, 163, 184, 0.9)', 
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {item.month}
                  </span>
                  <span style={{ 
                    color: 'white', 
                    fontSize: '14px',
                    fontWeight: '700',
                    marginTop: '0.25rem'
                  }}>
                    ${item.sales.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
          backdropFilter: 'blur(20px) saturate(150%)',
          borderRadius: '24px',
          padding: '2rem',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '1.5rem',
            letterSpacing: '-0.5px'
          }}>
            Quick Actions
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem'
          }}>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                style={{
                  padding: '1.5rem 1rem',
                  borderRadius: '16px',
                  background: action.gradient,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '0.5rem',
                  textAlign: 'center',
                  letterSpacing: '0.25px'
                }}>
                  {action.name}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textAlign: 'center',
                  lineHeight: '1.3'
                }}>
                  {action.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div style={{
        marginTop: '2rem',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
        backdropFilter: 'blur(20px) saturate(150%)',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'white',
          marginBottom: '1.5rem',
          letterSpacing: '-0.5px'
        }}>
          Recent Activities
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.8))',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '4px',
                height: '100%',
                background: activity.gradient,
                position: 'absolute',
                left: 0,
                top: 0,
                borderRadius: '0 4px 4px 0'
              }}></div>
              
              <div style={{ marginLeft: '1rem' }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '0.5rem'
                }}>
                  {activity.title}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(148, 163, 184, 0.9)',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {activity.description}
                </p>
                <span style={{
                  fontSize: '12px',
                  color: 'rgba(148, 163, 184, 0.7)',
                  fontWeight: '500'
                }}>
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
