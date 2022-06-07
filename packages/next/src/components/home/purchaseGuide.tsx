import PurchaseGuideContentPresenter from "../../components/purchaseGuide";
import { usePurchaseGuide } from "../../hooks/api/usePurchaseGuide";
import { HomeParentKey } from "../../pageComponents/Home";

const PurchaseGuide = ({ parentKey }: { parentKey: HomeParentKey }) => {
  const { resultData: data, isLoading } = usePurchaseGuide({
    type: "home_true",
    productCategoryKeys: parentKey ? parentKey : "all",
    take: 4,
    sort: "popular",
  });

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <PurchaseGuideContentPresenter
      data={data}
      viewType="home"
      parentKey={parentKey}
    />
  );
};

export default PurchaseGuide;
