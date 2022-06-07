import {
  Button,
  Caret,
  ProductReview as ProductReviewComponent,
} from "@nosearch/ui";
import { useCallback, useMemo } from "react";
import { IGoodsReview } from "../../../../hooks/api/useGoodsReviewsPreview";

interface IProductReviewStackProps {
  reviewData: IGoodsReview[][] | null;
  reviewSum: number;
  page: number;
  pageSize: number;
  isLoading?: boolean;
  setPage: (value: number) => void;
  fetchNextPage?: (value?: any) => void;
}

const ProductReviewStack = ({
  reviewData,
  reviewSum,
  page,
  pageSize,
  isLoading = false,
  setPage,
  fetchNextPage,
}: IProductReviewStackProps) => {
  const adjustType = useMemo(() => {
    const dataLength = Math.ceil(reviewSum / pageSize);
    if (page >= dataLength) {
      return "decrease";
    } else {
      return "increase";
    }
  }, [reviewSum, pageSize, page]);

  const onClickAdjustStackButtonHandler = useCallback(() => {
    if (adjustType === "increase" && fetchNextPage) {
      setPage(page + 1);
      fetchNextPage();
    }
  }, [adjustType, page, setPage, fetchNextPage]);

  const refinedReviews = useMemo(() => {
    if (reviewData && reviewData.length > 0) {
      return reviewData.flatMap((value) => value);
    } else {
      return null;
    }
  }, [reviewData]);

  const currentReviewCount = useMemo(() => {
    if (refinedReviews) {
      return refinedReviews.length;
    } else {
      return 0;
    }
  }, [refinedReviews]);

  if (!refinedReviews || refinedReviews.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mt-[2rem]">
        {refinedReviews.map((review, i) => {
          const data = {
            ...review,
            imageUrls: review.imageUrls ? review.imageUrls : [],
            isUseful: false,
            onClickUseful: () => {
              console.log("도움이 돼요");
            },
          };
          return (
            <div
              key={`productReview_${i}`}
              className="w-full border-b-[1px] border-gray-3 py-[2rem]"
            >
              <ProductReviewComponent data={data} />
            </div>
          );
        })}
      </div>
      {reviewSum > pageSize && (
        <Button
          size="l"
          type="outline"
          radius="xl"
          suffix={<Caret size={"2.0rem"} color="#256FFF" />}
          className="w-full"
          onClick={onClickAdjustStackButtonHandler}
        >
          후기 더보기 {currentReviewCount}/{reviewSum}
        </Button>
      )}
    </div>
  );
};

export default ProductReviewStack;
