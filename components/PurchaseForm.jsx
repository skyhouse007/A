'use dom'
import React, { useState } from "react";
import useAxios from "../hooks/useAxios.js";
import purchaseService from "../services/purchaseService.js";
import "../styles/purchase.css";

const PurchaseForm = ({ onAdd }) => {
  const [vendor, setVendor] = useState({ 
    name: "", 
    contact: "", 
    gstNo: "", 
    address: "", 
    email: "" 
  });
  const [isGST, setIsGST] = useState(true);
  const [gstType, setGstType] = useState("intrastate");
  const [gstPercentages, setGstPercentages] = useState({ cgst: "", sgst: "", igst: "" });
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    name: "",
    material: "",
    price: 0,
    variations: [{ color: "", quantity: 0 }],
  });
  const [transportCost, setTransportCost] = useState("");
  const [transportNote, setTransportNote] = useState("");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [photo, setPhoto] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [submitting, setSubmitting] = useState(false);
  const axios = useAxios();

  const handleAddVariation = () => {
    setCurrentItem(prev => ({
      ...prev,
      variations: [...prev.variations, { color: "", quantity: 0 }],
    }));
  };

  const handleVariationChange = (index, field, value) => {
    const updated = [...currentItem.variations];
    updated[index][field] = value;
    setCurrentItem({ ...currentItem, variations: updated });
  };

  const handleAddItem = () => {
    if (!currentItem.name || !currentItem.price) {
      alert("Please enter item name and price.");
      return;
    }
    
    // Validate that at least one variation has color and quantity
    const validVariations = currentItem.variations.filter(v => v.color && v.quantity > 0);
    if (validVariations.length === 0) {
      alert("Please add at least one variation with color and quantity.");
      return;
    }
    
    // Create a clean item object with only valid variations
    const cleanItem = {
      ...currentItem,
      variations: validVariations
    };
    
    setItems([...items, cleanItem]);
    setCurrentItem({
      name: "",
      material: "",
      price: 0,
      variations: [{ color: "", quantity: 0 }],
    });
  };

  const deleteItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    
    // Validate required fields
    if (!vendor.name.trim()) {
      alert("Please enter vendor name");
      setSubmitting(false);
      return;
    }
    
    if (items.length === 0) {
      alert("Please add at least one item before saving");
      setSubmitting(false);
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append("vendorName", vendor.name);
      formData.append("vendorContact", vendor.contact);
      formData.append("vendorGSTNo", vendor.gstNo);
      formData.append("vendorAddress", vendor.address);
      formData.append("vendorEmail", vendor.email);
      formData.append("isGST", isGST);
      formData.append("gstType", gstType);
      formData.append("cgst", gstPercentages.cgst);
      formData.append("sgst", gstPercentages.sgst);
      formData.append("igst", gstPercentages.igst);
      formData.append("transportCost", transportCost);
      formData.append("transportNote", transportNote);
      formData.append("expectedDeliveryDate", expectedDeliveryDate);
      formData.append("invoiceNumber", invoiceNumber);
      formData.append("purchaseOrderNumber", purchaseOrderNumber);
      formData.append("notes", notes);
      formData.append("termsAndConditions", termsAndConditions);
      formData.append("items", JSON.stringify(items));
      formData.append("paymentMethod", paymentMethod);
      if (photo) formData.append("photo", photo);

      const res = await purchaseService.createPurchase(formData);
      onAdd(res.purchase);

      // If payment method is Credit, create/update vendor ledger
      if (paymentMethod === "Credit") {
        try {
          // Create ledger if not exists
          await axios.post("/ledgers", {
            name: vendor.name,
            type: "Liability",
          });
          // Add transaction to vendor ledger
          await axios.post("/transactions", {
            ledgerName: vendor.name,
            amount: res.purchase.totalAmount || 0,
            type: "out",
            note: `Credit purchase for ${vendor.name}`,
            date: new Date(),
          });
        } catch (ledgerErr) {
          console.error("Failed to create/update vendor ledger:", ledgerErr);
          // Optionally alert user
        }
      }

      alert("✅ Purchase saved successfully");
      
      // Reset form
      setVendor({ name: "", contact: "", gstNo: "", address: "", email: "" });
      setItems([]);
      setTransportCost("");
      setTransportNote("");
      setExpectedDeliveryDate("");
      setInvoiceNumber("");
      setPurchaseOrderNumber("");
      setNotes("");
      setTermsAndConditions("");
      setPhoto(null);
    } catch (err) {
      console.error("Purchase error:", err);
      if (err.response?.data?.error) {
        alert(`❌ ${err.response.data.error}`);
      } else {
        alert("❌ Failed to save purchase");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 text-gray-800 dark:text-white p-6 sm:p-8 rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-semibold text-blue-800 dark:text-white">Purchase Entry</h2>

      {/* Vendor Information */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Vendor Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            placeholder="Vendor Name *"
            value={vendor.name}
            onChange={(e) => setVendor({ ...vendor, name: e.target.value })}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            required
          />
          <input
            placeholder="Contact Number"
            value={vendor.contact}
            onChange={(e) => setVendor({ ...vendor, contact: e.target.value })}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
          <input
            placeholder="GST Number"
            value={vendor.gstNo}
            onChange={(e) => setVendor({ ...vendor, gstNo: e.target.value })}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
          <input
            placeholder="Address"
            value={vendor.address}
            onChange={(e) => setVendor({ ...vendor, address: e.target.value })}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
          <input
            placeholder="Email"
            type="email"
            value={vendor.email}
            onChange={(e) => setVendor({ ...vendor, email: e.target.value })}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>
      </div>

      {/* Purchase Details */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Purchase Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            placeholder="Invoice Number"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
          <input
            placeholder="Purchase Order Number"
            value={purchaseOrderNumber}
            onChange={(e) => setPurchaseOrderNumber(e.target.value)}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
          <input
            type="date"
            placeholder="Expected Delivery Date"
            value={expectedDeliveryDate}
            onChange={(e) => setExpectedDeliveryDate(e.target.value)}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>
      </div>

      {/* GST Configuration */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">GST Configuration</h3>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setIsGST(true)}
            className={`px-4 py-2 rounded border ${
              isGST ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-700 dark:text-white"
            }`}
          >
            GST
          </button>
          <button
            onClick={() => setIsGST(false)}
            className={`px-4 py-2 rounded border ${
              !isGST ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-700 dark:text-white"
            }`}
          >
            Non-GST
          </button>
        </div>

        {isGST && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={gstType}
              onChange={(e) => setGstType(e.target.value)}
              className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            >
              <option value="intrastate">Intra-state</option>
              <option value="interstate">Inter-state</option>
            </select>
            <input
              placeholder="CGST %"
              type="number"
              value={gstPercentages.cgst}
              onChange={(e) => setGstPercentages({ ...gstPercentages, cgst: e.target.value })}
              className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <input
              placeholder="SGST %"
              type="number"
              value={gstPercentages.sgst}
              onChange={(e) => setGstPercentages({ ...gstPercentages, sgst: e.target.value })}
              className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <input
              placeholder="IGST %"
              type="number"
              value={gstPercentages.igst}
              onChange={(e) => setGstPercentages({ ...gstPercentages, igst: e.target.value })}
              className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
          </div>
        )}
      </div>

      {/* Item Entry */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Item Entry</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <input
            placeholder="Product Name *"
            value={currentItem.name}
            onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            required
          />
          <input
            placeholder="Material"
            value={currentItem.material}
            onChange={(e) => setCurrentItem({ ...currentItem, material: e.target.value })}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
          <input
            placeholder="Price per unit"
            type="number"
            value={currentItem.price || ""}
            onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value === "" ? 0 : parseFloat(e.target.value) || 0 })}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            required
          />
          <button onClick={handleAddVariation} className="bg-gray-200 dark:bg-slate-600 px-4 py-2 rounded text-sm">
            + Variation
          </button>
          <button onClick={handleAddItem} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Add Item
          </button>
        </div>

        {currentItem.variations.map((v, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 mt-2">
            <input
              placeholder="Color"
              value={v.color}
              onChange={(e) => handleVariationChange(i, "color", e.target.value)}
              className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
            <input
              placeholder="Quantity"
              type="number"
              value={v.quantity || ""}
              onChange={(e) => handleVariationChange(i, "quantity", e.target.value === "" ? 0 : parseInt(e.target.value) || 0)}
              className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            />
          </div>
        ))}
      </div>

      {/* Items List */}
      {items.length > 0 && (
        <div className="border p-4 rounded bg-white dark:bg-slate-700 overflow-x-auto shadow">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-700 dark:text-white">Items Added ({items.length})</h3>
            <span className="text-sm text-gray-500">Total Items: {items.reduce((sum, item) => sum + item.variations.reduce((itemSum, v) => itemSum + v.quantity, 0), 0)}</span>
          </div>
          <table className="w-full text-sm table-auto">
            <thead className="bg-gray-100 dark:bg-slate-600 text-left">
              <tr>
                <th className="p-2">Name</th>
                <th>Material</th>
                <th>Price</th>
                <th>Variations</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} className="border-t dark:border-slate-600">
                  <td className="p-2">{item.name}</td>
                  <td>{item.material}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>
                    {item.variations.map((v, vi) => (
                      <div key={vi}>
                        {v.color}: {v.quantity}
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      onClick={() => deleteItem(idx)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Transport and Additional Details */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Transport & Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Transport Cost"
            type="number"
            value={transportCost}
            onChange={(e) => setTransportCost(e.target.value)}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
          <input
            placeholder="Transport Note"
            value={transportNote}
            onChange={(e) => setTransportNote(e.target.value)}
            className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>
        
        <div className="mt-4">
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            className="w-full p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>
        
        <div className="mt-4">
          <textarea
            placeholder="Terms and Conditions"
            value={termsAndConditions}
            onChange={(e) => setTermsAndConditions(e.target.value)}
            rows="3"
            className="w-full p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
          className="p-2 rounded border dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        >
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Cheque">Cheque</option>
          <option value="UPI">UPI</option>
          <option value="Credit">Credit</option>
        </select>
      </div>

      {/* File Upload */}
      <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Attachments</h3>
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
          className="border p-2 rounded w-full dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          accept="image/*"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded mt-4 w-full text-lg font-medium"
      >
        {submitting ? "Saving..." : "Save Purchase"}
      </button>
    </div>
  );
};

export default PurchaseForm;