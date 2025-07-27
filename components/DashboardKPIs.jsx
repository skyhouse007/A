'use dom'
import React from 'react';

const DashboardKPIs = () => {
  const kpiData = [
    {
      id: 1,
      title: 'Daily Sales',
      value: '$12,450',
      change: '+12.5%',
      trend: 'up',
      icon: '💰',
      color: '#10b981',
      subtitle: 'vs yesterday'
    },
    {
      id: 2,
      title: 'Total Orders',
      value: '248',
      change: '+8.2%',
      trend: 'up',
      icon: '📋',
      color: '#3b82f6',
      subtitle: 'this week'
    },
    {
      id: 3,
      title: 'Inventory Value',
      value: '$89,234',
      change: '-2.4%',
      trend: 'down',
      icon: '📦',
      color: '#f59e0b',
      subtitle: 'current stock'
    },
    {
      id: 4,
      title: 'Profit Margin',
      value: '24.7%',
      change: '+1.3%',
      trend: 'up',
      icon: '📊',
      color: '#8b5cf6',
      subtitle: 'gross profit'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      marginBottom: '24px'
    }}>
      {kpiData.map((kpi) => (
        <div
          key={kpi.id}
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            e.target.style.borderColor = kpi.color;
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
            e.target.style.borderColor = '#e5e7eb';
          }}
        >
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: `${kpi.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>
              {kpi.icon}
            </div>
            
            <div style={{
              padding: '2px 6px',
              borderRadius: '6px',
              background: kpi.trend === 'up' ? '#dcfce7' : '#fef2f2',
              fontSize: '11px',
              fontWeight: '600',
              color: kpi.trend === 'up' ? '#166534' : '#dc2626'
            }}>
              {kpi.change}
            </div>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#6b7280',
            margin: '0 0 4px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {kpi.title}
          </h3>

          {/* Value */}
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#111827',
            lineHeight: '1',
            marginBottom: '4px'
          }}>
            {kpi.value}
          </div>

          {/* Subtitle */}
          <p style={{
            fontSize: '11px',
            color: '#9ca3af',
            margin: 0,
            fontWeight: '500'
          }}>
            {kpi.subtitle}
          </p>

          {/* Bottom accent line */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: kpi.color,
            opacity: 0.8
          }}></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardKPIs;
