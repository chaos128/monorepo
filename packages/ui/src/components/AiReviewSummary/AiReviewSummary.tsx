// Generated with util/create-component.js
import React from "react";
import Text from "../UI/Text";
import { AiReviewSummaryProps } from "./AiReviewSummary.types";

const AiReviewSummary: React.FC<AiReviewSummaryProps> = (props) => {
  const {
    totalString,
    positiveNumber,
    negativeNumber,
    positiveRatio,
    negativeRatio,
  } = props;

  return (
    <section
      data-testid="AiReviewSummary"
      className="nrc--AiReviewSummary w-[33.5rem] h-[13rem] bg-gray-1 rounded-[10px] p-[1.2rem] pc:w-[80rem] pc:h-[14rem]"
    >
      <div className="w-[28rem] mb-[2rem] space-y-[0.5rem] mx-auto">
        <div className="flex items-center">
          <Text
            type="B8"
            className="text-blue-7 whitespace-nowrap pc:text-body-5"
          >
            긍정 리뷰
          </Text>
          <GraphBar type="positive" ratio={positiveRatio} />
          <Text type="D1" className="text-blue-7 pc:text-body-5">
            {positiveNumber}
          </Text>
        </div>
        <div className="flex items-center flex-grow-0">
          <Text
            type="B8"
            className="text-gray-10 whitespace-nowrap pc:text-body-5"
          >
            부정 리뷰
          </Text>
          <GraphBar type="negative" ratio={negativeRatio} />
          <Text type="D1" className="text-gray-10 pc:text-body-5">
            {negativeNumber}
          </Text>
        </div>
      </div>

      <div className="w-[31rem] h-[4rem] flex justify-around items-center pc:w-[77.6rem] pc:h-[5rem]">
        <div className="w-[13rem] text-center pc:w-[36.8rem]">
          <Text type="B10" className="text-gray-10">
            제품 만족도
          </Text>
          <Text
            type="B5"
            className="text-gray-10 pc:text-heading-4 pc:font-extrabold"
          >
            {positiveRatio}%
          </Text>
        </div>
        <div className="w-[1px] h-full bg-gray-3"></div>
        <div className="w-[13rem] text-center pc:w-[36.8rem]">
          <Text type="B10" className="text-gray-10">
            분석한 후기
          </Text>
          <Text
            type="B5"
            className="text-gray-10 pc:text-heading-4 pc:font-extrabold"
          >
            {totalString}
          </Text>
        </div>
      </div>
    </section>
  );
};

export default AiReviewSummary;

const GraphBar = (props: {
  type: "positive" | "negative";
  ratio: number | null;
}) => {
  const { type, ratio } = props;
  return (
    <div className="w-[19rem] h-[0.5rem] bg-gray-3 rounded-full mx-[1rem] flex-shrink-0 pc:h-[0.8rem]">
      {ratio && (
        <div
          className="h-[0.5rem] rounded-full pc:h-[0.8rem]"
          style={{
            width: `${ratio}%`,
            backgroundColor: `${type === "positive" ? "#256FFF" : "#1A1A1A"}`,
          }}
        ></div>
      )}
    </div>
  );
};
