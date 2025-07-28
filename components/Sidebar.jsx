'use dom'
import React, { useState, useEffect } from "react";

const navItems = [
  // Core Operations
  { name: "Dashboard", page: "dashboard", category: "main", color: "#667eea" },
  { name: "Inventory List", page: "inventoryList", category: "main", color: "#f093fb" },
  { name: "Sales List", page: "salesList", category: "main", color: "#4facfe" },
  { name: "Sales Entry", page: "sales", category: "main", color: "#a8edea" },
  { name: "Purchase Form", page: "purchaseForm", category: "main", color: "#ff8a80" },
  { name: "Purchase List", page: "purchaseList", category: "main", color: "#ff6b6b" },
  { name: "Vendors", page: "vendors", category: "main", color: "#fa709a" },
  { name: "Billing", page: "billing", category: "main", color: "#667eea" },
  
  // Financial Management
  { name: "Cash In", page: "cashIn", category: "financial", color: "#a6c1ee" },
  { name: "Cash Out", page: "cashOut", category: "financial", color: "#f6d365" },
  { name: "Cash Entry", page: "cashEntry", category: "financial", color: "#51cf66" },
  { name: "Ledgers", page: "ledger", category: "financial", color: "#96fbc4" },
  { name: "Ledger Details", page: "ledgerDetails", category: "financial", color: "#74c0fc" },
  { name: "Documents", page: "document", category: "financial", color: "#a18cd1" },
  
  // Reports & Analytics
  { name: "Profit & Loss", page: "profitLoss", category: "reports", color: "#ee9ca7" },
  { name: "GST Details", page: "gstDetails", category: "reports", color: "#2196f3" },
  { name: "Dashboard KPIs", page: "dashboardKPIs", category: "reports", color: "#ffd43b" },
  { name: "Reminders", page: "reminders", category: "reports", color: "#fc466b" },
];

const Sidebar = ({ setPage, collapsed = false, setCollapsed, onClose, theme }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("main");
  
  // Update active category when searching
  useEffect(() => {
    if (searchTerm) {
      setActiveCategory('all');
    } else {
      setActiveCategory('main');
    }
  }, [searchTerm]);

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
    main: filteredItems.filter(item => item.category === 'main'),
    financial: filteredItems.filter(item => item.category === 'financial'), 
    reports: filteredItems.filter(item => item.category === 'reports')
  };
  
  // If searching, show all filtered items
  if (searchTerm) {
    categories.all = filteredItems;
  }

  const categoryNames = {
    main: "Core Operations",
    financial: "Financial Management", 
    reports: "Reports & Analytics",
    all: "Search Results"
  };

  return (
    <div
      style={{
        width: collapsed ? 80 : 320,
        height: '100%',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div style={{ 
        padding: collapsed ? 16 : 24, 
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: collapsed ? 0 : 16 
        }}>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                padding: 8,
                borderRadius: 8,
                backgroundColor: 'transparent',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: '600',
                color: '#6b7280',
                minWidth: 60
              }}
            >
              Close
            </button>
          )}

          <button
            onClick={() => setCollapsed && setCollapsed(!collapsed)}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: 'transparent',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: '600',
              color: '#6b7280',
              minWidth: 60
            }}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {!collapsed && (
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: 4,
              margin: 0
            }}>
              Navigation
            </h2>
            <p style={{
              fontSize: 12,
              color: '#6b7280',
              fontWeight: '500',
              margin: 0
            }}>
              Business Modules
            </p>
          </div>
        )}
      </div>

      {/* Search Bar */}
      {!collapsed && (
        <div style={{ padding: 16, borderBottom: '1px solid #e5e7eb' }}>
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              fontSize: 14,
              color: '#1f2937',
              fontWeight: '500',
              outline: 'none'
            }}
          />
        </div>
      )}

      {/* Category Tabs */}
      {!collapsed && (
        <div style={{ 
          padding: 16, 
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#ffffff'
        }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
            {Object.keys(categories).filter(cat => categories[cat].length > 0).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 6,
                  paddingBottom: 6,
                  borderRadius: 8,
                  backgroundColor: activeCategory === category ? '#3b82f6' : 'transparent',
                  border: `1px solid ${activeCategory === category ? '#3b82f6' : '#e5e7eb'}`,
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: '600',
                  color: activeCategory === category ? 'white' : '#6b7280',
                  whiteSpace: 'nowrap'
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
        padding: 16,
        overflowY: 'auto'
      }}>
        {!collapsed && (
          <div style={{ marginBottom: 16 }}>
            <h3 style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: 12,
              margin: '0 0 12px 0'
            }}>
              {categoryNames[activeCategory] || categoryNames.main}
            </h3>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {(categories[activeCategory] || []).map((item, index) => (
            <button
              key={index}
              onClick={() => handleClick(item.page)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: collapsed ? 0 : 12,
                paddingLeft: collapsed ? 12 : 16,
                paddingRight: collapsed ? 12 : 16,
                paddingTop: 12,
                paddingBottom: 12,
                borderRadius: 8,
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 14,
                color: '#1f2937',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                justifyContent: collapsed ? 'center' : 'flex-start'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f9fafb';
                e.target.style.borderColor = item.color;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.borderColor = '#e5e7eb';
              }}
            >
              {/* Color indicator */}
              <div style={{
                width: collapsed ? 8 : 6,
                height: collapsed ? 8 : 6,
                borderRadius: '50%',
                backgroundColor: item.color,
                flexShrink: 0
              }} />
              
              {!collapsed && (
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    display: 'block'
                  }}>
                    {item.name}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div style={{ 
          padding: 16, 
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#ffffff'
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: 12,
              color: '#6b7280',
              fontWeight: '500',
              margin: 0
            }}>
              BusinessApp v2.1.0
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
