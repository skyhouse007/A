import React from 'react';
import { View, Text } from 'react-native';

const DashboardKPIs = ({ theme }) => {
  const kpiData = [
    {
      id: 1,
      title: 'Daily Sales',
      value: '$12,450',
      change: '+12.5%',
      trend: 'up',
      color: '#10b981',
      subtitle: 'vs yesterday'
    },
    {
      id: 2,
      title: 'Total Orders',
      value: '248',
      change: '+8.2%',
      trend: 'up',
      color: '#3b82f6',
      subtitle: 'vs yesterday'
    },
    {
      id: 3,
      title: 'Active Users',
      value: '1,842',
      change: '+24.8%',
      trend: 'up',
      color: '#f59e0b',
      subtitle: 'online now'
    },
    {
      id: 4,
      title: 'Revenue',
      value: '$89,340',
      change: '-2.4%',
      trend: 'down',
      color: '#ef4444',
      subtitle: 'this month'
    }
  ];

  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{
        fontSize: 18,
        fontWeight: '600',
        color: theme.text,
        marginBottom: 12
      }}>
        Key Performance Indicators
      </Text>
      
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12
      }}>
        {kpiData.map((kpi) => (
          <View
            key={kpi.id}
            style={{
              backgroundColor: theme.cardBg,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 12,
              padding: 16,
              width: '48%',
              minWidth: 140
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8
            }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: kpi.color
              }} />
              <Text style={{
                fontSize: 12,
                fontWeight: '600',
                color: kpi.trend === 'up' ? '#10b981' : '#ef4444'
              }}>
                {kpi.change}
              </Text>
            </View>

            <Text style={{
              fontSize: 12,
              color: theme.textSecondary,
              marginBottom: 4,
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}>
              {kpi.title}
            </Text>

            <Text style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.text,
              marginBottom: 2
            }}>
              {kpi.value}
            </Text>

            <Text style={{
              fontSize: 11,
              color: theme.textSecondary
            }}>
              {kpi.subtitle}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DashboardKPIs;
