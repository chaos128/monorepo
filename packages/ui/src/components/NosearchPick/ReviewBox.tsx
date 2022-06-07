import React from "react";
import Text from "../UI/Text";
import { IReviewData } from "./NosearchPick.types";

const ReviewBox = ({
  type,
  review,
  reviewCnt,
  onClickReivewModal,
  onSetClickedReview,
}: {
  type: string;
  review: IReviewData;
  reviewCnt: number;
  onClickReivewModal: () => void;
  onSetClickedReview: (review: IReviewData) => void;
}) => {
  const reviewWidth = () => {
    if (type === "home") {
      if (reviewCnt === 1) {
        return "w-[30.5rem] pc:w-[33.9rem]";
      } else {
        return "w-[27.9rem] pc:w-[33.9rem]";
      }
    } else if (type === "pick") {
      if (reviewCnt === 1) {
        return "w-[30.5rem] pc:w-[76.8rem]";
      } else if (reviewCnt === 2) {
        return "w-[27.9rem] pc:w-[38rem]";
      } else {
        return "w-[27.9rem] pc:w-[24rem]";
      }
    }
  };

  return (
    <div
      className={`${
        review.type === "nosearch" ? "bg-blue-1" : "bg-gray-1 cursor-pointer"
      } ${reviewWidth()} h-[8.6rem] p-[1.2rem] rounded-lg pc:h-[8.5rem]`}
      onClick={(e) => {
        e.preventDefault();
        if (review.type === "nosearch") return;
        onClickReivewModal();
        onSetClickedReview({
          type: review.type,
          content: review.content,
          createdAt: review.createdAt,
          images: review.images,
          point: review.point,
          writer: review.writer,
        });
      }}
    >
      {review.type === "nosearch" ? (
        <div className="flex items-center justify-center mb-[0.4rem]">
          <img
            src="https://nosearch.com/static/webp/images/logo.webp"
            className="w-[1.6rem] mr-[0.4rem]"
          />
          <Text type="D2" className="text-blue-8">
            노써치 두줄평
          </Text>
        </div>
      ) : (
        <Text type="D2" className="text-gray-6 mb-[0.4rem]">
          구매후기
        </Text>
      )}

      <p
        className={`text-body-8 text-gray-10 break-all line-clamp-2 ${
          review.type === "nosearch" ? "font-bold text-center" : "font-medium"
        }`}
        dangerouslySetInnerHTML={{
          __html: review.content,
        }}
        aria-label="노써치 리뷰"
      />
    </div>
  );
};

export default ReviewBox;
