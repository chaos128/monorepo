import React from "react";
import { IconProps } from "../Icon.types";

const SalePressed: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill="white" />
      <path
        d="M12 0.73033L14.3199 3.20026L14.521 3.41434L14.8059 3.34296L18.0928 2.51935L18.7091 5.85142L18.7625 6.14023L19.0408 6.2342L22.2513 7.31841L20.9682 10.4547L20.857 10.7266L21.0403 10.956L23.155 13.6038L20.38 15.5486L20.1395 15.7172L20.1696 16.0093L20.517 19.3801L17.1312 19.5159L16.8377 19.5276L16.7051 19.7897L15.175 22.8132L12.2532 21.0969L12 20.9481L11.7468 21.0969L8.82497 22.8132L7.2949 19.7897L7.16228 19.5276L6.86881 19.5159L3.48295 19.3801L3.83039 16.0093L3.86051 15.7172L3.61999 15.5486L0.845039 13.6038L2.95967 10.956L3.14296 10.7266L3.03176 10.4547L1.74875 7.31841L4.9592 6.2342L5.23746 6.14023L5.29088 5.85142L5.90716 2.51935L9.19413 3.34296L9.47902 3.41434L9.6801 3.20026L12 0.73033Z"
        fill="#256FFF"
        stroke="#256FFF"
      />
      <path
        d="M16.2427 7.75739L7.75739 16.2427"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="8.5" r="1.5" fill="white" />
      <circle cx="14.5" cy="15.5" r="1.5" fill="white" />
    </svg>
  );
};

export default SalePressed;
