import { useAtomValue } from "jotai/utils";
import Link from "../../../components/Link";
import { INosearchDealRefinedProductData } from "../../../hooks/api/useNosearchDeal";
import useNosearchDealPreview from "../../../hooks/api/useNosearchDealPreview";
import { reviewTemCategoryAtom, useReviewTem } from "./reviewTemHook";

const ReviewTem = () => {
  const { data, dataMap, category, isLoading } = useNosearchDealPreview({
    isBeforeEventPeriod: false,
  });

  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>리뷰템</h1>
      {category && <CategoryFilter category={category} />}
      <ReviewTemProductsView data={data} dataMap={dataMap} />
    </div>
  );
};

export default ReviewTem;

const CategoryFilter = ({ category }: { category: string[] }) => {
  const selectedCategory = useAtomValue(reviewTemCategoryAtom);
  const { onSetCategory } = useReviewTem();

  return (
    <div className="my-2">
      <div>카테고리 필터 : {selectedCategory}</div>
      <div className="flex flex-wrap space-x-1">
        <div
          className={`${
            selectedCategory === "전체" && " font-bold text-blue-8"
          }`}
          onClick={() => {
            onSetCategory("전체");
          }}
        >
          전체
        </div>
        {category.map((value: string, i: number) => {
          return (
            <div
              key={`reviewTemCategory_${i}`}
              className={`${
                selectedCategory === value && "font-bold text-blue-8"
              }`}
              onClick={() => {
                onSetCategory(value);
              }}
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReviewTemProductsView = ({
  data,
  dataMap,
}: {
  data: INosearchDealRefinedProductData[];
  dataMap: Map<string, INosearchDealRefinedProductData[]>;
}) => {
  const selectedCategory = useAtomValue(reviewTemCategoryAtom);

  const filteringData = dataMap.get(selectedCategory);

  return (
    <div className="space-y-2">
      {selectedCategory === "전체" &&
        data.map((item, i: number) => {
          return <ReviewTemProduct key={`reviewTem_${i}`} item={item} />;
        })}
      {selectedCategory !== "전체" &&
        filteringData &&
        filteringData.map((item, i: number) => {
          return <ReviewTemProduct key={`reviewTem_${i}`} item={item} />;
        })}
    </div>
  );
};

const ReviewTemProduct = ({
  item,
}: {
  item: INosearchDealRefinedProductData;
}) => {
  return (
    <Link
      href={`https://store.nosearch.com/goods/goods_view.php?goodsNo=${item.goodsCd}`}
      passHref
    >
      <div>
        <div>{item.title}</div>
        <div>{item.dealGoodsNm}</div>
        <div>{item.description}</div>
      </div>
    </Link>
  );
};
