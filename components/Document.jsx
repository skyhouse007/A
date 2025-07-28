import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert, Platform } from 'react-native';
import useAxios from "../hooks/useAxios";

const DocumentManager = ({ theme }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [docDescription, setDocDescription] = useState("");
  const axios = useAxios();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Mock documents data for demo purposes (since no backend is available)
        const mockDocuments = [
          {
            _id: "1",
            name: "Invoice Template.pdf",
            description: "Standard invoice template for business use",
            filePath: "/uploads/documents/invoice-template.pdf",
            createdAt: "2024-01-15T10:30:00Z",
            size: "245 KB"
          },
          {
            _id: "2",
            name: "Company Policy.docx",
            description: "Employee handbook and company policies",
            filePath: "/uploads/documents/company-policy.docx",
            createdAt: "2024-01-10T14:20:00Z",
            size: "1.2 MB"
          },
          {
            _id: "3",
            name: "Product Catalog.xlsx",
            description: "Complete product list with pricing",
            filePath: "/uploads/documents/product-catalog.xlsx",
            createdAt: "2024-01-05T09:15:00Z",
            size: "850 KB"
          }
        ];
        
        setDocuments(mockDocuments);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      }
    };
    fetchDocuments();
  }, []);

  const handleFileUpload = async () => {
    if (!docName.trim()) {
      Alert.alert("Error", "Please enter a document name");
      return;
    }

    try {
      // Mock file upload for demo purposes
      const newDoc = {
        _id: Date.now().toString(),
        name: docName.trim(),
        description: docDescription.trim() || "No description",
        filePath: `/uploads/documents/${docName.toLowerCase().replace(/\s+/g, '-')}.pdf`,
        createdAt: new Date().toISOString(),
        size: Math.floor(Math.random() * 1000) + 100 + " KB"
      };

      setDocuments(prev => [newDoc, ...prev]);
      setDocName("");
      setDocDescription("");
      setSelectedFile(null);
      Alert.alert("Success", "Document uploaded successfully!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to upload document");
    }
  };

  const handleView = (doc) => {
    Alert.alert(
      "View Document", 
      `Opening: ${doc.name}\n\nNote: This is a demo app. In a real app, this would open the document.`,
      [{ text: "OK" }]
    );
  };

  const handleDownload = async (doc) => {
    Alert.alert(
      "Download Document",
      `Downloading: ${doc.name}\n\nNote: This is a demo app. In a real app, this would download the file.`,
      [{ text: "OK" }]
    );
  };

  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Document",
      "Are you sure you want to delete this document?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setDocuments(prev => prev.filter(d => d._id !== id));
            Alert.alert("Success", "Document deleted successfully!");
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
      fontWeight: '600',
      color: theme?.text || '#1f2937',
      marginBottom: 24,
      textAlign: 'center',
    },
    uploadContainer: {
      backgroundColor: theme?.cardBg || '#ffffff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
    },
    input: {
      borderWidth: 1,
      borderColor: theme?.border || '#d1d5db',
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: theme?.bg || '#ffffff',
      color: theme?.text || '#1f2937',
      marginBottom: 16,
    },
    fileSelectButton: {
      backgroundColor: theme?.border || '#e5e7eb',
      borderRadius: 8,
      padding: 12,
      alignItems: 'center',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme?.border || '#d1d5db',
      borderStyle: 'dashed',
    },
    fileSelectText: {
      color: theme?.textSecondary || '#6b7280',
      fontSize: 14,
    },
    selectedFileText: {
      color: theme?.accent || '#3b82f6',
      fontSize: 14,
      fontWeight: '500',
    },
    uploadButton: {
      backgroundColor: theme?.accent || '#3b82f6',
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
    },
    uploadButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    documentsContainer: {
      flex: 1,
    },
    documentsTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme?.text || '#1f2937',
      marginBottom: 16,
    },
    documentCard: {
      backgroundColor: theme?.cardBg || '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
    },
    documentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    documentName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme?.text || '#1f2937',
      flex: 1,
      marginRight: 8,
    },
    documentSize: {
      fontSize: 12,
      color: theme?.textSecondary || '#6b7280',
      backgroundColor: theme?.border || '#e5e7eb',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
    documentDescription: {
      fontSize: 14,
      color: theme?.textSecondary || '#6b7280',
      marginBottom: 8,
    },
    documentDate: {
      fontSize: 12,
      color: theme?.textSecondary || '#6b7280',
      marginBottom: 12,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
      flex: 1,
      alignItems: 'center',
    },
    viewButton: {
      backgroundColor: theme?.accent || '#3b82f6',
    },
    downloadButton: {
      backgroundColor: '#10b981',
    },
    deleteButton: {
      backgroundColor: '#ef4444',
    },
    actionButtonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '500',
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Document Manager</Text>

      {/* Upload Form */}
      <View style={styles.uploadContainer}>
        <TextInput
          style={styles.input}
          placeholder="Document Name"
          placeholderTextColor={theme?.textSecondary || '#6b7280'}
          value={docName}
          onChangeText={setDocName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Description (optional)"
          placeholderTextColor={theme?.textSecondary || '#6b7280'}
          value={docDescription}
          onChangeText={setDocDescription}
          multiline
        />

        <TouchableOpacity 
          style={styles.fileSelectButton}
          onPress={() => {
            // In a real app, this would open a file picker
            setSelectedFile({ name: "sample-document.pdf" });
          }}
        >
          <Text style={selectedFile ? styles.selectedFileText : styles.fileSelectText}>
            {selectedFile ? `Selected: ${selectedFile.name}` : "📎 Select File"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Text style={styles.uploadButtonText}>Upload Document</Text>
        </TouchableOpacity>
      </View>

      {/* Documents List */}
      <View style={styles.documentsContainer}>
        <Text style={styles.documentsTitle}>Documents</Text>
        
        {documents.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No documents uploaded.</Text>
          </View>
        ) : (
          documents.map((doc) => (
            <View key={doc._id} style={styles.documentCard}>
              <View style={styles.documentHeader}>
                <Text style={styles.documentName}>{doc.name}</Text>
                <Text style={styles.documentSize}>{doc.size}</Text>
              </View>
              
              <Text style={styles.documentDescription}>
                {doc.description || "No description"}
              </Text>
              
              <Text style={styles.documentDate}>
                📅 {new Date(doc.createdAt).toLocaleDateString()} at {new Date(doc.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </Text>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.viewButton]}
                  onPress={() => handleView(doc)}
                >
                  <Text style={styles.actionButtonText}>View</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, styles.downloadButton]}
                  onPress={() => handleDownload(doc)}
                >
                  <Text style={styles.actionButtonText}>Download</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleDelete(doc._id)}
                >
                  <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default DocumentManager;
