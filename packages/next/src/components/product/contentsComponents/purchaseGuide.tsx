import { useEffect } from "react";
import PurchaseGuideContentPresenter from "../../../components/purchaseGuide";
import { usePurchaseGuide } from "../../../hooks/api/usePurchaseGuide";

const PurchaseGuide = ({
  productCategoryKey,
  onLoad,
}: {
  productCategoryKey: any;
  onLoad: any;
}) => {
  const { resultData: data, isLoading } = usePurchaseGuide({
    type: `productRelationGuide_${productCategoryKey}`,
    relationViewType: "productDetail",
    relationCategoryKey: productCategoryKey,
    take: 1,
  });

  useEffect(() => {
    if (!isLoading && data && data.length > 0 && onLoad)
      onLoad({
        type: "recommend",
        detailContent: "purchaseGuide",
      });
  }, [data, isLoading, onLoad]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <PurchaseGuideContentPresenter
      data={data}
      viewType="productDetail"
      parentKey={productCategoryKey}
    />
  );
};

export default PurchaseGuide;
