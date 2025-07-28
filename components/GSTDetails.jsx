import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import useAxios from "../hooks/useAxios";

const fmt = (num) =>
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const GSTDetails = ({ theme }) => {
  const [purchaseData, setPurchaseData] = useState({ entries: [], totalGST: 0, totalAmount: 0 });
  const [salesData, setSalesData] = useState({ entries: [], totalGST: 0, totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    fetchGSTDetails();
  }, []);

  const fetchGSTDetails = async () => {
    setLoading(true);
    try {
      // Mock data for demo purposes (since no backend is available)
      const mockPurchaseData = {
        entries: [
          {
            _id: "1",
            date: "2024-01-15",
            vendorName: "ABC Supplier",
            vendorGSTNo: "27AAAAA0000A1Z5",
            baseAmount: 100000,
            cgst: 9000,
            sgst: 9000,
            igst: 0,
            gstAmount: 18000,
            totalAmount: 118000
          },
          {
            _id: "2",
            date: "2024-01-10",
            vendorName: "XYZ Trading",
            vendorGSTNo: "29BBBBB1111B2Z6",
            baseAmount: 50000,
            cgst: 4500,
            sgst: 4500,
            igst: 0,
            gstAmount: 9000,
            totalAmount: 59000
          }
        ],
        totalGST: 27000,
        totalAmount: 177000
      };

      const mockSalesData = {
        entries: [
          {
            _id: "3",
            date: "2024-01-20",
            customerName: "DEF Corporation",
            customerGSTNo: "19CCCCC2222C3Z7",
            baseAmount: 200000,
            cgst: 18000,
            sgst: 18000,
            igst: 0,
            gstAmount: 36000,
            totalAmount: 236000
          },
          {
            _id: "4",
            date: "2024-01-18",
            customerName: "GHI Enterprises",
            customerGSTNo: "33DDDDD3333D4Z8",
            baseAmount: 75000,
            cgst: 6750,
            sgst: 6750,
            igst: 0,
            gstAmount: 13500,
            totalAmount: 88500
          }
        ],
        totalGST: 49500,
        totalAmount: 324500
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setPurchaseData(mockPurchaseData);
      setSalesData(mockSalesData);
    } catch (err) {
      console.error("Error fetching GST details:", err);
    }
    setLoading(false);
  };

  const purchaseGSTTotal = purchaseData.entries.reduce((sum, e) => sum + (e.gstAmount || 0), 0);
  const salesGSTTotal = salesData.entries.reduce((sum, e) => sum + (e.gstAmount || 0), 0);
  const gstPayable = salesGSTTotal - purchaseGSTTotal;
  const gstLabel = gstPayable >= 0 ? "GST Payable" : "GST Credit (Carry Forward)";

  const handleDelete = async (type, id) => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Mock deletion
              if (type === "purchase") {
                setPurchaseData(prev => ({
                  ...prev,
                  entries: prev.entries.filter(e => e._id !== id)
                }));
              } else {
                setSalesData(prev => ({
                  ...prev,
                  entries: prev.entries.filter(e => e._id !== id)
                }));
              }
              Alert.alert("Success", "Entry deleted successfully!");
            } catch {
              Alert.alert("Error", "Failed to delete entry");
            }
          }
        }
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.bg || '#f8f9fa',
      padding: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme?.bg || '#f8f9fa',
    },
    loadingText: {
      marginTop: 16,
      fontSize: 16,
      color: theme?.textSecondary || '#6b7280',
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme?.text || '#1f2937',
      marginBottom: 16,
    },
    tableContainer: {
      backgroundColor: theme?.cardBg || '#ffffff',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
      overflow: 'hidden',
    },
    entryCard: {
      backgroundColor: theme?.cardBg || '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
    },
    entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    entryTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme?.text || '#1f2937',
      flex: 1,
    },
    entryDate: {
      fontSize: 12,
      color: theme?.textSecondary || '#6b7280',
    },
    entryDetails: {
      marginBottom: 12,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    detailLabel: {
      fontSize: 14,
      color: theme?.textSecondary || '#6b7280',
      flex: 1,
    },
    detailValue: {
      fontSize: 14,
      color: theme?.text || '#1f2937',
      fontWeight: '500',
      textAlign: 'right',
    },
    gstRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: theme?.border || '#e5e7eb',
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: theme?.text || '#1f2937',
    },
    totalValue: {
      fontSize: 16,
      fontWeight: '700',
      color: theme?.accent || '#3b82f6',
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    deleteButtonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '500',
    },
    summaryContainer: {
      backgroundColor: theme?.cardBg || '#ffffff',
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
    },
    summaryTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme?.text || '#1f2937',
      textAlign: 'center',
      marginBottom: 20,
    },
    summaryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 20,
    },
    summaryCard: {
      backgroundColor: theme?.bg || '#f8f9fa',
      borderRadius: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
      minWidth: '45%',
      flex: 1,
    },
    summaryCardTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: theme?.text || '#1f2937',
      marginBottom: 8,
    },
    summaryCardValue: {
      fontSize: 16,
      fontWeight: '700',
      color: theme?.textSecondary || '#6b7280',
      textAlign: 'right',
    },
    gstPayableContainer: {
      alignItems: 'center',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme?.border || '#e5e7eb',
    },
    gstPayableText: {
      fontSize: 18,
      fontWeight: '700',
      color: gstPayable >= 0 ? '#ef4444' : '#10b981',
      textAlign: 'center',
    },
    emptyState: {
      backgroundColor: theme?.cardBg || '#ffffff',
      borderRadius: 12,
      padding: 32,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
    },
    emptyStateText: {
      fontSize: 16,
      color: theme?.textSecondary || '#6b7280',
      textAlign: 'center',
    },
  });

  const EntryCard = ({ entry, type, onDelete }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryTitle}>
          {type === "purchase" ? entry.vendorName : entry.customerName}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(type, entry._id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.entryDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{new Date(entry.date).toLocaleDateString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>GST No:</Text>
          <Text style={styles.detailValue}>
            {type === "purchase" ? entry.vendorGSTNo : entry.customerGSTNo}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Base Amount:</Text>
          <Text style={styles.detailValue}>₹{fmt(entry.baseAmount || 0)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>CGST:</Text>
          <Text style={styles.detailValue}>₹{fmt(entry.cgst || 0)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>SGST:</Text>
          <Text style={styles.detailValue}>₹{fmt(entry.sgst || 0)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>IGST:</Text>
          <Text style={styles.detailValue}>₹{fmt(entry.igst || 0)}</Text>
        </View>
      </View>

      <View style={styles.gstRow}>
        <Text style={styles.totalLabel}>Total Amount:</Text>
        <Text style={styles.totalValue}>₹{fmt(entry.totalAmount || 0)}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme?.accent || '#3b82f6'} />
        <Text style={styles.loadingText}>Loading GST details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Purchase GST Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Purchase GST Details</Text>
        {purchaseData.entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No purchase records found.</Text>
          </View>
        ) : (
          purchaseData.entries.map((entry) => (
            <EntryCard
              key={entry._id}
              entry={entry}
              type="purchase"
              onDelete={handleDelete}
            />
          ))
        )}
      </View>

      {/* Sales GST Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sales GST Details</Text>
        {salesData.entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No sales records found.</Text>
          </View>
        ) : (
          salesData.entries.map((entry) => (
            <EntryCard
              key={entry._id}
              entry={entry}
              type="sales"
              onDelete={handleDelete}
            />
          ))
        )}
      </View>

      {/* GST Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>GST Summary</Text>
        
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>GST on Purchases</Text>
            <Text style={styles.summaryCardValue}>₹{fmt(purchaseGSTTotal)}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>GST on Sales</Text>
            <Text style={styles.summaryCardValue}>₹{fmt(salesGSTTotal)}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>Total Purchase</Text>
            <Text style={styles.summaryCardValue}>₹{fmt(purchaseData.totalAmount)}</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>Total Sales</Text>
            <Text style={styles.summaryCardValue}>₹{fmt(salesData.totalAmount)}</Text>
          </View>
        </View>

        <View style={styles.gstPayableContainer}>
          <Text style={styles.gstPayableText}>
            {gstLabel}: ₹{Math.abs(gstPayable).toFixed(2)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default GSTDetails;
