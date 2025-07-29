import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../context/AppContext.js';

const ConnectionTest = ({ theme }) => {
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [testResults, setTestResults] = useState({});
  const { apiService, salesService, inventoryService } = useApp();

  const testBackendConnection = async () => {
    setConnectionStatus('testing');
    const results = {};

    try {
      // Test basic API connection
      const connected = await apiService.testConnection();
      results.apiConnection = connected ? 'success' : 'failed';

      if (connected) {
        // Test dashboard endpoint
        try {
          const dashboardData = await apiService.get('/dashboard/summary');
          results.dashboard = dashboardData ? 'success' : 'failed';
        } catch (error) {
          results.dashboard = 'failed';
        }

        // Test sales endpoint
        try {
          const salesData = await salesService.getSales();
          results.sales = 'success';
        } catch (error) {
          results.sales = 'failed';
        }

        // Test inventory endpoint
        try {
          const inventoryData = await inventoryService.getInventory();
          results.inventory = 'success';
        } catch (error) {
          results.inventory = 'failed';
        }
      }

      setTestResults(results);
      setConnectionStatus('completed');
    } catch (error) {
      console.error('Connection test failed:', error);
      results.apiConnection = 'failed';
      setTestResults(results);
      setConnectionStatus('failed');
    }
  };

  useEffect(() => {
    testBackendConnection();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return '#10b981';
      case 'failed': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success': return '✅ Connected';
      case 'failed': return '❌ Failed';
      default: return '⏳ Testing...';
    }
  };

  return (
    <View style={{
      backgroundColor: theme.bg,
      flex: 1,
      padding: 16
    }}>
      <View style={{
        backgroundColor: theme.cardBg,
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: theme.border
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '700',
          color: theme.text,
          marginBottom: 20,
          textAlign: 'center'
        }}>
          Backend Integration Test
        </Text>

        <View style={{ gap: 12 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12,
            backgroundColor: theme.bg,
            borderRadius: 8
          }}>
            <Text style={{ color: theme.text, fontSize: 16 }}>API Connection</Text>
            <Text style={{ 
              color: getStatusColor(testResults.apiConnection),
              fontSize: 14,
              fontWeight: '600'
            }}>
              {getStatusText(testResults.apiConnection)}
            </Text>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12,
            backgroundColor: theme.bg,
            borderRadius: 8
          }}>
            <Text style={{ color: theme.text, fontSize: 16 }}>Dashboard Endpoint</Text>
            <Text style={{ 
              color: getStatusColor(testResults.dashboard),
              fontSize: 14,
              fontWeight: '600'
            }}>
              {getStatusText(testResults.dashboard)}
            </Text>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12,
            backgroundColor: theme.bg,
            borderRadius: 8
          }}>
            <Text style={{ color: theme.text, fontSize: 16 }}>Sales Endpoint</Text>
            <Text style={{ 
              color: getStatusColor(testResults.sales),
              fontSize: 14,
              fontWeight: '600'
            }}>
              {getStatusText(testResults.sales)}
            </Text>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12,
            backgroundColor: theme.bg,
            borderRadius: 8
          }}>
            <Text style={{ color: theme.text, fontSize: 16 }}>Inventory Endpoint</Text>
            <Text style={{ 
              color: getStatusColor(testResults.inventory),
              fontSize: 14,
              fontWeight: '600'
            }}>
              {getStatusText(testResults.inventory)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={testBackendConnection}
          style={{
            backgroundColor: theme.accent,
            padding: 16,
            borderRadius: 8,
            marginTop: 20,
            alignItems: 'center'
          }}
        >
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '600'
          }}>
            {connectionStatus === 'testing' ? 'Testing...' : 'Test Again'}
          </Text>
        </TouchableOpacity>

        <View style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: connectionStatus === 'completed' ? '#dcfce7' : '#fee2e2',
          borderRadius: 8
        }}>
          <Text style={{
            color: connectionStatus === 'completed' ? '#166534' : '#dc2626',
            fontSize: 14,
            textAlign: 'center'
          }}>
            {connectionStatus === 'completed' 
              ? 'Integration test completed! Check individual endpoints above.'
              : connectionStatus === 'testing'
              ? 'Testing backend connection...'
              : 'Some tests failed. Make sure the backend server is running on localhost:5000'
            }
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ConnectionTest;