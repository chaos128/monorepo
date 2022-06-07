import { AiReview } from "@nosearch/ui";
import { useAtomValue } from "jotai/utils";
import { useMemo } from "react";
import {
  IAiReviewContent,
  REVIEW_PAGE_COUNT,
} from "../../../hooks/api/useAiReview";
import { aiReviewFilterTypeAtom, aiReviewPageAtom } from "../aiReviewHooks";

const Reviews = ({
  isMobile,
  reviews,
}: {
  isMobile: boolean;
  reviews: IAiReviewContent[];
}) => {
  const page = useAtomValue(aiReviewPageAtom);
  const filterType = useAtomValue(aiReviewFilterTypeAtom);

  const slicedReviews: IAiReviewContent[] = useMemo(() => {
    const start = REVIEW_PAGE_COUNT * (page - 1);
    const end = REVIEW_PAGE_COUNT * page;

    if (isMobile) {
      return reviews.slice(0, end);
    } else {
      return reviews.slice(start, end);
    }
  }, [page, isMobile, reviews]);

  const reviewType = (review: any) => {
    switch (filterType) {
      case "all":
        if (review.type) return review.type;
        else return "positive";
      case "positive":
        return "positive";
      case "negative":
        return "negative";
      default:
        return "positive";
    }
  };

  return (
    <div className="space-y-[2rem]">
      {slicedReviews.map((review, i) => {
        return (
          <AiReview
            key={`AiReview_${i}`}
            type={reviewType(review)}
            date={review.date}
            text={review.text}
          />
        );
      })}
    </div>
  );
};
export default Reviews;
