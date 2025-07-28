'use dom'
import React, { useState } from 'react';

const Services = ({ theme }) => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Website Development',
      category: 'Development',
      price: 2500.00,
      duration: '30 days',
      status: 'active',
      description: 'Complete website development with modern design'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      category: 'Development', 
      price: 5000.00,
      duration: '60 days',
      status: 'active',
      description: 'Native mobile app for iOS and Android'
    },
    {
      id: 3,
      name: 'Digital Marketing',
      category: 'Marketing',
      price: 1200.00,
      duration: '30 days',
      status: 'active',
      description: 'Social media and SEO marketing services'
    },
    {
      id: 4,
      name: 'Consultation',
      category: 'Consulting',
      price: 150.00,
      duration: '1 hour',
      status: 'active',
      description: 'Business strategy and technology consultation'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: ''
  });

  const categories = ['Development', 'Marketing', 'Consulting', 'Design', 'Support'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      status: 'active'
    };
    setServices(prev => [...prev, newService]);
    setFormData({ name: '', category: '', price: '', duration: '', description: '' });
  };

  return (
    <div style={{
      background: theme.bg,
      minHeight: '100%',
      width: '100%',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: theme.cardBg,
        padding: '16px',
        borderBottom: `1px solid ${theme.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: theme.text,
          margin: '0 0 16px 0'
        }}>
          Services Management
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Add Service Form */}
        <form onSubmit={handleSubmit} style={{
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: theme.text,
            marginBottom: '16px'
          }}>
            Add New Service
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <input
              type="text"
              placeholder="Service Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                background: theme.bg,
                color: theme.text,
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                background: theme.bg,
                color: theme.text,
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                background: theme.bg,
                color: theme.text,
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <input
              type="text"
              placeholder="Duration (e.g., 30 days)"
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                background: theme.bg,
                color: theme.text,
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <textarea
            placeholder="Service Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows="3"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              background: theme.bg,
              color: theme.text,
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              marginBottom: '16px'
            }}
          />

          <button
            type="submit"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              background: theme.accent,
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Add Service
          </button>
        </form>

        {/* Services List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          {services.map((service) => (
            <div
              key={service.id}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                padding: '20px',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: theme.text,
                  margin: 0
                }}>
                  {service.name}
                </h3>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: '#dcfce7',
                  color: '#166534',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {service.status}
                </span>
              </div>
              
              <p style={{
                fontSize: '14px',
                color: theme.textSecondary,
                marginBottom: '16px',
                lineHeight: '1.5'
              }}>
                {service.description}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: theme.accent
                }}>
                  ${service.price}
                </span>
                <span style={{
                  fontSize: '14px',
                  color: theme.textSecondary
                }}>
                  {service.duration}
                </span>
              </div>

              <div style={{
                padding: '8px 12px',
                borderRadius: '8px',
                background: theme.bg,
                border: `1px solid ${theme.border}`,
                fontSize: '12px',
                color: theme.textSecondary,
                textAlign: 'center'
              }}>
                Category: {service.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
