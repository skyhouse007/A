'use dom'
import React, { useState, useEffect } from "react";

const Navbar = ({ user, setPage, setShowMobileSidebar }) => {
  const [showNavigationPopup, setShowNavigationPopup] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      title: "AI Analysis Complete",
      message: "Monthly sales report is ready",
      time: "2m ago",
      type: "success",
    },
    {
      id: 2,
      title: "System Update",
      message: "ERP system updated to v2.1",
      time: "1h ago",
      type: "info",
    },
    {
      id: 3,
      title: "Low Inventory Alert",
      message: "Product XYZ is running low",
      time: "3h ago",
      type: "warning",
    },
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.5s ease'
        }}
      >
        <div style={{ maxWidth: '100%', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Left Section: Mobile Menu & Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileSidebar && setShowMobileSidebar(true)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  color: '#3b82f6',
                  transition: 'all 0.3s ease'
                }}
                aria-label="Open sidebar"
              >
                ☰
              </button>

              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.25rem'
                }}>
                  D
                </div>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  display: 'none',
                  '@media (minWidth: 768px)': {
                    display: 'block'
                  }
                }}>
                  DataPlay AI
                </span>
              </div>
            </div>

            {/* Right Section: Notifications & User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Notifications */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    position: 'relative'
                  }}
                >
                  🔔
                  <span style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-2px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#ef4444',
                    borderRadius: '50%'
                  }}></span>
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    width: '320px',
                    backgroundColor: 'white',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    marginTop: '0.5rem',
                    padding: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937' }}>
                        Notifications
                      </h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        style={{
                          padding: '0.25rem',
                          borderRadius: '0.25rem',
                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {notifications.map((notification) => (
                        <div key={notification.id} style={{
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          border: '1px solid rgba(0, 0, 0, 0.05)'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>
                              {notification.title}
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                              {notification.time}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              {user ? (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: '#374151'
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      👤
                    </div>
                    <span style={{ display: 'none', '@media (minWidth: 768px)': { display: 'block' } }}>
                      {user.name || 'User'}
                    </span>
                    <span style={{ fontSize: '0.75rem' }}>▼</span>
                  </button>

                  {/* User Dropdown */}
                  {showUserDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      width: '200px',
                      backgroundColor: 'white',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      zIndex: 1000,
                      marginTop: '0.5rem',
                      padding: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <button style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          color: '#374151',
                          textAlign: 'left'
                        }}>
                          👤 Profile
                        </button>
                        <button style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '0.5rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          color: '#374151',
                          textAlign: 'left'
                        }}>
                          ⚙️ Settings
                        </button>
                        <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.1)' }} />
                        <button
                          onClick={handleLogout}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '0.5rem',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            color: '#ef4444',
                            textAlign: 'left'
                          }}
                        >
                          🚪 Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setPage("login")}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;