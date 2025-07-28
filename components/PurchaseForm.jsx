import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

const PurchaseForm = ({ theme }) => {
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    vendor: '',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    items: [{ product: '', quantity: 1, unitPrice: 0 }],
    notes: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const existingOrders = [
    {
      id: 1,
      orderNumber: 'PO-001',
      vendor: 'Tech Supplies Co.',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-25',
      status: 'pending',
      total: 2450.00,
      items: [
        { product: 'Laptops', quantity: 5, unitPrice: 450.00 },
        { product: 'Monitors', quantity: 3, unitPrice: 150.00 }
      ]
    },
    {
      id: 2,
      orderNumber: 'PO-002',
      vendor: 'Office Equipment Ltd',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-20',
      status: 'delivered',
      total: 850.00,
      items: [
        { product: 'Office Chairs', quantity: 10, unitPrice: 85.00 }
      ]
    },
    {
      id: 3,
      orderNumber: 'PO-003',
      vendor: 'Software Solutions Inc',
      orderDate: '2024-01-10',
      deliveryDate: '2024-01-18',
      status: 'cancelled',
      total: 1200.00,
      items: [
        { product: 'Software License', quantity: 2, unitPrice: 600.00 }
      ]
    }
  ];

  const vendors = [
    'Tech Supplies Co.',
    'Office Equipment Ltd',
    'Software Solutions Inc',
    'Hardware Depot',
    'Business Solutions LLC'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { product: '', quantity: 1, unitPrice: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        items: newItems
      }));
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      return total + (item.quantity * item.unitPrice);
    }, 0);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'delivered': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      case 'shipped': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredOrders = existingOrders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    console.log('Purchase Order:', formData);
    // Reset form
    setFormData({
      vendor: '',
      orderDate: new Date().toISOString().split('T')[0],
      deliveryDate: '',
      items: [{ product: '', quantity: 1, unitPrice: 0 }],
      notes: ''
    });
    Alert.alert('Success', 'Purchase order created successfully!');
  };

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
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 16,
    },
    tabsContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    tab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
    },
    activeTab: {
      backgroundColor: theme.accent,
      borderColor: theme.accent,
    },
    inactiveTab: {
      backgroundColor: 'transparent',
      borderColor: theme.border,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '500',
    },
    activeTabText: {
      color: 'white',
    },
    inactiveTabText: {
      color: theme.textSecondary,
    },
    content: {
      padding: 16,
    },
    formContainer: {
      backgroundColor: theme.cardBg,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 20,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.text,
      marginBottom: 8,
    },
    input: {
      width: '100%',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      color: theme.text,
      fontSize: 14,
    },
    row: {
      flexDirection: 'row',
      gap: 12,
    },
    flex1: {
      flex: 1,
    },
    itemsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    addButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: theme.accent,
    },
    addButtonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '500',
    },
    itemRow: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 8,
      alignItems: 'flex-end',
    },
    itemInput: {
      flex: 2,
      padding: 10,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      color: theme.text,
      fontSize: 14,
    },
    itemInputSmall: {
      width: 80,
      padding: 10,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      color: theme.text,
      fontSize: 14,
    },
    itemInputMedium: {
      width: 100,
      padding: 10,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      color: theme.text,
      fontSize: 14,
    },
    removeButton: {
      width: 40,
      padding: 10,
      borderRadius: 6,
      alignItems: 'center',
    },
    removeButtonText: {
      fontSize: 12,
    },
    textArea: {
      width: '100%',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.bg,
      color: theme.text,
      fontSize: 14,
      height: 80,
      textAlignVertical: 'top',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    totalText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    submitButton: {
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
      backgroundColor: theme.accent,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    orderCard: {
      backgroundColor: theme.cardBg,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
    },
    orderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    orderTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 4,
    },
    orderSubtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 4,
    },
    orderItems: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      fontSize: 11,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    orderFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    orderDetail: {
      flex: 1,
    },
    orderDetailLabel: {
      fontSize: 12,
      color: theme.textSecondary,
      marginBottom: 2,
    },
    orderDetailValue: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
    },
    orderDetailValueSmall: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    emptyState: {
      backgroundColor: theme.cardBg,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 32,
      alignItems: 'center',
    },
    emptyStateTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.textSecondary,
      marginBottom: 8,
    },
    emptyStateText: {
      fontSize: 14,
      color: theme.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Purchase Orders</Text>
        
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('create')}
            style={[styles.tab, activeTab === 'create' ? styles.activeTab : styles.inactiveTab]}
          >
            <Text style={[styles.tabText, activeTab === 'create' ? styles.activeTabText : styles.inactiveTabText]}>
              Create Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('existing')}
            style={[styles.tab, activeTab === 'existing' ? styles.activeTab : styles.inactiveTab]}
          >
            <Text style={[styles.tabText, activeTab === 'existing' ? styles.activeTabText : styles.inactiveTabText]}>
              Existing Orders
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Create Order Tab */}
        {activeTab === 'create' && (
          <View style={styles.formContainer}>
            {/* Vendor */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Vendor</Text>
              <TextInput
                style={styles.input}
                value={formData.vendor}
                onChangeText={(value) => handleInputChange('vendor', value)}
                placeholder="Select a vendor"
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            {/* Dates */}
            <View style={styles.inputGroup}>
              <View style={styles.row}>
                <View style={styles.flex1}>
                  <Text style={styles.label}>Order Date</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.orderDate}
                    onChangeText={(value) => handleInputChange('orderDate', value)}
                    placeholder="Order Date"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
                <View style={styles.flex1}>
                  <Text style={styles.label}>Expected Delivery</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.deliveryDate}
                    onChangeText={(value) => handleInputChange('deliveryDate', value)}
                    placeholder="Delivery Date"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
              </View>
            </View>

            {/* Items */}
            <View style={styles.inputGroup}>
              <View style={styles.itemsHeader}>
                <Text style={styles.label}>Items</Text>
                <TouchableOpacity onPress={addItem} style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add Item</Text>
                </TouchableOpacity>
              </View>

              {formData.items.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <TextInput
                    style={styles.itemInput}
                    value={item.product}
                    onChangeText={(value) => handleItemChange(index, 'product', value)}
                    placeholder="Product name"
                    placeholderTextColor={theme.textSecondary}
                  />
                  <TextInput
                    style={styles.itemInputSmall}
                    value={item.quantity.toString()}
                    onChangeText={(value) => handleItemChange(index, 'quantity', parseInt(value) || 1)}
                    placeholder="Qty"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.itemInputMedium}
                    value={item.unitPrice.toString()}
                    onChangeText={(value) => handleItemChange(index, 'unitPrice', parseFloat(value) || 0)}
                    placeholder="Price"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity
                    onPress={() => removeItem(index)}
                    disabled={formData.items.length === 1}
                    style={[
                      styles.removeButton,
                      { backgroundColor: formData.items.length === 1 ? theme.border : '#ef4444' }
                    ]}
                  >
                    <Text style={[
                      styles.removeButtonText,
                      { color: formData.items.length === 1 ? theme.textSecondary : 'white' }
                    ]}>
                      ×
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Notes */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notes (Optional)</Text>
              <TextInput
                style={styles.textArea}
                value={formData.notes}
                onChangeText={(value) => handleInputChange('notes', value)}
                placeholder="Additional notes or special instructions..."
                placeholderTextColor={theme.textSecondary}
                multiline
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.totalText}>
                Total: ${calculateTotal().toFixed(2)}
              </Text>
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Create Purchase Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Existing Orders Tab */}
        {activeTab === 'existing' && (
          <View>
            {/* Search */}
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Search orders..."
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            {/* Orders List */}
            {filteredOrders.map((order) => (
              <TouchableOpacity key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.flex1}>
                    <Text style={styles.orderTitle}>{order.orderNumber}</Text>
                    <Text style={styles.orderSubtitle}>Vendor: {order.vendor}</Text>
                    <Text style={styles.orderItems}>
                      Items: {order.items.map(item => `${item.product} (${item.quantity})`).join(', ')}
                    </Text>
                  </View>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: `${getStatusColor(order.status)}20`, color: getStatusColor(order.status) }
                  ]}>
                    <Text style={[styles.statusBadge, { color: getStatusColor(order.status) }]}>
                      {getStatusText(order.status)}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderFooter}>
                  <View style={styles.orderDetail}>
                    <Text style={styles.orderDetailLabel}>Total</Text>
                    <Text style={styles.orderDetailValue}>${order.total.toFixed(2)}</Text>
                  </View>
                  <View style={styles.orderDetail}>
                    <Text style={styles.orderDetailLabel}>Order Date</Text>
                    <Text style={styles.orderDetailValueSmall}>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.orderDetail}>
                    <Text style={styles.orderDetailLabel}>Delivery</Text>
                    <Text style={styles.orderDetailValueSmall}>
                      {new Date(order.deliveryDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {/* Empty State */}
            {filteredOrders.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateTitle}>No orders found</Text>
                <Text style={styles.emptyStateText}>Try adjusting your search criteria</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PurchaseForm;
