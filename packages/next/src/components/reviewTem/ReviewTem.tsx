import { NosearchDeal as NrcNosearchDeal } from "@nosearch/ui";
import { INosearchDealData } from "@nosearch/ui/src/components/NosearchDeal/NosearchDeal.types";
import Image from "next/image";
import Link from "../../components/Link";
import { INosearchDealRefinedProductData } from "../../hooks/api/useNosearchDeal";
import NextImageWrapper from "../../shared/components/next-image";

function ReviewTem({
  data,
  isMobile,
  viewType,
}: {
  data: INosearchDealRefinedProductData;
  isMobile: boolean;
  viewType: "home" | "pick";
}) {
  const clickUrl = `https://${
    isMobile ? "m." : ""
  }store.nosearch.com/goods/goods_view.php?goodsNo=${data.goodsCd}`;
  const reviewTemData: INosearchDealData = {
    ...data,
    goodsNo: data.goodsCd ?? "",
    videoThumbnail: data.videoThumbnail ?? "",
    isComingSoon: data.isComingSoon ?? false,
    periodDiscountStart: data.periodDiscountStart ?? "",
    periodDiscountEnd: data.periodDiscountEnd ?? "",
    benefitUseType: data.benefitUseType ?? "",
    soldOutFl: data.soldOutFl === "y" ? "y" : "n",
    // 리뷰템이므로 공동구매가 끝나서 특가 X,
    hasSpecialPrice: false,
    // TODO: 쿠폰 특가 확인 필요
    hasCouponDiscount: false,
    ImageWrapper: data.videoThumbnail ? (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image
            src={data.videoThumbnail ?? ""}
            alt={data.title}
            layout="fill"
            priority={viewType === "pick"}
          />
        )}
      />
    ) : undefined,
  };
  return (
    <Link href={clickUrl} passHref>
      <a>
        <NrcNosearchDeal
          viewType={viewType}
          data={reviewTemData}
          type="reviewTem"
        />
      </a>
    </Link>
  );
}

export default ReviewTem;
