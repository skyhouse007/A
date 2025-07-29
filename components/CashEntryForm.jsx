import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useApp } from '../context/AppContext.js';

const CashEntryForm = ({ type, ledgers = [], theme }) => {
  const [form, setForm] = useState({
    ledgerName: "",
    amount: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [availableLedgers, setAvailableLedgers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { transactionService, ledgerService } = useApp();

  // Load ledgers from backend
  useEffect(() => {
    const loadLedgers = async () => {
      try {
        if (ledgers.length > 0) {
          setAvailableLedgers(ledgers);
        } else {
          // Try to fetch from backend
          const fetchedLedgers = await ledgerService.getLedgers();
          setAvailableLedgers(fetchedLedgers || []);
        }
      } catch (error) {
        console.log('Failed to load ledgers, using mock data:', error);
        // Fallback to mock data
        const mockLedgers = [
          { _id: "1", name: "Cash" },
          { _id: "2", name: "Bank Account" },
          { _id: "3", name: "Sales" },
          { _id: "4", name: "Expenses" },
          { _id: "5", name: "Accounts Receivable" },
          { _id: "6", name: "Accounts Payable" }
        ];
        setAvailableLedgers(mockLedgers);
      }
    };

    loadLedgers();
  }, [ledgers, ledgerService]);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.ledgerName || !form.amount) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const payload = {
      ledgerName: form.ledgerName,
      amount: parseFloat(form.amount),
      description: form.note,
      date: form.date,
      type: type === 'cashIn' ? 'cash_in' : 'cash_out',
      category: type === 'cashIn' ? 'income' : 'expense'
    };

    setLoading(true);
    try {
      if (type === 'cashIn') {
        await transactionService.createCashIn(payload);
      } else {
        await transactionService.createCashOut(payload);
      }
      
      Alert.alert("Success", "Transaction saved successfully!");
      setForm({
        ledgerName: "",
        amount: "",
        note: "",
        date: new Date().toISOString().split("T")[0]
      });
    } catch (err) {
      console.error("Failed to save transaction:", err);
      Alert.alert("Error", err.message || "Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.bg || '#f8f9fa',
      padding: 16,
    },
    formContainer: {
      backgroundColor: theme?.cardBg || '#ffffff',
      borderRadius: 12,
      padding: 20,
      marginTop: 20,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme?.text || '#1f2937',
      marginBottom: 24,
    },
    inputGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: theme?.text || '#1f2937',
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: theme?.border || '#d1d5db',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: theme?.bg || '#ffffff',
      color: theme?.text || '#1f2937',
    },
    textArea: {
      borderWidth: 1,
      borderColor: theme?.border || '#d1d5db',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: theme?.bg || '#ffffff',
      color: theme?.text || '#1f2937',
      height: 80,
      textAlignVertical: 'top',
    },
    picker: {
      borderWidth: 1,
      borderColor: theme?.border || '#d1d5db',
      borderRadius: 8,
      backgroundColor: theme?.bg || '#ffffff',
    },
    submitButton: {
      backgroundColor: theme?.accent || '#3b82f6',
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      marginTop: 10,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    ledgerOption: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme?.border || '#e5e7eb',
    },
    ledgerOptionText: {
      fontSize: 16,
      color: theme?.text || '#1f2937',
    },
    selectedLedger: {
      backgroundColor: theme?.accent || '#3b82f6',
    },
    selectedLedgerText: {
      color: 'white',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {type === "cashIn" ? "Cash In Entry" : "Cash Out Entry"}
        </Text>

        {/* Ledger Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ledger *</Text>
          <Text style={[styles.input, { color: form.ledgerName ? (theme?.text || '#1f2937') : (theme?.textSecondary || '#6b7280') }]}>
            {form.ledgerName || "-- Select Ledger --"}
          </Text>
          {/* Simple ledger selection - in a real app, you'd use a proper picker */}
          <View style={{ marginTop: 8 }}>
            {availableLedgers.map((ledger) => (
              <TouchableOpacity
                key={ledger._id}
                style={[
                  styles.ledgerOption,
                  form.ledgerName === ledger.name && styles.selectedLedger
                ]}
                onPress={() => handleChange('ledgerName', ledger.name)}
              >
                <Text style={[
                  styles.ledgerOptionText,
                  form.ledgerName === ledger.name && styles.selectedLedgerText
                ]}>
                  {ledger.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Amount */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount *</Text>
          <TextInput
            style={styles.input}
            value={form.amount}
            onChangeText={(value) => handleChange('amount', value)}
            placeholder="Enter amount"
            placeholderTextColor={theme?.textSecondary || '#6b7280'}
            keyboardType="numeric"
          />
        </View>

        {/* Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date</Text>
          <TextInput
            style={styles.input}
            value={form.date}
            onChangeText={(value) => handleChange('date', value)}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={theme?.textSecondary || '#6b7280'}
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            value={form.note}
            onChangeText={(value) => handleChange('note', value)}
            placeholder="Optional description"
            placeholderTextColor={theme?.textSecondary || '#6b7280'}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, loading && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Saving...' : `Submit ${type === "cashIn" ? "Cash In" : "Cash Out"}`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CashEntryForm;
