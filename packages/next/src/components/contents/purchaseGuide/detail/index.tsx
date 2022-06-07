import { atomWithReset, useAtomValue } from "jotai/utils";
import { RefObject, useEffect, useMemo, useRef } from "react";
import { useCategories } from "../../../../hooks/api/useCategories";
import useCommentCount from "../../../../hooks/api/useCommentCount";
import usePurchaseGuideDetail from "../../../../hooks/api/usePurchaseGuideDetail";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import { useSidebar } from "../../../../shared/useSidebar";
import ContentsFooter from "../../contentsFooter";
import RelatedContents from "../../relatedContents";
import PurchaseGuideDetailContents from "./contents";
import PurchaseGuideOutline from "./outline";
import PurchaseGuideSidebar from "./sidebar";
import PurchaseGuideThumbnail from "./thumbnail";

export interface IPurchaseGuideDetailProps {
  parentCategory: string;
  category: string;
}

export const sidebarIndexAtom = atomWithReset<number>(-1);

const PurchaseGuideDetail = (props: IPurchaseGuideDetailProps) => {
  const { isMobile } = useMobileDetect();
  const { parentCategory, category } = props;
  const contentsRefs = useRef<RefObject<HTMLDivElement>[]>([]);

  const { categoryMap } = useCategories();
  let categoryKr = "";
  if (categoryMap && categoryMap[category]) {
    categoryKr = categoryMap[category].name;
  }

  const cateCd = useMemo(() => {
    if (categoryMap && category) {
      let tempCateCd = "";
      Object.keys(categoryMap).map((value, index) => {
        if (categoryMap[value].key === category) {
          tempCateCd = categoryMap[value].godoCategoryId ?? "";
        }
      });
      return tempCateCd;
    }

    return null;
  }, [categoryMap, category]);

  const { targetRef } = useSidebar();

  const getIndexScroll = (index: number) => {
    if (typeof document === "undefined") {
      return;
    }
    const indexs = Array.from(
      document.querySelectorAll(".ns-guidet-title-0-main")
    );
    const indexScroll = (indexs[index] as HTMLElement).offsetTop;
    return indexScroll;
  };

  const sidebarIndex = useAtomValue(sidebarIndexAtom);
  useEffect(() => {
    if (sidebarIndex === -1) return;
    const scroll = getIndexScroll(sidebarIndex);
    window.scrollTo({ top: scroll });
  }, [sidebarIndex]);

  const { data } = usePurchaseGuideDetail(category);
  const { data: commentCountData } = useCommentCount({
    key: `purchaseGuide|${category}`,
  });

  if (!data || !categoryMap || !commentCountData) {
    return null;
  }

  return (
    <section>
      {!isMobile && (
        <PurchaseGuideSidebar
          data={data}
          commentCount={commentCountData.commentsCount ?? 0}
          parentCategory={parentCategory}
          productCategory={category}
          productCategoryKr={categoryKr}
        />
      )}
      <PurchaseGuideThumbnail
        isMobile={isMobile}
        thumbnail={data.thumbnail}
        title={data.title}
      />
      <div
        className="pt-[3rem] pb-[6rem] pc:mx-auto pc:w-[80rem]"
        ref={targetRef}
      >
        {data.outline && (
          <PurchaseGuideOutline text={{ __html: data.outline }} />
        )}

        {data.purchaseGuideThemes &&
          data.purchaseGuideThemes.map((value, index: number) => {
            return (
              <div key={`guideDetailContents${index}`}>
                <PurchaseGuideDetailContents
                  index={index}
                  id={value.id}
                  contents={value.contentText}
                  selectedGroup={0}
                  contentsRef={contentsRefs.current[index]}
                />
              </div>
            );
          })}
      </div>

      <RelatedContents
        viewType="purchaseGuideDetail"
        isMobile={isMobile}
        parentCategory={parentCategory}
        category={category}
        cateCd={cateCd}
      />

      <ContentsFooter
        data={data}
        commentCount={commentCountData.commentsCount || 0}
        parentCategory={parentCategory}
        productCategory={category}
      />
    </section>
  );
};

export default PurchaseGuideDetail;
