'use dom'
import React, { useState } from "react";

const navItems = [
  { name: "Dashboard", icon: "📊", page: "dashboard" },
  { name: "Inventory", icon: "📦", page: "inventoryList" },
  { name: "Sales List", icon: "📋", page: "salesList" },
  { name: "Purchase", icon: "📝", page: "purchase" },
  { name: "Vendors", icon: "👥", page: "vendors" },
  { name: "Sales Entry", icon: "➕", page: "sales" },
  { name: "Services", icon: "🎯", page: "services" },
  { name: "Documents", icon: "📄", page: "document" },
  { name: "Orders", icon: "🛒", page: "orders" },
  { name: "Purchase Form", icon: "📝", page: "purchaseForm" },
  { name: "Customers", icon: "👥", page: "Customer" },
  { name: "Cash In", icon: "⬇️", page: "cashIn" },
  { name: "Cash Out", icon: "⬆️", page: "cashOut" },
  { name: "Ledgers", icon: "📚", page: "ledger" },
  { name: "Balance Sheet", icon: "📄", page: "balanceSheet" },
  { name: "Profit & Loss", icon: "📈", page: "profitLoss" },
  { name: "GST Details", icon: "💰", page: "gstDetails" },
  { name: "Reminders", icon: "🔔", page: "Reminders" },
  { name: "Billing", icon: "📄", page: "billing" },
];

const Sidebar = ({ setPage, collapsed = false, setCollapsed, onClose }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (page) => {
    setPage(page);
    if (onClose) onClose();
  };

  // Filter items based on search term
  const filteredItems = navItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      style={{
        width: collapsed ? '80px' : '280px',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(0, 0, 0, 0.1)',
        transition: 'width 0.3s ease',
        position: 'relative',
        zIndex: 50
      }}
    >
      {/* Content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {onClose && (
                <button
                  onClick={onClose}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setCollapsed && setCollapsed(!collapsed)}
              style={{
                padding: '0.5rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {collapsed ? '▶️' : '◀️'}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {!collapsed && (
          <div style={{ padding: '1rem', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {filteredItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleClick(item.page)}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  backgroundColor: hoveredItem === item.name ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.875rem',
                  color: '#374151',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                {!collapsed && (
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;