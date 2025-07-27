'use dom'
import React from "react";

const BottomNavigation = ({ currentPage, setPage }) => {
  const navItems = [
    { 
      id: "dashboard", 
      name: "Dashboard", 
      icon: "📊", 
      color: "#3b82f6",
      isActive: currentPage === "dashboard"
    },
    { 
      id: "inventoryList", 
      name: "Inventory", 
      icon: "📦", 
      color: "#10b981",
      isActive: currentPage === "inventoryList"
    },
    { 
      id: "salesList", 
      name: "Sales", 
      icon: "💰", 
      color: "#f59e0b",
      isActive: currentPage === "salesList"
    },
    { 
      id: "billing", 
      name: "Billing", 
      icon: "📄", 
      color: "#8b5cf6",
      isActive: currentPage === "billing"
    },
    { 
      id: "more", 
      name: "More", 
      icon: "⋯", 
      color: "#6b7280",
      isActive: false
    }
  ];

  const handleNavClick = (pageId) => {
    if (pageId === "more") {
      // Could show a more options modal
      return;
    }
    setPage(pageId);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'white',
      borderTop: '1px solid #e5e7eb',
      boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
      zIndex: 50,
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: 'env(safe-area-inset-bottom)' // Handle iPhone bottom safe area
    }}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '8px 12px',
            borderRadius: '12px',
            background: item.isActive ? `${item.color}15` : 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            minWidth: '60px',
            minHeight: '56px'
          }}
          onMouseEnter={(e) => {
            if (!item.isActive) {
              e.target.style.background = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => {
            if (!item.isActive) {
              e.target.style.background = 'transparent';
            }
          }}
        >
          {/* Icon */}
          <div style={{
            fontSize: '20px',
            opacity: item.isActive ? 1 : 0.6,
            transition: 'opacity 0.2s ease',
            filter: item.isActive ? `drop-shadow(0 0 4px ${item.color}50)` : 'none'
          }}>
            {item.icon}
          </div>
          
          {/* Label */}
          <span style={{
            fontSize: '11px',
            fontWeight: item.isActive ? '600' : '500',
            color: item.isActive ? item.color : '#6b7280',
            transition: 'all 0.2s ease',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            {item.name}
          </span>

          {/* Active indicator */}
          {item.isActive && (
            <div style={{
              position: 'absolute',
              bottom: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '24px',
              height: '3px',
              background: item.color,
              borderRadius: '2px'
            }}></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
