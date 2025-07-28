import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

const Reminders = ({ theme }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [type, setType] = useState('reminder');
  const [reminders, setReminders] = useState([
    {
      _id: "1",
      title: "Follow up with ABC Supplier",
      description: "Check on the pending order status and delivery timeline",
      dueDate: "2024-01-25",
      priority: "high",
      type: "reminder"
    },
    {
      _id: "2", 
      title: "Update inventory records",
      description: "Reconcile physical stock with system records",
      dueDate: "2024-01-30",
      priority: "medium",
      type: "todo"
    },
    {
      _id: "3",
      title: "GST filing deadline",
      description: "Submit monthly GST returns",
      dueDate: "2024-02-15",
      priority: "high",
      type: "reminder"
    }
  ]);
  const [deleting, setDeleting] = useState(false);

  const priorities = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' }
  ];

  const types = [
    { label: 'Reminder', value: 'reminder' },
    { label: 'To-Do', value: 'todo' }
  ];

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    const newReminder = {
      _id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
      type
    };

    setReminders(prev => [newReminder, ...prev]);
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setType('reminder');
    Alert.alert("Success", "Reminder added successfully!");
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setReminders(prev => prev.filter(r => r._id !== id));
            Alert.alert("Success", "Reminder deleted successfully!");
          }
        }
      ]
    );
  };

  const handleDeleteAll = () => {
    Alert.alert(
      "Delete All Reminders",
      "Are you sure you want to delete all reminders? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setReminders([]);
            setDeleting(false);
            Alert.alert("Success", "All reminders deleted successfully!");
          }
        }
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'reminder' ? '⏰' : '✅';
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
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: theme?.text || '#1f2937',
      marginBottom: 24,
      textAlign: 'center',
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
    row: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    halfInput: {
      flex: 1,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: theme?.border || '#d1d5db',
      borderRadius: 8,
      backgroundColor: theme?.bg || '#ffffff',
      marginBottom: 16,
    },
    pickerRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      padding: 8,
    },
    pickerOption: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme?.border || '#d1d5db',
    },
    pickerOptionSelected: {
      backgroundColor: theme?.accent || '#3b82f6',
      borderColor: theme?.accent || '#3b82f6',
    },
    pickerOptionText: {
      fontSize: 14,
      color: theme?.text || '#1f2937',
    },
    pickerOptionTextSelected: {
      color: 'white',
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
    remindersSection: {
      flex: 1,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme?.text || '#1f2937',
    },
    deleteAllButton: {
      backgroundColor: '#ef4444',
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    deleteAllButtonDisabled: {
      backgroundColor: '#9ca3af',
    },
    deleteAllButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
    },
    reminderCard: {
      backgroundColor: theme?.cardBg || '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme?.border || '#e5e7eb',
      borderLeftWidth: 4,
    },
    reminderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    reminderTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme?.text || '#1f2937',
      flex: 1,
    },
    reminderMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8,
    },
    metaChip: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      fontSize: 10,
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    reminderDescription: {
      fontSize: 14,
      color: theme?.textSecondary || '#6b7280',
      marginBottom: 12,
      lineHeight: 20,
    },
    reminderFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dueDateText: {
      fontSize: 12,
      color: theme?.textSecondary || '#6b7280',
    },
    deleteButton: {
      backgroundColor: '#ef4444',
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    deleteButtonText: {
      color: 'white',
      fontSize: 10,
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
      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Add Reminder / To-Do</Text>

        <TextInput
          style={styles.input}
          placeholder="Title (required)"
          placeholderTextColor={theme?.textSecondary || '#6b7280'}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.textArea}
          placeholder="Description (optional)"
          placeholderTextColor={theme?.textSecondary || '#6b7280'}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Due Date (YYYY-MM-DD)"
          placeholderTextColor={theme?.textSecondary || '#6b7280'}
          value={dueDate}
          onChangeText={setDueDate}
        />

        {/* Priority Picker */}
        <View style={styles.pickerContainer}>
          <View style={styles.pickerRow}>
            {priorities.map((p) => (
              <TouchableOpacity
                key={p.value}
                style={[
                  styles.pickerOption,
                  priority === p.value && styles.pickerOptionSelected
                ]}
                onPress={() => setPriority(p.value)}
              >
                <Text style={[
                  styles.pickerOptionText,
                  priority === p.value && styles.pickerOptionTextSelected
                ]}>
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Type Picker */}
        <View style={styles.pickerContainer}>
          <View style={styles.pickerRow}>
            {types.map((t) => (
              <TouchableOpacity
                key={t.value}
                style={[
                  styles.pickerOption,
                  type === t.value && styles.pickerOptionSelected
                ]}
                onPress={() => setType(t.value)}
              >
                <Text style={[
                  styles.pickerOptionText,
                  type === t.value && styles.pickerOptionTextSelected
                ]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Reminder</Text>
        </TouchableOpacity>
      </View>

      {/* Reminders List */}
      <View style={styles.remindersSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Entries</Text>
          <TouchableOpacity
            style={[
              styles.deleteAllButton,
              (deleting || reminders.length === 0) && styles.deleteAllButtonDisabled
            ]}
            onPress={handleDeleteAll}
            disabled={deleting || reminders.length === 0}
          >
            <Text style={styles.deleteAllButtonText}>
              {deleting ? 'Deleting...' : 'Delete All'}
            </Text>
          </TouchableOpacity>
        </View>

        {reminders.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No reminders yet.</Text>
          </View>
        ) : (
          reminders.map((reminder) => (
            <View
              key={reminder._id}
              style={[
                styles.reminderCard,
                { borderLeftColor: getPriorityColor(reminder.priority) }
              ]}
            >
              <View style={styles.reminderHeader}>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(reminder._id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.reminderMeta}>
                <Text style={[
                  styles.metaChip,
                  { backgroundColor: getPriorityColor(reminder.priority), color: 'white' }
                ]}>
                  {reminder.priority}
                </Text>
                <Text style={[
                  styles.metaChip,
                  { backgroundColor: theme?.border || '#e5e7eb', color: theme?.text || '#1f2937' }
                ]}>
                  {getTypeIcon(reminder.type)} {reminder.type}
                </Text>
              </View>

              {reminder.description && (
                <Text style={styles.reminderDescription}>{reminder.description}</Text>
              )}

              <View style={styles.reminderFooter}>
                <Text style={styles.dueDateText}>
                  {reminder.dueDate ? `📅 Due: ${new Date(reminder.dueDate).toLocaleDateString()}` : 'No due date'}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Reminders;
