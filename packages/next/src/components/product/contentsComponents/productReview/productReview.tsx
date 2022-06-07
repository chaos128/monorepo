import { Heading, ProductReviewSummary, Text } from "@nosearch/ui";
import { useEffect, useMemo, useRef, useState } from "react";
import Spacing from "../../../../components/ui/spacing";
import {
  useGoodsReview,
  useGoodsReviewsInfinite,
} from "../../../../hooks/api/useGoodsReviews";
import useReviewCountDetail from "../../../../hooks/api/useReviewCountDetail";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import ProductReviewPaginate from "./productReviewPaginate";
import ProductReviewStack from "./productReviewStack";

const ProductReview = ({
  productCategoryKey,
  modelName,
  onLoad,
}: {
  productCategoryKey: any;
  modelName: any;
  onLoad: any;
}) => {
  const { isMobile } = useMobileDetect();

  const PAGE_SIZE = 5;
  const [page, setPage] = useState<number>(1);

  const productReviewRef = useRef<HTMLDivElement>(null);
  const { current: productReviewWrapper } = productReviewRef;
  const scrollOffset = useMemo(() => {
    if (productReviewWrapper) {
      return productReviewWrapper.offsetTop - 45;
    } else {
      return null;
    }
  }, [productReviewWrapper]);

  const {
    data: reviewSummary,
    reviewCountSum,
    reviewAvgScore,
  } = useReviewCountDetail({
    categoryKey: productCategoryKey,
    modelName,
  });
  const { data: goodsReviews, isLoading: isLoadingGetGoodsReviews } =
    useGoodsReview({
      categoryKey: productCategoryKey,
      modelNm: modelName,
      page,
      size: PAGE_SIZE,
      canFetch: !isMobile,
    });

  const {
    data: goodsReviewsInfinite,
    isLoading: isLoadingInfiniteGoodsReviews,
    fetchNextPage,
  } = useGoodsReviewsInfinite({
    modelNm: modelName,
    categoryKey: productCategoryKey,
    page: 1,
    size: PAGE_SIZE,
    canFetch: isMobile,
  });

  useEffect(() => {
    if (onLoad && reviewSummary && goodsReviews)
      onLoad({ type: "user-review" });
  }, [onLoad, reviewSummary, goodsReviews]);

  if (
    !reviewSummary ||
    !reviewAvgScore ||
    !reviewAvgScore ||
    (isMobile && !goodsReviewsInfinite) ||
    (!isMobile && !goodsReviews)
  ) {
    return null;
  }

  return (
    <div ref={productReviewRef}>
      <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      <div className="mx-[2rem] mt-[4rem] pb-[6rem] pc:mx-0">
        <div className="mb-[2rem] pc:text-center">
          <div className="flex items-center space-x-[1rem] pc:justify-center">
            <Heading level={2} className="text-gray-10">
              구매 후기
            </Heading>
            <Heading level={4} className="text-blue-7">
              {reviewCountSum}
            </Heading>
          </div>
          <Text type="B10" className="text-gray-10 pc:text-body-4">
            노써치 스토어에서 구입한 고객들의 후기
          </Text>
        </div>
        <ProductReviewSummary
          avgScore={reviewAvgScore}
          scoreCount={reviewSummary}
          reviewCountSum={reviewCountSum ?? 0}
        />
        {isMobile ? (
          <ProductReviewStack
            reviewData={goodsReviewsInfinite}
            reviewSum={reviewCountSum ?? 0}
            page={page}
            pageSize={PAGE_SIZE}
            isLoading={isLoadingInfiniteGoodsReviews}
            setPage={setPage}
            fetchNextPage={fetchNextPage}
          />
        ) : (
          <ProductReviewPaginate
            reviewData={goodsReviews ?? null}
            reviewSum={reviewCountSum ?? 0}
            isLoading={isLoadingGetGoodsReviews}
            scrollOffset={scrollOffset}
            page={page}
            setPage={setPage}
            pageSize={PAGE_SIZE}
          />
        )}
      </div>
    </div>
  );
};

export default ProductReview;
