'use dom'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../hooks/useAxios.js";
import inventoryService from "../services/inventoryService.js";
import "../styles/inventory.css";
import {
  Package,
  Search,
  Filter,
  Download,
  RefreshCw,
  Trash2,
  Eye,
  Edit3,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Plus,
  Grid,
  List,
  Image as ImageIcon,
  Tag,
  DollarSign,
  Layers,
  Bot,
  Sparkles,
  Target,
} from "lucide-react";

const InventoryList = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("table"); // table or grid
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [deleting, setDeleting] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    filterData();
  }, [inventoryData, searchTerm, selectedFilter]);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getInventory();
      
      // Handle different response formats
      let inventoryData = data;
      if (data.inventory) {
        inventoryData = data.inventory;
      } else if (data.items) {
        inventoryData = data.items;
      }
      
      // Ensure data is an array
      if (Array.isArray(inventoryData)) {
        setInventoryData(inventoryData);
      } else {
        console.error("Invalid inventory data format:", inventoryData);
        setInventoryData([]);
      }
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
      setInventoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    // Ensure inventoryData is an array
    if (!Array.isArray(inventoryData)) {
      setFilteredData([]);
      return;
    }

    let filtered = inventoryData.filter(
      (item) => {
        const searchLower = searchTerm.toLowerCase();
        const productName = (item.productName || item.name || '').toLowerCase();
        const material = (item.material || '').toLowerCase();
        const uniqueCode = (item.uniqueCode || '').toLowerCase();
        
        return productName.includes(searchLower) ||
               material.includes(searchLower) ||
               uniqueCode.includes(searchLower);
      }
    );

    if (selectedFilter === "low-stock") {
      filtered = filtered.filter((item) => {
        const totalStock =
          item.variations?.reduce(
            (sum, v) => sum + (parseFloat(v.quantity) || 0),
            0,
          ) ||
          item.currentStock ||
          0;
        return totalStock < 10;
      });
    } else if (selectedFilter === "out-of-stock") {
      filtered = filtered.filter((item) => {
        const totalStock =
          item.variations?.reduce(
            (sum, v) => sum + (parseFloat(v.quantity) || 0),
            0,
          ) ||
          item.currentStock ||
          0;
        return totalStock === 0;
      });
    }

    setFilteredData(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await inventoryService.deleteInventoryItem(id);
        setInventoryData((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        alert("Failed to delete item.");
        console.error("Delete error:", error);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Are you sure you want to delete ALL listed inventory items? This cannot be undone.')) return;
    setDeleting(true);
    try {
      const ids = filteredData.map(item => item._id);
      await inventoryService.bulkDeleteInventoryItems(ids);
      setInventoryData((prev) => prev.filter((item) => !filteredData.some(f => f._id === item._id)));
      setFilteredData([]);
    } catch (err) {
      alert('Failed to delete all inventory items.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0)
      return {
        status: "Out of Stock",
        color: "red",
        bg: "bg-red-50 dark:bg-red-900/20",
      };
    if (stock < 10)
      return {
        status: "Low Stock",
        color: "yellow",
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
      };
    return {
      status: "In Stock",
      color: "green",
      bg: "bg-green-50 dark:bg-green-900/20",
    };
  };

  const totalItems = Array.isArray(inventoryData) ? inventoryData.length : 0;
  const totalQuantity = Array.isArray(inventoryData) ? inventoryData.reduce(
    (sum, item) =>
      sum +
      (item.variations?.reduce(
        (vSum, v) => vSum + (parseFloat(v.quantity) || 0),
        0,
      ) ||
        item.currentStock ||
        0),
    0,
  ) : 0;

  const totalValue = Array.isArray(inventoryData) ? inventoryData.reduce((sum, item) => {
    const itemStock =
      item.variations?.reduce(
        (vSum, v) => vSum + (parseFloat(v.quantity) || 0),
        0,
      ) ||
      item.currentStock ||
      0;
    return sum + itemStock * (item.unitPrice || 0);
  }, 0) : 0;

  const lowStockItems = Array.isArray(inventoryData) ? inventoryData.filter((item) => {
    const stock =
      item.variations?.reduce(
        (vSum, v) => vSum + (parseFloat(v.quantity) || 0),
        0,
      ) ||
      item.currentStock ||
      0;
    return stock < 10 && stock > 0;
  }).length : 0;

  const outOfStockItems = Array.isArray(inventoryData) ? inventoryData.filter((item) => {
    const stock =
      item.variations?.reduce(
        (vSum, v) => vSum + (parseFloat(v.quantity) || 0),
        0,
      ) ||
      item.currentStock ||
      0;
    return stock === 0;
  }).length : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="ai-card p-8 text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading inventory data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
          <div className="relative ai-card-elevated p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold gradient-text-neural">
                    Smart Inventory
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    AI-powered inventory management system
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  className="btn-ai-ghost flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchInventory}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </motion.button>

                <motion.button
                  className="btn-ai-primary flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Items",
              value: totalItems,
              icon: Package,
              color: "blue",
              trend: "+12%",
              description: "Active products",
            },
            {
              label: "Total Quantity",
              value: totalQuantity.toLocaleString(),
              icon: Layers,
              color: "green",
              trend: "+8%",
              description: "Units in stock",
            },
            {
              label: "Inventory Value",
              value: `₹${totalValue.toLocaleString()}`,
              icon: DollarSign,
              color: "purple",
              trend: "+15%",
              description: "Total stock value",
            },
            {
              label: "Low Stock Alerts",
              value: lowStockItems + outOfStockItems,
              icon: AlertTriangle,
              color: "red",
              trend: "-3%",
              description: "Items need attention",
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
                      metric.color === "blue"
                        ? "from-blue-500 to-blue-600"
                        : metric.color === "green"
                          ? "from-green-500 to-green-600"
                          : metric.color === "purple"
                            ? "from-purple-500 to-purple-600"
                            : "from-red-500 to-red-600"
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

        {/* Search and Filter Controls */}
        <div className="ai-card p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Items</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-colors ${
                  viewMode === "table"
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "text-gray-500"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "text-gray-500"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
          </div>
        </div>

        {/* Inventory List */}
        <AnimatePresence mode="wait">
          {viewMode === "table" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="ai-card overflow-hidden"
            >
              <div className="overflow-x-auto">
              <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Variations
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Value
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                  </tr>
                </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {Array.isArray(filteredData) && filteredData.map((item, index) => {
                    const totalStock =
                      item.variations?.reduce(
                        (sum, v) => sum + (parseFloat(v.quantity) || 0),
                        0,
                      ) ||
                      item.currentStock ||
                      0;
                    const stockInfo = getStockStatus(totalStock);
                    const itemValue = totalStock * (item.unitPrice || 0);

                    return (
                      <motion.tr
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                          className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                          <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                              {item.photo ? (
                                <img
                                  src={`https://erpwebsite.onrender.com/uploads/${item.photo}`}
                                    alt={item.productName || item.name || 'Product'}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <ImageIcon className="w-6 h-6 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                  {item.productName || item.name || 'Unnamed Product'}
                              </div>
                              {item.uniqueCode && (
                                <div className="text-xs text-blue-500 flex items-center gap-1">
                                  <Tag className="w-3 h-3" />
                                  {item.uniqueCode}
                                </div>
                              )}
                                {item.barcode && (
                                  <div className="text-xs text-green-500 flex items-center gap-1">
                                    <Bot className="w-3 h-3" />
                                    Barcode Available
                                  </div>
                                )}
                              </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-gray-700 dark:text-gray-300">
                            {item.material || "-"}
                          </span>
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-1">
                            {item.variations?.map((variation, vIndex) => (
                              <span
                                key={vIndex}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-lg"
                              >
                                {variation.color}: {variation.quantity}
                              </span>
                            )) || <span className="text-gray-500">-</span>}
                          </div>
                        </td>
                        <td>
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${stockInfo.bg}`}
                          >
                            <div
                              className={`w-2 h-2 rounded-full bg-${stockInfo.color}-500`}
                            ></div>
                            <span
                              className={`text-${stockInfo.color}-700 dark:text-${stockInfo.color}-400`}
                            >
                              {stockInfo.status} ({totalStock})
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="font-medium text-gray-900 dark:text-white">
                            ₹{item.unitPrice || 0}
                          </span>
                        </td>
                        <td>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ₹{itemValue.toLocaleString()}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-blue-600 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg text-green-600 transition-colors">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleDeleteAll}
                  disabled={deleting || filteredData.length === 0}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm font-medium"
                >
                  {deleting ? 'Deleting...' : 'Delete All'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {Array.isArray(filteredData) && filteredData.map((item, index) => {
                const totalStock =
                  item.variations?.reduce(
                    (sum, v) => sum + (parseFloat(v.quantity) || 0),
                    0,
                  ) ||
                  item.currentStock ||
                  0;
                const stockInfo = getStockStatus(totalStock);
                const itemValue = totalStock * (item.unitPrice || 0);

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="ai-card p-6 hover:scale-105 transition-transform group"
                  >
                    <div className="relative mb-4">
                      <div className="w-full h-48 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                        {item.photo ? (
                          <img
                            src={`https://erpwebsite.onrender.com/uploads/${item.photo}`}
                            alt={item.productName || item.name || 'Product'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                      <div
                        className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium ${stockInfo.bg}`}
                      >
                        <span
                          className={`text-${stockInfo.color}-700 dark:text-${stockInfo.color}-400`}
                        >
                          {totalStock} units
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {item.productName || item.name || 'Unnamed Product'}
                        </h3>
                        {item.material && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {item.material}
                          </p>
                        )}
                        {item.uniqueCode && (
                          <div className="text-xs text-blue-500 flex items-center gap-1 mt-1">
                            <Tag className="w-3 h-3" />
                            {item.uniqueCode}
                          </div>
                        )}
                        {item.barcode && (
                          <div className="text-xs text-green-500 flex items-center gap-1 mt-1">
                            <Bot className="w-3 h-3" />
                            Barcode Available
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          ₹{item.unitPrice || 0}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Total: ₹{itemValue.toLocaleString()}
                        </span>
                      </div>

                      <div className={`p-3 rounded-xl ${stockInfo.bg}`}>
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-medium text-${stockInfo.color}-700 dark:text-${stockInfo.color}-400`}
                          >
                            {stockInfo.status}
                          </span>
                          <div
                            className={`w-2 h-2 rounded-full bg-${stockInfo.color}-500`}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex-1 btn-ai-ghost text-sm py-2">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        <button className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg text-green-600 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InventoryList;