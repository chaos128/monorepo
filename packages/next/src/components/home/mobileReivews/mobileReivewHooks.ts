import { IReviewData } from "@nosearch/ui/src/components/NosearchPick/NosearchPick.types";
import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";

export const clickedReviewModalAtom = atomWithReset<boolean>(false);
export const clickedReviewAtom = atomWithReset<IReviewData>({
  type: "user",
  content: "",
  createdAt: "",
  images: [],
  point: 0,
  writer: "",
});

export const useMobileReivews = () => {
  const [clickedReviewModal, setClickedReviewModal] = useAtom(
    clickedReviewModalAtom
  );
  const [clickedReview, setClickedReview] = useAtom(clickedReviewAtom);

  const resetClickedReviewModal = useResetAtom(clickedReviewModalAtom);

  const onClickReivewModal = () => {
    setClickedReviewModal(true);
  };

  const onResetReviewModal = () => {
    resetClickedReviewModal();
  };

  const onSetClickedReview = (review: IReviewData) => {
    setClickedReview(review);
  };

  return {
    onClickReivewModal,
    onResetReviewModal,
    onSetClickedReview,
  };
};
