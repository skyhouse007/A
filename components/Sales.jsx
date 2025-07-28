import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

const Sales = ({ theme }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    items: [{ name: '', quantity: 1, price: 0 }],
    discount: 0,
    tax: 0,
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const updateItem = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * formData.discount) / 100;
    const taxAmount = ((subtotal - discountAmount) * formData.tax) / 100;
    return subtotal - discountAmount + taxAmount;
  };

  const handleSubmit = async () => {
    if (!formData.customerName.trim()) {
      Alert.alert('Error', 'Customer name is required');
      return;
    }

    if (formData.items.some(item => !item.name.trim() || item.quantity <= 0 || item.price <= 0)) {
      Alert.alert('Error', 'Please fill all item details correctly');
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would integrate with your backend API
      // await salesService.createSale(formData);
      
      Alert.alert('Success', 'Sale recorded successfully!');
      
      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        items: [{ name: '', quantity: 1, price: 0 }],
        discount: 0,
        tax: 0,
        notes: ''
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to record sale. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ backgroundColor: theme.bg, flex: 1 }}>
      {/* Header */}
      <View style={{
        backgroundColor: theme.cardBg,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '700',
          color: theme.text,
          marginBottom: 4
        }}>
          New Sale
        </Text>
        <Text style={{
          fontSize: 14,
          color: theme.textSecondary
        }}>
          Record a new sales transaction
        </Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* Customer Information */}
        <View style={{
          backgroundColor: theme.cardBg,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: theme.border
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 12
          }}>
            Customer Information
          </Text>

          <TextInput
            placeholder="Customer Name *"
            placeholderTextColor={theme.textSecondary}
            value={formData.customerName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, customerName: text }))}
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 8,
              padding: 12,
              backgroundColor: theme.bg,
              color: theme.text,
              marginBottom: 12,
              fontSize: 14
            }}
          />

          <TextInput
            placeholder="Customer Email"
            placeholderTextColor={theme.textSecondary}
            value={formData.customerEmail}
            onChangeText={(text) => setFormData(prev => ({ ...prev, customerEmail: text }))}
            keyboardType="email-address"
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 8,
              padding: 12,
              backgroundColor: theme.bg,
              color: theme.text,
              marginBottom: 12,
              fontSize: 14
            }}
          />

          <TextInput
            placeholder="Customer Phone"
            placeholderTextColor={theme.textSecondary}
            value={formData.customerPhone}
            onChangeText={(text) => setFormData(prev => ({ ...prev, customerPhone: text }))}
            keyboardType="phone-pad"
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 8,
              padding: 12,
              backgroundColor: theme.bg,
              color: theme.text,
              fontSize: 14
            }}
          />
        </View>

        {/* Items */}
        <View style={{
          backgroundColor: theme.cardBg,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: theme.border
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: theme.text
            }}>
              Items
            </Text>
            <TouchableOpacity
              onPress={addItem}
              style={{
                backgroundColor: theme.accent,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 6
              }}
            >
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
                Add Item
              </Text>
            </TouchableOpacity>
          </View>

          {formData.items.map((item, index) => (
            <View key={index} style={{
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 8,
              padding: 12,
              marginBottom: 12,
              backgroundColor: theme.bg
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8
              }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: theme.text
                }}>
                  Item {index + 1}
                </Text>
                {formData.items.length > 1 && (
                  <TouchableOpacity
                    onPress={() => removeItem(index)}
                    style={{
                      backgroundColor: '#ef4444',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <TextInput
                placeholder="Item Name"
                placeholderTextColor={theme.textSecondary}
                value={item.name}
                onChangeText={(text) => updateItem(index, 'name', text)}
                style={{
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 6,
                  padding: 8,
                  backgroundColor: theme.cardBg,
                  color: theme.text,
                  marginBottom: 8,
                  fontSize: 14
                }}
              />

              <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    marginBottom: 4
                  }}>
                    Quantity
                  </Text>
                  <TextInput
                    placeholder="1"
                    placeholderTextColor={theme.textSecondary}
                    value={item.quantity.toString()}
                    onChangeText={(text) => updateItem(index, 'quantity', parseInt(text) || 1)}
                    keyboardType="numeric"
                    style={{
                      borderWidth: 1,
                      borderColor: theme.border,
                      borderRadius: 6,
                      padding: 8,
                      backgroundColor: theme.cardBg,
                      color: theme.text,
                      fontSize: 14
                    }}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    marginBottom: 4
                  }}>
                    Price ($)
                  </Text>
                  <TextInput
                    placeholder="0.00"
                    placeholderTextColor={theme.textSecondary}
                    value={item.price.toString()}
                    onChangeText={(text) => updateItem(index, 'price', parseFloat(text) || 0)}
                    keyboardType="numeric"
                    style={{
                      borderWidth: 1,
                      borderColor: theme.border,
                      borderRadius: 6,
                      padding: 8,
                      backgroundColor: theme.cardBg,
                      color: theme.text,
                      fontSize: 14
                    }}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    marginBottom: 4
                  }}>
                    Total
                  </Text>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: theme.text,
                    paddingVertical: 8
                  }}>
                    ${(item.quantity * item.price).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Calculations */}
        <View style={{
          backgroundColor: theme.cardBg,
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: theme.border
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 12
          }}>
            Calculations
          </Text>

          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 12,
                color: theme.textSecondary,
                marginBottom: 4
              }}>
                Discount (%)
              </Text>
              <TextInput
                placeholder="0"
                placeholderTextColor={theme.textSecondary}
                value={formData.discount.toString()}
                onChangeText={(text) => setFormData(prev => ({ ...prev, discount: parseFloat(text) || 0 }))}
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 8,
                  padding: 12,
                  backgroundColor: theme.bg,
                  color: theme.text,
                  fontSize: 14
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 12,
                color: theme.textSecondary,
                marginBottom: 4
              }}>
                Tax (%)
              </Text>
              <TextInput
                placeholder="0"
                placeholderTextColor={theme.textSecondary}
                value={formData.tax.toString()}
                onChangeText={(text) => setFormData(prev => ({ ...prev, tax: parseFloat(text) || 0 }))}
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 8,
                  padding: 12,
                  backgroundColor: theme.bg,
                  color: theme.text,
                  fontSize: 14
                }}
              />
            </View>
          </View>

          <View style={{
            borderTopWidth: 1,
            borderTopColor: theme.border,
            paddingTop: 12
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 4
            }}>
              <Text style={{ color: theme.textSecondary, fontSize: 14 }}>Subtotal:</Text>
              <Text style={{ color: theme.text, fontSize: 14, fontWeight: '600' }}>
                ${calculateSubtotal().toFixed(2)}
              </Text>
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8
            }}>
              <Text style={{ color: theme.text, fontSize: 16, fontWeight: '700' }}>Total:</Text>
              <Text style={{ color: theme.accent, fontSize: 16, fontWeight: '700' }}>
                ${calculateTotal().toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View style={{
          backgroundColor: theme.cardBg,
          borderRadius: 12,
          padding: 16,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: theme.border
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 12
          }}>
            Notes
          </Text>

          <TextInput
            placeholder="Add any additional notes..."
            placeholderTextColor={theme.textSecondary}
            value={formData.notes}
            onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
            multiline
            numberOfLines={4}
            style={{
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 8,
              padding: 12,
              backgroundColor: theme.bg,
              color: theme.text,
              fontSize: 14,
              textAlignVertical: 'top'
            }}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? theme.border : theme.accent,
            padding: 16,
            borderRadius: 12,
            marginBottom: 32
          }}
        >
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
            textAlign: 'center'
          }}>
            {isSubmitting ? 'Recording Sale...' : 'Record Sale'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Sales;
