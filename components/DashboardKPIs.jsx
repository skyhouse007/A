'use dom'
import React from 'react';

const DashboardKPIs = ({ theme }) => {
  const kpiData = [
    {
      id: 1,
      title: 'Daily Sales',
      value: '$12,450',
      change: '+12.5%',
      trend: 'up',
      color: '#10b981',
      subtitle: 'vs yesterday'
    },
    {
      id: 2,
      title: 'Total Orders',
      value: '248',
      change: '+8.2%',
      trend: 'up',
      color: '#3b82f6',
      subtitle: 'this week'
    },
    {
      id: 3,
      title: 'Inventory Value',
      value: '$89,234',
      change: '-2.4%',
      trend: 'down',
      color: '#f59e0b',
      subtitle: 'current stock'
    },
    {
      id: 4,
      title: 'Profit Margin',
      value: '24.7%',
      change: '+1.3%',
      trend: 'up',
      color: '#8b5cf6',
      subtitle: 'gross profit'
    }
  ];

  const getStatusColor = (trend) => {
    return trend === 'up' ? '#10b981' : '#ef4444';
  };

  const getStatusBg = (trend) => {
    return trend === 'up' ? '#dcfce7' : '#fef2f2';
  };

  const getStatusTextColor = (trend) => {
    return trend === 'up' ? '#166534' : '#dc2626';
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px' }}>
      {kpiData.map((kpi) => (
        <div
          key={kpi.id}
          style={{
            background: theme.cardBg,
            borderRadius: '12px',
            padding: '16px',
            border: `1px solid ${theme.border}`,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: kpi.color
            }}></div>
            <div style={{
              padding: '2px 6px',
              borderRadius: '6px',
              background: getStatusBg(kpi.trend),
              fontSize: '11px',
              fontWeight: '600',
              color: getStatusTextColor(kpi.trend)
            }}>
              {kpi.change}
            </div>
          </div>

          <h3 style={{
            fontSize: '12px',
            fontWeight: '500',
            color: theme.textSecondary,
            margin: '0 0 4px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {kpi.title}
          </h3>

          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: theme.text,
            lineHeight: '1',
            marginBottom: '4px'
          }}>
            {kpi.value}
          </div>

          <p style={{
            fontSize: '11px',
            color: theme.textSecondary,
            margin: '0',
            fontWeight: '500'
          }}>
            {kpi.subtitle}
          </p>

          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '3px',
            background: kpi.color,
            opacity: '0.8'
          }}></div>
        </div>
      ))}
    </div>
  );
};

export default DashboardKPIs;
