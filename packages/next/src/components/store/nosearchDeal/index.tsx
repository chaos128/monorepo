import { NosearchDeal as NosearchDealComponent } from "@nosearch/ui";
import { INosearchDealData } from "@nosearch/ui/src/components/NosearchDeal/NosearchDeal.types";
import Link from "../../../components/Link";
import useNosearchDeal from "../../../hooks/api/useNosearchDeal";

const NosearchDeal = () => {
  const { data, isLoading } = useNosearchDeal({
    isValidEventPeriod: true,
  });
  if (!data) {
    return null;
  }

  return (
    <div>
      <h1>공동구매</h1>
      <div className="space-y-2">
        {data.map((item, i: number) => {
          return <NosearchDealProduct key={`nosearchDeal_${i}`} item={item} />;
        })}
      </div>
    </div>
  );
};

export default NosearchDeal;

const NosearchDealProduct = ({ item }: { item: any }) => {
  const nsDealData: INosearchDealData = {
    title: item.title,
    description: item.description,
    dealGoodsNm: item.dealGoodsNm,
    goodsNo: item.goodsNo,
    discountedPrice: item.discountedPrice,
    originPrice: item.originPrice,
    video: item.video,
    videoThumbnail: item.videoThumbnail,
    isComingSoon: item.isComingSoon,
    comingSoonImg: item.comingSoonImg,
    periodDiscountStart: item.periodDiscountStart,
    periodDiscountEnd: item.periodDiscountEnd,
    benefitUseType: item.benefitUseType,
    goodsAccess: item.goodsAccess,
    soldOutFl: item.soldOutFl,
    hasSpecialPrice: item.hasSpecialPrice,
    hasCouponDiscount: item.hasCouponDiscount,
  };
  return (
    <Link
      href={`https://store.nosearch.com/goods/goods_view.php?goodsNo=${item.goodsCd}`}
      passHref
    >
      <a>
        <NosearchDealComponent
          data={nsDealData}
          viewType="home"
        ></NosearchDealComponent>
      </a>
    </Link>
  );
};
