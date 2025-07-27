'use dom'
import React, { useState } from "react";

const Navbar = ({ user, setPage, setShowMobileSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    try {
      setPage("home");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const notifications = [
    {
      id: 1,
      title: "Low Stock Alert",
      message: "Product A: 5 units remaining",
      time: "2m ago",
      urgent: true,
    },
    {
      id: 2,
      title: "New Order",
      message: "Order #12456 - $2,340",
      time: "15m ago",
      urgent: false,
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Invoice INV-001 paid",
      time: "1h ago",
      urgent: false,
    },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        background: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px'
      }}
    >
      {/* Left Section: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          E
        </div>
        <div>
          <h1 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#111827',
            margin: 0,
            lineHeight: '1.2'
          }}>
            ERP Mobile
          </h1>
          <p style={{
            fontSize: '12px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1'
          }}>
            Business Suite
          </p>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              position: 'relative',
              padding: '8px',
              borderRadius: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              color: '#6b7280',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            🔔
            {notifications.some(n => n.urgent) && (
              <div style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '8px',
                height: '8px',
                background: '#ef4444',
                borderRadius: '50%',
                border: '2px solid white'
              }}></div>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '280px',
              background: 'white',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              zIndex: 1000,
              marginTop: '8px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                padding: '16px', 
                borderBottom: '1px solid #e5e7eb',
                background: '#f9fafb'
              }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#111827',
                  margin: 0
                }}>
                  Notifications
                </h3>
              </div>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid #f3f4f6',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'white';
                    }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: '4px'
                    }}>
                      <span style={{ 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#111827',
                        flex: 1
                      }}>
                        {notification.title}
                      </span>
                      <span style={{ 
                        fontSize: '12px', 
                        color: '#6b7280',
                        marginLeft: '8px'
                      }}>
                        {notification.time}
                      </span>
                    </div>
                    <p style={{ 
                      fontSize: '13px', 
                      color: '#6b7280',
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      {notification.message}
                    </p>
                    {notification.urgent && (
                      <div style={{
                        display: 'inline-block',
                        marginTop: '4px',
                        padding: '2px 6px',
                        background: '#fef2f2',
                        color: '#dc2626',
                        fontSize: '11px',
                        fontWeight: '500',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}>
                        Urgent
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        {user ? (
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px',
              borderRadius: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              {(user.name || 'User').charAt(0).toUpperCase()}
            </div>
          </button>
        ) : (
          <button
            onClick={() => setPage("login")}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#3b82f6';
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
