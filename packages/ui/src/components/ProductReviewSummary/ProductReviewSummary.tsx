// Generated with util/create-component.js
import React from "react";
import StarRating from "../StarRating";
import Heading from "../UI/Heading";
import Text from "../UI/Text";
import { ProductReviewSummaryProps } from "./ProductReviewSummary.types";

const ProductReviewSummary: React.FC<ProductReviewSummaryProps> = (props) => {
  const { avgScore, scoreCount, reviewCountSum } = props;
  return (
    <div
      data-testid="ProductReviewSummary"
      className="nrc--ProductReviewSummary w-[33.5rem] h-[13rem] bg-gray-1 rounded-[10px] flex justify-between items-center px-[2.35rem] py-[1.2rem] pc:w-[80rem] pc:h-[16.6rem]"
    >
      <div className="flex flex-col items-center space-y-[0.4rem] pc:w-[36.8rem] pc:space-y-[1rem]">
        <Text type="B9" className="text-gray-10">
          총 평점
        </Text>
        <div className="pc:scale-[1.8]">
          <StarRating rating={avgScore} styleFor={{ size: 2 }} />
        </div>
        <div className="flex items-center space-x-[0.5rem]">
          <Heading level={4} className="text-gray-10 pc:text-heading-2">
            {avgScore}
          </Heading>
          <Text type="B4" className="text-gray-6 pc:text-body-1">
            / 5
          </Text>
        </div>
      </div>
      <div className="w-[1px] h-full bg-gray-3"></div>
      <div className="flex flex-col space-y-[0.2rem] pc:flex-row pc:space-y-0 pc:space-x-[0.5rem] pc:w-[36.8rem] pc:justify-center">
        {scoreCount.map((score: number, index: number) => {
          return (
            <ScoreBar
              key={`reviewScore_${index}`}
              score={score}
              index={5 - index}
              reviewCountSum={reviewCountSum}
            />
          );
        })}
        {scoreCount.map((score: number, index: number) => {
          return (
            <PcScoreBar
              key={`reviewScore_${index}`}
              score={score}
              index={5 - index}
              reviewCountSum={reviewCountSum}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductReviewSummary;

const ScoreBar = (props: {
  score: number;
  index: number;
  reviewCountSum: number;
}) => {
  const { score, index, reviewCountSum } = props;
  return (
    <div className="flex items-center pc:hidden">
      <Text
        type="D3"
        className={`${
          index === 5
            ? "text-detail-1 font-extrabold text-gray-10"
            : "text-gray-6"
        }`}
      >
        {index}점
      </Text>
      <div className="w-[8rem] bg-gray-3 rounded-full h-[0.5rem] mx-[1rem]">
        <div
          className="h-[0.5rem] rounded-full"
          style={{
            width: `${(score / reviewCountSum) * 100}%`,
            backgroundColor: `${index === 5 ? "#1A1A1A" : "#949494"}`,
          }}
        ></div>
      </div>
      <Text
        type="D3"
        className={`${
          index === 5
            ? "text-detail-1 font-extrabold text-gray-10"
            : "text-gray-6"
        }`}
      >
        {score}
      </Text>
    </div>
  );
};

const PcScoreBar = (props: {
  score: number;
  index: number;
  reviewCountSum: number;
}) => {
  const { score, index, reviewCountSum } = props;
  return (
    <div className="hidden pc:flex flex-col items-center w-[4rem]">
      <Text
        type="B7"
        className={`${
          index === 5 ? "text-body-5 font-bold text-gray-10" : "text-gray-6"
        }`}
      >
        {index}점
      </Text>
      <div className="w-[0.8rem] bg-gray-3 rounded-full h-[8rem] my-[1rem] rotate-180">
        <div
          className="h-[8rem] rounded-full"
          style={{
            height: `${(score / reviewCountSum) * 100}%`,
            backgroundColor: `${index === 5 ? "#1A1A1A" : "#949494"}`,
          }}
        ></div>
      </div>
      <Text
        type="B7"
        className={`${
          index === 5 ? "text-body-5 font-bold text-gray-10" : "text-gray-6"
        }`}
      >
        {score}
      </Text>
    </div>
  );
};
