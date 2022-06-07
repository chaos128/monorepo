import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";

export const reviewTemCategoryAtom = atomWithReset<string>("전체");

export const useReviewTem = () => {
  const [category, setCategory] = useAtom(reviewTemCategoryAtom);
  const resetCategory = useResetAtom(reviewTemCategoryAtom);

  const onSetCategory = (category: string) => {
    setCategory(category);
  };

  const onResetCategory = () => {
    resetCategory();
  };

  return { onSetCategory, onResetCategory };
};
