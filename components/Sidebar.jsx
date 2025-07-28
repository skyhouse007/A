import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const navItems = [
  { name: "Dashboard", page: "dashboard", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#667eea" },
  { name: "Inventory", page: "inventoryList", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "#f093fb" },
  { name: "Sales List", page: "salesList", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", color: "#4facfe" },
  { name: "Purchase", page: "purchase", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", color: "#43e97b" },
  { name: "Vendors", page: "vendors", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", color: "#fa709a" },
  { name: "Sales Entry", page: "sales", gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", color: "#a8edea" },
  { name: "Services", page: "services", gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", color: "#ff9a9e" },
  { name: "Documents", page: "document", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", color: "#a18cd1" },
  { name: "Orders", page: "orders", gradient: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)", color: "#fad0c4" },
  { name: "Purchase Form", page: "purchaseForm", gradient: "linear-gradient(135deg, #ff8a80 0%, #ffb74d 100%)", color: "#ff8a80" },
  { name: "Purchase List", page: "purchaseList", gradient: "linear-gradient(135deg, #ff8a80 0%, #ffb74d 100%)", color: "#ff8a80" },
  { name: "Customers", page: "Customer", gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", color: "#84fab0" },
  { name: "Cash In", page: "cashIn", gradient: "linear-gradient(135deg, #a6c1ee 0%, #fbc2eb 100%)", color: "#a6c1ee" },
  { name: "Cash Out", page: "cashOut", gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", color: "#f6d365" },
  { name: "Ledgers", page: "ledger", gradient: "linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)", color: "#96fbc4" },
  { name: "Balance Sheet", page: "balanceSheet", gradient: "linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)", color: "#fdbb2d" },
  { name: "Profit & Loss", page: "profitLoss", gradient: "linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)", color: "#ee9ca7" },
  { name: "GST Details", page: "gstDetails", gradient: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)", color: "#2196f3" },
  { name: "Reminders", page: "Reminders", gradient: "linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)", color: "#fc466b" },
  { name: "Billing", page: "billing", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#667eea" },
];

const Sidebar = ({ setPage, collapsed = false, setCollapsed, onClose, theme }) => {
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
        {!collapsed && !searchTerm && (
          <View style={{ 
            padding: 16, 
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(148, 163, 184, 0.2)',
            backgroundColor: 'rgba(15, 23, 42, 0.5)'
          }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {Object.keys(categories).map((category) => (
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
          {!collapsed && !searchTerm && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '700',
                color: 'rgba(148, 163, 184, 0.9)',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginBottom: 16
              }}>
                {categoryNames[activeCategory]}
              </Text>
            </View>
          )}

          <View style={{ gap: 12 }}>
            {(searchTerm ? filteredItems : categories[activeCategory] || []).map((item, index) => (
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
