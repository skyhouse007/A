import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const SalesList = ({ theme }) => {
  const [filterPeriod, setFilterPeriod] = useState('today');

  const salesData = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      customer: 'John Smith',
      items: ['Product A', 'Product B'],
      total: 149.98,
      status: 'completed',
      paymentMethod: 'Credit Card',
      date: '2024-01-15T10:30:00',
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      customer: 'Sarah Johnson',
      items: ['Product C'],
      total: 199.99,
      status: 'pending',
      paymentMethod: 'Bank Transfer',
      date: '2024-01-15T09:15:00',
    },
    {
      id: 3,
      orderNumber: 'ORD-003',
      customer: 'Mike Wilson',
      items: ['Product A', 'Product D'],
      total: 129.98,
      status: 'completed',
      paymentMethod: 'Cash',
      date: '2024-01-14T16:45:00',
    },
    {
      id: 4,
      orderNumber: 'ORD-004',
      customer: 'Emily Davis',
      items: ['Product B', 'Product C', 'Product E'],
      total: 329.97,
      status: 'processing',
      paymentMethod: 'Credit Card',
      date: '2024-01-14T14:20:00',
    },
    {
      id: 5,
      orderNumber: 'ORD-005',
      customer: 'Robert Brown',
      items: ['Product E'],
      total: 79.99,
      status: 'cancelled',
      paymentMethod: 'PayPal',
      date: '2024-01-13T11:10:00',
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const totalRevenue = salesData
    .filter(sale => sale.status === 'completed')
    .reduce((sum, sale) => sum + sale.total, 0);

  const pendingOrders = salesData.filter(sale => sale.status === 'pending').length;
  const completedOrders = salesData.filter(sale => sale.status === 'completed').length;

  const periods = [
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'All Time', value: 'all' }
  ];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      flex: 1,
    },
    header: {
      backgroundColor: theme.cardBg,
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
    },
    filterContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
    },
    activeFilter: {
      backgroundColor: theme.accent,
      borderColor: theme.accent,
    },
    inactiveFilter: {
      backgroundColor: 'transparent',
      borderColor: theme.border,
    },
    filterText: {
      fontSize: 12,
      fontWeight: '500',
    },
    activeFilterText: {
      color: 'white',
    },
    inactiveFilterText: {
      color: theme.textSecondary,
    },
    content: {
      padding: 16,
    },
    summaryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 24,
    },
    summaryCard: {
      backgroundColor: theme.cardBg,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: 'center',
      minWidth: 110,
      flex: 1,
    },
    summaryValue: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 4,
    },
    summaryLabel: {
      fontSize: 12,
      color: theme.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      textAlign: 'center',
    },
    revenueValue: {
      color: '#10b981',
    },
    totalValue: {
      color: theme.text,
    },
    pendingValue: {
      color: '#f59e0b',
    },
    completedValue: {
      color: '#10b981',
    },
    salesContainer: {
      gap: 8,
    },
    saleCard: {
      backgroundColor: theme.cardBg,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 16,
    },
    saleHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    saleInfo: {
      flex: 1,
    },
    saleTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 4,
    },
    saleCustomer: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 4,
    },
    saleItems: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      alignSelf: 'flex-start',
    },
    statusText: {
      fontSize: 11,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    saleFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    saleDetail: {
      flex: 1,
    },
    saleDetailLabel: {
      fontSize: 12,
      color: theme.textSecondary,
      marginBottom: 2,
    },
    saleDetailValue: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
    },
    saleDetailValueSmall: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    saleDetailValueMini: {
      fontSize: 12,
      color: theme.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Sales Records</Text>
        </View>
        <View style={styles.filterContainer}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.value}
              onPress={() => setFilterPeriod(period.value)}
              style={[
                styles.filterButton,
                filterPeriod === period.value ? styles.activeFilter : styles.inactiveFilter
              ]}
            >
              <Text style={[
                styles.filterText,
                filterPeriod === period.value ? styles.activeFilterText : styles.inactiveFilterText
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, styles.revenueValue]}>
              ${totalRevenue.toFixed(2)}
            </Text>
            <Text style={styles.summaryLabel}>Revenue</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, styles.totalValue]}>
              {salesData.length}
            </Text>
            <Text style={styles.summaryLabel}>Total Orders</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, styles.pendingValue]}>
              {pendingOrders}
            </Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, styles.completedValue]}>
              {completedOrders}
            </Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
        </View>

        {/* Sales List */}
        <View style={styles.salesContainer}>
          {salesData.map((sale) => (
            <TouchableOpacity key={sale.id} style={styles.saleCard}>
              <View style={styles.saleHeader}>
                <View style={styles.saleInfo}>
                  <Text style={styles.saleTitle}>{sale.orderNumber}</Text>
                  <Text style={styles.saleCustomer}>Customer: {sale.customer}</Text>
                  <Text style={styles.saleItems}>Items: {sale.items.join(', ')}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: `${getStatusColor(sale.status)}20` }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(sale.status) }
                  ]}>
                    {getStatusText(sale.status)}
                  </Text>
                </View>
              </View>

              <View style={styles.saleFooter}>
                <View style={styles.saleDetail}>
                  <Text style={styles.saleDetailLabel}>Total</Text>
                  <Text style={styles.saleDetailValue}>${sale.total.toFixed(2)}</Text>
                </View>
                <View style={styles.saleDetail}>
                  <Text style={styles.saleDetailLabel}>Payment</Text>
                  <Text style={styles.saleDetailValueSmall}>{sale.paymentMethod}</Text>
                </View>
                <View style={styles.saleDetail}>
                  <Text style={styles.saleDetailLabel}>Date</Text>
                  <Text style={styles.saleDetailValueMini}>{formatDate(sale.date)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SalesList;
