import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import useAxios from "../hooks/useAxios";

const LedgerList = ({ theme, ledgers = [], onSelect, onLedgerAdded }) => {
  const [newLedger, setNewLedger] = useState("");
  const [ledgerType, setLedgerType] = useState("Asset");
  const [creatingRequired, setCreatingRequired] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const axios = useAxios();

  const ledgerTypes = ["Asset", "Liability", "Equity", "Income", "Expense"];

  const handleLedgerClick = (name) => {
    if (onSelect) onSelect(name);
  };

  const createRequiredLedgers = async () => {
    setCreatingRequired(true);
    try {
      const res = await axios.post("/ledgers/create-required");
      console.log("Required ledgers created:", res.data);
      Alert.alert("Success", "Required ledgers created successfully! Please refresh the page.");
    } catch (err) {
      console.error("Error creating required ledgers:", err);
      Alert.alert("Error", err?.response?.data?.error || "Failed to create required ledgers.");
    } finally {
      setCreatingRequired(false);
    }
  };

  const handleSubmit = async () => {
    if (!newLedger.trim()) {
      Alert.alert("Error", "Please enter a ledger name.");
      return;
    }

    try {
      const res = await axios.post("/ledgers", {
        name: newLedger.trim(),
        type: ledgerType,
      });
      if (onLedgerAdded) onLedgerAdded(res.data);
      setNewLedger("");
      Alert.alert("Success", "Ledger added successfully!");
    } catch (err) {
      console.error("Error adding ledger:", err);
      Alert.alert("Error", err?.response?.data?.error || "Failed to add ledger.");
    }
  };

  const handleDelete = async (name) => {
    Alert.alert(
      "Delete Ledger",
      `Delete ledger "${name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`/ledgers/${name}`);
              Alert.alert("Success", "Ledger deleted successfully!");
              // Trigger refresh or callback here
            } catch (err) {
              console.error("Error deleting ledger:", err);
              Alert.alert("Error", err?.response?.data?.error || "Failed to delete ledger.");
            }
          }
        }
      ]
    );
  };

  const handleDeleteAll = async () => {
    Alert.alert(
      "Delete All Ledgers",
      "Are you sure you want to delete ALL listed ledgers? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              await Promise.all(ledgers.map(l => axios.delete(`/ledgers/${l.name}`)));
              Alert.alert("Success", "All ledgers deleted successfully!");
            } catch (err) {
              Alert.alert("Error", "Failed to delete all ledgers.");
              console.error(err);
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

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

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: theme.bg
    }}>
      <View style={{ padding: 16 }}>
        <Text style={{
          fontSize: 24,
          fontWeight: '700',
          color: theme.text,
          marginBottom: 24
        }}>
          Ledger List
        </Text>

        {/* Create Required Ledgers Button */}
        {ledgers.length === 0 && (
          <View style={{
            backgroundColor: '#fef3c7',
            borderWidth: 1,
            borderColor: '#fcd34d',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16
          }}>
            <Text style={{
              color: '#92400e',
              marginBottom: 12,
              fontSize: 14
            }}>
              No ledgers found. Create the required system ledgers to get started.
            </Text>
            <TouchableOpacity
              onPress={createRequiredLedgers}
              disabled={creatingRequired}
              style={{
                backgroundColor: creatingRequired ? '#fcd34d' : '#f59e0b',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {creatingRequired ? "Creating..." : "Create Required Ledgers (Sales, Stock, Transport)"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Form to add new ledger */}
        <View style={{
          backgroundColor: theme.cardBg,
          padding: 16,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.border,
          marginBottom: 16
        }}>
          <View style={{ gap: 12 }}>
            <TextInput
              value={newLedger}
              onChangeText={setNewLedger}
              placeholder="Ledger Name"
              placeholderTextColor={theme.textSecondary}
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
            
            <View style={{ position: 'relative' }}>
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
              onPress={handleSubmit}
              style={{
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
                Add Ledger
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delete All Button */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 16
        }}>
          <TouchableOpacity
            onPress={handleDeleteAll}
            disabled={deleting || ledgers.length === 0}
            style={{
              backgroundColor: deleting || ledgers.length === 0 ? '#9ca3af' : '#ef4444',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 8
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 14,
              fontWeight: '600'
            }}>
              {deleting ? 'Deleting...' : 'Delete All'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ledger List */}
        <View style={{
          backgroundColor: theme.cardBg,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.border,
          overflow: 'hidden'
        }}>
          {(!ledgers || ledgers.length === 0) ? (
            <View style={{ padding: 32, alignItems: 'center' }}>
              <Text style={{
                fontSize: 16,
                color: theme.textSecondary,
                textAlign: 'center'
              }}>
                No ledgers available.
              </Text>
            </View>
          ) : (
            <View>
              {/* Header */}
              <View style={{
                backgroundColor: theme.bg + '50',
                flexDirection: 'row',
                padding: 12,
                borderBottomWidth: 1,
                borderBottomColor: theme.border
              }}>
                <Text style={{
                  flex: 2,
                  fontSize: 12,
                  fontWeight: '600',
                  color: theme.textSecondary,
                  textTransform: 'uppercase'
                }}>
                  Name
                </Text>
                <Text style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: '600',
                  color: theme.textSecondary,
                  textTransform: 'uppercase'
                }}>
                  Type
                </Text>
                <Text style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: '600',
                  color: theme.textSecondary,
                  textTransform: 'uppercase',
                  textAlign: 'right'
                }}>
                  Balance
                </Text>
                <Text style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: '600',
                  color: theme.textSecondary,
                  textTransform: 'uppercase',
                  textAlign: 'center'
                }}>
                  Actions
                </Text>
              </View>

              {/* Ledger Rows */}
              {ledgers.map((ledger, idx) => (
                <View key={ledger._id || idx}>
                  <View style={{
                    flexDirection: 'row',
                    padding: 12,
                    borderBottomWidth: idx < ledgers.length - 1 ? 1 : 0,
                    borderBottomColor: theme.border + '30',
                    backgroundColor: idx % 2 === 0 ? 'transparent' : theme.bg + '30'
                  }}>
                    <TouchableOpacity
                      onPress={() => handleLedgerClick(ledger.name)}
                      style={{ flex: 2 }}
                    >
                      <Text style={{
                        fontSize: 14,
                        color: theme.accent,
                        fontWeight: '500'
                      }}>
                        {ledger.name}
                      </Text>
                    </TouchableOpacity>
                    
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontSize: 14,
                        color: theme.text
                      }}>
                        {ledger.type}
                      </Text>
                    </View>
                    
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontSize: 14,
                        color: (ledger.balance || 0) >= 0 ? '#10b981' : '#ef4444',
                        fontWeight: '600',
                        textAlign: 'right'
                      }}>
                        {formatCurrency(ledger.balance || 0)}
                      </Text>
                      <Text style={{
                        fontSize: 10,
                        color: '#10b981',
                        textAlign: 'right',
                        marginTop: 2
                      }}>
                        In: {formatCurrency(ledger.totalIn || 0)}
                      </Text>
                      <Text style={{
                        fontSize: 10,
                        color: '#ef4444',
                        textAlign: 'right'
                      }}>
                        Out: {formatCurrency(ledger.totalOut || 0)}
                      </Text>
                    </View>
                    
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={() => handleDelete(ledger.name)}
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
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default LedgerList;
