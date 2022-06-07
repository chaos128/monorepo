import React from "react";
import { IconProps } from "../Icon.types";

const Share: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M12 2L12.3448 1.63793L12 1.30952L11.6552 1.63793L12 2ZM11.5 2V14H12.5V2H11.5ZM11.6552 2.36207L15.6552 6.17159L16.3448 5.44746L12.3448 1.63793L11.6552 2.36207ZM11.6552 1.63793L7.65517 5.44746L8.34483 6.17159L12.3448 2.36207L11.6552 1.63793Z"
        fill="#1A1A1A"
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M9 9H5C4.44772 9 4 9.44772 4 10V21C4 21.5523 4.44772 22 5 22H19C19.5523 22 20 21.5523 20 21V10C20 9.44772 19.5523 9 19 9H15"
        stroke="#1A1A1A"
      />
    </svg>
  );
};

export default Share;
