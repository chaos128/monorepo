// Generated with util/create-component.js
import React, { useMemo } from "react";
import {
  ColorChipsProps,
  COLOR_CHIPS,
  COLOR_CHIP_PATTERN,
} from "./ColorChips.types";

const ColorChips: React.FC<ColorChipsProps> = (props: ColorChipsProps) => {
  const {
    colors,
    chipHeight,
    chipWidth,
    direction = "row",
    shape = "circle",
    size = 6,
  } = props;

  const refinedColors = useMemo(() => {
    return colors.split("/").slice(0, size);
  }, [colors]);

  return (
    <div
      data-testid="ColorChips"
      className={`nrc--ColorChips ${
        direction === "row"
          ? "flex space-x-[0.3rem]"
          : "flex flex-col space-y-[0.5rem]"
      }`}
    >
      {refinedColors.map((color, index) => {
        if (color === "패턴") {
          return (
            <ColorChipPattern
              key={`colorChipPattern${index}`}
              width={chipWidth}
              height={chipHeight}
              shape={shape}
            />
          );
        }

        if (color.indexOf("+") !== -1) {
          const combinationColors = color.split("+");
          return (
            <ColorChipCombination
              key={`colorChipCombination${index}`}
              colors={combinationColors}
              direction={"column"}
              width={chipWidth}
              height={chipHeight}
              shape={shape}
            />
          );
        }

        if ((COLOR_CHIPS as any)[color]) {
          const colorHexValue = (COLOR_CHIPS as any)[color] as string;
          return (
            <div
              data-testid="ColorChip"
              key={`colorChip${index}`}
              className={`${shape === "circle" && "rounded-full"} ${
                colorHexValue === "#FFFFFF"
                  ? "border-[1px] border-gray-3"
                  : "border-none"
              }`}
              style={{
                backgroundColor: colorHexValue,
                width: `${chipWidth}rem`,
                height: `${chipHeight}rem`,
              }}
            />
          );
        }
      })}
    </div>
  );
};

export default ColorChips;

const ColorChipPattern = (props: {
  width: string;
  height: string;
  shape?: "circle" | "square";
}) => {
  const { width, height, shape = "circle" } = props;
  return (
    <div
      data-testid="ColorChipPattern"
      className={`inline-grid overflow-hidden ${
        shape === "circle" && "rounded-full"
      }`}
      style={{
        gridTemplateColumns: `${+width / 2}rem ${+width / 2}rem`,
        gridTemplateRows: `${+height / 2}rem ${+height / 2}rem`,
      }}
    >
      {COLOR_CHIP_PATTERN.map((color, index) => {
        return (
          <div
            className="pattern-part"
            key={`patternPart${index}`}
            style={{
              backgroundColor: color,
            }}
          ></div>
        );
      })}
    </div>
  );
};

const ColorChipCombination = (props: {
  colors: string[];
  direction: "row" | "column";
  width: string;
  height: string;
  shape?: "circle" | "square";
}) => {
  const { colors, direction, width, height, shape = "circle" } = props;

  return (
    <div
      data-testid="ColorChipCombination"
      className={`${
        colors.indexOf("화이트") !== -1
          ? "border-1px border-solid border-[#e5e5e5]"
          : "border-none"
      } ${direction === "row" ? "flex" : "flex-col"} ${
        shape === "circle" && "rounded-full"
      } inline-flex overflow-hidden`}
      style={{ width: `${width}rem`, height: `${height}rem` }}
    >
      {colors.map((color, index) => {
        return (
          <div
            key={`combinationColor${index}`}
            style={{
              backgroundColor: (COLOR_CHIPS as any)[color],
              flexBasis: "50%",
            }}
          />
        );
      })}
    </div>
  );
};
