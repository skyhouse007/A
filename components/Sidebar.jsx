import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';

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
    <View style={{
      width: collapsed ? 80 : 320,
      height: '100%',
      backgroundColor: theme.cardBg,
      borderRightWidth: 1,
      borderRightColor: theme.border,
      position: 'relative',
      flex: 1,
      flexDirection: 'column'
    }}>
      {/* Header */}
      <View style={{ 
        padding: collapsed ? 16 : 24, 
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        backgroundColor: theme.cardBg
      }}>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: collapsed ? 0 : 16 
        }}>
          {onClose && (
            <TouchableOpacity
              onPress={onClose}
              style={{
                padding: 8,
                borderRadius: 8,
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: theme.border,
                minWidth: 60,
                alignItems: 'center'
              }}
            >
              <Text style={{
                fontSize: 12,
                fontWeight: '600',
                color: theme.textSecondary
              }}>
                Close
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => setCollapsed && setCollapsed(!collapsed)}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: theme.border,
              minWidth: 60,
              alignItems: 'center'
            }}
          >
            <Text style={{
              fontSize: 12,
              fontWeight: '600',
              color: theme.textSecondary
            }}>
              {collapsed ? '→' : '←'}
            </Text>
          </TouchableOpacity>
        </View>

        {!collapsed && (
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              fontSize: 18,
              fontWeight: '700',
              color: theme.text,
              marginBottom: 4
            }}>
              Navigation
            </Text>
            <Text style={{
              fontSize: 12,
              color: theme.textSecondary,
              fontWeight: '500'
            }}>
              Business Modules
            </Text>
          </View>
        )}
      </View>

      {/* Search Bar */}
      {!collapsed && (
        <View style={{ 
          padding: 16, 
          borderBottomWidth: 1, 
          borderBottomColor: theme.border 
        }}>
          <TextInput
            placeholder="Search modules..."
            placeholderTextColor={theme.textSecondary}
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.border,
              backgroundColor: theme.cardBg,
              fontSize: 14,
              color: theme.text,
              fontWeight: '500'
            }}
          />
        </View>
      )}

      {/* Category Tabs */}
      {!collapsed && (
        <View style={{ 
          padding: 16, 
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
          backgroundColor: theme.cardBg
        }}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {Object.keys(categories).filter(cat => categories[cat].length > 0).map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                  backgroundColor: activeCategory === category ? theme.accent : 'transparent',
                  borderWidth: 1,
                  borderColor: activeCategory === category ? theme.accent : theme.border
                }}
              >
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: activeCategory === category ? 'white' : theme.textSecondary
                }}>
                  {categoryNames[category]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Navigation Items */}
      <ScrollView style={{ 
        flex: 1, 
        padding: 16
      }}>
        {!collapsed && (
          <View style={{ marginBottom: 16 }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 12
            }}>
              {categoryNames[activeCategory] || categoryNames.main}
            </Text>
          </View>
        )}

        <View style={{ gap: 8 }}>
          {(categories[activeCategory] || []).map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleClick(item.page)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: collapsed ? 0 : 12,
                paddingHorizontal: collapsed ? 12 : 16,
                paddingVertical: 12,
                borderRadius: 8,
                backgroundColor: theme.cardBg,
                borderWidth: 1,
                borderColor: theme.border,
                justifyContent: collapsed ? 'center' : 'flex-start'
              }}
            >
              {/* Color indicator */}
              <View style={{
                width: collapsed ? 8 : 6,
                height: collapsed ? 8 : 6,
                borderRadius: collapsed ? 4 : 3,
                backgroundColor: item.color
              }} />
              
              {!collapsed && (
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontSize: 14,
                    color: theme.text,
                    fontWeight: '500'
                  }} numberOfLines={1}>
                    {item.name}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      {!collapsed && (
        <View style={{ 
          padding: 16, 
          borderTopWidth: 1,
          borderTopColor: theme.border,
          backgroundColor: theme.cardBg
        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              fontSize: 12,
              color: theme.textSecondary,
              fontWeight: '500'
            }}>
              BusinessApp v2.1.0
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Sidebar;
