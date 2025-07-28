import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';

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
      id: "billing", 
      name: "Billing", 
      color: "#8b5cf6",
      isActive: currentPage === "billing"
    },
    { 
      id: "more", 
      name: "More", 
      color: "#6b7280",
      isActive: false
    }
  ];

  const handleNavClick = (pageId) => {
    if (pageId === "more") {
      return;
    }
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
      height: 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: 0 // Safe area handled by StatusBar
    }}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleNavClick(item.id)}
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 12,
            backgroundColor: item.isActive ? `${item.color}15` : 'transparent',
            minWidth: 60,
            minHeight: 56,
            position: 'relative'
          }}
        >
          {/* Indicator dot */}
          <View style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: item.isActive ? item.color : theme.textSecondary,
            opacity: item.isActive ? 1 : 0.4
          }} />
          
          {/* Label */}
          <Text style={{
            fontSize: 11,
            fontWeight: item.isActive ? '600' : '500',
            color: item.isActive ? item.color : theme.textSecondary,
            textAlign: 'center',
            lineHeight: 13
          }}>
            {item.name}
          </Text>

          {/* Active indicator */}
          {item.isActive && (
            <View style={{
              position: 'absolute',
              bottom: 4,
              width: 24,
              height: 2,
              backgroundColor: item.color,
              borderRadius: 1
            }} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavigation;
