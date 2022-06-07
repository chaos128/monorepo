// Generated with util/create-component.js
import React from "react";
import Text from "../UI/Text";
import { AiReviewProps } from "./AiReview.types";

const AiReview: React.FC<AiReviewProps> = (props) => {
  const { type, date, text } = props;
  return (
    <div
      data-testid="AiReview"
      className={`nrc--AiReview w-[33.5rem] rounded-[10px] p-[1.2rem] border-[1px] pc:w-[80rem] ${
        type === "positive" ? "border-[#256FFF]" : "border-[#DFDFDF]"
      }`}
    >
      <div className="flex justify-between items-center mb-[1.6rem]">
        <Text
          type="B8"
          className={`${
            type === "positive" ? "text-[#256FFF]" : "text-[#949494]"
          }`}
        >
          {type === "positive" ? "긍정" : "부정"} 리뷰
        </Text>
        <Text type="D3" className="text-gray-6">
          {date}
        </Text>
      </div>
      <Text type="B4" className="text-gray-10 whitespace-pre-wrap">
        {text}
      </Text>
    </div>
  );
};

export default AiReview;
