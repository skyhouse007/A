import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import useAxios from "../hooks/useAxios";

const LedgerDetails = ({ theme, ledgerName, goBack, refreshLedgers }) => {
  const [ledger, setLedger] = useState(null);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [ledgerType, setLedgerType] = useState("Asset");
  const [transactions, setTransactions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const axios = useAxios();

  const ledgerTypes = ["Asset", "Liability", "Equity", "Income", "Expense"];

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(num || 0);

  const loadLedger = async () => {
    try {
      console.log("🔍 Loading ledger:", ledgerName);
      const res = await axios.get(`/ledgers/${encodeURIComponent(ledgerName)}`);
      console.log("🔍 Ledger data received:", res.data);
      setLedger(res.data);
      setOpeningBalance(res.data.openingBalance || 0);
      setLedgerType(res.data.type || "Asset");
      setTransactions(res.data.transactions || []);
      console.log("🔍 Transactions loaded:", res.data.transactions?.length || 0);
    } catch (err) {
      console.error("❌ Error loading ledger:", err);
      console.error("❌ Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError("Ledger not found.");
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await axios.put(`/ledgers/${encodeURIComponent(ledgerName)}/opening`, {
        openingBalance,
        type: ledgerType,
      });
      await loadLedger();
      refreshLedgers?.();
      Alert.alert("Success", "Ledger updated successfully!");
    } catch (err) {
      console.error("Failed to update ledger:", err);
      Alert.alert("Error", "Error updating ledger.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadLedger();
  }, [ledgerName]);

  const TypeSelector = () => (
    <View style={{
      position: 'absolute',
      top: 60,
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
        {ledgerTypes.map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => {
              setLedgerType(type);
              setShowTypeSelector(false);
            }}
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: theme.border + '30'
            }}
          >
            <Text style={{
              fontSize: 14,
              color: ledgerType === type ? theme.accent : theme.text,
              fontWeight: ledgerType === type ? '600' : '400'
            }}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  if (error) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.bg,
        padding: 32
      }}>
        <Text style={{
          fontSize: 16,
          color: '#ef4444',
          textAlign: 'center'
        }}>
          {error}
        </Text>
      </View>
    );
  }

  if (!ledger) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.bg,
        padding: 32
      }}>
        <ActivityIndicator size="large" color={theme.accent} />
        <Text style={{
          marginTop: 16,
          fontSize: 16,
          color: theme.textSecondary,
          textAlign: 'center'
        }}>
          Loading ledger...
        </Text>
      </View>
    );
  }

  const { totalIn = 0, totalOut = 0, balance = 0 } = ledger;

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: theme.bg
    }}>
      <View style={{ padding: 16 }}>
        <View style={{
          backgroundColor: theme.cardBg,
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.border
        }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: '600',
              color: theme.text,
              flex: 1
            }}>
              Ledger: {ledger.name}
            </Text>
            <TouchableOpacity
              onPress={goBack}
              style={{
                backgroundColor: theme.border,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 6
              }}
            >
              <Text style={{
                fontSize: 14,
                color: theme.text,
                fontWeight: '500'
              }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>

          {/* Editable Inputs */}
          <View style={{ gap: 16, marginBottom: 24 }}>
            <View>
              <Text style={{
                fontSize: 14,
                fontWeight: '500',
                color: theme.text,
                marginBottom: 8
              }}>
                Opening Balance
              </Text>
              <TextInput
                value={openingBalance.toString()}
                onChangeText={(text) => setOpeningBalance(parseFloat(text) || 0)}
                keyboardType="numeric"
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 8,
                  backgroundColor: theme.cardBg,
                  fontSize: 14,
                  color: theme.text
                }}
              />
            </View>

            <View style={{ position: 'relative' }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '500',
                color: theme.text,
                marginBottom: 8
              }}>
                Ledger Type
              </Text>
              <TouchableOpacity
                onPress={() => setShowTypeSelector(!showTypeSelector)}
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
                  {ledgerType}
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: theme.textSecondary
                }}>
                  {showTypeSelector ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>
              
              {showTypeSelector && <TypeSelector />}
            </View>

            <TouchableOpacity
              onPress={handleUpdate}
              disabled={saving}
              style={{
                backgroundColor: saving ? theme.border : theme.accent,
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
                {saving ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Transactions Table */}
          <View style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.border,
            overflow: 'hidden'
          }}>
            {/* Table Header */}
            <View style={{
              backgroundColor: theme.accent + '20',
              flexDirection: 'row',
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: theme.border
            }}>
              <Text style={{
                flex: 1,
                fontSize: 12,
                fontWeight: '600',
                color: theme.text,
                textTransform: 'uppercase'
              }}>
                Date
              </Text>
              <Text style={{
                flex: 1,
                fontSize: 12,
                fontWeight: '600',
                color: theme.text,
                textTransform: 'uppercase'
              }}>
                Type
              </Text>
              <Text style={{
                flex: 1,
                fontSize: 12,
                fontWeight: '600',
                color: theme.text,
                textTransform: 'uppercase',
                textAlign: 'right'
              }}>
                Amount
              </Text>
              <Text style={{
                flex: 2,
                fontSize: 12,
                fontWeight: '600',
                color: theme.text,
                textTransform: 'uppercase'
              }}>
                Description
              </Text>
            </View>

            {/* Table Rows */}
            {transactions.length === 0 ? (
              <View style={{ padding: 24, alignItems: 'center' }}>
                <Text style={{
                  fontSize: 14,
                  color: theme.textSecondary,
                  textAlign: 'center'
                }}>
                  No transactions found
                </Text>
              </View>
            ) : (
              transactions.map((txn, i) => (
                <View
                  key={txn._id || i}
                  style={{
                    flexDirection: 'row',
                    padding: 12,
                    borderBottomWidth: i < transactions.length - 1 ? 1 : 0,
                    borderBottomColor: theme.border + '30',
                    backgroundColor: i % 2 === 0 ? 'transparent' : theme.bg + '30'
                  }}
                >
                  <Text style={{
                    flex: 1,
                    fontSize: 12,
                    color: theme.text
                  }}>
                    {new Date(txn.date).toLocaleDateString()}
                  </Text>
                  <Text style={{
                    flex: 1,
                    fontSize: 12,
                    fontWeight: '500',
                    color: txn.type === "in" ? "#10b981" : "#ef4444"
                  }}>
                    {txn.type === "in" ? "Cash In" : "Cash Out"}
                  </Text>
                  <Text style={{
                    flex: 1,
                    fontSize: 12,
                    color: theme.text,
                    textAlign: 'right'
                  }}>
                    {formatCurrency(txn.amount)}
                  </Text>
                  <Text style={{
                    flex: 2,
                    fontSize: 12,
                    color: theme.textSecondary
                  }}>
                    {txn.note || "—"}
                  </Text>
                </View>
              ))
            )}
          </View>

          {/* Summary Cards */}
          <View style={{
            marginTop: 24,
            gap: 12
          }}>
            <View style={{
              backgroundColor: '#dcfce7',
              borderLeftWidth: 4,
              borderLeftColor: '#16a34a',
              padding: 12,
              borderRadius: 8
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#15803d'
              }}>
                Total Cash In: {formatCurrency(totalIn)}
              </Text>
            </View>
            
            <View style={{
              backgroundColor: '#fee2e2',
              borderLeftWidth: 4,
              borderLeftColor: '#dc2626',
              padding: 12,
              borderRadius: 8
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#dc2626'
              }}>
                Total Cash Out: {formatCurrency(totalOut)}
              </Text>
            </View>
            
            <View style={{
              backgroundColor: balance >= 0 ? '#dcfce7' : '#fee2e2',
              borderLeftWidth: 4,
              borderLeftColor: balance >= 0 ? '#16a34a' : '#dc2626',
              padding: 12,
              borderRadius: 8
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: balance >= 0 ? '#15803d' : '#dc2626'
              }}>
                Balance: {formatCurrency(balance)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LedgerDetails;
