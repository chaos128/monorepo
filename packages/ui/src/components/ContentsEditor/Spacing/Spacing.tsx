// Generated with util/create-component.js
import React from "react";
import { SpacingProps } from "./Spacing.types";

const Spacing: React.FC<SpacingProps> = ({ size }) => {
  return (
    <div
      data-testid="ContentsEditorSpacing"
      className={`nrc--ContentsEditorSpacing w-full max-w-[80rem] ${
        size === "small"
          ? "h-[3.6rem] pc:h-[6rem]"
          : size === "regular"
          ? "h-[6rem] pc:h-[8rem]"
          : "h-[10rem]" // large
      }`}
    ></div>
  );
};

export default Spacing;
