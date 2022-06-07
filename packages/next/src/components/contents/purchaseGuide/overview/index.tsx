import { PurchaseGuide as NrcPurchaseGuide } from "@nosearch/ui";
import { IPurchaseGuideData } from "@nosearch/ui/src/components/PurchaseGuide/PurchaseGuide.types";
import Link from "next/link";
import usePurchaseGuideDetail from "../../../../hooks/api/usePurchaseGuideDetail";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import RelatedEncyclopedia from "./relatedEncyclopedia";

export interface IPurchaseGuideOverviewProps {
  parentCategory: string;
  category: string;
}

const PurchaseGuideOverview = (props: IPurchaseGuideOverviewProps) => {
  const { isMobile } = useMobileDetect();
  const { parentCategory, category } = props;

  const { data } = usePurchaseGuideDetail(category);
  if (!data) return null;

  const guideData: IPurchaseGuideData = {
    ...data,
    parentCategoryKey: parentCategory,
    categoryKey: data.category.key,
    categoryName: data.category.name,
    description: data.outline,
  };

  return (
    <section>
      <div className="mb-[5rem] flex justify-center pc:mt-[3rem] pc:mb-[10rem]">
        <Link href={`/contents/guide/${parentCategory}/${category}`} passHref>
          <NrcPurchaseGuide viewType="purchaseGuideOverview" data={guideData} />
        </Link>
      </div>
      {isMobile && (
        <RelatedEncyclopedia
          type="videoEncyclopedia"
          parentCategory={parentCategory}
          category={category}
        />
      )}
      <RelatedEncyclopedia
        type="encyclopedia"
        parentCategory={parentCategory}
        category={category}
      />
    </section>
  );
};

export default PurchaseGuideOverview;
