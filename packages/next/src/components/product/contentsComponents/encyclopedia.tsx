import { useEffect } from "react";
import { useAppliancesInfo } from "../../../hooks/api/useAppliancesInfo";
import { useMobileDetect } from "../../../hooks/useMobileDetect";
import EncyclopediaContentPresenter from "../../encyclopedia";

const Encyclopedia = ({
  productCategoryKey,
  onLoad,
}: {
  productCategoryKey: any;
  onLoad: any;
}) => {
  const { isMobile } = useMobileDetect();
  const { encyclopediaList: data, isLoading } = useAppliancesInfo(
    "encyclopedia",
    {
      relationViewType: "productDetail",
      relationCategoryKey: productCategoryKey,
      sort: "popular",
      take: isMobile ? 5 : 8,
    }
  );

  useEffect(() => {
    if (!isLoading && data && data.length > 0 && onLoad) {
      onLoad({
        type: "recommend",
        detailContent: "encyclopedia",
      });
    }
  }, [data, isLoading, onLoad]);

  if (!data || data.length === 0) {
    return null;
  }

  return <EncyclopediaContentPresenter data={data} />;
};

export default Encyclopedia;
