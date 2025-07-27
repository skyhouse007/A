'use dom'
import React, { useEffect, useState } from "react";

const Dashboard = ({ sales, inventory }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  // Sample data for demonstration
  const kpiData = [
    { title: "Total Sales", value: "$45,231", change: "+20.1%", icon: "💰", color: "green" },
    { title: "Orders", value: "2,350", change: "+180.1%", icon: "📦", color: "blue" },
    { title: "Customers", value: "12,234", change: "+19%", icon: "👥", color: "purple" },
    { title: "Revenue", value: "$12,234", change: "+201", icon: "📈", color: "orange" },
  ];

  const recentActivity = [
    { type: "order", message: "New order #1234 received", time: "2 min ago", icon: "🛒" },
    { type: "payment", message: "Payment received from Customer A", time: "5 min ago", icon: "💳" },
    { type: "inventory", message: "Low stock alert for Product B", time: "10 min ago", icon: "⚠️" },
    { type: "customer", message: "New customer registered", time: "15 min ago", icon: "👤" },
  ];

  return (
    <div style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
          Dashboard
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>{kpi.icon}</span>
              <span style={{ 
                fontSize: '0.875rem', 
                color: kpi.color === 'green' ? '#10b981' : '#3b82f6',
                fontWeight: '500'
              }}>
                {kpi.change}
              </span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem', color: '#1f2937' }}>
              {kpi.value}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {kpi.title}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        {/* Sales Chart */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
            Sales Overview
          </h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'end', gap: '0.5rem', padding: '1rem 0' }}>
            {sales?.map((item, index) => (
              <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    height: `${(item.sales / 25000) * 150}px`,
                    backgroundColor: '#3b82f6',
                    borderRadius: '0.25rem',
                    marginBottom: '0.5rem'
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Chart */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
            Inventory Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {inventory?.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: '#374151' }}>{item.item}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{item.stock} units</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#10b981' }}>
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Recent Activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recentActivity.map((activity, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{activity.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.875rem', color: '#374151', marginBottom: '0.25rem' }}>
                  {activity.message}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;