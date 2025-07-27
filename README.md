# Expo App with Backend Integration

This Expo app is integrated with your deployed backend on Render and includes database functionality.

## 🚀 Features

- **Backend Integration**: Connected to your Render-deployed backend
- **Database Operations**: Full CRUD operations with caching
- **Authentication**: User login, registration, and session management
- **Billing System**: Complete invoice management with PDF generation
- **Dashboard**: Real-time analytics and data visualization
- **Responsive Design**: Works on web, mobile, and tablet

## 📁 Project Structure

```
my-expo-app/
├── components/          # React components
│   ├── Billing.jsx     # Invoice management
│   ├── Dashboard.jsx   # Dashboard component
│   ├── Navbar.jsx      # Navigation bar
│   └── Sidebar.jsx     # Sidebar navigation
├── services/           # API services
│   ├── api.js         # Base API service
│   ├── authService.js # Authentication service
│   ├── billingService.js # Billing operations
│   └── databaseService.js # Database operations
├── context/           # React context
│   └── AppContext.js  # Global state management
├── config/           # Configuration
│   └── config.js     # Environment settings
└── App.js           # Main app component
```

## ⚙️ Setup Instructions

### 1. Configure Backend URL

Update your backend URL in `config/config.js`:

```javascript
// Replace with your actual Render URL
API_BASE_URL: 'https://your-backend.onrender.com'
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://your-backend.onrender.com
NODE_ENV=development
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm start
```

## 🔧 Backend Integration

### API Endpoints

The app expects these endpoints from your backend:

#### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

#### Billing
- `GET /invoices` - Get all invoices
- `GET /invoices/:id` - Get single invoice
- `POST /invoices` - Create invoice
- `PUT /invoices/:id` - Update invoice
- `DELETE /invoices/:id` - Delete invoice
- `GET /invoices/:id/pdf` - Generate PDF
- `POST /invoices/:id/send` - Send invoice

#### Customers
- `GET /customers` - Get all customers
- `POST /customers` - Create customer
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer

#### Dashboard
- `GET /dashboard` - Get dashboard data
- `GET /analytics` - Get analytics data

### Database Models

The app works with these data models:

#### User Model
```javascript
{
  id: String,
  name: String,
  email: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Invoice Model
```javascript
{
  id: String,
  number: String,
  date: Date,
  dueDate: Date,
  customer: Object,
  items: Array,
  subtotal: Number,
  taxAmount: Number,
  total: Number,
  status: String,
  userId: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Customer Model
```javascript
{
  id: String,
  name: String,
  email: String,
  phone: String,
  address: String,
  gstin: String,
  userId: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Usage

### Authentication

```javascript
import { useApp } from './context/AppContext';

const { login, logout, register, user, isAuthenticated } = useApp();

// Login
await login({ email: 'user@example.com', password: 'password' });

// Register
await register({ name: 'John Doe', email: 'john@example.com', password: 'password' });

// Logout
await logout();
```

### Billing Operations

```javascript
import { useApp } from './context/AppContext';

const { loadInvoices, createInvoice, updateInvoice, deleteInvoice } = useApp();

// Load invoices
await loadInvoices({ page: 1, limit: 10 });

// Create invoice
const invoice = await createInvoice({
  customer: { name: 'Customer Name', email: 'customer@example.com' },
  items: [{ description: 'Service', quantity: 1, rate: 100 }],
  date: new Date(),
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
});

// Update invoice
await updateInvoice(invoiceId, updatedData);

// Delete invoice
await deleteInvoice(invoiceId);
```

### Database Operations

```javascript
import databaseService from './services/databaseService';

// Generic CRUD
const users = await databaseService.read('users');
const user = await databaseService.create('users', userData);
await databaseService.update('users', userId, updatedData);
await databaseService.delete('users', userId);

// Search
const results = await databaseService.search('users', 'john');

// Dashboard data
const dashboardData = await databaseService.getDashboardData();
```

## 🔒 Security

- JWT token authentication
- Automatic token refresh
- Secure API communication
- Input validation
- Error handling

## 📱 Platform Support

- **Web**: Full functionality with react-dom
- **Mobile**: React Native components
- **Tablet**: Responsive design

## 🚀 Deployment

### Web Deployment
```bash
npm run build
```

### Mobile Deployment
```bash
expo build:android
expo build:ios
```

## 🔧 Troubleshooting

### Connection Issues
1. Check your backend URL in `config/config.js`
2. Ensure your backend is running on Render
3. Verify CORS settings on your backend
4. Check network connectivity

### Authentication Issues
1. Verify JWT token format
2. Check token expiration
3. Ensure proper error handling

### Database Issues
1. Check database connection
2. Verify model schemas
3. Check API endpoint responses

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify your backend is running
3. Test API endpoints directly
4. Check network connectivity

## 🔄 Updates

To update the app:
1. Pull latest changes
2. Update dependencies: `npm install`
3. Restart development server: `npm start`
4. Test all functionality

---

**Note**: Make sure your backend is properly deployed on Render and all endpoints are working before testing the app. 