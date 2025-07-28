import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Billing = ({ theme }) => {
  // State Management
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [company, setCompany] = useState({
    name: "DataPlay Technologies",
    address: "123 Business District, Tech Park",
    phone: "+91 98765 43210",
    email: "contact@dataplay.tech",
    gstin: "07AABCU9603R1Z6",
  });

  const [customer, setCustomer] = useState({
    name: "Khandelwal Furniture",
    address: "456 Industrial Area, Furniture Hub",
    phone: "+91 87654 32109",
    email: "orders@khandelwalfurniture.com",
    gstin: "06BZAHM6385P6Z2",
  });

  const [invoice, setInvoice] = useState({
    number: "INV-2024-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
  });

  const [items, setItems] = useState([
    {
      description: "Professional Service",
      hsn: "998314",
      quantity: 1,
      rate: 1000,
      amount: 1000,
      taxRate: 18,
    },
  ]);

  const [calculations, setCalculations] = useState({
    subtotal: 0,
    taxAmount: 0,
    total: 0,
  });

  // Templates
  const templates = [
    { id: 1, name: "Modern Professional", color: "#3b82f6", icon: "🏢" },
    { id: 2, name: "Corporate Elite", color: "#6b7280", icon: "⚡" },
    { id: 3, name: "Creative Studio", color: "#8b5cf6", icon: "🎨" },
    { id: 4, name: "Financial Pro", color: "#10b981", icon: "💼" },
  ];

  const steps = [
    { id: 1, name: "Company", icon: "🏢" },
    { id: 2, name: "Customer", icon: "👤" },
    { id: 3, name: "Items", icon: "📝" },
    { id: 4, name: "Preview", icon: "👁️" },
  ];

  // Calculate totals
  useEffect(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0,
    );
    const taxAmount = items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.rate;
      return sum + (itemTotal * (item.taxRate || 0)) / 100;
    }, 0);
    const total = subtotal + taxAmount;

    setCalculations({
      subtotal,
      taxAmount,
      total,
    });
  }, [items]);

  const template = templates.find((t) => t.id === selectedTemplate);

  // Item Management
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    if (field === "quantity" || field === "rate") {
      updatedItems[index].amount =
        updatedItems[index].quantity * updatedItems[index].rate;
    }

    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        hsn: "",
        quantity: 1,
        rate: 0,
        amount: 0,
        taxRate: 18,
      },
    ]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-IN');
    } catch {
      return 'Invalid Date';
    }
  };

  const handleExport = () => {
    Alert.alert("Export Invoice", "PDF generation and sharing features will be available in the full version.");
  };

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: theme.bg
    }}>
      <View style={{ padding: 16 }}>
        {/* Header */}
        <View style={{
          backgroundColor: theme.cardBg,
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.border,
          marginBottom: 16
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: template.color,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{ fontSize: 20 }}>📄</Text>
              </View>
              <View>
                <Text style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: theme.text
                }}>
                  Professional Billing
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: theme.textSecondary
                }}>
                  Create beautiful invoices
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => setIsPreviewMode(!isPreviewMode)}
              style={{
                backgroundColor: isPreviewMode ? theme.accent : theme.border,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8
              }}
            >
              <Text style={{
                color: isPreviewMode ? 'white' : theme.text,
                fontWeight: '600',
                fontSize: 14
              }}>
                {isPreviewMode ? "Edit" : "Preview"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Templates */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: theme.text,
              marginBottom: 12
            }}>
              Choose Template
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                {templates.map((tmpl) => (
                  <TouchableOpacity
                    key={tmpl.id}
                    onPress={() => setSelectedTemplate(tmpl.id)}
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: selectedTemplate === tmpl.id ? tmpl.color : theme.border,
                      backgroundColor: selectedTemplate === tmpl.id ? tmpl.color + '20' : theme.cardBg,
                      alignItems: 'center',
                      minWidth: 80
                    }}
                  >
                    <Text style={{ fontSize: 24, marginBottom: 4 }}>{tmpl.icon}</Text>
                    <Text style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: selectedTemplate === tmpl.id ? tmpl.color : theme.textSecondary,
                      textAlign: 'center'
                    }}>
                      {tmpl.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Steps */}
          {!isPreviewMode && (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {steps.map((step, index) => (
                <View key={step.id} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => setCurrentStep(step.id)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: currentStep === step.id ? theme.accent : 
                                     currentStep > step.id ? '#10b981' : theme.border,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={{
                      fontSize: 16,
                      color: currentStep >= step.id ? 'white' : theme.textSecondary
                    }}>
                      {currentStep > step.id ? '✓' : step.icon}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{
                    fontSize: 12,
                    color: theme.textSecondary,
                    marginLeft: 8,
                    flex: 1
                  }}>
                    {step.name}
                  </Text>
                  {index < steps.length - 1 && (
                    <View style={{
                      width: 20,
                      height: 2,
                      backgroundColor: currentStep > step.id ? '#10b981' : theme.border,
                      marginHorizontal: 8
                    }} />
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Invoice Preview */}
        <View style={{
          backgroundColor: 'white',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.border,
          overflow: 'hidden',
          marginBottom: 16
        }}>
          {/* Header */}
          <View style={{
            backgroundColor: template.color,
            padding: 16
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: 4
                }}>
                  {company.name}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: 8
                }}>
                  {company.address}
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  {company.phone} • {company.email}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{
                  fontSize: 24,
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: 4
                }}>
                  INVOICE
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.8)'
                }}>
                  #{invoice.number}
                </Text>
              </View>
            </View>
          </View>

          {/* Bill To Section */}
          <View style={{
            backgroundColor: '#f8f9fa',
            padding: 16
          }}>
            <View style={{
              flexDirection: 'row',
              gap: 16
            }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  marginBottom: 8
                }}>
                  Bill To
                </Text>
                <View style={{
                  backgroundColor: 'white',
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme.border
                }}>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: 4
                  }}>
                    {customer.name}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6b7280',
                    marginBottom: 2
                  }}>
                    {customer.address}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6b7280',
                    marginBottom: 2
                  }}>
                    {customer.phone}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6b7280'
                  }}>
                    {customer.email}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  marginBottom: 8
                }}>
                  Invoice Details
                </Text>
                <View style={{
                  backgroundColor: 'white',
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme.border
                }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 4
                  }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Date:</Text>
                    <Text style={{ fontSize: 12, color: '#1f2937', fontWeight: '500' }}>
                      {formatDate(invoice.date)}
                    </Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Due Date:</Text>
                    <Text style={{ fontSize: 12, color: '#1f2937', fontWeight: '500' }}>
                      {formatDate(invoice.dueDate)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Items Table */}
          <View style={{ padding: 16 }}>
            <View style={{
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 8,
              overflow: 'hidden'
            }}>
              {/* Table Header */}
              <View style={{
                backgroundColor: template.color,
                flexDirection: 'row',
                padding: 12
              }}>
                <Text style={{
                  flex: 0.5,
                  fontSize: 12,
                  fontWeight: '600',
                  color: 'white'
                }}>
                  #
                </Text>
                <Text style={{
                  flex: 3,
                  fontSize: 12,
                  fontWeight: '600',
                  color: 'white'
                }}>
                  Description
                </Text>
                <Text style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: '600',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  Qty
                </Text>
                <Text style={{
                  flex: 1.5,
                  fontSize: 12,
                  fontWeight: '600',
                  color: 'white',
                  textAlign: 'right'
                }}>
                  Rate
                </Text>
                <Text style={{
                  flex: 1.5,
                  fontSize: 12,
                  fontWeight: '600',
                  color: 'white',
                  textAlign: 'right'
                }}>
                  Amount
                </Text>
              </View>

              {/* Table Rows */}
              {items.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    padding: 12,
                    borderBottomWidth: index < items.length - 1 ? 1 : 0,
                    borderBottomColor: theme.border,
                    backgroundColor: 'white'
                  }}
                >
                  <Text style={{
                    flex: 0.5,
                    fontSize: 12,
                    color: '#1f2937'
                  }}>
                    {index + 1}
                  </Text>
                  <View style={{ flex: 3 }}>
                    <Text style={{
                      fontSize: 12,
                      color: '#1f2937'
                    }}>
                      {item.description}
                    </Text>
                    <Text style={{
                      fontSize: 10,
                      color: '#6b7280',
                      marginTop: 2
                    }}>
                      HSN: {item.hsn} • Tax: {item.taxRate}%
                    </Text>
                  </View>
                  <Text style={{
                    flex: 1,
                    fontSize: 12,
                    color: '#1f2937',
                    textAlign: 'center'
                  }}>
                    {item.quantity}
                  </Text>
                  <Text style={{
                    flex: 1.5,
                    fontSize: 12,
                    color: '#1f2937',
                    textAlign: 'right'
                  }}>
                    {formatCurrency(item.rate)}
                  </Text>
                  <Text style={{
                    flex: 1.5,
                    fontSize: 12,
                    color: '#1f2937',
                    fontWeight: '600',
                    textAlign: 'right'
                  }}>
                    {formatCurrency(item.quantity * item.rate)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Totals */}
          <View style={{
            backgroundColor: '#f8f9fa',
            padding: 16
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}>
              <View style={{
                backgroundColor: 'white',
                padding: 16,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.border,
                minWidth: 250
              }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8
                }}>
                  <Text style={{ fontSize: 14, color: '#6b7280' }}>Subtotal:</Text>
                  <Text style={{ fontSize: 14, fontWeight: '500' }}>
                    {formatCurrency(calculations.subtotal)}
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 12
                }}>
                  <Text style={{ fontSize: 14, color: '#6b7280' }}>Tax:</Text>
                  <Text style={{ fontSize: 14, fontWeight: '500' }}>
                    {formatCurrency(calculations.taxAmount)}
                  </Text>
                </View>
                <View style={{
                  borderTopWidth: 1,
                  borderTopColor: theme.border,
                  paddingTop: 12
                }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Total:</Text>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: template.color }}>
                      {formatCurrency(calculations.total)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={{
            backgroundColor: template.color,
            padding: 12
          }}>
            <Text style={{
              fontSize: 12,
              color: 'white',
              textAlign: 'center'
            }}>
              Thank you for your business! • {company.name} • {company.phone}
            </Text>
          </View>
        </View>

        {/* Form Inputs */}
        {!isPreviewMode && (
          <View style={{
            backgroundColor: theme.cardBg,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.border,
            padding: 16
          }}>
            {/* Company Details */}
            {currentStep === 1 && (
              <View style={{ gap: 16 }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: theme.text,
                  marginBottom: 8
                }}>
                  Company Details
                </Text>

                <TextInput
                  placeholder="Company Name"
                  placeholderTextColor={theme.textSecondary}
                  value={company.name}
                  onChangeText={(text) => setCompany(prev => ({ ...prev, name: text }))}
                  style={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 8,
                    fontSize: 14,
                    color: theme.text,
                    backgroundColor: theme.cardBg
                  }}
                />

                <TextInput
                  placeholder="Address"
                  placeholderTextColor={theme.textSecondary}
                  value={company.address}
                  onChangeText={(text) => setCompany(prev => ({ ...prev, address: text }))}
                  multiline
                  numberOfLines={2}
                  style={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 8,
                    fontSize: 14,
                    color: theme.text,
                    backgroundColor: theme.cardBg
                  }}
                />

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <TextInput
                    placeholder="Phone"
                    placeholderTextColor={theme.textSecondary}
                    value={company.phone}
                    onChangeText={(text) => setCompany(prev => ({ ...prev, phone: text }))}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderWidth: 1,
                      borderColor: theme.border,
                      borderRadius: 8,
                      fontSize: 14,
                      color: theme.text,
                      backgroundColor: theme.cardBg
                    }}
                  />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={theme.textSecondary}
                    value={company.email}
                    onChangeText={(text) => setCompany(prev => ({ ...prev, email: text }))}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderWidth: 1,
                      borderColor: theme.border,
                      borderRadius: 8,
                      fontSize: 14,
                      color: theme.text,
                      backgroundColor: theme.cardBg
                    }}
                  />
                </View>

                <TextInput
                  placeholder="GSTIN"
                  placeholderTextColor={theme.textSecondary}
                  value={company.gstin}
                  onChangeText={(text) => setCompany(prev => ({ ...prev, gstin: text }))}
                  style={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 8,
                    fontSize: 14,
                    color: theme.text,
                    backgroundColor: theme.cardBg
                  }}
                />
              </View>
            )}

            {/* Customer Details */}
            {currentStep === 2 && (
              <View style={{ gap: 16 }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: theme.text,
                  marginBottom: 8
                }}>
                  Customer Details
                </Text>

                <TextInput
                  placeholder="Customer Name"
                  placeholderTextColor={theme.textSecondary}
                  value={customer.name}
                  onChangeText={(text) => setCustomer(prev => ({ ...prev, name: text }))}
                  style={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 8,
                    fontSize: 14,
                    color: theme.text,
                    backgroundColor: theme.cardBg
                  }}
                />

                <TextInput
                  placeholder="Address"
                  placeholderTextColor={theme.textSecondary}
                  value={customer.address}
                  onChangeText={(text) => setCustomer(prev => ({ ...prev, address: text }))}
                  multiline
                  numberOfLines={2}
                  style={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 8,
                    fontSize: 14,
                    color: theme.text,
                    backgroundColor: theme.cardBg
                  }}
                />

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <TextInput
                    placeholder="Phone"
                    placeholderTextColor={theme.textSecondary}
                    value={customer.phone}
                    onChangeText={(text) => setCustomer(prev => ({ ...prev, phone: text }))}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderWidth: 1,
                      borderColor: theme.border,
                      borderRadius: 8,
                      fontSize: 14,
                      color: theme.text,
                      backgroundColor: theme.cardBg
                    }}
                  />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={theme.textSecondary}
                    value={customer.email}
                    onChangeText={(text) => setCustomer(prev => ({ ...prev, email: text }))}
                    style={{
                      flex: 1,
                      padding: 12,
                      borderWidth: 1,
                      borderColor: theme.border,
                      borderRadius: 8,
                      fontSize: 14,
                      color: theme.text,
                      backgroundColor: theme.cardBg
                    }}
                  />
                </View>

                <TextInput
                  placeholder="Invoice Number"
                  placeholderTextColor={theme.textSecondary}
                  value={invoice.number}
                  onChangeText={(text) => setInvoice(prev => ({ ...prev, number: text }))}
                  style={{
                    padding: 12,
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 8,
                    fontSize: 14,
                    color: theme.text,
                    backgroundColor: theme.cardBg
                  }}
                />
              </View>
            )}

            {/* Items */}
            {currentStep === 3 && (
              <View style={{ gap: 16 }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontSize: 18,
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
                    <Text style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: '600'
                    }}>
                      + Add
                    </Text>
                  </TouchableOpacity>
                </View>

                <ScrollView style={{ maxHeight: 400 }}>
                  {items.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        padding: 12,
                        borderWidth: 1,
                        borderColor: theme.border,
                        borderRadius: 8,
                        marginBottom: 12,
                        gap: 12
                      }}
                    >
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Text style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: theme.text
                        }}>
                          Item #{index + 1}
                        </Text>
                        {items.length > 1 && (
                          <TouchableOpacity
                            onPress={() => removeItem(index)}
                            style={{
                              backgroundColor: '#ef4444',
                              paddingHorizontal: 8,
                              paddingVertical: 4,
                              borderRadius: 4
                            }}
                          >
                            <Text style={{
                              color: 'white',
                              fontSize: 12,
                              fontWeight: '500'
                            }}>
                              Remove
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <TextInput
                        placeholder="Item description"
                        placeholderTextColor={theme.textSecondary}
                        value={item.description}
                        onChangeText={(text) => handleItemChange(index, "description", text)}
                        style={{
                          padding: 10,
                          borderWidth: 1,
                          borderColor: theme.border,
                          borderRadius: 6,
                          fontSize: 14,
                          color: theme.text,
                          backgroundColor: theme.cardBg
                        }}
                      />

                      <View style={{ flexDirection: 'row', gap: 8 }}>
                        <TextInput
                          placeholder="Qty"
                          placeholderTextColor={theme.textSecondary}
                          value={item.quantity.toString()}
                          onChangeText={(text) => handleItemChange(index, "quantity", parseInt(text) || 1)}
                          keyboardType="numeric"
                          style={{
                            flex: 1,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: theme.border,
                            borderRadius: 6,
                            fontSize: 14,
                            color: theme.text,
                            backgroundColor: theme.cardBg
                          }}
                        />
                        <TextInput
                          placeholder="Rate"
                          placeholderTextColor={theme.textSecondary}
                          value={item.rate.toString()}
                          onChangeText={(text) => handleItemChange(index, "rate", parseFloat(text) || 0)}
                          keyboardType="numeric"
                          style={{
                            flex: 1,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: theme.border,
                            borderRadius: 6,
                            fontSize: 14,
                            color: theme.text,
                            backgroundColor: theme.cardBg
                          }}
                        />
                        <TextInput
                          placeholder="Tax %"
                          placeholderTextColor={theme.textSecondary}
                          value={item.taxRate.toString()}
                          onChangeText={(text) => handleItemChange(index, "taxRate", parseFloat(text) || 0)}
                          keyboardType="numeric"
                          style={{
                            flex: 1,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: theme.border,
                            borderRadius: 6,
                            fontSize: 14,
                            color: theme.text,
                            backgroundColor: theme.cardBg
                          }}
                        />
                      </View>

                      <View style={{
                        alignItems: 'flex-end'
                      }}>
                        <Text style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: theme.text
                        }}>
                          Amount: {formatCurrency(item.quantity * item.rate)}
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Preview/Export */}
            {currentStep === 4 && (
              <View style={{ gap: 16 }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: theme.text,
                  marginBottom: 8
                }}>
                  Invoice Summary
                </Text>

                <View style={{
                  backgroundColor: theme.bg + '50',
                  padding: 16,
                  borderRadius: 8
                }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 8
                  }}>
                    <Text style={{ fontSize: 14, color: theme.textSecondary }}>Items:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: theme.text }}>
                      {items.length}
                    </Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 8
                  }}>
                    <Text style={{ fontSize: 14, color: theme.textSecondary }}>Subtotal:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: theme.text }}>
                      {formatCurrency(calculations.subtotal)}
                    </Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 12
                  }}>
                    <Text style={{ fontSize: 14, color: theme.textSecondary }}>Tax:</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', color: theme.text }}>
                      {formatCurrency(calculations.taxAmount)}
                    </Text>
                  </View>
                  <View style={{
                    borderTopWidth: 1,
                    borderTopColor: theme.border,
                    paddingTop: 12
                  }}>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                      <Text style={{ fontSize: 16, fontWeight: '600', color: theme.text }}>
                        Total:
                      </Text>
                      <Text style={{ fontSize: 18, fontWeight: '700', color: theme.accent }}>
                        {formatCurrency(calculations.total)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{ gap: 12 }}>
                  <TouchableOpacity
                    onPress={handleExport}
                    style={{
                      backgroundColor: theme.accent,
                      paddingVertical: 12,
                      borderRadius: 8,
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '600'
                    }}>
                      📄 Export PDF
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleExport}
                    style={{
                      backgroundColor: '#25d366',
                      paddingVertical: 12,
                      borderRadius: 8,
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: '600'
                    }}>
                      💬 Share via WhatsApp
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Navigation */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 24,
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: theme.border
            }}>
              <TouchableOpacity
                onPress={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 6,
                  backgroundColor: currentStep === 1 ? theme.border : theme.cardBg,
                  borderWidth: 1,
                  borderColor: theme.border
                }}
              >
                <Text style={{
                  color: currentStep === 1 ? theme.textSecondary : theme.text,
                  fontWeight: '500'
                }}>
                  Previous
                </Text>
              </TouchableOpacity>

              <Text style={{
                fontSize: 14,
                color: theme.textSecondary
              }}>
                Step {currentStep} of {steps.length}
              </Text>

              <TouchableOpacity
                onPress={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                disabled={currentStep === steps.length}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 6,
                  backgroundColor: currentStep === steps.length ? theme.border : theme.accent
                }}
              >
                <Text style={{
                  color: currentStep === steps.length ? theme.textSecondary : 'white',
                  fontWeight: '500'
                }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Billing;
