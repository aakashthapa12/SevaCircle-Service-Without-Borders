"use client";

import { useState, useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
}

export const Toast = ({ message, type = "success", duration = 3000 }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 px-6 py-4 rounded-lg text-white shadow-lg flex items-center gap-2 z-50 animate-fade-in ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`}>
      {type === "success" ? (
        <Check size={20} />
      ) : (
        <AlertCircle size={20} />
      )}
      <span>{message}</span>
    </div>
  );
};
