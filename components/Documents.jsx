'use dom'
import React, { useState } from 'react';

const Documents = ({ theme }) => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Business Plan 2024.pdf',
      type: 'PDF',
      size: '2.4 MB',
      category: 'Business',
      uploadDate: '2024-01-15',
      tags: ['strategy', 'planning']
    },
    {
      id: 2,
      name: 'Financial Report Q4.xlsx',
      type: 'Excel',
      size: '1.8 MB',
      category: 'Finance',
      uploadDate: '2024-01-14',
      tags: ['finance', 'quarterly']
    },
    {
      id: 3,
      name: 'Employee Handbook.docx',
      type: 'Word',
      size: '956 KB',
      category: 'HR',
      uploadDate: '2024-01-13',
      tags: ['hr', 'policies']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Business', 'Finance', 'HR', 'Legal', 'Marketing'];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'excel': return '📊';
      case 'word': return '📝';
      case 'image': return '🖼️';
      default: return '📁';
    }
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
          Document Management
        </h1>

        {/* Search and Filter */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '12px'
        }}>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Upload Area */}
        <div style={{
          background: theme.cardBg,
          border: `2px dashed ${theme.border}`,
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
          marginBottom: '24px',
          cursor: 'pointer',
          transition: 'border-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = theme.accent;
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = theme.border;
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            📤
          </div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: theme.text,
            marginBottom: '8px'
          }}>
            Upload Documents
          </h3>
          <p style={{
            fontSize: '14px',
            color: theme.textSecondary,
            marginBottom: '16px'
          }}>
            Drag and drop files here or click to browse
          </p>
          <button style={{
            padding: '10px 20px',
            borderRadius: '8px',
            background: theme.accent,
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Choose Files
          </button>
        </div>

        {/* Documents Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  {getFileIcon(doc.type)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: theme.text,
                    margin: '0 0 4px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {doc.name}
                  </h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: theme.textSecondary
                  }}>
                    <span>{doc.type}</span>
                    <span>{doc.size}</span>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: theme.bg,
                  fontSize: '12px',
                  color: theme.textSecondary
                }}>
                  {doc.category}
                </span>
                <span style={{
                  fontSize: '12px',
                  color: theme.textSecondary
                }}>
                  {new Date(doc.uploadDate).toLocaleDateString()}
                </span>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px'
              }}>
                {doc.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: `${theme.accent}20`,
                      color: theme.accent,
                      fontSize: '11px',
                      fontWeight: '500'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div style={{
            background: theme.cardBg,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>
              📂
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: theme.textSecondary,
              marginBottom: '8px'
            }}>
              No documents found
            </h3>
            <p style={{
              fontSize: '14px',
              color: theme.textSecondary
            }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
