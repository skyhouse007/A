import React, { useState } from "react";
import useAxios from "../hooks/useAxios";

const CashEntryForm = ({ type, ledgers = [] }) => {
  const [form, setForm] = useState({
    ledgerName: "",
    amount: "",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });
  const axios = useAxios();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      type,
    };

    try {
      await axios.post("/transactions", payload);
      alert("✅ Transaction saved.");
      setForm({ ledgerName: "", amount: "", note: "", date: new Date().toISOString().split("T")[0] });
    } catch (err) {
      console.error("Failed to save transaction:", err);
      alert("❌ Error saving transaction.");
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto mt-8 p-6 bg-blue-50 dark:bg-gray-900 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-800 dark:text-white">
        {type === "in" ? "Cash In Entry" : "Cash Out Entry"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Ledger Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Ledger</label>
          <select
            name="ledgerName"
            value={form.ledgerName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
          >
            <option value="">-- Select Ledger --</option>
            {ledgers.map((ledger) => (
              <option key={ledger._id} value={ledger.name}>
                {ledger.name}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            placeholder="Enter amount"
            className="w-full px-3 py-2 rounded border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            rows={3}
            placeholder="Optional description"
            className="w-full px-3 py-2 rounded border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded transition"
        >
          Submit {type === "in" ? "Cash In" : "Cash Out"}
        </button>
      </form>
    </div>
  );
};

export default CashEntryForm;
