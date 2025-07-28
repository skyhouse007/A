import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import BottomNavigation from './components/BottomNavigation.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Billing from './components/Billing.jsx';
import InventoryList from './components/InventoryList.jsx';
import SalesList from './components/SalesList.jsx';
import PurchaseForm from './components/PurchaseForm.jsx';
import PurchaseList from './components/PurchaseList.jsx';
import Sales from './components/Sales.jsx';
import LedgerList from './components/LedgerList.jsx';
import LedgerDetails from './components/LedgerDetails.jsx';
import ProfitAndLoss from './components/ProfitAndLoss.jsx';
import GSTDetails from './components/GSTDetails.jsx';
import VendorList from './components/VendorList.jsx';
import CashInForm from './components/CashInForm.jsx';
import CashoutForm from './components/CashoutForm.jsx';
import Document from './components/Document.jsx';
import Reminders from './components/Reminders.jsx';
import { AppProvider, useApp } from './context/AppContext.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function AppContent() {
  const { 
    currentPage, 
    setCurrentPage, 
    user, 
    isLoading,
    error,
    apiConnected
  } = useApp();

  const [darkMode, setDarkMode] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const sampleSalesData = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 15000 },
    { month: 'Mar', sales: 18000 },
    { month: 'Apr', sales: 14000 },
    { month: 'May', sales: 22000 },
    { month: 'Jun', sales: 25000 },
  ];

  const sampleInventoryData = [
    { item: 'Product A', stock: 150, value: 15000 },
    { item: 'Product B', stock: 200, value: 20000 },
    { item: 'Product C', stock: 100, value: 10000 },
  ];

  const theme = {
    light: {
      bg: '#ffffff',
      cardBg: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      accent: '#3b82f6'
    },
    dark: {
      bg: '#111827',
      cardBg: '#1f2937',
      text: '#ffffff',
      textSecondary: '#9ca3af',
      border: '#374151',
      accent: '#60a5fa'
    }
  };

  const currentTheme = darkMode ? theme.dark : theme.light;

  const renderPageContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard sales={sampleSalesData} inventory={sampleInventoryData} theme={currentTheme} />;
      case "billing":
        return <Billing theme={currentTheme} />;
      case "inventoryList":
        return <InventoryList theme={currentTheme} />;
      case "salesList":
        return <SalesList theme={currentTheme} />;
      case "sales":
        return <Sales theme={currentTheme} />;
      case "purchaseForm":
        return <PurchaseForm theme={currentTheme} />;
      case "purchaseList":
        return <PurchaseList theme={currentTheme} />;
      case "vendors":
        return <VendorList theme={currentTheme} />;
      case "cashIn":
        return <CashInForm theme={currentTheme} />;
      case "cashOut":
        return <CashoutForm theme={currentTheme} />;
      case "cashEntry":
        return <CashEntryForm theme={currentTheme} />;
      case "ledger":
        return <LedgerList theme={currentTheme} />;
      case "ledgerDetails":
        return <LedgerDetails theme={currentTheme} />;
      case "document":
        return <Document theme={currentTheme} />;
      case "profitLoss":
        return <ProfitAndLoss theme={currentTheme} />;
      case "gstDetails":
        return <GSTDetails theme={currentTheme} />;
      case "dashboardKPIs":
        return <DashboardKPIs theme={currentTheme} />;
      case "reminders":
        return <Reminders theme={currentTheme} />;
      default:
        return <Dashboard sales={sampleSalesData} inventory={sampleInventoryData} theme={currentTheme} />;
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <View style={[
        styles.container,
        {
          backgroundColor: currentTheme.bg,
          justifyContent: 'center',
          alignItems: 'center'
        }
      ]}>
        <View style={{
          backgroundColor: currentTheme.cardBg,
          borderRadius: 12,
          padding: 32,
          borderWidth: 1,
          borderColor: currentTheme.border,
          alignItems: 'center'
        }}>
          <ActivityIndicator
            size="large"
            color={currentTheme.accent}
            style={{ marginBottom: 16 }}
          />
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: currentTheme.text
          }}>
            Loading...
          </Text>
        </View>
      </View>
    );
  }

  // Error State
  if (error) {
    return (
      <View style={[
        styles.container,
        {
          backgroundColor: currentTheme.bg,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20
        }
      ]}>
        <View style={{
          backgroundColor: currentTheme.cardBg,
          borderRadius: 12,
          padding: 32,
          borderWidth: 1,
          borderColor: '#ef4444',
          alignItems: 'center',
          maxWidth: 400,
          width: '100%'
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#ef4444',
            marginBottom: 8,
            textAlign: 'center'
          }}>
            Connection Error
          </Text>
          <Text style={{
            fontSize: 14,
            color: currentTheme.textSecondary,
            marginBottom: 20,
            textAlign: 'center'
          }}>
            {error}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      { backgroundColor: currentTheme.bg }
    ]}>
      {/* Header */}
      <Navbar
        user={user}
        setPage={setCurrentPage}
        theme={currentTheme}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onMenuPress={() => setSidebarVisible(true)}
      />

      {/* Main Content - Scrollable */}
      <View style={styles.content}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        >
          {renderPageContent()}
        </ScrollView>
      </View>

      {/* Sidebar */}
      {sidebarVisible && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100
        }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setSidebarVisible(false)}
          />
          <View style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 320
          }}>
            <Sidebar
              setPage={setCurrentPage}
              onClose={() => setSidebarVisible(false)}
              theme={currentTheme}
            />
          </View>
        </View>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation
        currentPage={currentPage}
        setPage={setCurrentPage}
        theme={currentTheme}
      />

      <StatusBar style={darkMode ? "light" : "dark"} backgroundColor={currentTheme.bg} />
    </View>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  }
});
