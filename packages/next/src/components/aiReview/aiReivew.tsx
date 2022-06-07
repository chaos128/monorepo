import { AiReviewSummary, Button, Caret, Heading, Text } from "@nosearch/ui";
import { useAtomValue } from "jotai/utils";
import { useEffect, useMemo, useRef } from "react";
import useAiReview, { REVIEW_PAGE_COUNT } from "../../hooks/api/useAiReview";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { IProductDetailProps } from "../product/contentsComponents/type";
import Spacing from "../ui/spacing";
import ReviewFilter from "./aiReviewElements/reviewFilter";
import ReviewPagination from "./aiReviewElements/reviewPagination";
import Reviews from "./aiReviewElements/reviews";
import {
  aiReviewFilterTypeAtom,
  aiReviewPageAtom,
  useAiReviewHooks,
} from "./aiReviewHooks";

const AiReivew = ({
  productCategoryKey,
  modelName,
  onLoad,
}: IProductDetailProps) => {
  const { isMobile } = useMobileDetect();

  const aiReviewRef = useRef<HTMLDivElement>(null);
  const { current: aiReviewWrapper } = aiReviewRef;
  const scrollOffset = useMemo(() => {
    if (aiReviewWrapper) return aiReviewWrapper.offsetTop - 45;
    return null;
  }, [aiReviewWrapper]);

  const page = useAtomValue(aiReviewPageAtom);
  const filterType = useAtomValue(aiReviewFilterTypeAtom);
  const { onSetReviewPage, onSetReviewFilterType } = useAiReviewHooks();

  const {
    aiReviewData,
    reviews,
    positiveRatio,
    negativeRatio,
    positiveNumber,
    negativeNumber,
    totalString,
    pageLength,
    isLoading,
  } = useAiReview(productCategoryKey, modelName, filterType);

  useEffect(() => {
    if (reviews && onLoad && !isLoading) {
      onLoad({ type: "ai-review" });
    }
  }, [onLoad, isLoading, reviews]);

  const REVIEW_COUNT =
    reviews && reviews?.length < 5 ? reviews?.length : REVIEW_PAGE_COUNT;

  if (!aiReviewData) {
    return null;
  }

  return (
    <div ref={aiReviewRef}>
      <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      <div className="mx-[2rem] mt-[4rem] pb-[6rem] pc:mx-0">
        <div className="mb-[2rem] pc:text-center">
          <Heading level={2} className="text-gray-10">
            리뷰 분석
          </Heading>
          <Text type="B10" className="text-gray-10 pc:text-body-4">
            온라인 상의 소비자 리뷰를 AI가 검토해
            <br />
            긍정·부정 요소를 뽑아 분석한 결과입니다.
          </Text>
        </div>

        {reviews && (
          <div className="space-y-[2rem] pc:space-y-[3rem]">
            <AiReviewSummary
              totalString={totalString}
              positiveNumber={positiveNumber}
              negativeNumber={negativeNumber}
              positiveRatio={positiveRatio}
              negativeRatio={negativeRatio}
            />

            <ReviewFilter
              filterType={filterType}
              onSetReviewFilterType={onSetReviewFilterType}
            />

            <Reviews isMobile={isMobile} reviews={reviews} />

            {isMobile && REVIEW_COUNT * page !== REVIEW_COUNT * pageLength && (
              <Button
                size="l"
                type="outline"
                radius="xl"
                suffix={<Caret size={"2.0rem"} color="#256FFF" />}
                className="w-full"
                onClick={() => {
                  onSetReviewPage(page + 1);
                }}
              >
                후기 더보기 {REVIEW_COUNT * page}/{REVIEW_COUNT * pageLength}
              </Button>
            )}

            {!isMobile && (
              <ReviewPagination
                pageLength={pageLength}
                scrollOffset={scrollOffset}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiReivew;
