import useExhibitionsPreview from "../../hooks/api/useExhibitionsPreview";
import { HomeParentKey } from "../../pageComponents/Home";
import ExhibitionContentPresenter from "../exhibition";

const Exhibition = ({ parentKey }: { parentKey: HomeParentKey }) => {
  const { data } = useExhibitionsPreview({
    relationViewType: "productDetail",
    productCategoryKey: parentKey,
  });
  if (!data || data.length === 0) {
    return null;
  }

  return <ExhibitionContentPresenter data={data} />;
};

export default Exhibition;
