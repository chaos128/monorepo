import React from "react";
import { IconProps } from "../Icon.types";

const PurchaseGuideDefault: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 24"
      fill="none"
    >
      <path
        d="M0.875 2.25C0.875 1.42157 1.54657 0.75 2.375 0.75H19V21.125H0.875V2.25Z"
        stroke="#1A1A1A"
      />
      <path
        d="M0.875 21.375C0.875 20.5466 1.54657 19.875 2.375 19.875H19V23.375H2.375C1.54657 23.375 0.875 22.7034 0.875 21.875V21.375Z"
        fill="white"
        stroke="#1A1A1A"
      />
      <rect x="5.375" y="5.25" width="10.25" height="2.375" stroke="#1A1A1A" />
      <path d="M2.625 1.375L2.625 20.5" stroke="#1A1A1A" />
    </svg>
  );
};

export default PurchaseGuideDefault;
