import { useEffect } from "react";
import useExhibitionsPreview from "../../../hooks/api/useExhibitionsPreview";
import ExhibitionContentPresenter from "../../exhibition";

const Exhibition = ({ cateCd, onLoad }: { cateCd: any; onLoad: any }) => {
  const { data, isLoading } = useExhibitionsPreview({
    relationViewType: "productDetail",
    cateCd,
  });

  useEffect(() => {
    if (!isLoading && data && data.length > 0 && onLoad) {
      onLoad({
        type: "recommend",
        detailContent: "exhibition",
      });
    }
  }, [data, isLoading, onLoad]);

  if (!data || data.length === 0) {
    return null;
  }

  return <ExhibitionContentPresenter data={data} />;
};

export default Exhibition;
