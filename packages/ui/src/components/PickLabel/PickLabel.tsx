// Generated with util/create-component.js
import React from "react";
import Label from "../Label";
import { PickLabelProps } from "./PickLabel.types";

const PickLabel: React.FC<PickLabelProps> = ({
  pickType,
  categoryKr,
  labelStyle,
}) => {
  const { color, kr } = pickTypeKoreanColorMap[pickType];

  if (!color || !kr) {
    return null;
  }

  return (
    <Label
      className={`nrc--PickLabel text-white ${color} ${labelStyle}`}
      size="s"
      aria-label="노써치픽"
    >
      {categoryKr && (
        <span className="hidden pc:inline-block pc:mr-[0.3rem]">
          {categoryKr}
        </span>
      )}
      {kr}픽
    </Label>
  );
};

export default PickLabel;

const pickTypeKoreanColorMap = {
  best: {
    kr: "베스트",
    color: "bg-blue-7",
  },
  plus: {
    kr: "플러스",
    color: "bg-blue-6",
  },
  premium: {
    kr: "프리미엄",
    color: "bg-violet",
  },
  cost_effective: {
    kr: "가성비",
    color: "bg-green",
  },
  none: {
    kr: "",
    color: "",
  },
};
