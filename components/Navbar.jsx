'use dom'
import React, { useState } from "react";

const Navbar = ({ user, setPage, theme, darkMode, setDarkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { id: "dashboard", name: "Dashboard", color: "#3b82f6" },
    { id: "inventoryList", name: "Inventory Management", color: "#10b981" },
    { id: "salesList", name: "Sales Records", color: "#f59e0b" },
    { id: "billing", name: "Billing & Invoices", color: "#8b5cf6" },
    { id: "purchaseForm", name: "Purchase Orders", color: "#06b6d4" },
    { id: "vendors", name: "Vendor Management", color: "#84cc16" }
  ];

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

  const handleMenuClick = (pageId) => {
    setPage(pageId);
    setShowMenu(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        maxWidth: '100vw',
        background: theme.cardBg,
        borderBottom: `1px solid ${theme.border}`,
        boxShadow: darkMode ? '0 1px 3px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        boxSizing: 'border-box'
      }}
    >
      {/* Left: Hamburger + Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Hamburger Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: theme.textSecondary,
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              width: '24px',
              height: '24px',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.border;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <div style={{
              width: '16px',
              height: '2px',
              background: theme.textSecondary,
              borderRadius: '1px',
              transition: 'all 0.2s ease'
            }}></div>
            <div style={{
              width: '16px',
              height: '2px',
              background: theme.textSecondary,
              borderRadius: '1px',
              transition: 'all 0.2s ease'
            }}></div>
            <div style={{
              width: '16px',
              height: '2px',
              background: theme.textSecondary,
              borderRadius: '1px',
              transition: 'all 0.2s ease'
            }}></div>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '280px',
              background: theme.cardBg,
              borderRadius: '12px',
              border: `1px solid ${theme.border}`,
              boxShadow: darkMode ? '0 10px 25px rgba(0, 0, 0, 0.5)' : '0 10px 25px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              marginTop: '8px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                padding: '16px', 
                borderBottom: `1px solid ${theme.border}`,
                background: theme.bg
              }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: theme.text,
                  margin: 0
                }}>
                  Navigation
                </h3>
              </div>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {menuItems.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => handleMenuClick(item.id)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderBottom: `1px solid ${theme.border}`,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = theme.border;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: item.color,
                      flexShrink: 0
                    }}></div>
                    <span style={{ 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: theme.text
                    }}>
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Logo */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: theme.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>
          B
        </div>
        <div>
          <h1 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: theme.text,
            margin: 0,
            lineHeight: '1.2'
          }}>
            BizSuite
          </h1>
          <p style={{
            fontSize: '11px',
            color: theme.textSecondary,
            margin: 0,
            lineHeight: '1'
          }}>
            Enterprise
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '8px',
            borderRadius: '8px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: theme.textSecondary,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = theme.border;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

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
              fontSize: '16px',
              color: theme.textSecondary,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.border;
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
                border: `2px solid ${theme.cardBg}`
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
              background: theme.cardBg,
              borderRadius: '12px',
              border: `1px solid ${theme.border}`,
              boxShadow: darkMode ? '0 10px 25px rgba(0, 0, 0, 0.5)' : '0 10px 25px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              marginTop: '8px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                padding: '16px', 
                borderBottom: `1px solid ${theme.border}`,
                background: theme.bg
              }}>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: theme.text,
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
                      borderBottom: `1px solid ${theme.border}`,
                      cursor: 'pointer',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = theme.border;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
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
                        color: theme.text,
                        flex: 1
                      }}>
                        {notification.title}
                      </span>
                      <span style={{ 
                        fontSize: '12px', 
                        color: theme.textSecondary,
                        marginLeft: '8px'
                      }}>
                        {notification.time}
                      </span>
                    </div>
                    <p style={{ 
                      fontSize: '13px', 
                      color: theme.textSecondary,
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
              e.target.style.background = theme.border;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: theme.accent,
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
              background: theme.accent,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1';
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
