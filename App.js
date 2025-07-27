'use dom'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Billing from './components/Billing.jsx';
import InventoryList from './components/InventoryList.jsx';
import SalesList from './components/SalesList.jsx';
import PurchaseForm from './components/PurchaseForm.jsx';
import { AppProvider, useApp } from './context/AppContext.js';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function AppContent() {
  const { 
    currentPage, 
    setCurrentPage, 
    user, 
    sidebarCollapsed, 
    setSidebarCollapsed,
    isLoading,
    error,
    apiConnected
  } = useApp();
  
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

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

  const renderPageContent = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <Dashboard sales={sampleSalesData} inventory={sampleInventoryData} />
          </div>
        );
      case "billing":
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <Billing />
          </div>
        );
      case "inventoryList":
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <InventoryList />
          </div>
        );
      case "salesList":
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <SalesList />
          </div>
        );
      case "purchaseForm":
        return (
          <div style={{ width: '100%', height: '100%' }}>
            <PurchaseForm />
          </div>
        );
      default:
        return (
          <View style={styles.content}>
            <Text style={styles.text}>Welcome to your Expo app!</Text>
            <Text style={styles.subText}>Current page: {currentPage}</Text>
            <Text style={styles.subText}>User: {user ? 'Logged in' : 'Guest'}</Text>
            <Text style={styles.subText}>Sidebar: {sidebarCollapsed ? 'Collapsed' : 'Expanded'}</Text>
          </View>
        );
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
          {!apiConnected && (
            <Text style={styles.connectionText}>Connecting to backend...</Text>
          )}
        </View>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <Text style={styles.errorSubText}>Please check your connection and try again.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar 
        user={user} 
        setPage={setCurrentPage} 
        setShowMobileSidebar={setShowMobileSidebar} 
      />
      
      <div style={styles.mainContent}>
        {/* Desktop Sidebar */}
        <div style={{
          display: 'none',
          '@media (minWidth: 768px)': {
            display: 'block'
          }
        }}>
          <Sidebar 
            setPage={setCurrentPage}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {showMobileSidebar && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              zIndex: 50
            }}>
              <Sidebar 
                setPage={setCurrentPage}
                collapsed={false}
                setCollapsed={setSidebarCollapsed}
                onClose={() => setShowMobileSidebar(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div style={styles.contentArea}>
          {renderPageContent()}
        </div>
      </div>
      
      <StatusBar style="auto" />
    </View>
  );
}

// Main App component with context provider
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
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  contentArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  connectionText: {
    fontSize: 14,
    color: '#6c757d',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#dc3545',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorSubText: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
  },
});