'use dom'
import React, { useState } from 'react';

const CashOut = ({ theme }) => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      amount: 1500,
      recipient: 'Office Rent',
      category: 'Fixed Costs',
      date: '2024-01-15',
      reference: 'RENT-001',
      notes: 'Monthly office rent payment'
    },
    {
      id: 2,
      amount: 800,
      recipient: 'Software Subscriptions',
      category: 'Technology',
      date: '2024-01-14',
      reference: 'SUB-001',
      notes: 'Adobe Creative Suite, GitHub Pro'
    },
    {
      id: 3,
      amount: 350,
      recipient: 'Marketing Campaign',
      category: 'Marketing',
      date: '2024-01-13',
      reference: 'MKT-001',
      notes: 'Google Ads campaign'
    }
  ]);

  const [formData, setFormData] = useState({
    amount: '',
    recipient: '',
    category: 'Operating',
    reference: '',
    notes: ''
  });

  const categories = ['Operating', 'Fixed Costs', 'Technology', 'Marketing', 'Travel', 'Supplies', 'Other'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString().split('T')[0]
    };
    setExpenses(prev => [newExpense, ...prev]);
    setFormData({ amount: '', recipient: '', category: 'Operating', reference: '', notes: '' });
  };

  const totalCashOut = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const todaysCashOut = expenses
    .filter(e => e.date === new Date().toISOString().split('T')[0])
    .reduce((sum, expense) => sum + expense.amount, 0);

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
          Cash Out Management
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            background: theme.cardBg,
            borderRadius: '12px',
            padding: '20px',
            border: `1px solid ${theme.border}`,
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#ef4444',
              marginBottom: '8px'
            }}>
              ${totalCashOut.toLocaleString()}
            </div>
            <div style={{
              fontSize: '14px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Total Cash Out
            </div>
          </div>

          <div style={{
            background: theme.cardBg,
            borderRadius: '12px',
            padding: '20px',
            border: `1px solid ${theme.border}`,
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: theme.accent,
              marginBottom: '8px'
            }}>
              ${todaysCashOut.toLocaleString()}
            </div>
            <div style={{
              fontSize: '14px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Today's Cash Out
            </div>
          </div>
        </div>

        {/* Add Expense Form */}
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
            Record Cash Out
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              required
              step="0.01"
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
              placeholder="Recipient/Description"
              value={formData.recipient}
              onChange={(e) => handleInputChange('recipient', e.target.value)}
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
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '16px',
            marginBottom: '16px'
          }}>
            <input
              type="text"
              placeholder="Reference (Optional)"
              value={formData.reference}
              onChange={(e) => handleInputChange('reference', e.target.value)}
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
              placeholder="Notes (Optional)"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
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

          <button
            type="submit"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Record Cash Out
          </button>
        </form>

        {/* Expenses List */}
        <div style={{
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px',
            borderBottom: `1px solid ${theme.border}`,
            background: theme.bg
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: theme.text,
              margin: 0
            }}>
              Recent Cash Out Transactions
            </h3>
          </div>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {expenses.map((expense) => (
              <div
                key={expense.id}
                style={{
                  padding: '16px',
                  borderBottom: `1px solid ${theme.border}`,
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.bg;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: theme.text,
                      margin: '0 0 4px 0'
                    }}>
                      {expense.recipient}
                    </h4>
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      fontSize: '12px',
                      color: theme.textSecondary
                    }}>
                      <span>Category: {expense.category}</span>
                      <span>Date: {new Date(expense.date).toLocaleDateString()}</span>
                      {expense.reference && <span>Ref: {expense.reference}</span>}
                    </div>
                    {expense.notes && (
                      <p style={{
                        fontSize: '13px',
                        color: theme.textSecondary,
                        margin: '4px 0 0 0'
                      }}>
                        {expense.notes}
                      </p>
                    )}
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#ef4444',
                    marginLeft: '16px'
                  }}>
                    -${expense.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashOut;
