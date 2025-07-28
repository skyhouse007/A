import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import useAxios from "../hooks/useAxios";

const VendorList = ({ theme }) => {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: "", contact: "", address: "" });
  const [waMessage, setWaMessage] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      // Mock vendors data for demo purposes (since no backend is available)
      const mockVendors = [
        {
          _id: "1",
          name: "ABC Suppliers",
          contact: "+91 9876543210",
          address: "123 Business Street, Mumbai, Maharashtra",
          email: "contact@abcsuppliers.com",
          gstNumber: "27AAAAA0000A1Z5"
        },
        {
          _id: "2",
          name: "XYZ Trading Co.",
          contact: "+91 9876543211",
          address: "456 Commerce Road, Delhi, India",
          email: "info@xyztrading.com",
          gstNumber: "07BBBBB1111B2Z6"
        },
        {
          _id: "3",
          name: "Global Electronics",
          contact: "+91 9876543212",
          address: "789 Tech Park, Bangalore, Karnataka",
          email: "sales@globalelectronics.com",
          gstNumber: "29CCCCC2222C3Z7"
        },
        {
          _id: "4",
          name: "Modern Textiles",
          contact: "+91 9876543213",
          address: "101 Textile Hub, Ahmedabad, Gujarat",
          email: "orders@moderntextiles.com",
          gstNumber: "24DDDDD3333D4Z8"
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setVendors(mockVendors);
      setError("");
    } catch (err) {
      setError("Failed to fetch vendors.");
      console.error("Error fetching vendors:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.contact || !form.address) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      // Mock API call for demo purposes (since no backend is available)
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

      // Add the new vendor to the existing list (simulated)
      const newVendor = {
        _id: Date.now().toString(),
        name: form.name,
        contact: form.contact,
        address: form.address,
        email: `${form.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
        gstNumber: "XX" + Math.random().toString().substr(2, 13).toUpperCase()
      };

      setVendors(prev => [...prev, newVendor]);
      setForm({ name: "", contact: "", address: "" });
      setError("");
      Alert.alert("Success", "Vendor added successfully!");
    } catch (err) {
      console.error("Error adding vendor:", err.message);
      setError("Error adding vendor.");
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Vendor",
      "Are you sure you want to delete this vendor?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Mock API call for demo purposes (since no backend is available)
              await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
              setVendors(vendors.filter((v) => v._id !== id));
              Alert.alert("Success", "Vendor deleted successfully!");
            } catch (err) {
              console.error("Error deleting vendor:", err.message);
              Alert.alert("Error", "Failed to delete vendor.");
            }
          }
        }
      ]
    );
  };

  const handleDeleteAll = async () => {
    Alert.alert(
      "Delete All Vendors",
      "Are you sure you want to delete ALL listed vendors? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              await new Promise(resolve => setTimeout(resolve, 500));
              setVendors([]);
              Alert.alert("Success", "All vendors deleted successfully!");
            } catch (err) {
              Alert.alert("Error", "Failed to delete all vendors.");
              console.error(err);
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
  };

  const toggleSelectContact = (phone) => {
    setSelectedContacts((prev) =>
      prev.includes(phone) ? prev.filter((p) => p !== phone) : [...prev, phone]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedContacts([]);
    } else {
      const allContacts = vendors.map((v) => v.contact);
      setSelectedContacts(allContacts);
    }
    setSelectAll(!selectAll);
  };

  const sendWhatsAppMessages = async () => {
    if (!waMessage.trim()) {
      Alert.alert("Error", "Please enter a message.");
      return;
    }
    if (selectedContacts.length === 0) {
      Alert.alert("Error", "Select at least one contact.");
      return;
    }

    Alert.alert(
      "Send WhatsApp Messages",
      `Send this message to ${selectedContacts.length} vendors?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Send",
          onPress: async () => {
            setSending(true);
            try {
              // Mock API call
              await new Promise(resolve => setTimeout(resolve, 1000));
              Alert.alert("Success", `Messages sent to ${selectedContacts.length} vendors.`);
              setWaMessage("");
              setSelectedContacts([]);
              setSelectAll(false);
            } catch (err) {
              console.error("WhatsApp send error:", err);
              Alert.alert("Error", "Failed to send WhatsApp messages.");
            } finally {
              setSending(false);
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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme?.text || '#1f2937',
      marginBottom: 24,
      textAlign: 'center',
    },
    formContainer: {
      backgroundColor: theme?.cardBg || '#ffffff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
    },
    formRow: {
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: theme?.border || '#d1d5db',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: theme?.bg || '#ffffff',
      color: theme?.text || '#1f2937',
      marginBottom: 12,
    },
    submitButton: {
      backgroundColor: theme?.accent || '#3b82f6',
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    errorText: {
      color: '#ef4444',
      fontSize: 14,
      marginBottom: 16,
      textAlign: 'center',
    },
    deleteAllContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 16,
    },
    deleteAllButton: {
      backgroundColor: '#ef4444',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    deleteAllButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
    },
    vendorCard: {
      backgroundColor: theme?.cardBg || '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
    },
    vendorHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    vendorName: {
      fontSize: 18,
      fontWeight: '600',
      color: theme?.text || '#1f2937',
      flex: 1,
    },
    vendorContact: {
      fontSize: 14,
      color: theme?.textSecondary || '#6b7280',
      marginBottom: 4,
    },
    vendorAddress: {
      fontSize: 14,
      color: theme?.textSecondary || '#6b7280',
      marginBottom: 12,
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
    whatsappContainer: {
      backgroundColor: theme?.cardBg || '#ffffff',
      borderRadius: 12,
      padding: 20,
      marginTop: 16,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
    },
    whatsappTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme?.text || '#1f2937',
      marginBottom: 16,
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
      marginBottom: 16,
    },
    contactsContainer: {
      maxHeight: 200,
      borderWidth: 1,
      borderColor: theme?.border || '#d1d5db',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      backgroundColor: theme?.bg || '#ffffff',
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme?.border || '#e5e7eb',
    },
    contactText: {
      marginLeft: 8,
      fontSize: 14,
      color: theme?.text || '#1f2937',
    },
    selectAllItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme?.border || '#e5e7eb',
    },
    selectAllText: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: '500',
      color: theme?.text || '#1f2937',
    },
    sendButton: {
      backgroundColor: '#10b981',
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
    },
    sendButtonDisabled: {
      backgroundColor: '#9ca3af',
    },
    sendButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
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
    loadingText: {
      fontSize: 16,
      color: theme?.textSecondary || '#6b7280',
      textAlign: 'center',
      padding: 20,
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Vendor Management</Text>

      {/* Add Vendor Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Vendor Name"
          placeholderTextColor={theme?.textSecondary || '#6b7280'}
          value={form.name}
          onChangeText={(value) => handleChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          placeholderTextColor={theme?.textSecondary || '#6b7280'}
          value={form.contact}
          onChangeText={(value) => handleChange('contact', value)}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor={theme?.textSecondary || '#6b7280'}
          value={form.address}
          onChangeText={(value) => handleChange('address', value)}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Vendor</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Delete All Button */}
      <View style={styles.deleteAllContainer}>
        <TouchableOpacity
          style={[styles.deleteAllButton, (deleting || vendors.length === 0) && styles.sendButtonDisabled]}
          onPress={handleDeleteAll}
          disabled={deleting || vendors.length === 0}
        >
          <Text style={styles.deleteAllButtonText}>
            {deleting ? 'Deleting...' : 'Delete All'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Vendor List */}
      {loading ? (
        <Text style={styles.loadingText}>Loading vendors...</Text>
      ) : vendors.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No vendors found.</Text>
        </View>
      ) : (
        vendors.map((vendor) => (
          <View key={vendor._id} style={styles.vendorCard}>
            <View style={styles.vendorHeader}>
              <Text style={styles.vendorName}>{vendor.name}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(vendor._id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.vendorContact}>📞 {vendor.contact}</Text>
            <Text style={styles.vendorAddress}>📍 {vendor.address}</Text>
          </View>
        ))
      )}

      {/* Bulk WhatsApp Messaging */}
      {vendors.length > 0 && (
        <View style={styles.whatsappContainer}>
          <Text style={styles.whatsappTitle}>Bulk WhatsApp Messaging</Text>

          <TextInput
            style={styles.textArea}
            placeholder="Type your message here..."
            placeholderTextColor={theme?.textSecondary || '#6b7280'}
            value={waMessage}
            onChangeText={setWaMessage}
            multiline
            editable={!sending}
          />

          <ScrollView style={styles.contactsContainer} showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.selectAllItem}
              onPress={handleSelectAll}
              disabled={sending}
            >
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: theme?.accent || '#3b82f6',
                backgroundColor: selectAll ? (theme?.accent || '#3b82f6') : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {selectAll && <Text style={{ color: 'white', fontSize: 12 }}>✓</Text>}
              </View>
              <Text style={styles.selectAllText}>Select All Vendors</Text>
            </TouchableOpacity>
            
            {vendors.map((vendor) => (
              <TouchableOpacity
                key={vendor._id}
                style={styles.contactItem}
                onPress={() => toggleSelectContact(vendor.contact)}
                disabled={sending}
              >
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: theme?.accent || '#3b82f6',
                  backgroundColor: selectedContacts.includes(vendor.contact) ? (theme?.accent || '#3b82f6') : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {selectedContacts.includes(vendor.contact) && <Text style={{ color: 'white', fontSize: 12 }}>✓</Text>}
                </View>
                <Text style={styles.contactText}>
                  {vendor.name} ({vendor.contact})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={[styles.sendButton, sending && styles.sendButtonDisabled]}
            onPress={sendWhatsAppMessages}
            disabled={sending}
          >
            <Text style={styles.sendButtonText}>
              {sending ? "Sending..." : `Send Message to ${selectedContacts.length} Vendor${selectedContacts.length !== 1 ? "s" : ""}`}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default VendorList;
