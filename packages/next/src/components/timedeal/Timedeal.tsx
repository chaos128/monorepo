import { Skeleton, StoreItem, Timedeal as NrcTimedeal } from "@nosearch/ui";
import { ItemProps } from "@nosearch/ui/src/components/Timedeal/Timedeal.types";
import Image from "next/image";
import Link from "../../components/Link";
import { IStoreGoods } from "../../hooks/api/useStoreGoodsList";
import NextImageWrapper from "../../shared/components/next-image";

function Timedeal({
  data,
  isMobile,
  isLoading,
}: {
  data: IStoreGoods;
  isMobile: boolean;
  isLoading: boolean;
}) {
  const timedealData: ItemProps = {
    ...data,
    goodsName: data.goodsNm,
    brandName: data.brandName,
    periodDiscountStart: data.periodDiscountStart ?? "",
    periodDiscountEnd: data.periodDiscountEnd ?? "",
    benefitUseType: data.benefitUseType ?? "",
    goodsAccess: data.goodsAccess === "member" ? "member" : "all",
    pickType: data.pickType ? data.pickType : "none",
    ImageWrapper: (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image
            src={`https://api.nosearch.com/ns_api/v1/product/storeImage?imageUrl=${data.imageUrl}`}
            alt={data.goodsNm}
            width={isMobile ? "160rem" : "270rem"}
            height={isMobile ? "160rem" : "270rem"}
            //layout="fill"
          />
        )}
      />
    ),
  };

  if (isLoading) {
    return <Skeleton hasImage hasText />;
  }

  if (isMobile) {
    return <NrcTimedeal data={timedealData} />;
  }

  return (
    <Link
      href={`https://${
        isMobile ? "m." : ""
      }store.nosearch.com/goods/goods_view.php?goodsNo=${data.goodsNo}`}
      passHref
    >
      <a>
        <StoreItem data={{ ...timedealData, type: "timedeal" }} fluid />
      </a>
    </Link>
  );
}

export default Timedeal;
