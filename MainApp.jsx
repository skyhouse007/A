import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { useApp } from './context/AppContext.js';

// Import all components
import Dashboard from './components/Dashboard.jsx';
import Sales from './components/Sales.jsx';
import SalesList from './components/SalesList.jsx';
import InventoryList from './components/InventoryList.jsx';
import PurchaseForm from './components/PurchaseForm.jsx';
import PurchaseList from './components/PurchaseList.jsx';
import VendorList from './components/VendorList.jsx';
import CashInForm from './components/CashInForm.jsx';
import CashoutForm from './components/CashoutForm.jsx';
import LedgerList from './components/LedgerList.jsx';
import LedgerDetails from './components/LedgerDetails.jsx';
import ProfitAndLoss from './components/ProfitAndLoss.jsx';
import GSTDetails from './components/GSTDetails.jsx';
import Reminders from './components/Reminders.jsx';
import Document from './components/Document.jsx';
import ConnectionTest from './components/ConnectionTest.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import BottomNavigation from './components/BottomNavigation.jsx';

const MainApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { theme = 'light' } = useApp();

  // Theme configuration
  const themes = {
    light: {
      bg: '#f8f9fa',
      cardBg: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      accent: '#3b82f6'
    },
    dark: {
      bg: '#111827',
      cardBg: '#1f2937',
      text: '#f9fafb',
      textSecondary: '#9ca3af',
      border: '#374151',
      accent: '#60a5fa'
    }
  };

  const currentTheme = themes[theme] || themes.light;

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSidebarVisible(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard theme={currentTheme} onNavigate={handleNavigate} />;
      case 'sales':
        return <Sales theme={currentTheme} />;
      case 'salesList':
        return <SalesList theme={currentTheme} />;
      case 'inventoryList':
        return <InventoryList theme={currentTheme} />;
      case 'purchaseForm':
        return <PurchaseForm theme={currentTheme} />;
      case 'purchaseList':
        return <PurchaseList theme={currentTheme} />;
      case 'vendors':
        return <VendorList theme={currentTheme} />;
      case 'cashIn':
        return <CashInForm theme={currentTheme} />;
      case 'cashOut':
        return <CashoutForm theme={currentTheme} />;
      case 'ledger':
        return <LedgerList theme={currentTheme} />;
      case 'ledgerDetails':
        return <LedgerDetails theme={currentTheme} />;
      case 'profitLoss':
        return <ProfitAndLoss theme={currentTheme} />;
      case 'gstDetails':
        return <GSTDetails theme={currentTheme} />;
      case 'reminders':
        return <Reminders theme={currentTheme} />;
      case 'document':
        return <Document theme={currentTheme} />;
      case 'connectionTest':
        return <ConnectionTest theme={currentTheme} />;
      default:
        return <Dashboard theme={currentTheme} onNavigate={handleNavigate} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: currentTheme.bg }}>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={currentTheme.cardBg}
      />
      
      {/* Navbar */}
      <Navbar 
        theme={currentTheme}
        onMenuPress={() => setSidebarVisible(true)}
        currentPage={currentPage}
      />

      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Sidebar */}
        {sidebarVisible && (
          <Sidebar
            theme={currentTheme}
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onClose={() => setSidebarVisible(false)}
          />
        )}

        {/* Main Content */}
        <View style={{ flex: 1 }}>
          {renderCurrentPage()}
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation
        theme={currentTheme}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    </View>
  );
};

export default MainApp;