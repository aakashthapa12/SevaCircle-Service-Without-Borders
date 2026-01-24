"use client";

import React from "react";
import cn from "clsx";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean;
};

export const Card: React.FC<CardProps> = ({ elevated = true, className, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white overflow-hidden",
        elevated ? "shadow-elevation-2 border border-gray-100" : "border border-gray-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
