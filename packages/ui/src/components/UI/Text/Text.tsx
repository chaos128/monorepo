// Generated with util/create-component.js
import React from "react";
import { TextProps } from "./Text.types";

const Text: React.FC<TextProps> = ({ as, children, className, type }) => {
  const classMap: { [key: string]: string } = {
    B1: "text-body-1 font-normal",
    B2: "text-body-2 font-bold",
    B3: "text-body-3 font-medium",
    B4: "text-body-4 font-normal",
    B5: "text-body-5 font-bold",
    B6: "text-body-6 font-medium",
    B7: "text-body-7 font-normal",
    B8: "text-body-8 font-bold",
    B9: "text-body-9 font-medium",
    B10: "text-body-10 font-normal",
    D1: "text-detail-1 font-extrabold",
    D2: "text-detail-2 font-bold",
    D3: "text-detail-3 font-medium",
    D4: "text-detail-4 font-normal",
  };

  return React.createElement(
    as ?? "p",
    {
      className: `${
        type && classMap[type] ? classMap[type] : classMap["B2"]
      } ${className}`,
    },
    children
  );
};

export default Text;
