import React, { useState, useEffect } from "react";
import { useAxios } from "../hooks/useAxios";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [type, setType] = useState("remember");
  const [deleting, setDeleting] = useState(false);
  const axios = useAxios();

  const fetchReminders = async () => {
    try {
      const res = await axios.get("/Reminders");
      setReminders(res.data);
    } catch (err) {
      console.error("Failed to load reminders:", err);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [axios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/Reminders", {
        title,
        description,
        dueDate,
        priority,
        type
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("medium");
      setType("remember");
      fetchReminders();
    } catch (err) {
      console.error("Failed to save reminder:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reminder?')) return;
    setDeleting(true);
    try {
      await axios.delete(`/Reminders/${id}`);
      setReminders((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert('Failed to delete reminder.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Are you sure you want to delete ALL reminders? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await Promise.all(reminders.map(r => axios.delete(`/Reminders/${r._id}`)));
      setReminders([]);
    } catch (err) {
      alert('Failed to delete all reminders.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-white dark:bg-slate-800 shadow rounded-xl space-y-6">
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-white">Add Reminder / To-Do</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title (required)"
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)"
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="remember">Remember</option>
          <option value="todo">To-Do</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
        >
          Save
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Your Entries</h3>
        <div className="flex justify-end mb-4">
          <button
            onClick={handleDeleteAll}
            disabled={deleting || reminders.length === 0}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm font-medium"
          >
            {deleting ? 'Deleting...' : 'Delete All'}
          </button>
        </div>
        <ul className="space-y-3">
          {reminders.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No reminders yet.</p>
          ) : (
            reminders.map((rem, idx) => (
              <li
                key={idx}
                className="p-3 border-l-4 bg-blue-50 dark:bg-slate-700 border-blue-500 rounded shadow-sm"
              >
                <span className="block text-xs font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                  {rem.type} | {rem.priority} | {rem.dueDate && new Date(rem.dueDate).toLocaleDateString()}
                </span>
                <span className="text-lg font-bold text-gray-800 dark:text-gray-100 block">{rem.title}</span>
                {rem.description && (
                  <span className="text-gray-700 dark:text-gray-200 block text-sm">{rem.description}</span>
                )}
                <button
                  className="ml-2 text-red-600 hover:text-red-800 text-xs"
                  onClick={() => handleDelete(rem._id)}
                  disabled={deleting}
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Reminders;