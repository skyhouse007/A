import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { ChevronDown, ChevronUp, Filter, Search, Download, Eye, Edit, Trash2 } from "lucide-react";

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    vendorName: "",
    startDate: "",
    endDate: "",
    gstType: "all", // Add GST filter
  });
  const [sortBy, setSortBy] = useState("purchaseDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState({});
  const [deleting, setDeleting] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    fetchPurchases();
    fetchStats();
  }, [currentPage, filters, sortBy, sortOrder]);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        sortBy,
        sortOrder,
        ...filters,
      });

      const res = await axios.get(`/purchases?${params}`);
      
      // Handle different response formats
      if (res.data.purchases) {
        setPurchases(res.data.purchases);
        setTotalPages(res.data.totalPages || 1);
      } else if (Array.isArray(res.data)) {
        setPurchases(res.data);
        setTotalPages(1);
      } else {
        setPurchases([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Failed to load purchases", err);
      setPurchases([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("/purchases/stats/summary");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this purchase?")) return;
    
    try {
      await axios.delete(`/purchases/${id}`);
      fetchPurchases();
      fetchStats();
    } catch (err) {
      console.error("Failed to delete purchase", err);
      alert("Failed to delete purchase");
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Are you sure you want to delete ALL listed purchases? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await Promise.all(purchases.map(p => axios.delete(`/purchases/${p._id}`)));
      setPurchases([]);
      setTotalPages(1);
    } catch (err) {
      alert('Failed to delete all purchases.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-IN');
    } catch {
      return 'Invalid Date';
    }
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Ordered': 'bg-blue-100 text-blue-800',
      'In Transit': 'bg-orange-100 text-orange-800',
      'Received': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    const colors = {
      'Pending': 'bg-red-100 text-red-800',
      'Partial': 'bg-yellow-100 text-yellow-800',
      'Paid': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Purchase Management</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Purchases</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.summary?.totalPurchases || 0}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.summary?.totalAmount || 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total GST</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.summary?.totalGST || 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Purchase</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.summary?.avgPurchaseValue || 0)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
          <button
            onClick={() => setFilters({ status: "", vendorName: "", startDate: "", endDate: "", gstType: "all" })}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Ordered">Ordered</option>
              <option value="In Transit">In Transit</option>
              <option value="Received">Received</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vendor Name</label>
            <input
              type="text"
              value={filters.vendorName}
              onChange={(e) => handleFilterChange('vendorName', e.target.value)}
              placeholder="Search vendor..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GST Type</label>
            <select
              value={filters.gstType}
              onChange={(e) => handleFilterChange('gstType', e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Purchases</option>
              <option value="gst">GST Bills</option>
              <option value="non-gst">Non-GST Bills</option>
            </select>
          </div>
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border dark:border-gray-700 overflow-hidden">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleDeleteAll}
            disabled={deleting || purchases.length === 0}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm font-medium"
          >
            {deleting ? 'Deleting...' : 'Delete All'}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Purchase Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('vendorName')}
                    className="flex items-center hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    Vendor
                    {sortBy === 'vendorName' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('purchaseDate')}
                    className="flex items-center hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    Date
                    {sortBy === 'purchaseDate' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('totalAmount')}
                    className="flex items-center hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    Amount
                    {sortBy === 'totalAmount' && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No purchases found
                  </td>
                </tr>
              ) : (
                purchases.map((purchase) => (
                  <React.Fragment key={purchase._id}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleExpand(purchase._id)}
                            className="mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {expanded[purchase._id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {purchase.invoiceNumber || `PO-${purchase._id.slice(-6)}`}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {purchase.items?.length || 0} items
                            </div>
                            <div className="text-xs">
                              <span className={`px-2 py-1 rounded-full ${
                                purchase.isGST 
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              }`}>
                                {purchase.isGST ? "GST" : "Non-GST"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{purchase.vendorName || 'N/A'}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{purchase.vendorContact || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {formatDate(purchase.purchaseDate)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(purchase.totalAmount)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Base: {formatCurrency(purchase.totalCost)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(purchase.status)}`}>
                          {purchase.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(purchase.paymentStatus)}`}>
                          {purchase.paymentStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => toggleExpand(purchase._id)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            title="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(purchase._id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Details */}
                    {expanded[purchase._id] && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                          <div className="space-y-4">
                            {/* Purchase Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Purchase Information</h4>
                                <div className="space-y-1 text-sm">
                                  <div><span className="font-medium">Invoice:</span> {purchase.invoiceNumber || 'N/A'}</div>
                                  <div><span className="font-medium">PO Number:</span> {purchase.purchaseOrderNumber || 'N/A'}</div>
                                  <div><span className="font-medium">Expected Delivery:</span> {purchase.expectedDeliveryDate ? formatDate(purchase.expectedDeliveryDate) : 'N/A'}</div>
                                  <div><span className="font-medium">Payment Method:</span> {purchase.paymentMethod}</div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Vendor Details</h4>
                                <div className="space-y-1 text-sm">
                                  <div><span className="font-medium">GST No:</span> {purchase.vendorGSTNo || 'N/A'}</div>
                                  <div><span className="font-medium">Address:</span> {purchase.vendorAddress || 'N/A'}</div>
                                  <div><span className="font-medium">Email:</span> {purchase.vendorEmail || 'N/A'}</div>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Financial Summary</h4>
                                <div className="space-y-1 text-sm">
                                  <div><span className="font-medium">Base Amount:</span> {formatCurrency(purchase.totalCost)}</div>
                                  <div><span className="font-medium">GST Amount:</span> {formatCurrency(purchase.totalGSTAmount)}</div>
                                  <div><span className="font-medium">Purchase Total:</span> {formatCurrency(purchase.totalAmount)}</div>
                                  <div><span className="font-medium">Transport Cost:</span> {formatCurrency(purchase.transportCost)} <span className="text-xs text-gray-500">(separate expense)</span></div>
                                  <div><span className="font-medium">Grand Total:</span> {formatCurrency(purchase.totalAmount + purchase.transportCost)}</div>
                                </div>
                              </div>
                            </div>

                            {/* GST Details */}
                            {purchase.isGST && (
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">GST Breakdown</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                                    <div className="font-medium text-blue-900 dark:text-blue-300">CGST ({purchase.cgst}%)</div>
                                    <div className="text-blue-700 dark:text-blue-400">{formatCurrency(purchase.items?.reduce((sum, item) => sum + (item.cgstAmount || 0), 0) || 0)}</div>
                                  </div>
                                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                    <div className="font-medium text-green-900 dark:text-green-300">SGST ({purchase.sgst}%)</div>
                                    <div className="text-green-700 dark:text-green-400">{formatCurrency(purchase.items?.reduce((sum, item) => sum + (item.sgstAmount || 0), 0) || 0)}</div>
                                  </div>
                                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded">
                                    <div className="font-medium text-purple-900 dark:text-purple-300">IGST ({purchase.igst}%)</div>
                                    <div className="text-purple-700 dark:text-purple-400">{formatCurrency(purchase.items?.reduce((sum, item) => sum + (item.igstAmount || 0), 0) || 0)}</div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Items Table */}
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Items</h4>
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                  <thead className="bg-gray-100 dark:bg-gray-600">
                                    <tr>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Item</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Material</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Price</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Variations</th>
                                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Total</th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {purchase.items?.map((item, idx) => (
                                      <tr key={idx}>
                                        <td className="px-3 py-2">
                                          <div className="flex items-center">
                                            {item.photoURL && (
                                              <img 
                                                src={`/uploads/${item.photoURL}`} 
                                                alt={item.name}
                                                className="w-8 h-8 rounded mr-2"
                                              />
                                            )}
                                            <div>
                                              <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                                              <div className="text-xs text-gray-500 dark:text-gray-400">Code: {item.uniqueCode}</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{item.material}</td>
                                        <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{formatCurrency(item.price)}</td>
                                        <td className="px-3 py-2">
                                          <div className="space-y-1">
                                            {item.variations?.map((variation, vIdx) => (
                                              <div key={vIdx} className="text-xs">
                                                <span className="font-medium">{variation.color}:</span> {variation.quantity} pcs
                                                <span className="ml-2 text-gray-500 dark:text-gray-400">
                                                  ({formatCurrency(variation.totalAmount)})
                                                </span>
                                              </div>
                                            ))}
                                          </div>
                                        </td>
                                        <td className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white">
                                          {formatCurrency(item.totalAmount)}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* Notes */}
                            {purchase.notes && (
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Notes</h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 p-3 rounded">{purchase.notes}</p>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseList;
