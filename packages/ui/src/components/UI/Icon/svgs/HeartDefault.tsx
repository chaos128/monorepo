import React from "react";
import { IconProps } from "../Icon.types";

const HeartDefault: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8.00033 13.9489L2.18769 7.96127C0.826759 6.55937 0.826759 4.28047 2.18769 2.87857C3.54056 1.48498 5.72767 1.48498 7.08053 2.87857L7.64157 3.45649L8.00033 3.82605L8.35908 3.45649L8.92012 2.87857C10.273 1.48498 12.4601 1.48498 13.813 2.87857C15.1739 4.28047 15.1739 6.55937 13.813 7.96127L8.00033 13.9489Z"
        stroke="#1A1A1A"
      />
    </svg>
  );
};

export default HeartDefault;
