import React from "react";
import { IconProps } from "../Icon.types";

const CategoryDefault: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill="white" />
      <path d="M3 5H21" stroke="black" />
      <path d="M3 12H21" stroke="black" />
      <path d="M3 19H21" stroke="black" />
    </svg>
  );
};

export default CategoryDefault;
