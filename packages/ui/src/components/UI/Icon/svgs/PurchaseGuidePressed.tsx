import React from "react";
import { IconProps } from "../Icon.types";

const PurchaseGuidePressed: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
    >
      <rect width="27" height="27" fill="white" />
      <path
        d="M5.375 2.75H22V23.125H3.875V4.25C3.875 3.42157 4.54657 2.75 5.375 2.75Z"
        stroke="#256FFF"
      />
      <path
        d="M5.59029 20.8762L5.49069 20.8831L5.40139 20.9278L3.875 21.691V3.90495C3.875 3.14958 4.43669 2.51205 5.18604 2.4169L19.75 0.567507V19.8907L5.59029 20.8762Z"
        fill="#256FFF"
        stroke="#256FFF"
      />
      <path
        d="M5.375 21.875H22V25.375H5.375C4.54657 25.375 3.875 24.7034 3.875 23.875V23.375C3.875 22.5466 4.54657 21.875 5.375 21.875Z"
        fill="white"
        stroke="#256FFF"
      />
      <path d="M6.75 5.53846L18 4.5V6.83654L6.75 7.875V5.53846Z" fill="white" />
    </svg>
  );
};

export default PurchaseGuidePressed;
