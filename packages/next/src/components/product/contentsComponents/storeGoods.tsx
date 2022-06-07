import { useEffect, useMemo } from "react";
import TimedealContentPresenter from "../../../components/timedeal";
import { useCategories } from "../../../hooks/api/useCategories";
import useStoreGoodsList from "../../../hooks/api/useStoreGoodsList";

const StoreGoods = ({
  productCategoryKey,
  onLoad,
}: {
  productCategoryKey: any;
  onLoad: any;
}) => {
  const { categoryMap } = useCategories();

  const cateCd = useMemo(() => {
    if (productCategoryKey && categoryMap && categoryMap[productCategoryKey]) {
      return categoryMap[productCategoryKey].godoCategoryId;
    }

    return null;
  }, [productCategoryKey, categoryMap]);

  const { storeGoodsData, isLoading } = useStoreGoodsList({ size: 3, cateCd });

  useEffect(() => {
    if (!isLoading && storeGoodsData && storeGoodsData.length > 0 && onLoad) {
      onLoad({
        type: "recommend",
        detailContent: "timedeal",
      });
    }
  }, [storeGoodsData, isLoading, onLoad]);

  if (!storeGoodsData || storeGoodsData?.length === 0) {
    return null;
  }

  return (
    <TimedealContentPresenter data={storeGoodsData} viewType="productDetail" />
  );
};

export default StoreGoods;
