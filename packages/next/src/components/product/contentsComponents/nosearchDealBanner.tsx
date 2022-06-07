import BannerPresenter from "../../../components/banner";
import Link from "../../../components/Link";
import {
  NosearchDealBannerPostLocation,
  NosearchDealBannerType,
  useNosearchDealBanner,
} from "../../../hooks/api/useNosearchDealBanner";
import { useMobileDetect } from "../../../hooks/useMobileDetect";

const NosearchDealBanner = ({
  productCategoryKey,
}: {
  productCategoryKey: string;
}) => {
  const { isMobile } = useMobileDetect();

  const { nosearchDealBannerData } = useNosearchDealBanner({
    type: NosearchDealBannerType.ADVERTISE,
    productCategoryKey,
    postLocation: NosearchDealBannerPostLocation.PRODUCT_DETAIL,
  });

  if (!nosearchDealBannerData || !NosearchDealBannerPostLocation) {
    return null;
  }

  return (
    <Link href={nosearchDealBannerData.link} passHref>
      <BannerPresenter isMobile={isMobile} data={nosearchDealBannerData} />
    </Link>
  );
};

export default NosearchDealBanner;
