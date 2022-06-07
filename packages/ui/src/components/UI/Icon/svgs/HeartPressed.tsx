import React from "react";
import { IconProps } from "../Icon.types";

const HeartPressed: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M1.82893 2.53029C0.279678 4.12619 0.279678 6.71364 1.82893 8.30954L8.00033 14.6667L14.1717 8.30954C15.721 6.71365 15.721 4.12619 14.1717 2.53029C12.6225 0.9344 10.1106 0.934401 8.56136 2.53029L8.00033 3.10822L7.43929 2.53029C5.89003 0.934401 3.37819 0.9344 1.82893 2.53029Z"
        fill="#256FFF"
      />
    </svg>
  );
};

export default HeartPressed;
