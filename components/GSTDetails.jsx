import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

const fmt = (num) =>
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const GSTDetails = () => {
  const [purchaseData, setPurchaseData] = useState({ entries: [], totalGST: 0, totalAmount: 0 });
  const [salesData, setSalesData] = useState({ entries: [], totalGST: 0, totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    fetchGSTDetails();
  }, []);

  const fetchGSTDetails = async () => {
    setLoading(true);
    try {
      const [purchaseRes, salesRes] = await Promise.all([
        axios.get("/gstDetails/purchases"),
        axios.get("/gstDetails/sales"),
      ]);
      
      // Use the dedicated GST endpoints that only return GST bills
      setPurchaseData(purchaseRes.data);
      setSalesData(salesRes.data);
    } catch (err) {
      console.error("Error fetching GST details:", err);
    }
    setLoading(false);
  };

  const purchaseGSTTotal = purchaseData.entries.reduce((sum, e) => sum + (e.gstAmount || 0), 0);
  const salesGSTTotal = salesData.entries.reduce((sum, e) => sum + (e.gstAmount || 0), 0);
  const gstPayable = salesGSTTotal - purchaseGSTTotal;
  const gstLabel = gstPayable >= 0 ? "GST Payable" : "GST Credit (Carry Forward)";

  const handleDelete = async (type, id) => {
    const endpoint = type === "purchase" ? `/purchases/${id}` : `/sales/${id}`;
    try {
      await axios.delete(endpoint);
      fetchGSTDetails();
    } catch {
      alert("Failed to delete entry");
    }
  };

  const Table = ({ title, data, type }) => (
    <section className="space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="w-full overflow-x-auto rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="min-w-[800px] w-full text-sm text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">{type === "purchase" ? "Vendor" : "Customer"}</th>
              <th className="px-4 py-2 text-left">GST No</th>
              <th className="px-4 py-2 text-right">Base (₹)</th>
              <th className="px-4 py-2 text-right">CGST</th>
              <th className="px-4 py-2 text-right">SGST</th>
              <th className="px-4 py-2 text-right">IGST</th>
              <th className="px-4 py-2 text-right">Total GST</th>
              <th className="px-4 py-2 text-right">Total (₹)</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.entries.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-4 text-gray-400 dark:text-gray-400">
                  No records found.
                </td>
              </tr>
            ) : (
              data.entries.map((e, i) => {
                const baseAmount = e.baseAmount || 0;
                const cgst = e.cgst || 0;
                const sgst = e.sgst || 0;
                const igst = e.igst || 0;
                const gstAmount = e.gstAmount || cgst + sgst + igst;
                const totalAmount = e.totalAmount || baseAmount + gstAmount;

                return (
                  <tr key={e._id || i} className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"}>
                    <td className="px-4 py-2 whitespace-nowrap">{new Date(e.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {type === "purchase" ? e.vendorName : e.customerName}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {type === "purchase" ? e.vendorGSTNo : e.customerGSTNo}
                    </td>
                    <td className="px-4 py-2 text-right">{fmt(baseAmount)}</td>
                    <td className="px-4 py-2 text-right">{fmt(cgst)}</td>
                    <td className="px-4 py-2 text-right">{fmt(sgst)}</td>
                    <td className="px-4 py-2 text-right">{fmt(igst)}</td>
                    <td className="px-4 py-2 text-right">{fmt(gstAmount)}</td>
                    <td className="px-4 py-2 text-right font-medium">{fmt(totalAmount)}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(type, e._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-gray-500 dark:text-gray-300 animate-pulse text-center">Loading GST details...</p>
      </div>
    );
  }

  return (
    <div className="pt-[72px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="space-y-10">
        <Table title="Purchase GST Details" data={purchaseData} type="purchase" />
        <Table title="Sales GST Details" data={salesData} type="sales" />

        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">GST Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 space-y-1">
              <p className="font-medium text-gray-900 dark:text-gray-100">GST on Purchases</p>
              <p className="text-right text-gray-700 dark:text-gray-200">{fmt(purchaseGSTTotal)}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 space-y-1">
              <p className="font-medium text-gray-900 dark:text-gray-100">GST on Sales</p>
              <p className="text-right text-gray-700 dark:text-gray-200">{fmt(salesGSTTotal)}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 space-y-1">
              <p className="font-medium text-gray-900 dark:text-gray-100">Total Purchase</p>
              <p className="text-right text-gray-700 dark:text-gray-200">{fmt(purchaseData.totalAmount)}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700 space-y-1">
              <p className="font-medium text-gray-900 dark:text-gray-100">Total Sales</p>
              <p className="text-right text-gray-700 dark:text-gray-200">{fmt(salesData.totalAmount)}</p>
            </div>
          </div>
          <div className="mt-6 text-center text-lg font-bold text-gray-900 dark:text-gray-100">
            {gstLabel}: ₹{Math.abs(gstPayable).toFixed(2)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GSTDetails;