import useNosearchDealPreview from "../../hooks/api/useNosearchDealPreview";
import { HomeParentKey } from "../../pageComponents/Home";
import ReviewTemPresenter from "../reviewTem";

const ReviewTem = ({ parentKey }: { parentKey: HomeParentKey }) => {
  const { data, isLoading } = useNosearchDealPreview({
    productCategoryKey: parentKey === "all" ? undefined : parentKey,
    isBeforeEventPeriod: false,
    isFillItem: true,
    size: 8,
  });

  if (!data || data.length === 0 || isLoading) {
    return null;
  }

  return <ReviewTemPresenter viewType="home" data={data} />;
};

export default ReviewTem;
