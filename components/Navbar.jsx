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
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(51, 65, 85, 0.95) 100%)',
          backdropFilter: 'blur(20px) saturate(150%)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
          padding: '1rem 1.5rem',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isScrolled ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : 'none'
        }}
      >
        <div style={{ maxWidth: '100%', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Left Section: Mobile Menu & Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexShrink: 0 }}>
              {/* Modern Menu Button */}
              <button
                onClick={() => setShowMobileSidebar && setShowMobileSidebar(true)}
                style={{
                  padding: '12px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: 'white',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  minWidth: '60px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
                }}
                aria-label="Open sidebar"
              >
                Menu
              </button>

              {/* Modern Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.35)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                    transform: 'rotate(45deg)',
                    animation: 'shimmer 3s infinite'
                  }}></div>
                  D
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: 'white',
                    letterSpacing: '-0.5px',
                    lineHeight: '1'
                  }}>
                    DataPlay
                  </span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: 'rgba(148, 163, 184, 0.8)',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}>
                    AI Enterprise
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section: Notifications & User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Modern Notifications */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{
                    padding: '12px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8), rgba(59, 130, 246, 0.8))',
                    border: '1px solid rgba(148, 163, 184, 0.3)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: '80px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Alerts
                  <div style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    width: '12px',
                    height: '12px',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    borderRadius: '50%',
                    border: '2px solid white',
                    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.4)'
                  }}></div>
                </button>

                {/* Enhanced Notifications Dropdown */}
                {showNotifications && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    width: '360px',
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
                    backdropFilter: 'blur(20px) saturate(150%)',
                    borderRadius: '20px',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    zIndex: 1000,
                    marginTop: '0.5rem',
                    padding: '1.5rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                        Notifications
                      </h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        style={{
                          padding: '8px',
                          borderRadius: '12px',
                          background: 'rgba(148, 163, 184, 0.1)',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: 'rgba(148, 163, 184, 0.8)',
                          fontWeight: '600'
                        }}
                      >
                        Close
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {notifications.map((notification) => (
                        <div key={notification.id} style={{
                          padding: '1rem',
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                          border: '1px solid rgba(148, 163, 184, 0.1)',
                          transition: 'all 0.2s ease'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>
                              {notification.title}
                            </span>
                            <span style={{ fontSize: '12px', color: 'rgba(148, 163, 184, 0.8)' }}>
                              {notification.time}
                            </span>
                          </div>
                          <p style={{ fontSize: '13px', color: 'rgba(148, 163, 184, 0.9)', lineHeight: '1.4' }}>
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modern User Authentication */}
              {user ? (
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '8px 16px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(236, 72, 153, 0.8))',
                      border: '1px solid rgba(148, 163, 184, 0.3)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: 'white',
                      fontWeight: '600',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      {(user.name || 'User').charAt(0).toUpperCase()}
                    </div>
                    <span style={{ display: 'none', '@media (minWidth: 768px)': { display: 'block' } }}>
                      {user.name || 'User'}
                    </span>
                  </button>

                  {/* Enhanced User Dropdown */}
                  {showUserDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      width: '220px',
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
                      backdropFilter: 'blur(20px) saturate(150%)',
                      borderRadius: '20px',
                      border: '1px solid rgba(148, 163, 184, 0.2)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      zIndex: 1000,
                      marginTop: '0.5rem',
                      padding: '1rem',
                      overflow: 'hidden'
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: 'white',
                          textAlign: 'left',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}>
                          <span style={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            background: 'linear-gradient(135deg, #10b981, #059669)' 
                          }}></span>
                          Profile
                        </button>
                        <button style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: 'white',
                          textAlign: 'left',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}>
                          <span style={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
                          }}></span>
                          Settings
                        </button>
                        <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid rgba(148, 163, 184, 0.2)' }} />
                        <button
                          onClick={handleLogout}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: '#ef4444',
                            textAlign: 'left',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <span style={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)' 
                          }}></span>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setPage("login")}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                  }}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Add shimmer animation */}
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
          }
        `}</style>
      </header>
    </>
  );
};

export default Navbar;
