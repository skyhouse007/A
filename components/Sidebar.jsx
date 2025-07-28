import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

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
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("main");

  // Update active category when searching
  React.useEffect(() => {
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
    <View
      style={{
        width: collapsed ? 80 : 320,
        height: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.98)',
        borderRightWidth: 1,
        borderRightColor: 'rgba(148, 163, 184, 0.2)',
        position: 'relative'
      }}
    >
      {/* Content */}
      <View style={{ height: '100%', flexDirection: 'column' }}>
        
        {/* Modern Header */}
        <View style={{ 
          padding: collapsed ? 16 : 24, 
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(148, 163, 184, 0.2)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)'
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: collapsed ? 0 : 16 }}>
            {onClose && (
              <TouchableOpacity
                onPress={onClose}
                style={{
                  padding: 12,
                  borderRadius: 16,
                  backgroundColor: 'rgba(239, 68, 68, 0.8)',
                  minWidth: 60
                }}
              >
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  textAlign: 'center'
                }}>
                  Close
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setCollapsed && setCollapsed(!collapsed)}
              style={{
                padding: 12,
                borderRadius: 16,
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                minWidth: 60
              }}
            >
              <Text style={{
                fontSize: 12,
                fontWeight: '600',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                textAlign: 'center'
              }}>
                {collapsed ? 'Expand' : 'Collapse'}
              </Text>
            </TouchableOpacity>
          </View>

          {!collapsed && (
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '800',
                color: 'white',
                marginBottom: 4,
                letterSpacing: -0.5
              }}>
                Navigation
              </Text>
              <Text style={{
                fontSize: 12,
                color: 'rgba(148, 163, 184, 0.8)',
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontWeight: '500'
              }}>
                Enterprise Dashboard
              </Text>
            </View>
          )}
        </View>

        {/* Modern Search Bar */}
        {!collapsed && (
          <View style={{ padding: 24, borderBottomWidth: 1, borderBottomColor: 'rgba(148, 163, 184, 0.2)' }}>
            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="Search navigation..."
                placeholderTextColor="rgba(148, 163, 184, 0.6)"
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(148, 163, 184, 0.3)',
                  borderRadius: 16,
                  padding: 16,
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  fontSize: 14,
                  color: 'white',
                  fontWeight: '500'
                }}
              />
            </View>
          </View>
        )}

        {/* Category Tabs */}
        {!collapsed && (
          <View style={{
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(148, 163, 184, 0.2)',
            backgroundColor: 'rgba(15, 23, 42, 0.5)'
          }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {Object.keys(categories).filter(cat => categories[cat].length > 0).map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setActiveCategory(category)}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 12,
                      backgroundColor: activeCategory === category
                        ? 'rgba(99, 102, 241, 0.8)'
                        : 'rgba(148, 163, 184, 0.1)'
                    }}
                  >
                    <Text style={{
                      fontSize: 12,
                      fontWeight: '600',
                      color: activeCategory === category ? 'white' : 'rgba(148, 163, 184, 0.8)',
                      textTransform: 'uppercase',
                      letterSpacing: 0.5
                    }}>
                      {categoryNames[category]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}

        {/* Navigation Items */}
        <ScrollView style={{ 
          flex: 1, 
          padding: 24
        }}>
          {!collapsed && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '700',
                color: 'rgba(148, 163, 184, 0.9)',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 16
              }}>
                {categoryNames[activeCategory] || categoryNames.main}
              </Text>
            </View>
          )}

          <View style={{ gap: 12 }}>
            {(categories[activeCategory] || []).map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleClick(item.page)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: collapsed ? 0 : 16,
                  paddingHorizontal: collapsed ? 12 : 20,
                  paddingVertical: 16,
                  borderRadius: 16,
                  backgroundColor: 'rgba(30, 41, 59, 0.6)',
                  borderWidth: 1,
                  borderColor: 'rgba(148, 163, 184, 0.2)',
                  justifyContent: collapsed ? 'center' : 'flex-start'
                }}
              >
                {/* Modern accent indicator */}
                <View style={{
                  width: collapsed ? 12 : 6,
                  height: collapsed ? 12 : 32,
                  borderRadius: collapsed ? 6 : 3,
                  backgroundColor: item.color,
                  opacity: 0.8
                }} />
                
                {!collapsed && (
                  <View style={{ flex: 1 }}>
                    <Text style={{ 
                      color: 'white',
                      fontSize: 14,
                      fontWeight: '600',
                      letterSpacing: 0.25
                    }}>
                      {item.name}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Modern Footer */}
        {!collapsed && (
          <View style={{ 
            padding: 24, 
            borderTopWidth: 1,
            borderTopColor: 'rgba(148, 163, 184, 0.2)',
            backgroundColor: 'rgba(15, 23, 42, 0.8)'
          }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontSize: 12,
                color: 'rgba(148, 163, 184, 0.7)',
                fontWeight: '500',
                letterSpacing: 0.5
              }}>
                v2.1.0 Enterprise
              </Text>
              <View style={{
                marginTop: 8,
                height: 2,
                width: '100%',
                backgroundColor: '#667eea',
                borderRadius: 1,
                opacity: 0.6
              }} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Sidebar;
