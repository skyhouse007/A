import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import useAxios from "../hooks/useAxios";

const ProfitAndLoss = ({ theme }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const axios = useAxios();
  const [month, setMonth] = useState(new Date().getMonth() + 1); // getMonth() returns 0-11, so add 1
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchPL = async () => {
    try {
      setLoading(true);

      // Mock data for demo purposes (since no backend is available)
      const mockData = {
        ledgerBased: true,
        debit: {
          openingStock: 50000,
          purchases: 150000,
          expenses: 25000,
          total: 225000
        },
        credit: {
          sales: 280000,
          income: 15000,
          closingStock: 60000,
          total: 355000
        },
        profitOrLoss: 130000,
        breakdown: {
          income: {
            total: 295000,
            breakdown: [
              { ledger: "Sales", amount: 280000 },
              { ledger: "Other Income", amount: 15000 }
            ]
          },
          expenses: {
            total: 175000,
            breakdown: [
              { ledger: "Purchases", amount: 150000 },
              { ledger: "Operating Expenses", amount: 25000 }
            ]
          },
          stock: {
            opening: 50000,
            purchases: 150000,
            sales: 140000,
            closing: 60000
          },
          reference: {
            sales: 280000,
            purchases: 150000
          }
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(mockData);
    } catch (err) {
      console.error("Failed to load Profit & Loss:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPL();
  }, [month, year]);

  const format = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(n || 0);

  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const MonthSelector = () => (
    <View style={{
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      backgroundColor: theme.cardBg,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      zIndex: 1000,
      maxHeight: 200
    }}>
      <ScrollView>
        {monthOptions.map((m, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => {
              setMonth(idx + 1);
              setShowMonthSelector(false);
            }}
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: theme.border + '30'
            }}
          >
            <Text style={{
              fontSize: 14,
              color: month === idx + 1 ? theme.accent : theme.text,
              fontWeight: month === idx + 1 ? '600' : '400'
            }}>
              {m}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: theme.bg
    }}>
      <View style={{ padding: 16 }}>
        <View style={{
          backgroundColor: theme.cardBg,
          padding: 20,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.border
        }}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <Text style={{
              fontSize: 24,
              fontWeight: '700',
              color: theme.text,
              textAlign: 'center',
              marginBottom: 4
            }}>
              Profit & Loss Statement
            </Text>
            {data?.ledgerBased && (
              <Text style={{
                fontSize: 14,
                color: '#10b981',
                fontWeight: '500'
              }}>
                (Ledger-Based)
              </Text>
            )}
          </View>

          {/* Filters */}
          <View style={{
            gap: 12,
            marginBottom: 24
          }}>
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                onPress={() => setShowMonthSelector(!showMonthSelector)}
                style={{
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme.border,
                  backgroundColor: theme.cardBg,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: theme.text
                }}>
                  {monthOptions[month - 1]}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: theme.textSecondary
                }}>
                  {showMonthSelector ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
              
              {showMonthSelector && <MonthSelector />}
            </View>

            <TextInput
              value={year.toString()}
              onChangeText={(text) => setYear(Number(text) || new Date().getFullYear())}
              keyboardType="numeric"
              style={{
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: theme.cardBg,
                fontSize: 14,
                color: theme.text
              }}
            />

            <View style={{
              flexDirection: 'row',
              gap: 8
            }}>
              <TouchableOpacity
                onPress={fetchPL}
                style={{
                  flex: 1,
                  backgroundColor: theme.accent,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: '600'
                }}>
                  Refresh
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowBreakdown(!showBreakdown)}
                style={{
                  flex: 1,
                  backgroundColor: '#10b981',
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: 'center'
                }}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: '600'
                }}>
                  {showBreakdown ? "Hide" : "Show"} Breakdown
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Content */}
          {loading ? (
            <View style={{
              alignItems: 'center',
              paddingVertical: 32
            }}>
              <ActivityIndicator size="large" color={theme.accent} />
              <Text style={{
                marginTop: 16,
                fontSize: 16,
                color: theme.textSecondary
              }}>
                Loading data...
              </Text>
            </View>
          ) : !data ? (
            <View style={{ alignItems: 'center', paddingVertical: 32 }}>
              <Text style={{
                fontSize: 16,
                color: '#ef4444',
                textAlign: 'center'
              }}>
                Unable to load data.
              </Text>
            </View>
          ) : (
            <View>
              {/* Debit and Credit Sections */}
              <View style={{ gap: 16, marginBottom: 24 }}>
                {/* Debit */}
                <View style={{
                  backgroundColor: theme.bg + '50',
                  borderRadius: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: theme.border
                }}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: theme.text,
                    marginBottom: 16,
                    paddingBottom: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border
                  }}>
                    Debit (Dr)
                  </Text>
                  
                  <View style={{ gap: 8 }}>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 4
                    }}>
                      <Text style={{ fontSize: 14, color: theme.text }}>Opening Stock</Text>
                      <Text style={{ fontSize: 14, color: theme.text }}>{format(data.debit?.openingStock || 0)}</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 4
                    }}>
                      <Text style={{ fontSize: 14, color: theme.text }}>Purchases</Text>
                      <Text style={{ fontSize: 14, color: theme.text }}>{format(data.debit?.purchases || 0)}</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 4
                    }}>
                      <Text style={{ fontSize: 14, color: theme.text }}>Expenses</Text>
                      <Text style={{ fontSize: 14, color: theme.text }}>{format(data.debit?.expenses || 0)}</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 8,
                      borderTopWidth: 1,
                      borderTopColor: theme.border,
                      marginTop: 8
                    }}>
                      <Text style={{ fontSize: 14, color: theme.accent, fontWeight: '600' }}>Total Debit</Text>
                      <Text style={{ fontSize: 14, color: theme.accent, fontWeight: '600' }}>{format(data.debit?.total || 0)}</Text>
                    </View>
                  </View>
                </View>

                {/* Credit */}
                <View style={{
                  backgroundColor: theme.bg + '50',
                  borderRadius: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: theme.border
                }}>
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: theme.text,
                    marginBottom: 16,
                    paddingBottom: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.border
                  }}>
                    Credit (Cr)
                  </Text>
                  
                  <View style={{ gap: 8 }}>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 4
                    }}>
                      <Text style={{ fontSize: 14, color: theme.text }}>Sales</Text>
                      <Text style={{ fontSize: 14, color: theme.text }}>{format(data.credit?.sales || 0)}</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 4
                    }}>
                      <Text style={{ fontSize: 14, color: theme.text }}>Other Income</Text>
                      <Text style={{ fontSize: 14, color: theme.text }}>{format(data.credit?.income || 0)}</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 4
                    }}>
                      <Text style={{ fontSize: 14, color: theme.text }}>Closing Stock</Text>
                      <Text style={{ fontSize: 14, color: theme.text }}>{format(data.credit?.closingStock || 0)}</Text>
                    </View>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 8,
                      borderTopWidth: 1,
                      borderTopColor: theme.border,
                      marginTop: 8
                    }}>
                      <Text style={{ fontSize: 14, color: theme.accent, fontWeight: '600' }}>Total Credit</Text>
                      <Text style={{ fontSize: 14, color: theme.accent, fontWeight: '600' }}>{format(data.credit?.total || 0)}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Net Result */}
              <View style={{
                alignItems: 'center',
                marginBottom: 24,
                padding: 16,
                backgroundColor: (data.profitOrLoss || 0) >= 0 ? '#dcfce7' : '#fee2e2',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: (data.profitOrLoss || 0) >= 0 ? '#16a34a' : '#dc2626'
              }}>
                {(data.profitOrLoss || 0) >= 0 ? (
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#15803d',
                    textAlign: 'center'
                  }}>
                    Net Profit: {format(data.profitOrLoss || 0)}
                  </Text>
                ) : (
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#dc2626',
                    textAlign: 'center'
                  }}>
                    Net Loss: {format(Math.abs(data.profitOrLoss || 0))}
                  </Text>
                )}
              </View>

              {/* Detailed Breakdown */}
              {showBreakdown && data.breakdown && (
                <View style={{ gap: 16 }}>
                  {/* Income Breakdown */}
                  {data.breakdown.income && data.breakdown.income.total > 0 && (
                    <View style={{
                      backgroundColor: '#dcfce7',
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: '#16a34a'
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#15803d',
                        marginBottom: 12,
                        paddingBottom: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#16a34a'
                      }}>
                        Income Breakdown
                      </Text>
                      <View style={{ gap: 8 }}>
                        {data.breakdown.income.breakdown.map((item, idx) => (
                          <View key={idx} style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                          }}>
                            <Text style={{ fontSize: 14, color: '#15803d' }}>{item.ledger}</Text>
                            <Text style={{ fontSize: 14, color: '#15803d', fontWeight: '500' }}>{format(item.amount)}</Text>
                          </View>
                        ))}
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          borderTopWidth: 1,
                          borderTopColor: '#16a34a',
                          paddingTop: 8,
                          marginTop: 8
                        }}>
                          <Text style={{ fontSize: 14, color: '#15803d', fontWeight: '600' }}>Total Income</Text>
                          <Text style={{ fontSize: 14, color: '#15803d', fontWeight: '600' }}>{format(data.breakdown.income.total)}</Text>
                        </View>
                      </View>
                    </View>
                  )}

                  {/* Expense Breakdown */}
                  {data.breakdown.expenses && data.breakdown.expenses.total > 0 && (
                    <View style={{
                      backgroundColor: '#fee2e2',
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: '#dc2626'
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#dc2626',
                        marginBottom: 12,
                        paddingBottom: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: '#dc2626'
                      }}>
                        Expense Breakdown
                      </Text>
                      <View style={{ gap: 8 }}>
                        {data.breakdown.expenses.breakdown.map((item, idx) => (
                          <View key={idx} style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                          }}>
                            <Text style={{ fontSize: 14, color: '#dc2626' }}>{item.ledger}</Text>
                            <Text style={{ fontSize: 14, color: '#dc2626', fontWeight: '500' }}>{format(item.amount)}</Text>
                          </View>
                        ))}
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          borderTopWidth: 1,
                          borderTopColor: '#dc2626',
                          paddingTop: 8,
                          marginTop: 8
                        }}>
                          <Text style={{ fontSize: 14, color: '#dc2626', fontWeight: '600' }}>Total Expenses</Text>
                          <Text style={{ fontSize: 14, color: '#dc2626', fontWeight: '600' }}>{format(data.breakdown.expenses.total)}</Text>
                        </View>
                      </View>
                    </View>
                  )}

                  {/* Stock Movement */}
                  {data.breakdown.stock && (
                    <View style={{
                      backgroundColor: theme.bg + '50',
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: theme.border
                    }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: theme.text,
                        marginBottom: 12,
                        paddingBottom: 8,
                        borderBottomWidth: 1,
                        borderBottomColor: theme.border
                      }}>
                        Stock Movement
                      </Text>
                      <View style={{ gap: 8 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 14, color: theme.text }}>Opening Stock</Text>
                          <Text style={{ fontSize: 14, color: theme.text }}>{format(data.breakdown.stock.opening)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 14, color: theme.text }}>Stock Purchases</Text>
                          <Text style={{ fontSize: 14, color: '#10b981' }}>{format(data.breakdown.stock.purchases)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 14, color: theme.text }}>Stock Sales</Text>
                          <Text style={{ fontSize: 14, color: '#ef4444' }}>{format(data.breakdown.stock.sales)}</Text>
                        </View>
                        <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          borderTopWidth: 1,
                          borderTopColor: theme.border,
                          paddingTop: 8,
                          marginTop: 8
                        }}>
                          <Text style={{ fontSize: 14, color: theme.text, fontWeight: '600' }}>Closing Stock</Text>
                          <Text style={{ fontSize: 14, color: theme.text, fontWeight: '600' }}>{format(data.breakdown.stock.closing)}</Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfitAndLoss;
