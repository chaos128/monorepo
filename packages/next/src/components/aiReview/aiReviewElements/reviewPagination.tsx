import { useAtomValue } from "jotai/utils";
import { useCallback } from "react";
import PaginationIndicator from "../../../shared/components/pagination";
import {
  aiReviewPageAtom,
  aiReviewPartAtom,
  useAiReviewHooks,
} from "../aiReviewHooks";

const ReviewPagination = ({
  pageLength,
  scrollOffset,
}: {
  pageLength: number;
  scrollOffset?: number | null;
}) => {
  const { onSetReviewPage } = useAiReviewHooks();

  const onSetPageHandler = useCallback(
    (value: any) => {
      onSetReviewPage(value);
      if (scrollOffset) {
        window.scrollTo({
          top: scrollOffset,
          behavior: "smooth",
        });
      }
    },
    [scrollOffset, onSetReviewPage]
  );

  return (
    <ReviewPaginationComponent
      pageLength={pageLength}
      setPage={(value) => {
        onSetPageHandler(value);
      }}
    />
  );
};
export default ReviewPagination;

const ReviewPaginationComponent = ({
  pageLength,
  setPage,
}: {
  pageLength: number;
  setPage: (page: number) => void;
}) => {
  const { onSetReviewPart } = useAiReviewHooks();

  const PAGINATE_PART = 5;
  const part = useAtomValue(aiReviewPartAtom);
  const page = useAtomValue(aiReviewPageAtom);
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
    onSetReviewPart(part - 1);
    setPage(start - 1);
  }, [start, part, setPage, onSetReviewPart]);

  const onClickNext = useCallback(() => {
    onSetReviewPart(part + 1);
    setPage(end + 1);
  }, [end, part, setPage, onSetReviewPart]);

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
