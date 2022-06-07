import PurchaseGuideContentPresenter from "../../components/purchaseGuide";
import { usePurchaseGuide } from "../../hooks/api/usePurchaseGuide";

const PurchaseGuide = ({
  parentKey,
  productCategoryKey,
}: {
  parentKey: string;
  productCategoryKey: string;
}) => {
  const { resultData: data } = usePurchaseGuide({
    type: "pick",
    productCategoryKeys: productCategoryKey,
    take: 1,
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <PurchaseGuideContentPresenter
      data={data}
      viewType="pick"
      parentKey={parentKey}
    />
  );
};

export default PurchaseGuide;
