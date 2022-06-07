import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";

export const openedCategoryItemAtom = atomWithReset<boolean>(false);
export const openedAllCategoryItemsAtom = atomWithReset<boolean>(false);
export const openedMobileAllCategoryItemsAtom = atomWithReset<boolean>(false);

export type contentsViewType = "purchaseGuide" | "encyclopedia";
export const parentCategoryList: { key: string; value: string }[] = [
  { key: "all", value: "전체" },
  { key: "living", value: "생활가전" },
  { key: "kitchen", value: "주방가전" },
  { key: "season", value: "계절가전" },
  { key: "digitalit", value: "디지털IT" },
];

export interface contentsCategoryItemProps {
  viewType: contentsViewType;
  type: "show" | "hide";
}
export interface contentsDefaultCategoryProps
  extends contentsCategoryItemProps {
  isMobile: boolean;
}

export const useContentsCategory = () => {
  // itemList by category
  const [openedCategoryItem, setOpenedCategoryItem] = useAtom(
    openedCategoryItemAtom
  );
  const resetOpenedCategoryItemAtom = useResetAtom(openedCategoryItemAtom);

  // pc: all category
  const [openedAllCategoryItems, setOpenedAllCategoryItems] = useAtom(
    openedAllCategoryItemsAtom
  );
  // mobile: all category
  const [openedMobileAllCategoryItems, setOpenedMobileAllCategoryItems] =
    useAtom(openedMobileAllCategoryItemsAtom);

  const onClickOpenCategoryItem = ({
    viewType,
    type,
  }: contentsCategoryItemProps) => {
    if (viewType === "purchaseGuide") {
      return;
    }

    if (type === "show") {
      onCloseDefaultCategoryOfContents({ viewType });
    } else {
      setOpenedCategoryItem(false);
    }
  };

  const onClickDefaultCategory = ({
    isMobile,
    viewType,
    type,
  }: contentsDefaultCategoryProps) => {
    if (isMobile) {
      setOpenedMobileAllCategoryItems(true);
      return;
    }
    if (type === "show") {
      setOpenedAllCategoryItems(true);
      setOpenedCategoryItem(false);
    } else {
      setOpenedAllCategoryItems(false);
    }
  };

  const onCloseDefaultCategoryOfContents = (props: {
    viewType: contentsViewType;
  }) => {
    const { viewType } = props;
    setOpenedAllCategoryItems(false);
    if (viewType === "encyclopedia") {
      setOpenedCategoryItem(true);
    }
  };

  const onCloseMobileAllCategoryItems = () => {
    setOpenedMobileAllCategoryItems(false);
  };

  const onResetOpenedCategoryItemAtom = () => {
    resetOpenedCategoryItemAtom();
  };

  return {
    onClickOpenCategoryItem,
    onClickDefaultCategory,
    onCloseDefaultCategoryOfContents,
    onCloseMobileAllCategoryItems,
    onResetOpenedCategoryItemAtom,
  };
};
