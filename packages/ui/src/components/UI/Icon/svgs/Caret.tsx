import React from "react";
import { IconProps } from "../Icon.types";

const Caret: React.FC<IconProps> = ({ size, color }) => {
  const c = color ? color : "#1A1A1A";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.5 21L17.5 12L8.5 3" stroke={c} />
    </svg>
  );
};

export default Caret;
