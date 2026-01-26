"use client";

import React from "react";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "info" | "success" | "warning" | "neutral";
};

export const Badge: React.FC<Props> = ({ tone = "info", children, className, ...props }) => {
  const tones: Record<string, string> = {
    info: "bg-gradient-to-r from-blue-50 to-indigo-100 text-blue-700 border border-blue-200",
    success: "bg-gradient-to-r from-green-50 to-emerald-100 text-green-700 border border-green-200",
    warning: "bg-gradient-to-r from-orange-50 to-amber-100 text-orange-700 border border-orange-200",
    neutral: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-200",
  };

  return (
    <span className={`${tones[tone]} px-3 py-1 rounded-full text-sm font-semibold ${className || ""}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
