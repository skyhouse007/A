import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  FileText,
  Download,
  Send,
  Printer,
  Plus,
  Minus,
  Upload,
  Eye,
  Settings,
  Calculator,
  Receipt,
  Building,
  User,
  Phone,
  MapPin,
  Hash,
  Calendar,
  DollarSign,
  Percent,
  Save,
  Share2,
  Edit3,
  CheckCircle,
  AlertCircle,
  X,
  Copy,
  Mail,
  MessageCircle,
  Menu,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Tablet,
  Monitor,
} from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Modern Professional",
    preview: "🏢",
    gradient: "from-blue-600 to-indigo-700",
    accent: "blue",
    theme: {
      primary: "bg-blue-600",
      secondary: "bg-blue-50",
      text: "text-blue-900",
      border: "border-blue-200",
    },
  },
  {
    id: 2,
    name: "Corporate Elite",
    preview: "⚡",
    gradient: "from-gray-800 to-gray-900",
    accent: "gray",
    theme: {
      primary: "bg-gray-800",
      secondary: "bg-gray-50",
      text: "text-gray-900",
      border: "border-gray-200",
    },
  },
  {
    id: 3,
    name: "Creative Studio",
    preview: "🎨",
    gradient: "from-purple-600 to-pink-600",
    accent: "purple",
    theme: {
      primary: "bg-purple-600",
      secondary: "bg-purple-50",
      text: "text-purple-900",
      border: "border-purple-200",
    },
  },
  {
    id: 4,
    name: "Financial Pro",
    preview: "💼",
    gradient: "from-emerald-600 to-teal-600",
    accent: "emerald",
    theme: {
      primary: "bg-emerald-600",
      secondary: "bg-emerald-50",
      text: "text-emerald-900",
      border: "border-emerald-200",
    },
  },
];

const defaultItems = [
  {
    description: "Professional Service",
    hsn: "998314",
    quantity: 1,
    rate: 1000,
    amount: 1000,
    taxRate: 18,
  },
];

function numberToWords(num) {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  if (num === 0) return "Zero Rupees Only";
  if (num < 10) return ones[num] + " Rupees Only";
  if (num < 20) return teens[num - 10] + " Rupees Only";
  if (num < 100)
    return tens[Math.floor(num / 10)] + " " + ones[num % 10] + " Rupees Only";
  if (num < 1000)
    return (
      ones[Math.floor(num / 100)] +
      " Hundred " +
      numberToWords(num % 100).replace(" Rupees Only", "") +
      " Rupees Only"
    );
  if (num < 100000)
    return (
      numberToWords(Math.floor(num / 1000)) +
      " Thousand " +
      numberToWords(num % 1000).replace(" Rupees Only", "")
    );

  return Math.floor(num).toLocaleString("en-IN") + " Rupees Only";
}

const SalesToBillContext = React.createContext();

const Billing = () => {
  // State Management
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    templates: true,
    settings: false,
    actions: false,
  });

  const [company, setCompany] = useState({
    name: "DataPlay Technologies",
    address: "123 Business District, Tech Park",
    phone: "+91 98765 43210",
    email: "contact@dataplay.tech",
    gstin: "07AABCU9603R1Z6",
    logo: null,
  });

  const [customer, setCustomer] = useState({
    name: "Khandelwal Furniture",
    address: "456 Industrial Area, Furniture Hub",
    phone: "+91 87654 32109",
    email: "orders@khandelwalfurniture.com",
    gstin: "06BZAHM6385P6Z2",
  });

  const [invoice, setInvoice] = useState({
    number: "INV-2024-001",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    poNumber: "",
    reference: "",
  });

  const [items, setItems] = useState(defaultItems);
  const [settings, setSettings] = useState({
    currency: "INR",
    taxType: "GST",
    showHSN: true,
    showSignature: true,
    termsAndConditions:
      "1. Payment is due within 30 days\n2. Late payments may incur additional charges\n3. All disputes subject to local jurisdiction",
  });

  const [calculations, setCalculations] = useState({
    subtotal: 0,
    taxAmount: 0,
    total: 0,
    received: 0,
    balance: 0,
  });

  const billRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [pdfMode, setPdfMode] = useState(false);

  // Responsive state
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Calculate totals
  useEffect(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0,
    );
    const taxAmount = items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.rate;
      return sum + (itemTotal * (item.taxRate || 0)) / 100;
    }, 0);
    const total = subtotal + taxAmount;

    setCalculations((prev) => ({
      ...prev,
      subtotal,
      taxAmount,
      total,
      balance: total - prev.received,
    }));
  }, [items, calculations.received]);

  const template = templates.find((t) => t.id === selectedTemplate);

  // Item Management
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    if (field === "quantity" || field === "rate") {
      updatedItems[index].amount =
        updatedItems[index].quantity * updatedItems[index].rate;
    }

    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        hsn: "",
        quantity: 1,
        rate: 0,
        amount: 0,
        taxRate: 18,
      },
    ]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // File Upload Handlers
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCompany((prev) => ({ ...prev, logo: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // PDF Generation
  const generatePDF = async () => {
    setPdfMode(true);
    setIsPreviewMode(true);

    setTimeout(async () => {
      const element = billRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio,
      );
      pdf.save(`Invoice-${invoice.number}.pdf`);

      setPdfMode(false);
      setIsPreviewMode(false);
    }, 100);
  };

  // WhatsApp Share
  const shareWhatsApp = async () => {
    setUploading(true);
    try {
      await generatePDF();
      const message = `Hi ${customer.name},\n\nPlease find your invoice ${invoice.number} attached.\n\nAmount: ₹${calculations.total.toLocaleString()}\nDue Date: ${invoice.dueDate}\n\nThank you for your business!\n\nBest regards,\n${company.name}`;
      const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Error sharing to WhatsApp:", error);
    } finally {
      setUploading(false);
    }
  };

  const handlePrint = () => {
    setIsPreviewMode(true);
    setTimeout(() => {
      window.print();
      setIsPreviewMode(false);
    }, 100);
  };

  const steps = [
    { id: 1, name: "Company", icon: Building, shortName: "Co." },
    { id: 2, name: "Customer", icon: User, shortName: "Cust." },
    { id: 3, name: "Items", icon: Receipt, shortName: "Items" },
    { id: 4, name: "Preview", icon: Eye, shortName: "View" },
  ];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Mobile-specific components
  const MobileHeader = () => (
    <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg bg-gradient-to-r ${template.gradient} flex items-center justify-center text-white font-bold text-sm`}
          >
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Billing
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Professional Invoice
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Actions Bar */}
      <div className="flex items-center justify-between px-4 pb-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              isPreviewMode
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <Eye className="w-3 h-3 mr-1 inline" />
            {isPreviewMode ? "Edit" : "Preview"}
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={generatePDF}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={shareWhatsApp}
            disabled={uploading}
            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-all"
            title="Share via WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={handlePrint}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all"
            title="Print"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Step Navigation */}
      {!isPreviewMode && (
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-full flex items-center justify-center p-2 rounded-md text-xs font-medium transition-all ${
                    currentStep === step.id
                      ? "bg-blue-600 text-white"
                      : currentStep > step.id
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-500 border border-gray-200"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : (
                    <>
                      <step.icon className="w-3 h-3 mr-1" />
                      {isMobile ? step.shortName : step.name}
                    </>
                  )}
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-2 h-0.5 mx-1 ${
                      currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const MobileSidebar = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed top-0 left-0 h-full w-96 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Settings
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Templates Section */}
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection("templates")}
                >
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Templates
                  </h3>
                  {expandedSections.templates ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                {expandedSections.templates && (
                  <div className="space-y-2">
                    {templates.map((tmpl) => (
                      <motion.div
                        key={tmpl.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedTemplate(tmpl.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedTemplate === tmpl.id
                            ? `border-${tmpl.accent}-500 bg-${tmpl.accent}-50`
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg bg-gradient-to-r ${tmpl.gradient} flex items-center justify-center text-lg`}
                          >
                            {tmpl.preview}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 text-sm">
                              {tmpl.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Professional design
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Settings */}
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection("settings")}
                >
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Settings
                  </h3>
                  {expandedSections.settings ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                {expandedSections.settings && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Currency
                      </label>
                      <select
                        value={settings.currency}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            currency: e.target.value,
                          }))
                        }
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">
                        Show HSN/SAC
                      </span>
                      <button
                        onClick={() =>
                          setSettings((prev) => ({
                            ...prev,
                            showHSN: !prev.showHSN,
                          }))
                        }
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          settings.showHSN ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            settings.showHSN ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div>
                <div
                  className="flex items-center justify-between cursor-pointer mb-3"
                  onClick={() => toggleSection("actions")}
                >
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Actions
                  </h3>
                  {expandedSections.actions ? (
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
                {expandedSections.actions && (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        generatePDF();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </button>

                    <button
                      onClick={() => {
                        shareWhatsApp();
                        setIsMobileMenuOpen(false);
                      }}
                      disabled={uploading}
                      className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {uploading ? "Sharing..." : "Share WhatsApp"}
                    </button>

                    <button
                      onClick={() => {
                        handlePrint();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Invoice
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

      {/* Desktop Header with Hamburger next to Preview Mode */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-full px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${template.gradient} flex items-center justify-center text-white font-bold text-lg`}>
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Professional Billing</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create beautiful invoices</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${isPreviewMode ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              <Eye className="w-4 h-4 mr-2 inline" />
              {isPreviewMode ? "Edit Mode" : "Preview Mode"}
            </button>
            {/* Hamburger for Templates/Settings */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              title="Show Templates & Settings"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar/Drawer for Templates & Settings (always available) */}
      <MobileSidebar />

      <div className="w-full px-4 py-4">
        <div className="grid gap-4 grid-cols-1">
          {/* Main Content (always stacked) */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Invoice Preview */}
              <div ref={billRef} className="p-4 print:p-0">
                <div
                  className={`max-w-full mx-auto ${pdfMode ? "print:shadow-none" : "shadow-lg"} bg-white rounded-lg overflow-hidden`}
                >
                  {/* Header */}
                  <div
                    className={`bg-gradient-to-r ${template.gradient} px-4 py-4 text-white`}
                  >
                    <div className="flex flex-col items-start justify-between gap-4">
                      {company.logo && (
                        <img
                          src={company.logo}
                          alt="Company Logo"
                          className="rounded-lg mx-auto"
                          style={{ maxWidth: '180px', maxHeight: '80px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }}
                        />
                      )}
                      <div>
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
                          {company.name}
                        </h1>
                        <p className="text-white/80 text-xs sm:text-sm mt-1">
                          {company.address}
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mt-2 text-xs sm:text-sm text-white/80">
                          <span>{company.phone}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{company.email}</span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                          INVOICE
                        </div>
                        <div className="text-white/80 text-sm mt-1">
                          #{invoice.number}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Details */}
                  <div className="px-4 py-4 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          Bill To
                        </h3>
                        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">
                            {customer.name}
                          </div>
                          <div className="text-gray-600 text-xs sm:text-sm mt-1">
                            {customer.address}
                          </div>
                          <div className="text-gray-600 text-xs sm:text-sm">
                            {customer.phone}
                          </div>
                          <div className="text-gray-600 text-xs sm:text-sm">
                            {customer.email}
                          </div>
                          {customer.gstin && (
                            <div className="text-gray-600 text-xs sm:text-sm">
                              GSTIN: {customer.gstin}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          Invoice Details
                        </h3>
                        <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
                          <div className="grid grid-cols-2 gap-2 items-center">
                            <div className="text-xs sm:text-sm text-gray-500">Date:</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">
                              {isPreviewMode ? (
                                invoice.date
                              ) : (
                                <input
                                  type="date"
                                  value={invoice.date}
                                  onChange={e => setInvoice(prev => ({ ...prev, date: e.target.value }))}
                                  className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm"
                                />
                              )}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">Due Date:</div>
                            <div className="text-xs sm:text-sm text-gray-900 font-medium">
                              {isPreviewMode ? (
                                invoice.dueDate
                              ) : (
                                <input
                                  type="date"
                                  value={invoice.dueDate}
                                  onChange={e => setInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                                  className="border border-gray-300 rounded px-2 py-1 text-xs sm:text-sm"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="overflow-x-auto">
                      <div className="min-w-full overflow-hidden rounded-lg border border-gray-200">
                        <table className="min-w-full">
                          <thead
                            className={`bg-gradient-to-r ${template.gradient} text-white`}
                          >
                            <tr>
                              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
                                #
                              </th>
                              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
                                Description
                              </th>
                              {settings.showHSN && (
                                <th className="hidden sm:table-cell px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">
                                  HSN/SAC
                                </th>
                              )}
                              <th className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-semibold">
                                Qty
                              </th>
                              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">
                                Rate
                              </th>
                              <th className="hidden sm:table-cell px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">
                                Tax %
                              </th>
                              <th className="px-2 sm:px-4 py-2 sm:py-3 text-right text-xs sm:text-sm font-semibold">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {items.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">
                                  {index + 1}
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">
                                  {item.description}
                                  {settings.showHSN && (
                                    <div className="sm:hidden text-xs text-gray-500 mt-1">
                                      HSN: {item.hsn}
                                    </div>
                                  )}
                                  <div className="sm:hidden text-xs text-gray-500 mt-1">
                                    Tax: {item.taxRate}%
                                  </div>
                                </td>
                                {settings.showHSN && (
                                  <td className="hidden sm:table-cell px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-500">
                                    {item.hsn}
                                  </td>
                                )}
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-center text-gray-900">
                                  {item.quantity}
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right text-gray-900">
                                  ₹{item.rate.toLocaleString()}
                                </td>
                                <td className="hidden sm:table-cell px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right text-gray-900">
                                  {item.taxRate}%
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-right font-semibold text-gray-900">
                                  ₹
                                  {(item.quantity * item.rate).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gray-50">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                      <div className="w-full lg:w-1/2">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                          Amount in Words
                        </h4>
                        <p className="text-gray-600 italic text-xs sm:text-sm">
                          {numberToWords(calculations.total)}
                        </p>

                        {settings.termsAndConditions && (
                          <div className="mt-4 sm:mt-6">
                            <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                              Terms & Conditions
                            </h4>
                            <div className="text-xs sm:text-sm text-gray-600 whitespace-pre-line">
                              {settings.termsAndConditions}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="w-full lg:w-1/2 lg:max-w-xs">
                        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                          <div className="space-y-2 sm:space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Subtotal:</span>
                              <span className="font-medium">
                                ₹{calculations.subtotal.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Tax:</span>
                              <span className="font-medium">
                                ₹{calculations.taxAmount.toLocaleString()}
                              </span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 sm:pt-3">
                              <div className="flex justify-between items-center">
                                <span className="text-base sm:text-lg font-semibold text-gray-900">
                                  Total:
                                </span>
                                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                                  ₹{calculations.total.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className={`bg-gradient-to-r ${template.gradient} px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-white`}
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      <div className="text-xs sm:text-sm">
                        Thank you for your business!
                      </div>
                      <div className="text-xs sm:text-sm">
                        {company.name} | {company.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Form Inputs (Desktop) */}
          {!isPreviewMode && (
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
                {/* Steps */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <button
                          onClick={() => setCurrentStep(step.id)}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all ${
                            currentStep === step.id
                              ? "bg-blue-600 text-white"
                              : currentStep > step.id
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {currentStep > step.id ? (
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <step.icon className="w-3 h-3 sm:w-5 sm:h-5" />
                          )}
                        </button>
                        {index < steps.length - 1 && (
                          <div
                            className={`w-6 sm:w-8 h-1 mx-1 sm:mx-2 rounded ${
                              currentStep > step.id
                                ? "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-4 sm:p-6">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          Company Details
                        </h3>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={company.name}
                            onChange={(e) =>
                              setCompany((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <textarea
                            value={company.address}
                            onChange={(e) =>
                              setCompany((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              Phone
                            </label>
                            <input
                              type="text"
                              value={company.phone}
                              onChange={(e) =>
                                setCompany((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={company.email}
                              onChange={(e) =>
                                setCompany((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            GSTIN
                          </label>
                          <input
                            type="text"
                            value={company.gstin}
                            onChange={(e) =>
                              setCompany((prev) => ({
                                ...prev,
                                gstin: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Company Logo
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                            <div className="space-y-1 text-center">
                              <Upload className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                              <div className="flex text-xs sm:text-sm text-gray-600">
                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                  <span>Upload logo</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="sr-only"
                                  />
                                </label>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG up to 2MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          Customer Details
                        </h3>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Customer Name
                          </label>
                          <input
                            type="text"
                            value={customer.name}
                            onChange={(e) =>
                              setCustomer((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <textarea
                            value={customer.address}
                            onChange={(e) =>
                              setCustomer((prev) => ({
                                ...prev,
                                address: e.target.value,
                              }))
                            }
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              Phone
                            </label>
                            <input
                              type="text"
                              value={customer.phone}
                              onChange={(e) =>
                                setCustomer((prev) => ({
                                  ...prev,
                                  phone: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              type="email"
                              value={customer.email}
                              onChange={(e) =>
                                setCustomer((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            GSTIN
                          </label>
                          <input
                            type="text"
                            value={customer.gstin}
                            onChange={(e) =>
                              setCustomer((prev) => ({
                                ...prev,
                                gstin: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              Invoice Date
                            </label>
                            <input
                              type="date"
                              value={invoice.date}
                              onChange={(e) =>
                                setInvoice((prev) => ({
                                  ...prev,
                                  date: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              Due Date
                            </label>
                            <input
                              type="date"
                              value={invoice.dueDate}
                              onChange={(e) =>
                                setInvoice((prev) => ({
                                  ...prev,
                                  dueDate: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                            Invoice Number
                          </label>
                          <input
                            type="text"
                            value={invoice.number}
                            onChange={(e) =>
                              setInvoice((prev) => ({
                                ...prev,
                                number: e.target.value,
                              }))
                            }
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                            Items
                          </h3>
                          <button
                            onClick={addItem}
                            className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            Add
                          </button>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {items.map((item, index) => (
                            <div
                              key={index}
                              className="p-3 sm:p-4 border border-gray-200 rounded-lg space-y-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm font-medium text-gray-700">
                                  Item #{index + 1}
                                </span>
                                {items.length > 1 && (
                                  <button
                                    onClick={() => removeItem(index)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                  >
                                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                  </button>
                                )}
                              </div>

                              <div>
                                <input
                                  type="text"
                                  placeholder="Item description"
                                  value={item.description}
                                  onChange={(e) =>
                                    handleItemChange(
                                      index,
                                      "description",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>

                              {settings.showHSN && (
                                <div>
                                  <input
                                    type="text"
                                    placeholder="HSN/SAC Code"
                                    value={item.hsn}
                                    onChange={(e) =>
                                      handleItemChange(
                                        index,
                                        "hsn",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                              )}

                              <div className="grid grid-cols-3 gap-2">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">
                                    Qty
                                  </label>
                                  <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleItemChange(
                                        index,
                                        "quantity",
                                        parseInt(e.target.value) || 1,
                                      )
                                    }
                                    className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">
                                    Rate
                                  </label>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.rate}
                                    onChange={(e) =>
                                      handleItemChange(
                                        index,
                                        "rate",
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                    className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1">
                                    Tax %
                                  </label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={item.taxRate}
                                    onChange={(e) =>
                                      handleItemChange(
                                        index,
                                        "taxRate",
                                        parseFloat(e.target.value) || 0,
                                      )
                                    }
                                    className="w-full px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  />
                                </div>
                              </div>

                              <div className="text-right">
                                <span className="text-xs sm:text-sm font-medium text-gray-700">
                                  Amount: ₹
                                  {(item.quantity * item.rate).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                              Terms & Conditions
                            </label>
                            <textarea
                              value={settings.termsAndConditions}
                              onChange={(e) =>
                                setSettings((prev) => ({
                                  ...prev,
                                  termsAndConditions: e.target.value,
                                }))
                              }
                              rows={3}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 4 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          Invoice Summary
                        </h3>

                        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Items:</span>
                              <span className="font-medium">
                                {items.length}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Subtotal:</span>
                              <span className="font-medium">
                                ₹{calculations.subtotal.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Tax:</span>
                              <span className="font-medium">
                                ₹{calculations.taxAmount.toLocaleString()}
                              </span>
                            </div>
                            <div className="border-t border-gray-200 pt-2">
                              <div className="flex justify-between">
                                <span className="text-base sm:text-lg font-semibold">
                                  Total:
                                </span>
                                <span className="text-base sm:text-lg font-bold text-blue-600">
                                  ₹{calculations.total.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          <button
                            onClick={generatePDF}
                            className="w-full flex items-center justify-center px-4 py-2 sm:py-3 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                          >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Download PDF
                          </button>

                          <button
                            onClick={shareWhatsApp}
                            disabled={uploading}
                            className="w-full flex items-center justify-center px-4 py-2 sm:py-3 border border-transparent text-xs sm:text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            {uploading ? "Sharing..." : "Share WhatsApp"}
                          </button>

                          <button
                            onClick={handlePrint}
                            className="w-full flex items-center justify-center px-4 py-2 sm:py-3 border border-gray-300 text-xs sm:text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                          >
                            <Printer className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                            Print Invoice
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button
                      onClick={() =>
                        setCurrentStep(Math.max(1, currentStep - 1))
                      }
                      disabled={currentStep === 1}
                      className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    <div className="text-xs sm:text-sm text-gray-500">
                      Step {currentStep} of {steps.length}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentStep(Math.min(steps.length, currentStep + 1))
                      }
                      disabled={currentStep === steps.length}
                      className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation (only visible in edit mode) */}
      {isMobile && !isPreviewMode && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="text-sm text-gray-500">
              {currentStep}/{steps.length}
            </div>

            <button
              onClick={() =>
                setCurrentStep(Math.min(steps.length, currentStep + 1))
              }
              disabled={currentStep === steps.length}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          #invoice-preview,
          #invoice-preview * {
            visibility: visible;
          }
          #invoice-preview {
            position: absolute;
            left: 0;
            top: 0;
          }
        }

        @media (max-width: 640px) {
          .overflow-x-auto table {
            font-size: 0.75rem;
          }
          .overflow-x-auto th,
          .overflow-x-auto td {
            padding: 0.5rem 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Billing;
