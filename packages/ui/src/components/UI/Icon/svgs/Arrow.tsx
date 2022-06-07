import React from "react";
import { IconProps } from "../Icon.types";

const Arrow: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 12H22M2 12L12 2M2 12L12 22" stroke="#1A1A1A" />
    </svg>
  );
};

export default Arrow;
