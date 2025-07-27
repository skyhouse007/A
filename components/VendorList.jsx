import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({ name: "", contact: "", address: "" });
  const [waMessage, setWaMessage] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/vendors");
      setVendors(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch vendors.");
      console.error("Error fetching vendors:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/vendors", form);
      fetchVendors();
      setForm({ name: "", contact: "", address: "" });
    } catch (err) {
      console.error("Error adding vendor:", err.message);
      setError("Error adding vendor.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this vendor?")) {
      try {
        await axios.delete(`/vendors/${id}`);
        setVendors(vendors.filter((v) => v._id !== id));
      } catch (err) {
        console.error("Error deleting vendor:", err.message);
        alert("Failed to delete vendor.");
      }
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Are you sure you want to delete ALL listed vendors? This cannot be undone.')) return;
    setDeleting(true);
    try {
      await Promise.all(vendors.map(v => axios.delete(`/vendors/${v._id}`)));
      setVendors([]);
    } catch (err) {
      alert('Failed to delete all vendors.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  const toggleSelectContact = (phone) => {
    setSelectedContacts((prev) =>
      prev.includes(phone) ? prev.filter((p) => p !== phone) : [...prev, phone]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedContacts([]);
    } else {
      const allContacts = vendors.map((v) => v.contact);
      setSelectedContacts(allContacts);
    }
    setSelectAll(!selectAll);
  };

  const sendWhatsAppMessages = async () => {
    if (!waMessage.trim()) return alert("Please enter a message.");
    if (selectedContacts.length === 0) return alert("Select at least one contact.");

    if (!window.confirm(`Send this message to ${selectedContacts.length} vendors?`)) {
      return;
    }

    setSending(true);
    try {
      const res = await axios.post("/whatsapp/bulk-send", {
        phones: selectedContacts,
        message: waMessage,
      });
      alert(`✅ Messages sent to ${res.data.sent} vendors.`);
      setWaMessage("");
      setSelectedContacts([]);
      setSelectAll(false);
    } catch (err) {
      console.error("WhatsApp send error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to send WhatsApp messages.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-6">Vendor Management</h2>

      {/* Add Vendor Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          name="name"
          placeholder="Vendor Name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          required
        />
        <input
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-600"
          required
        />
        <div className="sm:col-span-3 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
          >
            Add Vendor
          </button>
        </div>
      </form>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Vendor Table */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDeleteAll}
          disabled={deleting || vendors.length === 0}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow text-sm font-medium"
        >
          {deleting ? 'Deleting...' : 'Delete All'}
        </button>
      </div>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-300 text-sm bg-white dark:bg-gray-800 rounded">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 border text-left">Name</th>
              <th className="px-4 py-2 border text-left">Contact</th>
              <th className="px-4 py-2 border text-left">Address</th>
              <th className="px-4 py-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v._id} className="hover:bg-blue-100 dark:hover:bg-gray-700">
                <td className="px-4 py-2 border">{v.name}</td>
                <td className="px-4 py-2 border">{v.contact}</td>
                <td className="px-4 py-2 border">{v.address}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(v._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {vendors.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No vendors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk WhatsApp Messaging */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h3 className="text-lg font-semibold mb-3 text-blue-700 dark:text-blue-300">Bulk WhatsApp Messaging</h3>

        <textarea
          rows={3}
          className="w-full p-2 mb-3 border rounded resize-none dark:bg-gray-700 dark:text-white"
          placeholder="Type your message here..."
          value={waMessage}
          onChange={(e) => setWaMessage(e.target.value)}
          disabled={sending}
        />

        <div className="max-h-48 overflow-y-auto mb-3 border rounded p-2 dark:bg-gray-700">
          {vendors.length === 0 ? (
            <p className="text-gray-600 italic">No vendors available for messaging.</p>
          ) : (
            <>
              <label className="block mb-2 cursor-pointer font-medium text-blue-700">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  disabled={sending}
                  className="mr-2"
                />
                Select All Vendors
              </label>
              {vendors.map(({ _id, name, contact }) => (
                <label key={_id} className="block mb-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact)}
                    onChange={() => toggleSelectContact(contact)}
                    disabled={sending}
                    className="mr-2"
                  />
                  {name} ({contact})
                </label>
              ))}
            </>
          )}
        </div>

        <button
          onClick={sendWhatsAppMessages}
          disabled={sending}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {sending ? "Sending..." : `Send Message to ${selectedContacts.length} Vendor${selectedContacts.length !== 1 ? "s" : ""}`}
        </button>
      </div>
    </div>
  );
};

export default VendorList;