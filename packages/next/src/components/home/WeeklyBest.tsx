import useBestGoodsPreview from "../../hooks/api/useBestGoodsPreview";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../../pageComponents/Home";
import WeeklyBestContentPresenter from "../weeklyBest";

const WeeklyBest = ({ parentKey }: { parentKey: HomeParentKey }) => {
  const { isMobile } = useMobileDetect();
  const { data } = useBestGoodsPreview({
    relationCategoryKey: parentKey ? parentKey : "all",
    relationViewType: "storeHome",
    size: isMobile ? 6 : 8,
  });
  if (!data || data.length === 0) {
    return null;
  }

  return <WeeklyBestContentPresenter data={data} />;
};

export default WeeklyBest;
