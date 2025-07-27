import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { evaluate } from "mathjs";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  AlertTriangle,
  Sparkles,
  Target,
  X,
  Pencil,
} from "lucide-react";

// Pre-built KPI definitions
const defaultKPIs = [
  {
    name: "Turnover",
    formula: "sumSales",
    description: "Total sales for the current month.",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
  },
  {
    name: "Profit This Month",
    formula: "Revenue - Expenses",
    description: "Revenue minus expenses for the current month.",
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
  },
  {
    name: "EBITDA",
    formula: "NetIncome + Interest + Taxes + Depreciation + Amortization",
    description: "Earnings before interest, taxes, depreciation, and amortization.",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
  },
  {
    name: "ROI",
    formula: "(NetProfit / Investment) * 100",
    description: "Return on investment as a percentage.",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
  },
  {
    name: "Gross Profit Margin",
    formula: "((Revenue - COGS) / Revenue) * 100",
    description: "Gross profit margin as a percentage.",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
  },
  {
    name: "Net Profit Margin",
    formula: "(NetProfit / Revenue) * 100",
    description: "Net profit margin as a percentage.",
    gradient: "from-red-500 to-rose-600",
    bgGradient: "from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20",
  },
  {
    name: "Operating Margin",
    formula: "(OperatingIncome / Revenue) * 100",
    description: "Operating margin as a percentage.",
    gradient: "from-indigo-500 to-blue-600",
    bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
  },
  {
    name: "Current Ratio",
    formula: "CurrentAssets / CurrentLiabilities",
    description: "Current assets divided by current liabilities.",
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
  },
  {
    name: "Quick Ratio",
    formula: "(CurrentAssets - Inventory) / CurrentLiabilities",
    description: "Quick assets divided by current liabilities.",
    gradient: "from-green-500 to-blue-600",
    bgGradient: "from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20",
  },
  {
    name: "Debt-to-Equity",
    formula: "TotalLiabilities / Equity",
    description: "Total liabilities divided by shareholder equity.",
    gradient: "from-purple-500 to-violet-600",
    bgGradient: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
  },
  {
    name: "Inventory Turnover",
    formula: "COGS / AvgInventory",
    description: "Cost of goods sold divided by average inventory.",
    gradient: "from-indigo-500 to-blue-600",
    bgGradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
  },
];

const DashboardKPIs = () => {
  const [summary, setSummary] = useState(null);
  const [profitLoss, setProfitLoss] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [kpiData, setKpiData] = useState({});
  const axios = useAxios();
  const [kpis] = useState(defaultKPIs); // No editing, so no setKpis

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("/dashboard/summary");
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching dashboard summary:", err);
        // Fallback data for demo
        setSummary({
          turnoverThisMonth: 245000,
          ordersToday: 12,
          pendingOrders: 5,
          totalLiability: 85000,
          stockValue: 340000,
        });
      }
    };

    const fetchProfitLoss = async () => {
      try {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();
        const res = await axios.get(`/profit-loss?month=${month}&year=${year}`);
        setProfitLoss(res.data.profitOrLoss);
      } catch (err) {
        console.error("Error fetching Profit & Loss:", err);
        setProfitLoss(45000); // Fallback for demo
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchSummary(), fetchProfitLoss()]);
      setLoading(false);
    };

    fetchData();
  }, [axios]);

  useEffect(() => {
    if (summary && profitLoss !== null) {
      // Remove unused variables
      // Remove: const isProfit = profitLoss >= 0;
      // Remove: const trends = useState({})
      // Remove: const kpiExplanations = ...
    }
  }, [summary, profitLoss]);

  // Fetch data for KPI modal when selectedKPI changes
  useEffect(() => {
    if (selectedKPI === null) return;
    const fetchKpiData = async () => {
      try {
        if (selectedKPI === 0) { // Monthly Revenue
          // Get start of month
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const res = await axios.get(`/sales?startDate=${startOfMonth.toISOString()}`);
          setKpiData({ sales: res.data.sales || res.data || [] });
        } else if (selectedKPI === 1) { // Profit/Loss
          const now = new Date();
          const month = now.getMonth() + 1;
          const year = now.getFullYear();
          const res = await axios.get(`/profit-loss?month=${month}&year=${year}`);
          setKpiData({ profitLoss: res.data });
        } else if (selectedKPI === 2) { // Orders Today
          const now = new Date();
          const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
          const res = await axios.get(`/orders?startDate=${startOfToday.toISOString()}&endDate=${endOfToday.toISOString()}`);
          setKpiData({ orders: res.data });
        } else if (selectedKPI === 3) { // Pending Orders
          const [ordersRes, salesRes] = await Promise.all([
            axios.get("/orders"),
            axios.get("/sales")
          ]);
          const pendingOrders = (ordersRes.data || []).filter(o => o.status === "Pending");
          const pendingSales = (salesRes.data.sales || salesRes.data || []).filter(s => ["Pending", "Confirmed", "In Progress"].includes(s.status));
          setKpiData({ pendingOrders, pendingSales });
        } else if (selectedKPI === 4) { // Total Liability
          const res = await axios.get("/ledgers");
          setKpiData({ ledgers: (res.data || []).filter(l => l.type === "Liability") });
        } else if (selectedKPI === 5) { // Inventory Value
          const res = await axios.get("/inventory");
          let data = res.data;
          if (data.inventory) data = data.inventory;
          if (data.items) data = data.items;
          setKpiData({ inventory: Array.isArray(data) ? data : [] });
        }
      } catch {
        setKpiData({ error: "Failed to fetch data." });
      } finally {
        // setKpiLoading(false); // This line was removed
      }
    };
    fetchKpiData();
  }, [selectedKPI]);

  // Save custom KPIs to localStorage when changed
  useEffect(() => {
    localStorage.setItem("customKPIs", JSON.stringify(kpis));
  }, [kpis]);

  if (loading || !summary || profitLoss === null) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Prepare variable values for formula evaluation
  const variableValues = {
    sumSales: summary?.turnoverThisMonth || 0,
    Revenue: summary?.turnoverThisMonth || 0,
    Expenses: profitLoss?.breakdown?.expenses?.total || 0,
    NetIncome: profitLoss?.profitOrLoss || 0,
    NetProfit: profitLoss?.profitOrLoss || 0,
    Investment: 100000, // Placeholder, replace with real data
    COGS: 50000, // Placeholder, replace with real data
    OperatingIncome: 40000, // Placeholder, replace with real data
    CurrentAssets: 200000, // Placeholder, replace with real data
    CurrentLiabilities: summary?.totalLiability || 0,
    Inventory: summary?.stockValue || 0,
    TotalLiabilities: summary?.totalLiability || 0,
    Equity: 150000, // Placeholder, replace with real data
    Depreciation: 10000, // Placeholder
    Amortization: 5000, // Placeholder
    Interest: 2000, // Placeholder
    Taxes: 3000, // Placeholder
    AvgInventory: 60000, // Placeholder
  };

  return (
    <div className="space-y-6">
      {/* KPI Detail Modal */}
      {selectedKPI !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 animate-fade-in overflow-y-auto max-h-[90vh] flex flex-col">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-3xl font-bold z-10"
              onClick={() => setSelectedKPI(null)}
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {kpis[selectedKPI].name}
            </h2>
            <p className="mb-4 text-base md:text-lg text-gray-700 dark:text-gray-200">
              {kpis[selectedKPI].description}
            </p>
            <div className="mb-4">
              <span className="font-semibold">Formula:</span> {kpis[selectedKPI].formula}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Data used:</span>
              <div className="text-xs text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded p-2 mt-1 max-h-60 overflow-y-auto">
                {selectedKPI === 0 && kpiData.sales && Array.isArray(kpiData.sales) && (
                  <ul className="list-disc ml-5">
                    {kpiData.sales.map((sale, idx) => (
                      <li key={sale._id || idx}>
                        {sale.date ? new Date(sale.date).toLocaleDateString() : ''} - {sale.customer || sale.customerName || ''} - ₹{sale.totalAmount?.toLocaleString("en-IN")}
                      </li>
                    ))}
                  </ul>
                )}
                {selectedKPI === 1 && kpiData.profitLoss && (
                  <>
                    <div><b>Revenue:</b> ₹{kpiData.profitLoss.revenue?.toLocaleString("en-IN")}</div>
                    <div><b>Expenses:</b> ₹{kpiData.profitLoss.expenses?.toLocaleString("en-IN")}</div>
                    {kpiData.profitLoss.breakdown?.expenses?.breakdown && (
                      <ul className="list-disc ml-5 mt-1">
                        {kpiData.profitLoss.breakdown.expenses.breakdown.map((e, idx) => (
                          <li key={idx}>{e.ledger}: ₹{e.amount?.toLocaleString("en-IN")}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
                {selectedKPI === 2 && kpiData.orders && Array.isArray(kpiData.orders) && (
                  <ul className="list-disc ml-5">
                    {kpiData.orders.map((order, idx) => (
                      <li key={order._id || idx}>
                        {order.date ? new Date(order.date).toLocaleDateString() : ''} - {order.customer || ''} - ₹{order.totalAmount?.toLocaleString("en-IN")}
                      </li>
                    ))}
                  </ul>
                )}
                {!(selectedKPI === 0 && kpiData.sales) &&
                 !(selectedKPI === 1 && kpiData.profitLoss) &&
                 !(selectedKPI === 2 && kpiData.orders) && (
                  <span>No detailed data available for this KPI.</span>
                )}
              </div>
            </div>
          </div>
          {/* Click outside to close */}
          <div className="fixed inset-0 z-40" onClick={() => setSelectedKPI(null)} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, idx) => {
          let value;
          try {
            value = evaluate(kpi.formula, variableValues);
          } catch {
            value = "-";
          }
          return (
            <div
              key={idx}
              className={`relative overflow-hidden bg-gradient-to-br ${kpi.bgGradient} backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300`}
              onClick={() => setSelectedKPI(idx)}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-white/5 dark:to-transparent"></div>
              {/* Sparkle Effect */}
              <div className="absolute top-2 right-2">
                <Sparkles className="w-4 h-4 text-white/40 dark:text-white/20" />
              </div>
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div
                    className={`p-2 md:p-3 rounded-xl bg-gradient-to-r ${kpi.gradient} shadow-lg`}
                  >
                    {/* Icon removed */}
                  </div>
                  {/* Edit Icon removed */}
                </div>
                {/* Content */}
                <div>
                  <h3 className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-1 md:mb-2">
                    {kpi.name}
                  </h3>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {typeof value === "number" ? value.toLocaleString("en-IN", { maximumFractionDigits: 2 }) : value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {kpi.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardKPIs;