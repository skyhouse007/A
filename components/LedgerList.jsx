import React, { useState } from "react";
import useAxios from "../hooks/useAxios";

const LedgerList = ({ ledgers = [], onSelect, onLedgerAdded }) => {
  const [newLedger, setNewLedger] = useState("");
  const [ledgerType, setLedgerType] = useState("Asset");
  const [creatingRequired, setCreatingRequired] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const axios = useAxios();

  const handleLedgerClick = (name) => {
    if (onSelect) onSelect(name);
  };

  const createRequiredLedgers = async () => {
    setCreatingRequired(true);
    try {
      const res = await axios.post("/ledgers/create-required");
      console.log("Required ledgers created:", res.data);
      alert("Required ledgers created successfully! Please refresh the page.");
      window.location.reload();
    } catch (err) {
      console.error("Error creating required ledgers:", err);
      alert(err?.response?.data?.error || "Failed to create required ledgers.");
    } finally {
      setCreatingRequired(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newLedger.trim()) {
      alert("Please enter a ledger name.");
      return;
    }

    try {
      const res = await axios.post("/ledgers", {
        name: newLedger.trim(),
        type: ledgerType,
      });
      if (onLedgerAdded) onLedgerAdded(res.data);
      setNewLedger("");
    } catch (err) {
      console.error("Error adding ledger:", err);
      alert(err?.response?.data?.error || "Failed to add ledger.");
    }
  };

  const handleDelete = async (name) => {
    if (!window.confirm(`Delete ledger "${name}"?`)) return;
    try {
      await axios.delete(`/ledgers/${name}`);
      window.location.reload();
    } catch (err) {
      console.error("Error deleting ledger:", err);
      alert(err?.response?.data?.error || "Failed to delete ledger.");
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Are you sure you want to delete ALL listed ledgers? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await Promise.all(ledgers.map(l => axios.delete(`/ledgers/${l.name}`)));
      window.location.reload();
    } catch (err) {
      alert('Failed to delete all ledgers.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-800 dark:text-white">Ledger List</h2>

      {/* Create Required Ledgers Button */}
      {ledgers.length === 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-yellow-800 dark:text-yellow-200 mb-3">
            No ledgers found. Create the required system ledgers to get started.
          </p>
          <button
            onClick={createRequiredLedgers}
            disabled={creatingRequired}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md shadow disabled:bg-yellow-400"
          >
            {creatingRequired ? "Creating..." : "Create Required Ledgers (Sales, Stock, Transport)"}
          </button>
        </div>
      )}

      {/* Form to add new ledger */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-end bg-blue-50 dark:bg-slate-800 p-4 rounded-xl shadow"
      >
        <input
          type="text"
          value={newLedger}
          onChange={(e) => setNewLedger(e.target.value)}
          placeholder="Ledger Name"
          className="w-full sm:w-64 px-4 py-2 rounded-md border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={ledgerType}
          onChange={(e) => setLedgerType(e.target.value)}
          className="w-full sm:w-48 px-4 py-2 rounded-md border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Asset">Asset</option>
          <option value="Liability">Liability</option>
          <option value="Equity">Equity</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow"
        >
          Add Ledger
        </button>
      </form>

      {/* Delete All Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDeleteAll}
          disabled={deleting || ledgers.length === 0}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm font-medium"
        >
          {deleting ? 'Deleting...' : 'Delete All'}
        </button>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow ring-1 ring-gray-200 dark:ring-slate-700">
        {(!ledgers || ledgers.length === 0) ? (
          <p className="p-4 text-gray-600 dark:text-gray-300">No ledgers available.</p>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-100">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
                <th className="px-4 py-3 border border-gray-200 dark:border-slate-600">Name</th>
                <th className="px-4 py-3 border border-gray-200 dark:border-slate-600">Type</th>
                <th className="px-4 py-3 text-right border border-gray-200 dark:border-slate-600">Cash In</th>
                <th className="px-4 py-3 text-right border border-gray-200 dark:border-slate-600">Cash Out</th>
                <th className="px-4 py-3 text-right border border-gray-200 dark:border-slate-600">Balance</th>
                <th className="px-4 py-3 text-center border border-gray-200 dark:border-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ledgers.map((ledger, idx) => (
                <tr
                  key={ledger._id || idx}
                  className={`${idx % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-blue-50 dark:bg-slate-700"}`}
                >
                  <td
                    className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-blue-600 dark:text-blue-300 hover:underline cursor-pointer"
                    onClick={() => handleLedgerClick(ledger.name)}
                  >
                    {ledger.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-slate-700">
                    {ledger.type}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-right text-green-700">
                    {ledger.totalIn?.toFixed(2) ?? "0.00"}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-right text-red-600">
                    {ledger.totalOut?.toFixed(2) ?? "0.00"}
                  </td>
                  <td
                    className={`px-4 py-2 border border-gray-200 dark:border-slate-700 text-right font-semibold ${
                      ledger.balance >= 0 ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    {ledger.balance?.toFixed(2) ?? "0.00"}
                  </td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-slate-700 text-center">
                    <button
                      onClick={() => handleDelete(ledger.name)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LedgerList;
