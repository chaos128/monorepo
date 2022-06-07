import React from "react";
import { IconProps } from "../Icon.types";

const Close: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L19 19M19 1L1 19" stroke="#1A1A1A" />
    </svg>
  );
};

export default Close;
