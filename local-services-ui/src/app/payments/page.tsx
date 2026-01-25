"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  CreditCard, 
  Plus,
  Trash2,
  Edit3,
  Shield,
  Check,
  AlertCircle,
  Wallet,
  Building,
  Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/ToastProvider";

interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "bank";
  title: string;
  details: string;
  isDefault: boolean;
  lastUsed?: string;
  expiryDate?: string;
  cardNumber?: string;
  upiId?: string;
  bankAccount?: string;
}

export default function PaymentsPage() {
  const router = useRouter();
  const { push: showToast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [formData, setFormData] = useState({
    type: "card" as "card" | "upi" | "bank",
    title: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    holderName: "",
    upiId: "",
    bankAccount: "",
    ifscCode: "",
    accountHolderName: ""
  });

  // Simulate database fetch
  const fetchPaymentMethodsFromDatabase = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const savedMethods = localStorage.getItem("paymentMethods");
      if (savedMethods) {
        return JSON.parse(savedMethods);
      } else {
        // Generate dynamic payment methods based on current user
        const userProfile = JSON.parse(localStorage.getItem("customerProfile") || "{}");
        const userName = userProfile.name || "John Doe";
        const userEmail = userProfile.email || "user@example.com";
        
        const defaultMethods: PaymentMethod[] = [
          {
            id: "1",
            type: "card",
            title: `Visa ending in ${Math.floor(Math.random() * 9000) + 1000}`,
            details: `**** **** **** ${Math.floor(Math.random() * 9000) + 1000}`,
            isDefault: true,
            lastUsed: "2 days ago",
            expiryDate: "12/26"
          },
          {
            id: "2",
            type: "upi",
            title: "PhonePe",
            details: userEmail.split('@')[0] + "@ybl",
            isDefault: false,
            lastUsed: "1 week ago"
          }
        ];
        localStorage.setItem("paymentMethods", JSON.stringify(defaultMethods));
        return defaultMethods;
      }
    } catch (error) {
      console.error("Failed to fetch payment methods:", error);
      return [];
    }
  };

  useEffect(() => {
    // Load payment methods dynamically
    fetchPaymentMethodsFromDatabase().then(methods => {
      setPaymentMethods(methods);
    });
  }, []);

  const handleAddMethod = () => {
    if (!formData.title) {
      showToast({ title: "Please fill in all required fields", tone: "error" });
      return;
    }

    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: formData.type,
      title: formData.title,
      details: getDetailsFromForm(),
      isDefault: paymentMethods.length === 0,
      lastUsed: "Just added"
    };

    const updatedMethods = [...paymentMethods, newMethod];
    setPaymentMethods(updatedMethods);
    localStorage.setItem("paymentMethods", JSON.stringify(updatedMethods));
    
    setShowAddForm(false);
    resetForm();
    showToast({ title: "Payment method added successfully!", tone: "success" });
  };

  const getDetailsFromForm = () => {
    switch (formData.type) {
      case "card":
        return `**** **** **** ${formData.cardNumber.slice(-4)}`;
      case "upi":
        return formData.upiId;
      case "bank":
        return `****${formData.bankAccount.slice(-4)}`;
      default:
        return "";
    }
  };

  const resetForm = () => {
    setFormData({
      type: "card",
      title: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      holderName: "",
      upiId: "",
      bankAccount: "",
      ifscCode: "",
      accountHolderName: ""
    });
  };

  const handleSetDefault = (id: string) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }));
    setPaymentMethods(updatedMethods);
    localStorage.setItem("paymentMethods", JSON.stringify(updatedMethods));
    showToast({ title: "Default payment method updated!", tone: "success" });
  };

  const handleDeleteMethod = (id: string) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    setPaymentMethods(updatedMethods);
    localStorage.setItem("paymentMethods", JSON.stringify(updatedMethods));
    showToast({ title: "Payment method removed!", tone: "success" });
  };

  const getPaymentIcon = (type: string) => {
    const iconStyle = { color: 'lab(66.9756% -58.27 19.5419)' };
    switch (type) {
      case "card":
        return <CreditCard size={24} style={iconStyle} />;
      case "upi":
        return <Smartphone size={24} style={iconStyle} />;
      case "bank":
        return <Building size={24} style={iconStyle} />;
      default:
        return <Wallet size={24} style={iconStyle} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional clean background */}

      <div className="w-full max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-6 group">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <ArrowLeft size={18} />
            </div>
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Payment Methods
              </h1>
              <p className="text-gray-600">
                Manage your saved payment methods securely
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="backdrop-blur-sm bg-white/50 border border-white/30 text-gray-900 hover:bg-white/70"
              style={{ 
                borderColor: 'lab(66.9756% -58.27 19.5419)',
                backgroundColor: 'rgba(67, 140, 88, 0.1)'
              }}
            >
              <Plus size={20} />
              Add New Method
            </Button>
          </div>
        </div>

        {/* Payment Methods List with Glassy Effects */}
        <div className="grid gap-6 mb-8">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/50 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                      {getPaymentIcon(method.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900">{method.title}</h3>
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-white/70 backdrop-blur-sm border border-white/40 text-gray-700 text-xs font-medium rounded-full"
                                style={{ borderColor: 'lab(66.9756% -58.27 19.5419)' }}>
                            <Check size={12} className="inline mr-1" style={{ color: 'lab(66.9756% -58.27 19.5419)' }} />
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 font-mono">{method.details}</p>
                      <p className="text-sm text-gray-500 mt-1">Last used: {method.lastUsed}</p>
                      {method.expiryDate && (
                        <p className="text-sm text-gray-500">Expires: {method.expiryDate}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <Button
                        onClick={() => handleSetDefault(method.id)}
                        variant="outline"
                        size="sm"
                        className="backdrop-blur-sm bg-white/50 border-white/40 hover:bg-white/70"
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDeleteMethod(method.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:border-red-300 backdrop-blur-sm bg-white/50 border-white/40 hover:bg-red-50/70"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {paymentMethods.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Payment Methods</h3>
              <p className="text-gray-600 mb-6">Add a payment method to get started with bookings</p>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Plus size={20} />
                Add Your First Method
              </Button>
            </div>
          )}
        </div>

        {/* Add Payment Method Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Payment Method</h2>

                {/* Payment Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { type: "card", label: "Card", icon: CreditCard },
                      { type: "upi", label: "UPI", icon: Smartphone },
                      { type: "bank", label: "Bank", icon: Building }
                    ].map(({ type, label, icon: Icon }) => (
                      <button
                        key={type}
                        onClick={() => setFormData({ ...formData, type: type as any })}
                        className={`p-3 rounded-lg border transition-all duration-200 ${
                          formData.type === type
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Icon size={24} className={`mx-auto mb-2 ${
                          formData.type === type ? "text-purple-600" : "text-gray-600"
                        }`} />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Form */}
                {formData.type === "card" && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Card Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Personal Visa Card"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                        <input
                          type="password"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          placeholder="123"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* UPI Form */}
                {formData.type === "upi" && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">UPI ID</label>
                      <input
                        type="text"
                        value={formData.upiId}
                        onChange={(e) => setFormData({ ...formData, upiId: e.target.value, title: e.target.value })}
                        placeholder="john.doe@ybl"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </>
                )}

                {/* Bank Form */}
                {formData.type === "bank" && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Account Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Primary Savings Account"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number</label>
                      <input
                        type="text"
                        value={formData.bankAccount}
                        onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                        placeholder="1234567890123456"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">IFSC Code</label>
                      <input
                        type="text"
                        value={formData.ifscCode}
                        onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                        placeholder="SBIN0001234"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => {
                      setShowAddForm(false);
                      resetForm();
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddMethod}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    Add Method
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield size={20} className="text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Payment Data is Secure</h3>
              <p className="text-gray-600 leading-relaxed">
                We use bank-level encryption to protect your payment information. Your card details are never stored on our servers and all transactions are processed through secure payment gateways.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
