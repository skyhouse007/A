'use dom'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
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
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAppLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

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
          <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
              backdropFilter: 'blur(20px) saturate(150%)',
              borderRadius: '24px',
              padding: '3rem',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              maxWidth: '500px',
              width: '100%'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '32px',
                margin: '0 auto 2rem',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.35)'
              }}>
                D
              </div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem',
                letterSpacing: '-1px'
              }}>
                Welcome to DataPlay AI
              </h1>
              <p style={{
                fontSize: '16px',
                color: 'rgba(148, 163, 184, 0.9)',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                Next-generation enterprise dashboard powered by artificial intelligence
              </p>
              <div style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '1rem',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '14px', color: 'rgba(148, 163, 184, 0.8)', marginBottom: '0.25rem' }}>Current Page</div>
                    <div style={{ fontSize: '16px', color: 'white', fontWeight: '600' }}>{currentPage}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'rgba(148, 163, 184, 0.8)', marginBottom: '0.25rem' }}>User Status</div>
                    <div style={{ fontSize: '16px', color: 'white', fontWeight: '600' }}>{user ? 'Authenticated' : 'Guest'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'rgba(148, 163, 184, 0.8)', marginBottom: '0.25rem' }}>Sidebar</div>
                    <div style={{ fontSize: '16px', color: 'white', fontWeight: '600' }}>{sidebarCollapsed ? 'Collapsed' : 'Expanded'}</div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('dashboard')}
                style={{
                  padding: '16px 32px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  // Enhanced loading state
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
          backdropFilter: 'blur(20px) saturate(150%)',
          borderRadius: '24px',
          padding: '3rem',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          {/* Modern Loading Spinner */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, transparent, #667eea, #764ba2, transparent)',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 2rem',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '4px',
              left: '4px',
              right: '4px',
              bottom: '4px',
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
              borderRadius: '50%'
            }}></div>
          </div>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '0.5rem'
          }}>
            Loading DataPlay AI
          </h2>
          {!apiConnected && (
            <p style={{
              fontSize: '14px',
              color: 'rgba(148, 163, 184, 0.8)',
              fontWeight: '500'
            }}>
              Establishing secure connection...
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

  // Enhanced error state
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
          backdropFilter: 'blur(20px) saturate(150%)',
          borderRadius: '24px',
          padding: '3rem',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '32px',
            margin: '0 auto 2rem'
          }}>
            !
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#ef4444',
            marginBottom: '1rem'
          }}>
            Connection Error
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'rgba(148, 163, 184, 0.9)',
            marginBottom: '0.5rem',
            lineHeight: '1.6'
          }}>
            {error}
          </p>
          <p style={{
            fontSize: '14px',
            color: 'rgba(148, 163, 184, 0.7)',
            marginBottom: '2rem'
          }}>
            Please check your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '16px 32px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease'
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
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: appLoaded ? 1 : 0
    }}>
      <Navbar 
        user={user} 
        setPage={setCurrentPage} 
        setShowMobileSidebar={setShowMobileSidebar} 
      />
      
      <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 80px)'
      }}>
        {/* Desktop Sidebar */}
        <div style={{
          display: window.innerWidth >= 768 ? 'block' : 'none',
          transition: 'all 0.3s ease'
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
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 40,
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              zIndex: 50,
              transform: showMobileSidebar ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
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
        <div style={{
          flex: 1,
          transition: 'all 0.3s ease',
          overflow: 'hidden'
        }}>
          {renderPageContent()}
        </div>
      </div>
      
      <StatusBar style="light" />
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
    backgroundColor: '#0f172a',
  }
});
