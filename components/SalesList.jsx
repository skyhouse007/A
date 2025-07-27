'use dom'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../hooks/useAxios.js";
import salesService from "../services/salesService.js";
import "../styles/sales.css";
import {
  TrendingUp,
  Search,
  Filter,
  Download,
  RefreshCw,
  Calendar,
  User,
  ShoppingCart,
  DollarSign,
  FileText,
  ChevronDown,
  ChevronUp,
  Receipt,
  Building,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  MessageSquare,
  Target,
} from "lucide-react";

const SalesList = ({ sales: propSales, fetchAllData }) => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("all");
  const axios = useAxios();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    console.log("SalesList propSales:", propSales, "Type:", typeof propSales, "IsArray:", Array.isArray(propSales));
    if (propSales && Array.isArray(propSales)) {
      setSales(propSales);
      setLoading(false);
    } else if (!propSales) {
      fetchSales();
    }
  }, [propSales]);

  useEffect(() => {
    filterSales();
  }, [sales, searchTerm, filterType, dateRange]);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const data = await salesService.getSales();
      // Handle the response structure from backend
      const salesData = data.sales || data || [];
      setSales(salesData);
      console.log("Fetched sales data:", salesData);
    } catch (err) {
      console.error("Failed to fetch sales:", err);
      setSales([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const filterSales = () => {
    // Ensure sales is an array
    const salesArray = Array.isArray(sales) ? sales : [];
    let filtered = [...salesArray];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (sale) =>
          sale.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sale.customerPhone.includes(searchTerm) ||
          sale.items.some((item) =>
            (item.name || item.description || "")
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Type filter
    if (filterType === "gst") {
      filtered = filtered.filter((sale) => sale.isGST);
    } else if (filterType === "non-gst") {
      filtered = filtered.filter((sale) => !sale.isGST);
    }

    // Date filter
    if (dateRange !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateRange) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter((sale) => new Date(sale.date) >= filterDate);
    }

    setFilteredSales(filtered);
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  const handleDownloadPDF = async (saleId) => {
    try {
      const response = await salesService.generatePDF(saleId);
      
      // Create blob and download
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${saleId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download PDF:", err);
    }
  };

  const handleDeleteSale = async (saleId) => {
    if (!window.confirm('Are you sure you want to delete this sale?')) return;
    setDeleting(true);
    try {
      await salesService.deleteSale(saleId);
      setSales((prev) => prev.filter((s) => s._id !== saleId));
      setFilteredSales((prev) => prev.filter((s) => s._id !== saleId));
    } catch (err) {
      alert('Failed to delete sale.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Are you sure you want to delete ALL filtered sales? This cannot be undone.')) return;
    setDeleting(true);
    try {
      const ids = filteredSales.map(sale => sale._id);
      await salesService.bulkDeleteSales(ids);
      setSales((prev) => prev.filter((s) => !filteredSales.some(fs => fs._id === s._id)));
      setFilteredSales([]);
    } catch (err) {
      alert('Failed to delete all sales.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  // Calculate analytics
  const salesArray = Array.isArray(sales) ? sales : [];
  const gstSales = salesArray.filter((s) => s.isGST);
  const nonGstSales = salesArray.filter((s) => !s.isGST);

  const totalSales = salesArray.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);
  const gstTotal = gstSales.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);
  const nonGstTotal = nonGstSales.reduce(
    (sum, sale) => sum + (sale.totalAmount || 0),
    0,
  );

  const todaySales = salesArray.filter((sale) => {
    const today = new Date();
    const saleDate = new Date(sale.date || sale.saleDate);
    return saleDate.toDateString() === today.toDateString();
  });

  const todayRevenue = todaySales.reduce(
    (sum, sale) => sum + (sale.totalAmount || 0),
    0,
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="ai-card p-8 text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading sales data...
          </p>
        </div>
      </div>
    );
  }

  const renderSaleCard = (sale, idx, type) => {
    const isExpanded = expandedIndex === `${type}-${idx}`;

    return (
      <motion.div
        key={`${type}-${idx}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.05 }}
        className="ai-card p-6 hover:scale-[1.02] transition-all duration-300 group"
      >
        <div
          className="cursor-pointer"
          onClick={() => setExpandedIndex(isExpanded ? null : `${type}-${idx}`)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${sale.isGST ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-blue-500 to-blue-600"} flex items-center justify-center shadow-lg`}
              >
                {sale.isGST ? (
                  <Receipt className="w-5 h-5 text-white" />
                ) : (
                  <FileText className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {sale.customerName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {sale.customerPhone}
                </p>
                {sale.customerEmail && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {sale.customerEmail}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                ₹{sale.totalAmount?.toLocaleString() || "0"}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(sale.saleDate || sale.date)}
              </div>
              {sale.invoiceNumber && (
                <div className="text-xs text-gray-400">
                  Invoice: {sale.invoiceNumber}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  sale.isGST
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                }`}
              >
                {sale.isGST ? "GST Bill" : "Non-GST Bill"}
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                {sale.items?.length || 0} item{(sale.items?.length || 0) > 1 ? "s" : ""}
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                {sale.paymentMethod || "Cash"}
              </div>

              <div
                className={`px-2 py-1 rounded text-xs font-medium ${
                  sale.status === "Delivered" 
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : sale.status === "Cancelled"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                    : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                }`}
              >
                {sale.status || "Pending"}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadPDF(sale._id);
                }}
                className="btn-ai-ghost text-sm p-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSale(sale._id);
                }}
                className="btn-ai-ghost text-sm p-2 text-red-600"
                disabled={deleting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete
              </motion.button>

              <div className="text-gray-400">
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Customer Details
                  </h4>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-gray-600 dark:text-gray-400">
                          Address
                        </div>
                        <div className="text-gray-900 dark:text-white">
                          {sale.customerAddress || "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Building className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-gray-600 dark:text-gray-400">
                          GST Number
                        </div>
                        <div className="text-gray-900 dark:text-white">
                          {sale.customerGSTNo || "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Truck className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-gray-600 dark:text-gray-400">
                          Delivery Date
                        </div>
                        <div className="text-gray-900 dark:text-white">
                          {sale.deliveryDate
                            ? formatDate(sale.deliveryDate)
                            : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-gray-600 dark:text-gray-400">
                          Transport Cost
                        </div>
                        <div className="text-gray-900 dark:text-white">
                          ₹{sale.transportCost || 0}
                        </div>
                      </div>
                    </div>

                    {sale.note && (
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-gray-600 dark:text-gray-400">
                            Note
                          </div>
                          <div className="text-gray-900 dark:text-white">
                            {sale.note}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Items ({sale.items.length})
                  </h4>

                  <div className="ai-table max-h-64 overflow-y-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left text-xs">Product</th>
                          <th className="text-center text-xs">Qty</th>
                          <th className="text-right text-xs">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sale.items.map((item, i) => (
                          <tr key={i}>
                            <td className="text-sm">
                              {item.name || item.description}
                            </td>
                            <td className="text-center text-sm">
                              {item.quantity}
                            </td>
                            <td className="text-right text-sm font-medium">
                              ₹{item.amount.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                      <span>Total Amount:</span>
                      <span>₹{sale.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
          <div className="relative ai-card-elevated p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold gradient-text-neural">
                    Sales Analytics
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Comprehensive sales management & insights
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  className="btn-ai-ghost flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchSales}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </motion.button>

                <motion.button
                  className="btn-ai-primary flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Receipt className="w-4 h-4" />
                  <span>New Sale</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Sales",
              value: `₹${totalSales.toLocaleString()}`,
              icon: DollarSign,
              color: "green",
              trend: "+12%",
              description: "All time revenue",
            },
            {
              label: "Today's Sales",
              value: `₹${todayRevenue.toLocaleString()}`,
              icon: Target,
              color: "blue",
              trend: "+8%",
              description: `${todaySales.length} transactions`,
            },
            {
              label: "GST Sales",
              value: `₹${gstTotal.toLocaleString()}`,
              icon: Receipt,
              color: "purple",
              trend: "+15%",
              description: `${gstSales.length} GST bills`,
            },
            {
              label: "Non-GST Sales",
              value: `₹${nonGstTotal.toLocaleString()}`,
              icon: FileText,
              color: "orange",
              trend: "+5%",
              description: `${nonGstSales.length} regular bills`,
            },
          ].map((metric, index) => {
            const MetricIcon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="metric-card group"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-r ${
                      metric.color === "green"
                        ? "from-green-500 to-green-600"
                        : metric.color === "blue"
                          ? "from-blue-500 to-blue-600"
                          : metric.color === "purple"
                            ? "from-purple-500 to-purple-600"
                            : "from-orange-500 to-orange-600"
                    } flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <MetricIcon className="w-5 h-5 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      metric.trend.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {metric.trend}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {metric.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="ai-card p-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search and Filters */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search sales..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ai-input pl-10 pr-4"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="ai-select"
              >
                <option value="all">All Sales</option>
                <option value="gst">GST Bills</option>
                <option value="non-gst">Non-GST Bills</option>
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="ai-select"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              {fetchAllData && (
                <button
                  onClick={() => {
                    setLoading(true);
                    fetchAllData().finally(() => setLoading(false));
                  }}
                  className="btn-ai-ghost text-sm p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  title="Refresh sales data"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredSales.length} of {sales.length} sales
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delete All Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleDeleteAll}
            disabled={deleting || filteredSales.length === 0}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm font-medium"
          >
            {deleting ? 'Deleting...' : 'Delete All'}
          </button>
        </div>

        {/* Sales Lists */}
        <div className="space-y-8">
          {/* GST Sales */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                <Receipt className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                GST Bills
              </h2>
              <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full text-sm font-medium text-green-700 dark:text-green-400">
                {filteredSales.filter((s) => s.isGST).length} bills
              </div>
            </div>

            <div className="space-y-4">
              {filteredSales
                .filter((s) => s.isGST)
                .map((sale, idx) => renderSaleCard(sale, idx, "gst"))}

              {filteredSales.filter((s) => s.isGST).length === 0 && (
                <div className="ai-card p-12 text-center">
                  <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No GST Bills Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchTerm
                      ? `No GST bills match "${searchTerm}"`
                      : "No GST bills available"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Non-GST Sales */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Non-GST Bills
              </h2>
              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-400">
                {filteredSales.filter((s) => !s.isGST).length} bills
              </div>
            </div>

            <div className="space-y-4">
              {filteredSales
                .filter((s) => !s.isGST)
                .map((sale, idx) => renderSaleCard(sale, idx, "non"))}

              {filteredSales.filter((s) => !s.isGST).length === 0 && (
                <div className="ai-card p-12 text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Non-GST Bills Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchTerm
                      ? `No non-GST bills match "${searchTerm}"`
                      : "No non-GST bills available"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesList;