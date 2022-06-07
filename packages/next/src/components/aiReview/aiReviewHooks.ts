import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { AiReviewType } from "../../hooks/api/useAiReview";

export const aiReviewFilterTypeAtom = atomWithReset<string>(AiReviewType.ALL);
export const aiReviewPartAtom = atomWithReset<number>(0);
export const aiReviewPageAtom = atomWithReset<number>(1);

export const useAiReviewHooks = () => {
  const [part, setPart] = useAtom(aiReviewPartAtom);
  const [page, setPage] = useAtom(aiReviewPageAtom);
  const [filterType, setFilterType] = useAtom(aiReviewFilterTypeAtom);

  const resetAiReviewPart = useResetAtom(aiReviewPartAtom);
  const resetAiReviewPage = useResetAtom(aiReviewPageAtom);
  const resetFilterType = useResetAtom(aiReviewFilterTypeAtom);

  const onSetReviewPart = (part: number) => {
    setPart(part);
  };

  const onSetReviewPage = (page: number) => {
    setPage(page);
  };

  const onSetReviewFilterType = (type: AiReviewType) => {
    setFilterType(type);
  };

  const onResetReviewAtoms = () => {
    resetAiReviewPart();
    resetAiReviewPage();
  };

  const onResetReviewFilterTypeAtoms = () => {
    resetFilterType();
  };

  return {
    onSetReviewPart,
    onSetReviewPage,
    onSetReviewFilterType,
    onResetReviewAtoms,
    onResetReviewFilterTypeAtoms,
  };
};
