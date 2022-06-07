import React from "react";

// Generated with util/create-component.js
export interface ButtonProps {
  size?: "xl" | "l" | "m" | "s";
  radius?: "xl" | "l" | "m" | "s";
  children?: React.ReactNode;
  type?: "primary" | "cta" | "outline";
  disabled?: boolean;
  color?: "blue" | "gray";
  onClick?: () => void;
  className?: string;
  fluid?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}
