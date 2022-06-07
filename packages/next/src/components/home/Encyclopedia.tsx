import { useAppliancesInfo } from "../../hooks/api/useAppliancesInfo";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../../pageComponents/Home";
import EncyclopediaContentPresenter from "../encyclopedia";

const Encyclopedia = ({ parentKey }: { parentKey: HomeParentKey }) => {
  const { isMobile } = useMobileDetect();
  const { encyclopediaList: data } = useAppliancesInfo("encyclopedia", {
    productCategoryKeys: parentKey ? parentKey : "all",
    take: isMobile ? 5 : 8,
  });
  if (!data || data.length === 0) {
    return null;
  }

  return <EncyclopediaContentPresenter data={data} parentKey={parentKey} />;
};

export default Encyclopedia;
