import React from "react";
import { IconProps } from "../Icon.types";

const Index: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
    >
      <rect width="30" height="30" fill="white" />
      <path d="M7.5 6.25H27.5" stroke="black" />
      <path d="M2.5 6.25H5" stroke="black" />
      <path d="M7.5 15H27.5" stroke="black" />
      <path d="M2.5 15H5" stroke="black" />
      <path d="M7.5 23.75H27.5" stroke="black" />
      <path d="M2.5 23.75H5" stroke="black" />
    </svg>
  );
};

export default Index;
