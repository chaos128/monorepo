import { useEffect } from "react";
import ReviewTem from "../../components/store/reviewTem";
import { useReviewTem } from "../../components/store/reviewTem/reviewTemHook";

const ReviewTemPage = () => {
  const { onResetCategory } = useReviewTem();
  useEffect(() => {
    return () => {
      onResetCategory();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ReviewTem />
    </>
  );
};

export default ReviewTemPage;
