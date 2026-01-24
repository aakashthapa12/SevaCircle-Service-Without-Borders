"use client";

import React from "react";
import cn from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "success" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizes: Record<string, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const variants: Record<string, string> = {
    primary: "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300 hover:from-gray-200 hover:to-gray-300 hover:shadow-md",
    success: "bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-xl hover:scale-105",
    ghost: "bg-transparent text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50",
  };

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
