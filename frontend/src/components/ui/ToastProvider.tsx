"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import cn from "clsx";

type Toast = {
  id: string;
  title?: string;
  description?: string;
  tone?: "success" | "info" | "error";
};

type Context = {
  toasts: Toast[];
  push: (t: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<Context | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    setToasts((s) => [{ id, ...t }, ...s]);
    // Auto dismiss
    setTimeout(() => {
      setToasts((s) => s.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((s) => s.filter((x) => x.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, push, dismiss }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "min-w-[260px] max-w-sm rounded-xl p-4 shadow-lg flex items-start gap-3",
              t.tone === "success" && "bg-gradient-to-r from-green-50 to-green-100 border border-green-200",
              t.tone === "error" && "bg-gradient-to-r from-red-50 to-red-100 border border-red-200",
              t.tone === "info" && "bg-white border border-gray-100"
            )}
          >
            <div className="flex-1">
              {t.title && <div className="font-bold text-gray-900 mb-1">{t.title}</div>}
              {t.description && <div className="text-sm text-gray-700">{t.description}</div>}
            </div>
            <button onClick={() => dismiss(t.id)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
