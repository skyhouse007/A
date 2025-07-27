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
        return <Dashboard sales={sampleSalesData} inventory={sampleInventoryData} />;
      case "billing":
        return <Billing />;
      case "inventoryList":
        return <InventoryList />;
      case "salesList":
        return <SalesList />;
      case "purchaseForm":
        return <PurchaseForm />;
      default:
        return (
          <div style={{
            background: '#f8fafc',
            minHeight: 'calc(100vh - 140px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              maxWidth: '320px',
              width: '100%'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '24px',
                margin: '0 auto 24px',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.25)'
              }}>
                E
              </div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '8px'
              }}>
                Welcome to ERP Mobile
              </h1>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '24px',
                lineHeight: '1.5'
              }}>
                Your complete business management solution
              </p>
              
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                      Current Page
                    </div>
                    <div style={{ fontSize: '14px', color: '#111827', fontWeight: '600' }}>
                      {currentPage}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                      User Status
                    </div>
                    <div style={{ fontSize: '14px', color: '#111827', fontWeight: '600' }}>
                      {user ? 'Signed In' : 'Guest'}
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setCurrentPage('dashboard')}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#3b82f6';
                }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  // Mobile ERP Loading State
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          {/* Mobile Loading Spinner */}
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '8px'
          }}>
            Loading ERP Mobile
          </h2>
          {!apiConnected && (
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Connecting to server...
            </p>
          )}
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

  // Mobile ERP Error State
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          border: '1px solid #fecaca',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '320px',
          width: '100%'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: '#fef2f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#dc2626',
            fontWeight: 'bold',
            fontSize: '24px',
            margin: '0 auto 16px'
          }}>
            ⚠️
          </div>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#dc2626',
            marginBottom: '8px'
          }}>
            Connection Error
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '16px',
            lineHeight: '1.5'
          }}>
            {error}
          </p>
          <p style={{
            fontSize: '12px',
            color: '#9ca3af',
            marginBottom: '24px'
          }}>
            Please check your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: '12px',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#b91c1c';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#dc2626';
            }}
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Mobile Header */}
      <Navbar 
        user={user} 
        setPage={setCurrentPage}
      />
      
      {/* Main Content */}
      <div style={{
        flex: 1,
        paddingBottom: '80px' // Space for bottom navigation
      }}>
        {renderPageContent()}
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation 
        currentPage={currentPage}
        setPage={setCurrentPage}
      />
      
      <StatusBar style="dark" backgroundColor="#ffffff" />
    </div>
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
    backgroundColor: '#f8fafc',
  }
});
