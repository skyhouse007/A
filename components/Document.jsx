import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [docDescription, setDocDescription] = useState("");
  const axios = useAxios();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get("/documents");
        setDocuments(res.data);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      }
    };
    fetchDocuments();
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", docName || selectedFile.name);
    formData.append("description", docDescription);

    try {
      await axios.post("/documents", formData);
      alert("Document uploaded successfully.");
      setSelectedFile(null);
      setDocName("");
      setDocDescription("");
      const res = await axios.get("/documents");
      setDocuments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to upload document");
    }
  };

  const handleView = (doc) => {
    const filename = doc.filePath.split("/").pop();
    window.open(`http://localhost:5000/uploads/documents/${filename}`, "_blank");
  };

  const handleDownload = async (doc) => {
    const file = doc.filePath.split("/").pop();
    const url = `http://localhost:5000/uploads/documents/${file}`;
    const ext = file.split(".").pop();

    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute(
        "download",
        doc.name.toLowerCase().endsWith(`.${ext}`) ? doc.name : `${doc.name}.${ext}`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download file.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await axios.delete(`/documents/${id}`);
      setDocuments((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-blue-50 dark:bg-gray-900 rounded-xl shadow mt-8 space-y-6">
      <h2 className="text-2xl font-semibold text-blue-800 dark:text-white">
        Document Manager
      </h2>

      {/* Upload Form */}
      <form onSubmit={handleFileUpload} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Document Name"
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={docDescription}
          onChange={(e) => setDocDescription(e.target.value)}
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="border p-2 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <div className="md:col-span-3">
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            Upload Document
          </button>
        </div>
      </form>

      {/* Document Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
          <thead className="bg-blue-600 text-white text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Uploaded</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No documents uploaded.
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc._id} className="hover:bg-blue-100 dark:hover:bg-gray-700 transition">
                  <td className="p-3 border-t dark:border-gray-700">{doc.name}</td>
                  <td className="p-3 border-t dark:border-gray-700">{doc.description || "-"}</td>
                  <td className="p-3 border-t dark:border-gray-700">
                    {new Date(doc.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border-t dark:border-gray-700 text-center space-x-2">
                    <button
                      onClick={() => handleView(doc)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentManager;