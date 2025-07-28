'use dom'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import BottomNavigation from './components/BottomNavigation.jsx';
import Dashboard from './components/Dashboard.jsx';
import Billing from './components/Billing.jsx';
import InventoryList from './components/InventoryList.jsx';
import SalesList from './components/SalesList.jsx';
import PurchaseForm from './components/PurchaseForm.jsx';
import VendorList from './components/VendorList.jsx';
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
      case "purchaseForm":
        return <PurchaseForm theme={currentTheme} />;
      case "vendors":
        return <VendorList theme={currentTheme} />;

      // Additional pages - using existing components as placeholders for now
      case "purchase":
        return <PurchaseForm theme={currentTheme} />;
      case "sales":
        return <SalesList theme={currentTheme} />;
      case "services":
      case "document":
      case "orders":
      case "Customer":
      case "cashIn":
      case "cashOut":
      case "ledger":
      case "balanceSheet":
      case "profitLoss":
      case "gstDetails":
      case "Reminders":
        return (
          <div style={{
            background: currentTheme.bg,
            minHeight: '100%',
            width: '100%',
            padding: '16px'
          }}>
            <div style={{
              background: currentTheme.cardBg,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center'
            }}>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: currentTheme.text,
                marginBottom: '16px'
              }}>
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} Module
              </h1>
              <p style={{
                fontSize: '16px',
                color: currentTheme.textSecondary,
                marginBottom: '24px'
              }}>
                This module is under development and will be available soon.
              </p>
              <button
                onClick={() => setCurrentPage('dashboard')}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  background: currentTheme.accent,
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
      default:
        return <Dashboard sales={sampleSalesData} inventory={sampleInventoryData} theme={currentTheme} />;
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: currentTheme.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: currentTheme.cardBg,
          borderRadius: '12px',
          padding: '32px',
          border: `1px solid ${currentTheme.border}`,
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: `3px solid ${currentTheme.border}`,
            borderTop: `3px solid ${currentTheme.accent}`,
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: currentTheme.text,
            margin: 0
          }}>
            Loading...
          </h2>
        </div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: currentTheme.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: currentTheme.cardBg,
          borderRadius: '12px',
          padding: '32px',
          border: '1px solid #ef4444',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#ef4444',
            marginBottom: '8px'
          }}>
            Connection Error
          </h2>
          <p style={{
            fontSize: '14px',
            color: currentTheme.textSecondary,
            marginBottom: '20px'
          }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.bg,
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <Navbar 
        user={user} 
        setPage={setCurrentPage}
        theme={currentTheme}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      
      {/* Main Content - Scrollable */}
      <div style={{
        flex: 1,
        paddingBottom: '80px', // Space for bottom nav
        overflowY: 'auto',
        overflowX: 'hidden',
        height: 'calc(100vh - 140px)', // Fixed height for scrolling
        width: '100%'
      }}>
        {renderPageContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        currentPage={currentPage}
        setPage={setCurrentPage}
        theme={currentTheme}
      />
      
      <StatusBar style={darkMode ? "light" : "dark"} backgroundColor={currentTheme.bg} />
    </div>
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
    backgroundColor: '#ffffff',
  }
});
