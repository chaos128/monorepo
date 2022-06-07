import { useEffect } from "react";
import WeeklyBestContentPresenter from "../../../components/weeklyBest";
import useBestGoodsPreview from "../../../hooks/api/useBestGoodsPreview";
import { useMobileDetect } from "../../../hooks/useMobileDetect";

const WeeklyBest = ({ cateCd, onLoad }: { cateCd: any; onLoad: any }) => {
  const { isMobile } = useMobileDetect();
  const { data, isLoading } = useBestGoodsPreview({
    relationCateCd: cateCd,
    relationViewType: "productDetail",
    size: isMobile ? 6 : 8,
  });

  useEffect(() => {
    if (!isLoading && data && data.length > 0 && onLoad) {
      onLoad({
        type: "recommend",
        detailContent: "weeklyBest",
      });
    }
  }, [data, isLoading, onLoad]);

  if (!data || data.length === 0) {
    return null;
  }

  return <WeeklyBestContentPresenter data={data} />;
};

export default WeeklyBest;
