import React from "react";
import { IconProps } from "../Icon.types";

const CompassPressed: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill="white" />
      <circle cx="12" cy="12" r="9.5" fill="#256FFF" stroke="#256FFF" />
      <path
        d="M16.9499 7.05026L10.5859 10.5858L13.4143 13.4142L16.9499 7.05026Z"
        fill="white"
      />
      <path
        d="M10.5859 10.5858L16.9499 7.05026L13.4143 13.4142M10.5859 10.5858L7.05036 16.9498L13.4143 13.4142M10.5859 10.5858L13.4143 13.4142"
        stroke="white"
        strokeLinejoin="round"
      />
      <path d="M12 4V5" stroke="white" strokeLinejoin="round" />
      <path d="M12 19L12 20" stroke="white" strokeLinejoin="round" />
      <path d="M20 12L19 12" stroke="white" strokeLinejoin="round" />
      <path d="M5 12H4" stroke="white" strokeLinejoin="round" />
    </svg>
  );
};

export default CompassPressed;
