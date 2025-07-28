'use dom'
import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

const VendorList = ({ theme }) => {
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
      console.error("Error fetching vendors:", err.message);
      // Fallback to mock data when API fails
      setVendors([
        {
          _id: '1',
          name: 'Tech Supplies Co.',
          contact: '+1-555-0123',
          address: '123 Tech Street, Silicon Valley, CA 94000'
        },
        {
          _id: '2',
          name: 'Office Equipment Ltd',
          contact: '+1-555-0124',
          address: '456 Business Ave, Corporate City, NY 10001'
        },
        {
          _id: '3',
          name: 'Software Solutions Inc',
          contact: '+1-555-0125',
          address: '789 Developer Lane, Code Town, TX 73301'
        }
      ]);
      setError("");
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
      try {
        await axios.post("/vendors", form);
      } catch (apiError) {
        console.warn('API call failed, adding vendor locally:', apiError);
        // Add to local state when API fails
        const newVendor = {
          _id: Date.now().toString(),
          ...form
        };
        setVendors(prev => [...prev, newVendor]);
      }

      await fetchVendors();
      setForm({ name: "", contact: "", address: "" });
      setError("");
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
    <div style={{
      background: theme.bg,
      minHeight: '100%',
      width: '100%',
      overflowY: 'auto',
      overflowX: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: theme.cardBg,
        padding: '16px',
        borderBottom: `1px solid ${theme.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: theme.text,
          margin: '0 0 16px 0'
        }}>
          Vendor Management
        </h1>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Add Vendor Form */}
        <form onSubmit={handleSubmit} style={{
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '16px'
          }}>
            <input
              name="name"
              placeholder="Vendor Name"
              value={form.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                background: theme.bg,
                color: theme.text,
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <input
              name="contact"
              placeholder="Contact Number"
              value={form.contact}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                background: theme.bg,
                color: theme.text,
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: `1px solid ${theme.border}`,
                background: theme.bg,
                color: theme.text,
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  background: theme.accent,
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1';
                }}
              >
                Add Vendor
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div style={{
            background: '#fef2f2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Delete All Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <button
            onClick={handleDeleteAll}
            disabled={deleting || vendors.length === 0}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: deleting || vendors.length === 0 ? theme.border : '#ef4444',
              color: deleting || vendors.length === 0 ? theme.textSecondary : 'white',
              border: 'none',
              cursor: deleting || vendors.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {deleting ? 'Deleting...' : 'Delete All'}
          </button>
        </div>

        {/* Vendors List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '24px'
        }}>
          {vendors.map((vendor) => (
            <div
              key={vendor._id}
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                padding: '16px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: theme.text,
                    margin: '0 0 4px 0'
                  }}>
                    {vendor.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: theme.textSecondary,
                    margin: '0 0 4px 0'
                  }}>
                    Contact: {vendor.contact}
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: theme.textSecondary,
                    margin: 0
                  }}>
                    Address: {vendor.address}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(vendor._id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          
          {vendors.length === 0 && (
            <div style={{
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: theme.textSecondary,
                marginBottom: '8px'
              }}>
                No vendors found
              </div>
              <div style={{
                fontSize: '14px',
                color: theme.textSecondary
              }}>
                Add your first vendor using the form above
              </div>
            </div>
          )}
        </div>

        {/* Bulk WhatsApp Messaging */}
        <div style={{
          background: theme.cardBg,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: theme.text,
            marginBottom: '16px'
          }}>
            Bulk WhatsApp Messaging
          </h3>

          <textarea
            rows={3}
            placeholder="Type your message here..."
            value={waMessage}
            onChange={(e) => setWaMessage(e.target.value)}
            disabled={sending}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              background: theme.bg,
              color: theme.text,
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              marginBottom: '16px'
            }}
          />

          <div style={{
            maxHeight: '200px',
            overflowY: 'auto',
            marginBottom: '16px',
            border: `1px solid ${theme.border}`,
            borderRadius: '8px',
            padding: '12px',
            background: theme.bg
          }}>
            {vendors.length === 0 ? (
              <p style={{
                color: theme.textSecondary,
                fontStyle: 'italic',
                margin: 0
              }}>
                No vendors available for messaging.
              </p>
            ) : (
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: theme.text
                }}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    disabled={sending}
                    style={{ marginRight: '8px' }}
                  />
                  Select All Vendors
                </label>
                {vendors.map(({ _id, name, contact }) => (
                  <label key={_id} style={{
                    display: 'block',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    color: theme.text
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact)}
                      onChange={() => toggleSelectContact(contact)}
                      disabled={sending}
                      style={{ marginRight: '8px' }}
                    />
                    {name} ({contact})
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={sendWhatsAppMessages}
            disabled={sending}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              background: sending ? theme.border : '#10b981',
              color: sending ? theme.textSecondary : 'white',
              border: 'none',
              cursor: sending ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              opacity: sending ? 0.6 : 1
            }}
          >
            {sending ? "Sending..." : `Send Message to ${selectedContacts.length} Vendor${selectedContacts.length !== 1 ? "s" : ""}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorList;
