'use dom'
import React from "react";

const BottomNavigation = ({ currentPage, setPage, theme }) => {
  const navItems = [
    {
      id: "dashboard",
      name: "Dashboard",
      color: "#3b82f6",
      isActive: currentPage === "dashboard"
    },
    {
      id: "inventoryList",
      name: "Inventory",
      color: "#10b981",
      isActive: currentPage === "inventoryList"
    },
    {
      id: "salesList",
      name: "Sales",
      color: "#f59e0b",
      isActive: currentPage === "salesList"
    },
    {
      id: "vendors",
      name: "Vendors",
      color: "#84cc16",
      isActive: currentPage === "vendors"
    },
    {
      id: "billing",
      name: "Billing",
      color: "#8b5cf6",
      isActive: currentPage === "billing"
    }
  ];

  const handleNavClick = (pageId) => {
    setPage(pageId);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: theme.cardBg,
      borderTop: `1px solid ${theme.border}`,
      boxShadow: theme.bg === '#111827' ? '0 -4px 6px rgba(0, 0, 0, 0.3)' : '0 -4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 50,
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: 'env(safe-area-inset-bottom)'
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
              e.target.style.background = theme.border;
            }
          }}
          onMouseLeave={(e) => {
            if (!item.isActive) {
              e.target.style.background = 'transparent';
            }
          }}
        >
          {/* Indicator dot */}
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: item.isActive ? item.color : theme.textSecondary,
            opacity: item.isActive ? 1 : 0.4,
            transition: 'all 0.2s ease'
          }}></div>
          
          {/* Label */}
          <span style={{
            fontSize: '11px',
            fontWeight: item.isActive ? '600' : '500',
            color: item.isActive ? item.color : theme.textSecondary,
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
              height: '2px',
              background: item.color,
              borderRadius: '1px'
            }}></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
