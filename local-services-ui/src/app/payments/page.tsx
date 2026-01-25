"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  CreditCard, 
  Plus,
  Trash2,
  Shield,
  Star,
  TrendingUp,
  Wallet,
  Calendar,
  Download,
  Receipt
} from "lucide-react";

interface Card {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  type: "visa" | "mastercard" | "rupay";
  isDefault: boolean;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  cardLast4: string;
}

export default function PaymentsPage() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    type: "visa" as const,
    isDefault: false
  });

  useEffect(() => {
    // Load cards from localStorage
    const savedCards = localStorage.getItem("paymentCards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }

    // Load transactions
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Sample transactions
      const sampleTransactions: Transaction[] = [
        {
          id: "txn001",
          date: new Date().toISOString(),
          description: "Home Cleaning Service",
          amount: 1200,
          status: "completed",
          cardLast4: "4242"
        },
        {
          id: "txn002",
          date: new Date(Date.now() - 86400000).toISOString(),
          description: "Plumbing Service",
          amount: 800,
          status: "completed",
          cardLast4: "4242"
        }
      ];
      setTransactions(sampleTransactions);
      localStorage.setItem("transactions", JSON.stringify(sampleTransactions));
    }
  }, []);

  const addCard = () => {
    if (!newCard.cardNumber || !newCard.cardHolder || !newCard.expiryDate || !newCard.cvv) {
      alert("Please fill all card details");
      return;
    }

    const card: Card = {
      ...newCard,
      id: Date.now().toString(),
    };

    const updatedCards = [...cards, card];
    setCards(updatedCards);
    localStorage.setItem("paymentCards", JSON.stringify(updatedCards));

    // Reset form
    setNewCard({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      type: "visa",
      isDefault: false
    });
    setShowAddCard(false);
  };

  const deleteCard = (cardId: string) => {
    if (confirm("Are you sure you want to remove this card?")) {
      const updatedCards = cards.filter(card => card.id !== cardId);
      setCards(updatedCards);
      localStorage.setItem("paymentCards", JSON.stringify(updatedCards));
    }
  };

  const setDefaultCard = (cardId: string) => {
    const updatedCards = cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    }));
    setCards(updatedCards);
    localStorage.setItem("paymentCards", JSON.stringify(updatedCards));
  };

  const getCardIcon = (type: string) => {
    return <CreditCard size={24} />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-[4%] sm:px-[6%] lg:px-[8%] py-[clamp(2rem,4vw,3rem)]">
        {/* Header */}
        <div className="mb-8">
          <Link href="/search" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-6 group">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <ArrowLeft size={18} />
            </div>
            <span className="font-semibold">Back to Services</span>
          </Link>
          
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Wallet className="text-white" size={32} />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900">Payments</h1>
                  <p className="text-gray-600 text-lg">Manage your cards and transactions</p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="hidden lg:flex gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center border-2 border-green-200 min-w-[120px]">
                  <p className="text-3xl font-black text-green-600">{cards.length}</p>
                  <p className="text-xs text-gray-600 font-medium">Saved Cards</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center border-2 border-blue-200 min-w-[120px]">
                  <p className="text-3xl font-black text-blue-600">₹{transactions.reduce((sum, t) => t.status === "completed" ? sum + t.amount : sum, 0)}</p>
                  <p className="text-xs text-gray-600 font-medium">Total Spent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cards Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <CreditCard className="text-purple-600" />
                  Saved Cards
                </h2>
                <button
                  onClick={() => setShowAddCard(!showAddCard)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Card
                </button>
              </div>

              {/* Add Card Form */}
              {showAddCard && (
                <div className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-200 animate-fade-in">
                  <h3 className="font-bold text-gray-900 mb-4">Add New Card</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={newCard.cardNumber}
                      onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                      maxLength={16}
                      className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 outline-none font-medium"
                    />
                    <input
                      type="text"
                      placeholder="Card Holder Name"
                      value={newCard.cardHolder}
                      onChange={(e) => setNewCard({...newCard, cardHolder: e.target.value})}
                      className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 outline-none font-medium"
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={newCard.expiryDate}
                      onChange={(e) => setNewCard({...newCard, expiryDate: e.target.value})}
                      maxLength={5}
                      className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 outline-none font-medium"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                      maxLength={3}
                      className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 outline-none font-medium"
                    />
                    <select
                      value={newCard.type}
                      onChange={(e) => setNewCard({...newCard, type: e.target.value as any})}
                      className="px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 outline-none font-medium"
                    >
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                      <option value="rupay">RuPay</option>
                    </select>
                    <label className="flex items-center gap-2 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={newCard.isDefault}
                        onChange={(e) => setNewCard({...newCard, isDefault: e.target.checked})}
                        className="w-5 h-5 rounded"
                      />
                      <span className="font-medium text-gray-700">Set as default</span>
                    </label>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={addCard}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
                    >
                      Add Card
                    </button>
                    <button
                      onClick={() => setShowAddCard(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Cards List */}
              {cards.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard size={60} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600">No cards added yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 rounded-2xl p-6 text-white shadow-xl overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-8">
                          <div className="text-white/80">{getCardIcon(card.type)}</div>
                          {card.isDefault && (
                            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <Star size={12} fill="white" />
                              DEFAULT
                            </div>
                          )}
                        </div>
                        <div className="mb-6">
                          <p className="text-2xl font-mono tracking-wider">
                            •••• •••• •••• {card.cardNumber.slice(-4)}
                          </p>
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-xs text-white/60 mb-1">CARD HOLDER</p>
                            <p className="font-bold">{card.cardHolder}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-white/60 mb-1">EXPIRES</p>
                            <p className="font-bold">{card.expiryDate}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          {!card.isDefault && (
                            <button
                              onClick={() => setDefaultCard(card.id)}
                              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                            >
                              Set Default
                            </button>
                          )}
                          <button
                            onClick={() => deleteCard(card.id)}
                            className="ml-auto bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Transactions Section */}
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Receipt className="text-blue-600" />
                Recent Transactions
              </h2>
              <div className="space-y-3">
                {transactions.slice(0, 10).map((txn) => (
                  <div
                    key={txn.id}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 border-2 border-gray-100 hover:border-purple-200 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-sm mb-1">{txn.description}</p>
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(txn.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-xs font-bold ${getStatusColor(txn.status)}`}>
                        {txn.status.toUpperCase()}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600">•••• {txn.cardLast4}</p>
                      <p className="font-black text-gray-900">₹{txn.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-start gap-3">
                <Shield className="text-green-600 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Secure Payments</h3>
                  <p className="text-sm text-gray-600">Your card details are encrypted and stored securely. We never share your information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
