import { useEffect } from "react";
import NosearchDealProductContentPresenter from "../../../components/nosearchDeal";
import useNosearchDealPreview from "../../../hooks/api/useNosearchDealPreview";

const NosearchDeal = ({
  productCategoryKey,
  cateCd,
  onLoad,
}: {
  productCategoryKey: any;
  cateCd: any;
  onLoad: any;
}) => {
  const { data, isLoading } = useNosearchDealPreview({
    productCategoryKey,
    cateCd,
    isValidEventPeriod: true,
    isFillItem: true,
    sort: "order",
  });

  useEffect(() => {
    if (!isLoading && data && data.length > 0 && onLoad) {
      onLoad("nosearchDeal");
    }
  }, [data, isLoading, onLoad]);

  if (!data || data.length === 0 || !cateCd) {
    return null;
  }

  return <NosearchDealProductContentPresenter data={data} viewType="home" />;
};

export default NosearchDeal;
