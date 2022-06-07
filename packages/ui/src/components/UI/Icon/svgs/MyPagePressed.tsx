import React from "react";
import { IconProps } from "../Icon.types";

const MyPagePressed: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10.5" fill="#256FFF" stroke="#256FFF" />
      <path
        d="M6 9H7.09982L8.98605 13.6494H9.05569L10.939 9H12.0388V15H11.177V10.6699H11.1218L9.3749 14.9912H8.66103L6.9141 10.6611H6.86476V15H6V9Z"
        fill="white"
      />
      <path
        d="M12.7882 9H13.8155L15.3622 11.7217H15.426L16.9727 9H18L15.8468 12.6475V15H14.9414V12.6475L12.7882 9Z"
        fill="white"
      />
    </svg>
  );
};

export default MyPagePressed;
