import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

const LedgerDetails = ({ ledgerName, goBack, refreshLedgers }) => {
  const [ledger, setLedger] = useState(null);
  const [openingBalance, setOpeningBalance] = useState(0);
  const [ledgerType, setLedgerType] = useState("Asset");
  const [transactions, setTransactions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const axios = useAxios();

  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(num || 0);

  const loadLedger = async () => {
    try {
      console.log("🔍 Loading ledger:", ledgerName);
      const res = await axios.get(`/ledgers/${encodeURIComponent(ledgerName)}`);
      console.log("🔍 Ledger data received:", res.data);
      setLedger(res.data);
      setOpeningBalance(res.data.openingBalance || 0);
      setLedgerType(res.data.type || "Asset");
      setTransactions(res.data.transactions || []);
      console.log("🔍 Transactions loaded:", res.data.transactions?.length || 0);
    } catch (err) {
      console.error("❌ Error loading ledger:", err);
      console.error("❌ Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError("Ledger not found.");
    }
  };

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await axios.put(`/ledgers/${encodeURIComponent(ledgerName)}/opening`, {
        openingBalance,
        type: ledgerType,
      });
      await loadLedger();
      refreshLedgers?.();
    } catch (err) {
      console.error("Failed to update ledger:", err);
      alert("Error updating ledger.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    loadLedger();
  }, [ledgerName]);

  if (error)
    return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (!ledger)
    return <p className="text-center mt-6 text-gray-500">Loading...</p>;

  const { totalIn = 0, totalOut = 0, balance = 0 } = ledger;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-white">
            Ledger: {ledger.name}
          </h2>
          <button
            onClick={goBack}
            className="px-4 py-1 text-sm bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-white rounded"
          >
            Back
          </button>
        </div>

        {/* Editable Inputs */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Opening Balance
            </label>
            <input
              type="number"
              value={openingBalance}
              onChange={(e) => setOpeningBalance(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ledger Type
            </label>
            <select
              value={ledgerType}
              onChange={(e) => setLedgerType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Asset">Asset</option>
              <option value="Liability">Liability</option>
              <option value="Equity">Equity</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleUpdate}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full disabled:bg-blue-400"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-slate-700">
          <table className="min-w-full text-sm bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100">
            <thead className="bg-blue-50 dark:bg-blue-900 text-gray-700 dark:text-white">
              <tr>
                <th className="text-left p-3 border-b">Date</th>
                <th className="text-left p-3 border-b">Type</th>
                <th className="text-right p-3 border-b">Amount</th>
                <th className="text-left p-3 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, i) => (
                <tr
                  key={txn._id || i}
                  className="hover:bg-gray-50 dark:hover:bg-slate-700"
                >
                  <td className="p-3 border-b">
                    {new Date(txn.date).toLocaleDateString()}
                  </td>
                  <td
                    className={`p-3 border-b font-medium ${
                      txn.type === "in" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {txn.type === "in" ? "Cash In" : "Cash Out"}
                  </td>
                  <td className="p-3 border-b text-right">
                    {formatCurrency(txn.amount)}
                  </td>
                  <td className="p-3 border-b text-gray-700 dark:text-gray-300">
                    {txn.note || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-semibold">
          <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-600 px-4 py-3 rounded text-green-800 dark:text-green-300">
            Total Cash In: {formatCurrency(totalIn)}
          </div>
          <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-600 px-4 py-3 rounded text-red-700 dark:text-red-300">
            Total Cash Out: {formatCurrency(totalOut)}
          </div>
          <div
            className={`px-4 py-3 rounded border-l-4 ${
              balance >= 0
                ? "bg-green-100 dark:bg-green-900 border-green-700 text-green-900 dark:text-green-300"
                : "bg-red-100 dark:bg-red-900 border-red-700 text-red-900 dark:text-red-300"
            }`}
          >
            Balance: {formatCurrency(balance)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LedgerDetails;
