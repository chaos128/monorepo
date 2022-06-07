// Generated with util/create-component.js
import React from "react";
import { DividerProps } from "./Divider.types";

const Divider: React.FC<DividerProps> = ({ color, height }) => {
  return (
    <div
      data-testid="ContentsEditorDivider"
      className="nrc--ContentsEditorDivider w-full max-w-[80rem]"
      style={{ backgroundColor: color, height: height + "px" }}
    ></div>
  );
};

export default Divider;
