import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Navbar = ({ user, setPage, theme, darkMode, setDarkMode, onMenuPress }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Low Stock Alert",
      message: "Product A: 5 units remaining",
      time: "2m ago",
      urgent: true,
    },
    {
      id: 2,
      title: "New Order",
      message: "Order #12456 - $2,340",
      time: "15m ago",
      urgent: false,
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Invoice INV-001 paid",
      time: "1h ago",
      urgent: false,
    },
  ];

  return (
    <View
      style={{
        backgroundColor: theme.cardBg,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingTop: 44, // Account for status bar
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80
      }}
    >
      {/* Left side - Menu and Logo */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity
          onPress={onMenuPress}
          style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: 'transparent'
          }}
        >
          <View style={{ gap: 3 }}>
            <View style={{ width: 18, height: 2, backgroundColor: theme.text, borderRadius: 1 }} />
            <View style={{ width: 18, height: 2, backgroundColor: theme.text, borderRadius: 1 }} />
            <View style={{ width: 18, height: 2, backgroundColor: theme.text, borderRadius: 1 }} />
          </View>
        </TouchableOpacity>

        <View>
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            color: theme.text
          }}>
            BusinessApp
          </Text>
        </View>
      </View>

      {/* Right side - Actions */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {/* Theme Toggle */}
        <TouchableOpacity
          onPress={() => setDarkMode(!darkMode)}
          style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: 'transparent'
          }}
        >
          <Text style={{
            fontSize: 16,
            color: theme.textSecondary
          }}>
            {darkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>

        {/* Notifications */}
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            onPress={() => setShowNotifications(!showNotifications)}
            style={{
              padding: 8,
              borderRadius: 8,
              backgroundColor: 'transparent',
              position: 'relative'
            }}
          >
            <Text style={{
              fontSize: 16,
              color: theme.textSecondary
            }}>
              🔔
            </Text>
            {notifications.some(n => n.urgent) && (
              <View style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#ef4444'
              }} />
            )}
          </TouchableOpacity>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <View style={{
              position: 'absolute',
              top: 44,
              right: 0,
              width: 280,
              backgroundColor: theme.cardBg,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.border,
              padding: 16,
              zIndex: 50
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                color: theme.text,
                marginBottom: 12
              }}>
                Notifications
              </Text>
              <ScrollView style={{ maxHeight: 200 }}>
                {notifications.map((notification) => (
                  <TouchableOpacity
                    key={notification.id}
                    style={{
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                      borderBottomColor: theme.border + '30'
                    }}
                  >
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      gap: 8
                    }}>
                      <View style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: notification.urgent ? '#ef4444' : theme.accent,
                        marginTop: 6
                      }} />
                      <View style={{ flex: 1 }}>
                        <Text style={{
                          fontSize: 13,
                          fontWeight: '600',
                          color: theme.text,
                          marginBottom: 2
                        }}>
                          {notification.title}
                        </Text>
                        <Text style={{
                          fontSize: 12,
                          color: theme.textSecondary,
                          marginBottom: 2
                        }}>
                          {notification.message}
                        </Text>
                        <Text style={{
                          fontSize: 11,
                          color: theme.textSecondary + '80'
                        }}>
                          {notification.time}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* User Profile */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            backgroundColor: theme.accent + '20'
          }}
        >
          <View style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: theme.accent,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: 12,
              fontWeight: '600',
              color: 'white'
            }}>
              {user?.name?.charAt(0) || 'U'}
            </Text>
          </View>
          <Text style={{
            fontSize: 13,
            fontWeight: '500',
            color: theme.text
          }}>
            {user?.name || 'User'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
