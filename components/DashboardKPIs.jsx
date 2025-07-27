'use dom'
import React, { useState, useEffect } from 'react';

const DashboardKPIs = () => {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const kpiData = [
    {
      id: 1,
      title: 'Total Revenue',
      value: '$125,430',
      change: '+12.5%',
      trend: 'up',
      description: 'Monthly recurring revenue',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      accentColor: '#667eea',
      chartData: [65, 75, 70, 80, 85, 90, 95]
    },
    {
      id: 2,
      title: 'Active Users',
      value: '8,429',
      change: '+8.2%',
      trend: 'up',
      description: 'Daily active users',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      accentColor: '#f093fb',
      chartData: [45, 52, 48, 55, 60, 65, 70]
    },
    {
      id: 3,
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+0.8%',
      trend: 'up',
      description: 'Lead to customer conversion',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      accentColor: '#4facfe',
      chartData: [30, 35, 32, 38, 42, 45, 48]
    },
    {
      id: 4,
      title: 'Customer Satisfaction',
      value: '94.8%',
      change: '+2.1%',
      trend: 'up',
      description: 'Net promoter score',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      accentColor: '#43e97b',
      chartData: [85, 87, 90, 88, 92, 94, 95]
    },
    {
      id: 5,
      title: 'Inventory Value',
      value: '$89,234',
      change: '-2.4%',
      trend: 'down',
      description: 'Total stock valuation',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      accentColor: '#fa709a',
      chartData: [100, 95, 98, 92, 88, 85, 87]
    },
    {
      id: 6,
      title: 'Profit Margin',
      value: '24.7%',
      change: '+1.3%',
      trend: 'up',
      description: 'Gross profit percentage',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      accentColor: '#a8edea',
      chartData: [20, 22, 21, 24, 23, 25, 26]
    }
  ];

  const MiniChart = ({ data, color }) => (
    <div style={{ 
      height: '40px', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'end', 
      gap: '2px',
      marginTop: '1rem'
    }}>
      {data.map((value, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            height: `${(value / Math.max(...data)) * 100}%`,
            background: `linear-gradient(180deg, ${color}, ${color}80)`,
            borderRadius: '2px 2px 0 0',
            transition: 'all 0.3s ease',
            opacity: 0.8
          }}
        />
      ))}
    </div>
  );

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    }}>
      {kpiData.map((kpi, index) => (
        <div
          key={kpi.id}
          onMouseEnter={() => setHoveredCard(kpi.id)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
            backdropFilter: 'blur(20px) saturate(150%)',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: animationLoaded ? 
              (hoveredCard === kpi.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)') :
              'translateY(20px) scale(0.95)',
            opacity: animationLoaded ? 1 : 0,
            transitionDelay: `${index * 100}ms`,
            boxShadow: hoveredCard === kpi.id ? 
              '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 40px rgba(102, 126, 234, 0.1)' :
              '0 8px 25px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Animated background element */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: `radial-gradient(circle, ${kpi.accentColor}20 0%, transparent 70%)`,
            transform: hoveredCard === kpi.id ? 'scale(1.2) rotate(45deg)' : 'scale(1) rotate(0deg)',
            transition: 'all 0.6s ease',
            opacity: hoveredCard === kpi.id ? 1 : 0.5
          }}></div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {/* Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'rgba(148, 163, 184, 0.9)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '0.5rem'
                }}>
                  {kpi.title}
                </h3>
                <p style={{
                  fontSize: '11px',
                  color: 'rgba(148, 163, 184, 0.7)',
                  fontWeight: '500',
                  lineHeight: '1.4'
                }}>
                  {kpi.description}
                </p>
              </div>
              
              {/* Trend indicator */}
              <div style={{
                padding: '6px 12px',
                borderRadius: '12px',
                background: kpi.trend === 'up' ? 
                  'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))' :
                  'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))',
                border: `1px solid ${kpi.trend === 'up' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                fontSize: '12px',
                fontWeight: '600',
                color: kpi.trend === 'up' ? '#10b981' : '#ef4444',
                letterSpacing: '0.5px'
              }}>
                {kpi.change}
              </div>
            </div>

            {/* Main Value */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '900',
                background: kpi.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-1px',
                lineHeight: '1',
                marginBottom: '0.25rem'
              }}>
                {kpi.value}
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '4px',
              background: 'rgba(148, 163, 184, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginBottom: '1rem'
            }}>
              <div style={{
                height: '100%',
                background: kpi.gradient,
                borderRadius: '2px',
                width: `${Math.min(100, Math.max(20, parseFloat(kpi.value.replace(/[^0-9.]/g, '')) / 1000 * 100))}%`,
                transition: 'width 1s ease',
                transitionDelay: `${index * 150}ms`
              }}></div>
            </div>

            {/* Mini Chart */}
            <MiniChart data={kpi.chartData} color={kpi.accentColor} />

            {/* Accent Border */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: kpi.gradient,
              borderRadius: '0 0 20px 20px',
              opacity: hoveredCard === kpi.id ? 1 : 0.6,
              transition: 'opacity 0.3s ease'
            }}></div>

            {/* Floating indicator */}
            {hoveredCard === kpi.id && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                width: '8px',
                height: '8px',
                background: kpi.gradient,
                borderRadius: '50%',
                boxShadow: `0 0 20px ${kpi.accentColor}80`,
                animation: 'pulse 2s infinite'
              }}></div>
            )}
          </div>
        </div>
      ))}

      {/* Add pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default DashboardKPIs;
