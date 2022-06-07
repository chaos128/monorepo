import useNosearchDeal from "../../hooks/api/useNosearchDeal";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../../pageComponents/Home";
import ReviewTemPresenter from "../reviewTem";

const ReviewTem = ({
  parentKey,
  productCategoryKey,
}: {
  parentKey: HomeParentKey;
  productCategoryKey: string;
}) => {
  const { isMobile } = useMobileDetect();

  const { data, isLoading } = useNosearchDeal({
    productCategoryKey: productCategoryKey || parentKey,
    isValidEventPeriod: false,
    size: isMobile ? 8 : 2,
  });

  if (!data || data.length === 0 || isLoading) {
    return null;
  }

  return <ReviewTemPresenter viewType="pick" data={data} />;
};

export default ReviewTem;
