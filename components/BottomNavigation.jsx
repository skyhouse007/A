import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const BottomNavigation = ({ currentPage, setPage, theme }) => {
  // All navigation items from sidebar - organized by category
  const allNavItems = [
    // Core Operations
    { name: "Dashboard", page: "dashboard", category: "main", color: "#667eea", icon: "📊" },
    { name: "Inventory", page: "inventoryList", category: "main", color: "#f093fb", icon: "📦" },
    { name: "Sales List", page: "salesList", category: "main", color: "#4facfe", icon: "💰" },
    { name: "Sales Entry", page: "sales", category: "main", color: "#a8edea", icon: "🛒" },
    { name: "Purchase Form", page: "purchaseForm", category: "main", color: "#ff8a80", icon: "🛍️" },
    { name: "Purchase List", page: "purchaseList", category: "main", color: "#ff6b6b", icon: "📝" },
    { name: "Vendors", page: "vendors", category: "main", color: "#fa709a", icon: "🏢" },
    { name: "Billing", page: "billing", category: "main", color: "#667eea", icon: "🧾" },
    
    // Financial Management
    { name: "Cash In", page: "cashIn", category: "financial", color: "#a6c1ee", icon: "💵" },
    { name: "Cash Out", page: "cashOut", category: "financial", color: "#f6d365", icon: "💸" },
    { name: "Cash Entry", page: "cashEntry", category: "financial", color: "#51cf66", icon: "💳" },
    { name: "Ledgers", page: "ledger", category: "financial", color: "#96fbc4", icon: "📖" },
    { name: "Ledger Details", page: "ledgerDetails", category: "financial", color: "#74c0fc", icon: "📋" },
    { name: "Documents", page: "document", category: "financial", color: "#a18cd1", icon: "📄" },
    
    // Reports & Analytics
    { name: "Profit & Loss", page: "profitLoss", category: "reports", color: "#ee9ca7", icon: "📈" },
    { name: "GST Details", page: "gstDetails", category: "reports", color: "#2196f3", icon: "🧮" },
    { name: "Dashboard KPIs", page: "dashboardKPIs", category: "reports", color: "#ffd43b", icon: "📊" },
    { name: "Reminders", page: "reminders", category: "reports", color: "#fc466b", icon: "⏰" },
  ];

  const handleNavClick = (pageId) => {
    setPage(pageId);
  };

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.cardBg,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingBottom: 8, // Safe area
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 10
    }}>
      {/* Category Indicators */}
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 4,
        justifyContent: 'space-between'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#667eea' }} />
          <Text style={{ fontSize: 10, color: theme.textSecondary, fontWeight: '600' }}>CORE</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#a6c1ee' }} />
          <Text style={{ fontSize: 10, color: theme.textSecondary, fontWeight: '600' }}>FINANCIAL</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#ee9ca7' }} />
          <Text style={{ fontSize: 10, color: theme.textSecondary, fontWeight: '600' }}>REPORTS</Text>
        </View>
      </View>

      {/* Horizontal Scrolling Navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          gap: 8,
          alignItems: 'center',
          paddingVertical: 8
        }}
        style={{
          maxHeight: 80
        }}
      >
        {allNavItems.map((item, index) => {
          const isActive = currentPage === item.page;
          return (
            <TouchableOpacity
              key={`${item.page}-${index}`}
              onPress={() => handleNavClick(item.page)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                backgroundColor: isActive ? `${item.color}20` : 'transparent',
                borderWidth: isActive ? 1 : 0,
                borderColor: isActive ? item.color : 'transparent',
                minWidth: 80,
                maxWidth: 100,
                position: 'relative'
              }}
            >
              {/* Icon */}
              <Text style={{
                fontSize: 16,
                marginBottom: 2
              }}>
                {item.icon}
              </Text>
              
              {/* Label */}
              <Text style={{
                fontSize: 10,
                fontWeight: isActive ? '600' : '500',
                color: isActive ? item.color : theme.textSecondary,
                textAlign: 'center',
                lineHeight: 12
              }} numberOfLines={2}>
                {item.name}
              </Text>

              {/* Active indicator dot */}
              {isActive && (
                <View style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: item.color
                }} />
              )}

              {/* Category indicator */}
              <View style={{
                position: 'absolute',
                bottom: 2,
                width: 16,
                height: 2,
                borderRadius: 1,
                backgroundColor: isActive ? item.color : 
                  item.category === 'main' ? '#667eea' :
                  item.category === 'financial' ? '#a6c1ee' : '#ee9ca7',
                opacity: isActive ? 1 : 0.3
              }} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Current Page Indicator */}
      <View style={{
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: 4,
        borderTopWidth: 1,
        borderTopColor: theme.border + '30'
      }}>
        <Text style={{
          fontSize: 10,
          color: theme.textSecondary,
          textAlign: 'center',
          fontWeight: '500'
        }}>
          {allNavItems.find(item => item.page === currentPage)?.name || 'Dashboard'} • 
          <Text style={{ color: theme.accent }}> {allNavItems.length} modules</Text>
        </Text>
      </View>
    </View>
  );
};

export default BottomNavigation;
