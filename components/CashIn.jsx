'use dom'
import React, { useState } from 'react';

const CashIn = ({ theme }) => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      amount: 5000,
      source: 'Client Payment - ABC Corp',
      category: 'Revenue',
      date: '2024-01-15',
      reference: 'INV-001',
      notes: 'Website development payment'
    },
    {
      id: 2,
      amount: 2500,
      source: 'Service Payment - Tech Solutions',
      category: 'Revenue',
      date: '2024-01-14',
      reference: 'INV-002',
      notes: 'Monthly retainer fee'
    },
    {
      id: 3,
      amount: 1200,
      source: 'Investment Return',
      category: 'Investment',
      date: '2024-01-13',
      reference: 'DIV-001',
      notes: 'Quarterly dividend payment'
    }
  ]);

  const [formData, setFormData] = useState({
    amount: '',
    source: '',
    category: 'Revenue',
    reference: '',
    notes: ''
  });

  const categories = ['Revenue', 'Investment', 'Loan', 'Grant', 'Other'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setFormData({ amount: '', source: '', category: 'Revenue', reference: '', notes: '' });
  };

  const totalCashIn = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const todaysCashIn = transactions
    .filter(t => t.date === new Date().toISOString().split('T')[0])
    .reduce((sum, transaction) => sum + transaction.amount, 0);

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
          Cash In Management
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
              color: '#10b981',
              marginBottom: '8px'
            }}>
              ${totalCashIn.toLocaleString()}
            </div>
            <div style={{
              fontSize: '14px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Total Cash In
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
              ${todaysCashIn.toLocaleString()}
            </div>
            <div style={{
              fontSize: '14px',
              color: theme.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Today's Cash In
            </div>
          </div>
        </div>

        {/* Add Transaction Form */}
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
            Record Cash In
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
              placeholder="Source"
              value={formData.source}
              onChange={(e) => handleInputChange('source', e.target.value)}
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
              background: '#10b981',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Record Cash In
          </button>
        </form>

        {/* Transactions List */}
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
              Recent Cash In Transactions
            </h3>
          </div>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
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
                      {transaction.source}
                    </h4>
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      fontSize: '12px',
                      color: theme.textSecondary
                    }}>
                      <span>Category: {transaction.category}</span>
                      <span>Date: {new Date(transaction.date).toLocaleDateString()}</span>
                      {transaction.reference && <span>Ref: {transaction.reference}</span>}
                    </div>
                    {transaction.notes && (
                      <p style={{
                        fontSize: '13px',
                        color: theme.textSecondary,
                        margin: '4px 0 0 0'
                      }}>
                        {transaction.notes}
                      </p>
                    )}
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#10b981',
                    marginLeft: '16px'
                  }}>
                    +${transaction.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {transactions.length === 0 && (
          <div style={{
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: theme.textSecondary,
              marginBottom: '8px'
            }}>
              No cash in transactions yet
            </div>
            <div style={{
              fontSize: '14px',
              color: theme.textSecondary
            }}>
              Record your first cash in transaction above
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CashIn;
