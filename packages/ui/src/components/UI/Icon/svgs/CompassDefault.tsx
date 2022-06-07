import React from "react";
import { IconProps } from "../Icon.types";

const CompassDefault: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill="white" />
      <circle cx="12" cy="12" r="9.5" fill="white" stroke="#1A1A1A" />
      <path
        d="M13.8117 5.23852L10.0681 11.4824L13.9319 12.5176L13.8117 5.23852Z"
        fill="#1A1A1A"
      />
      <path
        d="M10.0681 11.4824L9.63932 11.2253C9.59131 11.3053 9.56668 11.3973 9.56822 11.4906L10.0681 11.4824ZM13.8117 5.23852L14.3117 5.23027C14.308 5.00706 14.1568 4.81334 13.9411 4.75556C13.7255 4.69778 13.4977 4.78995 13.3829 4.98141L13.8117 5.23852ZM13.9319 12.5176L14.3607 12.7748C14.4087 12.6947 14.4333 12.6028 14.4318 12.5094L13.9319 12.5176ZM10.1883 18.7615L9.68834 18.7697C9.69202 18.9929 9.84322 19.1867 10.0589 19.2444C10.2745 19.3022 10.5023 19.2101 10.6171 19.0186L10.1883 18.7615ZM10.497 11.7395L14.2406 5.49563L13.3829 4.98141L9.63932 11.2253L10.497 11.7395ZM13.3118 5.24677L13.4319 12.5259L14.4318 12.5094L14.3117 5.23027L13.3118 5.24677ZM13.503 12.2605L9.75944 18.5044L10.6171 19.0186L14.3607 12.7748L13.503 12.2605ZM10.6882 18.7532L10.5681 11.4741L9.56822 11.4906L9.68834 18.7697L10.6882 18.7532ZM14.0613 12.0347L10.1976 10.9994L9.93874 11.9653L13.8024 13.0006L14.0613 12.0347Z"
        fill="#1A1A1A"
      />
      <path d="M20 12L19 12" stroke="#1A1A1A" strokeLinejoin="round" />
      <path d="M5 12H4" stroke="#1A1A1A" strokeLinejoin="round" />
      <path d="M12 4L12 5" stroke="#1A1A1A" strokeLinejoin="round" />
      <path d="M12 19V20" stroke="#1A1A1A" strokeLinejoin="round" />
    </svg>
  );
};

export default CompassDefault;
