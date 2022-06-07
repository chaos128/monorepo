import { IGetStoreBestGoodsPreviewParam } from "../../hooks/api/useBestGoodsPreview";
import useTimedealPreview from "../../hooks/api/useTimedealPreview";
import Timedeal from "../timedeal";

const PickTimedeal = ({
  size,
  relationCateCd,
  relationViewType,
}: IGetStoreBestGoodsPreviewParam) => {
  const { data } = useTimedealPreview({
    size,
    relationCateCd,
    relationViewType,
  });
  if (!data || data.length === 0) {
    return null;
  }

  return <Timedeal data={data} />;
};

export default PickTimedeal;
