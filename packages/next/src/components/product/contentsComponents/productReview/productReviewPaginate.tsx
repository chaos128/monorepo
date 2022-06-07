import { ProductReview as ProductReviewComponent } from "@nosearch/ui";
import { useCallback, useMemo, useRef, useState } from "react";
import { IGoodsReview } from "../../../../hooks/api/useGoodsReviewsPreview";
import PaginationIndicator from "../../../../shared/components/pagination";

interface IProductReviewPaginateProps {
  reviewData: IGoodsReview[] | null;
  reviewSum: number;
  isLoading?: boolean;
  scrollOffset?: number | null;
  pageSize: number;
  page: number;
  setPage: (value: number) => void;
}

const ProductReviewPaginate = ({
  reviewData,
  reviewSum,
  isLoading = false,
  scrollOffset,
  pageSize,
  page,
  setPage,
}: IProductReviewPaginateProps) => {
  const [part, setPart] = useState<number>(0);
  const pageLength = useMemo(() => {
    return Math.ceil(reviewSum / pageSize);
  }, [reviewSum, pageSize]);

  const productPaginateRef = useRef<HTMLDivElement>(null);
  const onSetPageHandler = useCallback(
    (value: any) => {
      setPage(value);
      if (scrollOffset) {
        window.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });
      }
    },
    [scrollOffset, setPage]
  );

  if (!reviewData || reviewData.length === 0) {
    return null;
  }

  return (
    <div ref={productPaginateRef}>
      <div className="my-[3rem]">
        {reviewData.map((review, i) => {
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
              className="w-[80rem] border-b-[1px] border-gray-3 py-[3rem]"
            >
              <ProductReviewComponent data={data} />
            </div>
          );
        })}
      </div>
      <ReviewPagination
        pageLength={pageLength}
        part={part}
        page={page}
        setPage={(value) => {
          onSetPageHandler(value);
        }}
        setPart={setPart}
      />
    </div>
  );
};

export default ProductReviewPaginate;

interface IReviewPaginationProps {
  pageLength: number;
  part: number;
  page: number;
  setPart: (part: number) => void;
  setPage: (page: number) => void;
}

const ReviewPagination = (props: IReviewPaginationProps) => {
  const { pageLength, part, page, setPage, setPart } = props;

  const PAGINATE_PART = 5;
  const partialPage = Math.floor(pageLength / PAGINATE_PART);
  const partialRemainder = pageLength % PAGINATE_PART !== 0 ? 1 : 0;
  const partLength = partialPage + partialRemainder;
  const start = 1 + PAGINATE_PART * part;
  const end =
    PAGINATE_PART + PAGINATE_PART * part > pageLength
      ? pageLength
      : PAGINATE_PART + PAGINATE_PART * part;

  const isPrevPart = part !== 0 ?? false;
  const isNextPart = part + 1 < partLength ?? false;
  const onClickPrev = useCallback(() => {
    setPart(part - 1);
    setPage(start - 1);
  }, [start, part, setPart, setPage]);
  const onClickNext = useCallback(() => {
    setPart(part + 1);
    setPage(end + 1);
  }, [end, part, setPart, setPage]);

  return (
    <PaginationIndicator
      start={start}
      end={end}
      current={page}
      onClick={(page) => {
        setPage(page);
      }}
      isPrevPart={isPrevPart}
      isNextPart={isNextPart}
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
    />
  );
};
