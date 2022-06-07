import React from "react";
import { IconProps } from "../Icon.types";

const CategoryPressed: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill="white" />
      <path d="M3 5H21" stroke="#256FFF" strokeWidth="2" />
      <path d="M3 12H21" stroke="#256FFF" strokeWidth="2" />
      <path d="M3 19H21" stroke="#256FFF" strokeWidth="2" />
    </svg>
  );
};

export default CategoryPressed;
