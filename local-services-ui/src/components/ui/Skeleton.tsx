"use client";

import React from "react";

export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => {
  return <div className={`skeleton rounded-md ${className}`}></div>;
};

export default Skeleton;
