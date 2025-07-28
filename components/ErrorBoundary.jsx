'use dom'

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '500px',
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#dc3545',
              marginBottom: '16px'
            }}>Something went wrong</h1>
            <p style={{
              fontSize: '16px',
              color: '#6c757d',
              marginBottom: '24px',
              lineHeight: '1.5'
            }}>
              The app encountered an unexpected error. Please try again.
            </p>
            {this.state.error && (
              <pre style={{
                fontSize: '12px',
                color: '#6c757d',
                marginBottom: '24px',
                padding: '12px',
                backgroundColor: '#e9ecef',
                borderRadius: '8px',
                fontFamily: 'monospace',
                textAlign: 'left',
                overflow: 'auto'
              }}>
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleRetry}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}



export default ErrorBoundary;
