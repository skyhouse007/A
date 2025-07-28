import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
      subtitle: 'this week'
    },
    {
      id: 3,
      title: 'Inventory Value',
      value: '$89,234',
      change: '-2.4%',
      trend: 'down',
      color: '#f59e0b',
      subtitle: 'current stock'
    },
    {
      id: 4,
      title: 'Profit Margin',
      value: '24.7%',
      change: '+1.3%',
      trend: 'up',
      color: '#8b5cf6',
      subtitle: 'gross profit'
    }
  ];

  const getStatusColor = (trend) => {
    return trend === 'up' ? '#10b981' : '#ef4444';
  };

  const getStatusBg = (trend) => {
    return trend === 'up' ? '#dcfce7' : '#fef2f2';
  };

  const getStatusTextColor = (trend) => {
    return trend === 'up' ? '#166534' : '#dc2626';
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 24,
    },
    kpiCard: {
      backgroundColor: theme.cardBg,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
      position: 'relative',
      overflow: 'hidden',
      width: '48%',
      minWidth: 150,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    indicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    changeContainer: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 6,
    },
    changeText: {
      fontSize: 11,
      fontWeight: '600',
    },
    title: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.textSecondary,
      marginBottom: 4,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    value: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
      lineHeight: 24,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 11,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    bottomIndicator: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
      opacity: 0.8,
    },
  });

  return (
    <View style={styles.container}>
      {kpiData.map((kpi) => (
        <TouchableOpacity key={kpi.id} style={styles.kpiCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.indicator, { backgroundColor: kpi.color }]} />
            <View style={[
              styles.changeContainer,
              { backgroundColor: getStatusBg(kpi.trend) }
            ]}>
              <Text style={[
                styles.changeText,
                { color: getStatusTextColor(kpi.trend) }
              ]}>
                {kpi.change}
              </Text>
            </View>
          </View>

          <Text style={styles.title}>{kpi.title}</Text>
          <Text style={styles.value}>{kpi.value}</Text>
          <Text style={styles.subtitle}>{kpi.subtitle}</Text>

          <View style={[
            styles.bottomIndicator,
            { backgroundColor: kpi.color }
          ]} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DashboardKPIs;
