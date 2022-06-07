// Generated with util/create-component.js
import React, { useState } from "react";
import { IReviewData, NosearchPickProps } from "./NosearchPick.types";
import NosearchPickBox from "./NosearchPickBox";

const NosearchPick: React.FC<NosearchPickProps> = (props) => {
  const [clickedReviewModal, setClickedReviewModal] = useState<boolean>(false);
  const [clickedReview, setClickedReview] = useState<IReviewData>({
    type: "user",
    content: "",
    createdAt: "",
    images: [],
    point: 0,
    writer: "",
  });

  const onClickReivewModal = () => {
    setClickedReviewModal(true);
  };

  const onResetReviewModal = () => {
    setClickedReviewModal(false);
  };

  const onSetClickedReview = (review: IReviewData) => {
    setClickedReview(review);
  };

  return (
    <>
      {/* <MobileReviewModal
        clickedReviewModal={clickedReviewModal}
        clickedReview={clickedReview}
        onResetReviewModal={onResetReviewModal}
      /> */}
      <NosearchPickBox
        {...props}
        onClickReivewModal={onClickReivewModal}
        onSetClickedReview={onSetClickedReview}
      />
    </>
  );
};

export default NosearchPick;
