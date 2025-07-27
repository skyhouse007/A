'use dom'
import React, { useState } from "react";

const navItems = [
  { name: "Dashboard", page: "dashboard", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { name: "Inventory", page: "inventoryList", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
  { name: "Sales List", page: "salesList", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  { name: "Purchase", page: "purchase", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
  { name: "Vendors", page: "vendors", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
  { name: "Sales Entry", page: "sales", gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
  { name: "Services", page: "services", gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
  { name: "Documents", page: "document", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" },
  { name: "Orders", page: "orders", gradient: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)" },
  { name: "Purchase Form", page: "purchaseForm", gradient: "linear-gradient(135deg, #ff8a80 0%, #ffb74d 100%)" },
  { name: "Customers", page: "Customer", gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)" },
  { name: "Cash In", page: "cashIn", gradient: "linear-gradient(135deg, #a6c1ee 0%, #fbc2eb 100%)" },
  { name: "Cash Out", page: "cashOut", gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" },
  { name: "Ledgers", page: "ledger", gradient: "linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)" },
  { name: "Balance Sheet", page: "balanceSheet", gradient: "linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)" },
  { name: "Profit & Loss", page: "profitLoss", gradient: "linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)" },
  { name: "GST Details", page: "gstDetails", gradient: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)" },
  { name: "Reminders", page: "Reminders", gradient: "linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)" },
  { name: "Billing", page: "billing", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
];

const Sidebar = ({ setPage, collapsed = false, setCollapsed, onClose }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("main");

  const handleClick = (page) => {
    setPage(page);
    if (onClose) onClose();
  };

  // Filter items based on search term
  const filteredItems = navItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Group items by category for better organization
  const categories = {
    main: filteredItems.slice(0, 6),
    financial: filteredItems.slice(6, 12),
    reports: filteredItems.slice(12)
  };

  const categoryNames = {
    main: "Core Operations",
    financial: "Financial Management", 
    reports: "Reports & Analytics"
  };

  return (
    <div
      style={{
        width: collapsed ? '80px' : '320px',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(51, 65, 85, 0.98) 100%)',
        backdropFilter: 'blur(20px) saturate(150%)',
        borderRight: '1px solid rgba(148, 163, 184, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        zIndex: 50,
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.12)'
      }}
    >
      {/* Content */}
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Modern Header */}
        <div style={{ 
          padding: '2rem 1.5rem 1.5rem', 
          borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  padding: '12px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.8))',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  minWidth: '60px'
                }}
              >
                Close
              </button>
            )}

            <button
              onClick={() => setCollapsed && setCollapsed(!collapsed)}
              style={{
                padding: '12px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.8))',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                minWidth: '60px'
              }}
            >
              {collapsed ? 'Expand' : 'Collapse'}
            </button>
          </div>

          {!collapsed && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontSize: '18px',
                fontWeight: '800',
                color: 'white',
                marginBottom: '0.25rem',
                letterSpacing: '-0.5px'
              }}>
                Navigation
              </h2>
              <p style={{
                fontSize: '12px',
                color: 'rgba(148, 163, 184, 0.8)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: '500'
              }}>
                Enterprise Dashboard
              </p>
            </div>
          )}
        </div>

        {/* Modern Search Bar */}
        {!collapsed && (
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(148, 163, 184, 0.2)' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search navigation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(51, 65, 85, 0.8))',
                  backdropFilter: 'blur(10px)',
                  fontSize: '14px',
                  color: 'white',
                  fontWeight: '500',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(99, 102, 241, 0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* Category Tabs */}
        {!collapsed && !searchTerm && (
          <div style={{ 
            padding: '1rem 1.5rem', 
            borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
            background: 'rgba(15, 23, 42, 0.5)'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
              {Object.keys(categories).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    background: activeCategory === category 
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.8))'
                      : 'rgba(148, 163, 184, 0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: activeCategory === category ? 'white' : 'rgba(148, 163, 184, 0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {categoryNames[category]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div style={{ 
          flex: 1, 
          padding: '1.5rem', 
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(148, 163, 184, 0.3) transparent'
        }}>
          {!collapsed && !searchTerm && (
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '700',
                color: 'rgba(148, 163, 184, 0.9)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '1rem'
              }}>
                {categoryNames[activeCategory]}
              </h3>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(searchTerm ? filteredItems : categories[activeCategory] || []).map((item, index) => (
              <button
                key={index}
                onClick={() => handleClick(item.page)}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: collapsed ? '0' : '1rem',
                  padding: collapsed ? '16px 12px' : '16px 20px',
                  borderRadius: '16px',
                  background: hoveredItem === item.name 
                    ? item.gradient
                    : 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(51, 65, 85, 0.6))',
                  border: '1px solid rgba(148, 163, 184, 0.2)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  color: 'white',
                  fontWeight: '600',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: hoveredItem === item.name ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: hoveredItem === item.name 
                    ? '0 8px 25px rgba(0, 0, 0, 0.15)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  justifyContent: collapsed ? 'center' : 'flex-start'
                }}
              >
                {/* Modern accent indicator */}
                <div style={{
                  width: collapsed ? '12px' : '6px',
                  height: collapsed ? '12px' : '32px',
                  borderRadius: collapsed ? '50%' : '3px',
                  background: item.gradient,
                  flexShrink: 0,
                  opacity: hoveredItem === item.name ? 1 : 0.6,
                  transition: 'all 0.3s ease'
                }}></div>
                
                {!collapsed && (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ 
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      display: 'block',
                      letterSpacing: '0.25px'
                    }}>
                      {item.name}
                    </span>
                  </div>
                )}

                {/* Hover effect overlay */}
                {hoveredItem === item.name && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    borderRadius: '16px',
                    pointerEvents: 'none'
                  }}></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Footer */}
        {!collapsed && (
          <div style={{ 
            padding: '1.5rem', 
            borderTop: '1px solid rgba(148, 163, 184, 0.2)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))'
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: '12px',
                color: 'rgba(148, 163, 184, 0.7)',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}>
                v2.1.0 Enterprise
              </p>
              <div style={{
                marginTop: '0.5rem',
                height: '2px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '1px',
                opacity: 0.6
              }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
