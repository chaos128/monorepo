import { useMemo } from "react";
import useAppliancesDetailInfo, {
  IEncyclopediaDetail,
} from "../../../../hooks/api/useAppliancesDetailInfo";
import { useCategories } from "../../../../hooks/api/useCategories";
import useCommentCount from "../../../../hooks/api/useCommentCount";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import { useSidebar } from "../../../../shared/useSidebar";
import ContentsFooter from "../../contentsFooter";
import RelatedContents from "../../relatedContents";
import EncyclopediaDetailContents from "./contents";
import EncyclopediaSidebar from "./sidebar";
import EncyclopediaThumbnail from "./thumbnail";

const EncyclopediaDetail = ({
  parentCategory,
  productCategory,
  index,
}: {
  parentCategory: string;
  productCategory: string;
  index: string;
}) => {
  const { isMobile } = useMobileDetect();
  const { categoryMap } = useCategories();
  let categoryKr = "";
  if (categoryMap && categoryMap[productCategory]) {
    categoryKr = categoryMap[productCategory].name;
  }

  const cateCd = useMemo(() => {
    if (categoryMap && productCategory) {
      let tempCateCd = "";
      Object.keys(categoryMap).map((value, index) => {
        if (categoryMap[value].key === productCategory) {
          tempCateCd = categoryMap[value].godoCategoryId ?? "";
        }
      });
      return tempCateCd;
    }

    return null;
  }, [categoryMap, productCategory]);

  const { targetRef } = useSidebar();

  const { data, isError } = useAppliancesDetailInfo<IEncyclopediaDetail>({
    id: index,
    // initialData: initialEncyclopedia,
  });
  const { data: commentCountData } = useCommentCount({
    key: `appliancesInfo|${data?.id}`,
  });

  if (!data || !categoryMap || !commentCountData) {
    return null;
  }
  return (
    <div>
      {!isMobile && (
        <EncyclopediaSidebar
          data={data}
          parentCategory={parentCategory}
          productCategory={productCategory}
          productCategoryKr={categoryKr}
        />
      )}
      <EncyclopediaThumbnail data={data} />
      <div ref={targetRef}>
        {data.contents && (
          <EncyclopediaDetailContents
            intro={{
              __html: data.intro ? data.intro : "",
            }}
            contents={{ __html: data.contentText }}
          />
        )}
      </div>

      <RelatedContents
        viewType="appliancesInfoDetail"
        isMobile={isMobile}
        parentCategory={parentCategory}
        category={productCategory}
        cateCd={cateCd}
        applianceInfoId={data.id}
      />

      <ContentsFooter
        data={data}
        commentCount={commentCountData.commentsCount ?? 0}
        parentCategory={parentCategory}
        productCategory={productCategory}
      />
    </div>
  );
};

export default EncyclopediaDetail;
