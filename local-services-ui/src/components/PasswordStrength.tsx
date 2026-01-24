"use client";

import React from "react";

interface PasswordStrengthProps {
  password?: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password = "" }) => {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const label = ["", "Very Weak", "Weak", "Fair", "Good", "Strong"][strength];
  const color =
    strength <= 2
      ? "bg-red-500"
      : strength <= 3
      ? "bg-yellow-500"
      : "bg-green-500";

  if (!password) return null;

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-600 w-24 text-right">
        {label}
      </span>
    </div>
  );
};

export default PasswordStrength;
