import React from "react";
import { IconProps } from "../Icon.types";

const BookmarkDefault: React.FC<IconProps> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 3.5H19C19.2761 3.5 19.5 3.72386 19.5 4V20.7962C19.5 21.2258 18.994 21.4554 18.6707 21.1725L12.9878 16.1999C12.4222 15.7051 11.5778 15.7051 11.0122 16.1999L5.32925 21.1725C5.00596 21.4554 4.5 21.2258 4.5 20.7962V4C4.5 3.72386 4.72386 3.5 5 3.5Z"
        stroke="#1A1A1A"
      />
    </svg>
  );
};

export default BookmarkDefault;
