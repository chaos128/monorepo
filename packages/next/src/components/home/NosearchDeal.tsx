import useNosearchDeal from "../../hooks/api/useNosearchDeal";
import NosearchDealProductContentPresenter from "../nosearchDeal";

const NosearchDeal = () => {
  const { data: nsDealData } = useNosearchDeal({
    isValidEventPeriod: true,
  });
  const { data: nsDealComingSoonData } = useNosearchDeal({
    isBeforeEventPeriod: true,
  });

  const data = [...nsDealData, ...nsDealComingSoonData];
  if (data.length === 0) {
    return null;
  }

  return <NosearchDealProductContentPresenter data={data} viewType="home" />;
};

export default NosearchDeal;
