// Generated with util/create-component.js
import React from "react";
import { StarRatingProps } from "./StarRating.types";

const StarRating: React.FC<StarRatingProps> = (props: StarRatingProps) => {
  const { rating, text, styleFor } = props;
  const ratingToPercent = rating * 20; // 100%를 기준으로 하기 위해

  const starColorStyle = {
    color: `${styleFor?.starColor ? styleFor?.starColor : "#FF9900"}`,
  };

  const starBgColorStyle = {
    color: `${styleFor?.bgColor ? styleFor?.bgColor : "#DFDFDF"}`,
  };

  if (!rating) return null;

  return (
    <div data-testid="StarRating" className="nrc--StarRating flex items-center">
      <div
        className="relative w-max"
        style={{
          fontSize: `${styleFor?.size ? `${styleFor?.size}rem` : "1.2rem"}`,
        }}
      >
        <div
          className="p-0 overflow-hidden flex absolute top-0 left-0 z-[1]"
          style={{
            width: `${ratingToPercent}%`,
            fontSize: `${styleFor?.size ? `${styleFor?.size}rem` : "1.2rem"}`,
          }}
        >
          <span style={starColorStyle}>★</span>
          <span style={starColorStyle}>★</span>
          <span style={starColorStyle}>★</span>
          <span style={starColorStyle}>★</span>
          <span style={starColorStyle}>★</span>
        </div>
        <div className="z-0 p-0">
          <span style={starBgColorStyle}>★</span>
          <span style={starBgColorStyle}>★</span>
          <span style={starBgColorStyle}>★</span>
          <span style={starBgColorStyle}>★</span>
          <span style={starBgColorStyle}>★</span>
        </div>
      </div>
      {text && text}
    </div>
  );
};

export default StarRating;
