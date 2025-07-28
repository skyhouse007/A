import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const ProfitAndLoss = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const axios = useAxios();
  const [month, setMonth] = useState(new Date().getMonth() + 1); // getMonth() returns 0-11, so add 1
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchPL = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/profit-loss?month=${month}&year=${year}`);
      setData(res.data);
    } catch (err) {
      console.error("Failed to load Profit & Loss:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPL();
  }, [month, year]);

  const format = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(n || 0);

  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-blue-50 dark:bg-blue-900 text-gray-900 dark:text-white rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800 dark:text-white">
        Profit & Loss Statement
        {data?.ledgerBased && (
          <span className="text-sm font-normal text-green-600 dark:text-green-400 ml-2">
            (Ledger-Based)
          </span>
        )}
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="px-3 py-2 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-800 dark:text-white"
        >
          {monthOptions.map((m, idx) => (
            <option key={idx} value={idx + 1}>{m}</option>
          ))}
        </select>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          min="2000"
          max="2100"
          className="px-3 py-2 rounded border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-800 dark:text-white w-28"
        />
        <button
          onClick={fetchPL}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded"
        >
          Refresh
        </button>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
        >
          {showBreakdown ? "Hide" : "Show"} Breakdown
        </button>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-300">Loading data...</div>
      ) : !data ? (
        <div className="text-center text-red-500">Unable to load data.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Debit */}
            <div className="bg-white dark:bg-blue-800 rounded-xl p-4 shadow border border-blue-100 dark:border-blue-700">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Debit (Dr)</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr><td className="py-2">Opening Stock</td><td className="text-right">{format(data.debit?.openingStock || 0)}</td></tr>
                  <tr><td className="py-2">Purchases</td><td className="text-right">{format(data.debit?.purchases || 0)}</td></tr>
                  <tr><td className="py-2">Expenses</td><td className="text-right">{format(data.debit?.expenses || 0)}</td></tr>
                  <tr className="border-t font-semibold text-blue-700 dark:text-blue-300">
                    <td className="py-2">Total Debit</td><td className="text-right">{format(data.debit?.total || 0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Credit */}
            <div className="bg-white dark:bg-blue-800 rounded-xl p-4 shadow border border-blue-100 dark:border-blue-700">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Credit (Cr)</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr><td className="py-2">Sales</td><td className="text-right">{format(data.credit?.sales || 0)}</td></tr>
                  <tr><td className="py-2">Other Income</td><td className="text-right">{format(data.credit?.income || 0)}</td></tr>
                  <tr><td className="py-2">Closing Stock</td><td className="text-right">{format(data.credit?.closingStock || 0)}</td></tr>
                  <tr className="border-t font-semibold text-blue-700 dark:text-blue-300">
                    <td className="py-2">Total Credit</td><td className="text-right">{format(data.credit?.total || 0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Net Result */}
          <div className="mt-6 text-center text-lg font-semibold">
            {(data.profitOrLoss || 0) >= 0 ? (
              <p className="text-green-600 dark:text-green-400">
                Net Profit: {format(data.profitOrLoss || 0)}
              </p>
            ) : (
              <p className="text-red-600 dark:text-red-400">
                Net Loss: {format(Math.abs(data.profitOrLoss || 0))}
              </p>
            )}
          </div>

          {/* Detailed Breakdown */}
          {showBreakdown && data.breakdown && (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Income Breakdown */}
              {data.breakdown.income && data.breakdown.income.total > 0 && (
                <div className="bg-white dark:bg-blue-800 rounded-xl p-4 shadow border border-green-100 dark:border-green-700">
                  <h4 className="text-lg font-semibold mb-3 text-green-700 dark:text-green-300 border-b pb-2">
                    Income Breakdown
                  </h4>
                  <div className="space-y-2">
                    {data.breakdown.income.breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.ledger}</span>
                        <span className="text-green-600 dark:text-green-400">{format(item.amount)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 font-semibold flex justify-between">
                      <span>Total Income</span>
                      <span className="text-green-600 dark:text-green-400">{format(data.breakdown.income.total)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Expense Breakdown */}
              {data.breakdown.expenses && data.breakdown.expenses.total > 0 && (
                <div className="bg-white dark:bg-blue-800 rounded-xl p-4 shadow border border-red-100 dark:border-red-700">
                  <h4 className="text-lg font-semibold mb-3 text-red-700 dark:text-red-300 border-b pb-2">
                    Expense Breakdown
                  </h4>
                  <div className="space-y-2">
                    {data.breakdown.expenses.breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.ledger}</span>
                        <span className="text-red-600 dark:text-red-400">{format(item.amount)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 font-semibold flex justify-between">
                      <span>Total Expenses</span>
                      <span className="text-red-600 dark:text-red-400">{format(data.breakdown.expenses.total)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stock Movement */}
              {data.breakdown.stock && (
                <div className="bg-white dark:bg-blue-800 rounded-xl p-4 shadow border border-blue-100 dark:border-blue-700">
                  <h4 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300 border-b pb-2">
                    Stock Movement
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Opening Stock</span>
                      <span>{format(data.breakdown.stock.opening)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stock Purchases</span>
                      <span className="text-green-600 dark:text-green-400">{format(data.breakdown.stock.purchases)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stock Sales</span>
                      <span className="text-red-600 dark:text-red-400">{format(data.breakdown.stock.sales)}</span>
                    </div>
                    <div className="border-t pt-2 font-semibold flex justify-between">
                      <span>Closing Stock</span>
                      <span>{format(data.breakdown.stock.closing)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Reference Data */}
              {data.breakdown.reference && (
                <div className="bg-white dark:bg-blue-800 rounded-xl p-4 shadow border border-gray-100 dark:border-gray-700">
                  <h4 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300 border-b pb-2">
                    Reference Data
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Sales (from Sales module)</span>
                      <span>{format(data.breakdown.reference.sales)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Purchases (from Purchase module)</span>
                      <span>{format(data.breakdown.reference.purchases)}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      * Reference data shows totals from Sales/Purchase modules for comparison
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfitAndLoss;
