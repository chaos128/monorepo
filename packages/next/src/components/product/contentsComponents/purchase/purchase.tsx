import { Caret, Heading, SlideWrapper, Text, Timer } from "@nosearch/ui";
import Image from "next/image";
import Link from "next/link";
import { IGoods, ISearchDocument } from "ns-ts-interfaces";
import { createRef, useEffect, useMemo, useState } from "react";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import {
  isValidSpecValue,
  numberWithCommas,
  removeBRtag,
} from "../../../../shared/functions";
import { IProductDetailProps } from "../type";
import {
  checkIsCheapestPrice,
  getDiscountState,
  useSameModelData,
} from "./useSameModelData";

export interface IPurchaseProps extends IProductDetailProps {
  sameGroup: string;
  modelReviewData: ISearchDocument;
}
const Purchase = ({
  parentCategoryKey,
  productCategoryKey,
  modelName,
  sameGroup,
  modelReviewData: modelReview,
  onLoad,
}: IPurchaseProps) => {
  const { isMobile } = useMobileDetect();

  const [selectedModelIndex, setSelectedModelIndex] = useState<number>(0);

  const { productMap, productGoodsMap, sortedProductArray, isSuccess } =
    useSameModelData({
      productCategoryKey,
      sameGroup,
      modelReview,
    });

  useEffect(() => {
    if (onLoad && sortedProductArray && isSuccess) {
      onLoad({ type: "purchase-info" });
    }
  }, [onLoad, sortedProductArray, isSuccess]);

  const selectedGoods = productGoodsMap.get(
    sortedProductArray
      ? sortedProductArray[selectedModelIndex].modelName
      : modelName
  );

  const reviewData = modelReview.reviewData;

  const priceMetaData =
    modelReview.sameGroup === ""
      ? modelReview.priceMetaData
      : sortedProductArray &&
        productMap[sortedProductArray[selectedModelIndex].modelName]
      ? productMap[sortedProductArray[selectedModelIndex].modelName]
          .priceMetaData
      : null;

  const currentGoods = productGoodsMap
    ? productGoodsMap.get(sortedProductArray[selectedModelIndex].modelName)
    : null;

  const verificationName = currentGoods
    ? currentGoods.verificationName
    : undefined;

  const isCheapest = useMemo(() => {
    return checkIsCheapestPrice(priceMetaData, selectedGoods?.goodsPrice);
  }, [priceMetaData, selectedGoods]);

  const isSpecialPrice = useMemo(() => {
    if (!selectedGoods || !isCheapest) return;

    const { isDicounting, isTimeDeal } = getDiscountState(selectedGoods);

    return isDicounting && !isTimeDeal;
  }, [selectedGoods, isCheapest]);

  const hasStorePrice =
    (selectedGoods && selectedGoods.goodsPrice > 0) ?? false;
  const storePrice = (selectedGoods && selectedGoods.goodsPrice) ?? 0;

  const price =
    sortedProductArray &&
    productMap[sortedProductArray[selectedModelIndex].modelName]
      ? productMap[sortedProductArray[selectedModelIndex].modelName].price
      : null;

  const maxPrice =
    price && price.indexOf("~") > -1
      ? Math.round(parseFloat(price.split("~")[1]) * 10) * 1000
      : null;

  const goodsAccess = selectedGoods ? selectedGoods.goodsAccess : null;

  if (!reviewData || !sortedProductArray) {
    return null;
  }

  const PurchaseProductComponents = () => {
    return (
      <>
        {sortedProductArray &&
          sortedProductArray.map((product, i: number) => {
            return (
              <PurchaseProduct
                key={`purchaseProduct_${i}`}
                product={product}
                goodsInfo={productGoodsMap.get(product.modelName)}
                isSelected={i === selectedModelIndex}
                onClickModel={() => {
                  setSelectedModelIndex(i);
                }}
              />
            );
          })}
      </>
    );
  };

  return (
    <div className="pt-[4rem] pb-[6rem]">
      <Heading level={2} className="mx-[2rem] text-gray-10 pc:text-center">
        구매 정보
      </Heading>

      {isMobile && (
        <div className="scrollbar-hide m-[2rem] flex space-x-[1.5rem] overflow-x-scroll">
          <PurchaseProductComponents />
        </div>
      )}
      {!isMobile && (
        <div className="my-[2rem]">
          {sortedProductArray.length > 5 ? (
            <SlideWrapper size={5}>
              {sortedProductArray.map((product, i: number) => {
                return (
                  <PurchaseProduct
                    key={`purchaseProduct_${i}`}
                    product={product}
                    goodsInfo={productGoodsMap.get(product.modelName)}
                    isSelected={i === selectedModelIndex}
                    onClickModel={() => {
                      setSelectedModelIndex(i);
                    }}
                  />
                );
              })}
            </SlideWrapper>
          ) : (
            <div className="flex justify-center space-x-[1.5rem]">
              <PurchaseProductComponents />
            </div>
          )}
        </div>
      )}

      {!hasStorePrice &&
      !priceMetaData?.coupang.price &&
      !priceMetaData?.eleventhStreet.price ? (
        <div className="flex items-center justify-center">
          <div className="relative mr-[0.6rem] h-[2rem] w-[2rem]">
            <Image src="/static/images/caution.png" alt="" layout="fill" />
          </div>
          <Text type="B4" className="my-[0.5rem] text-gray-10">
            제휴 판매처가 없습니다.
          </Text>
        </div>
      ) : (
        <div className="mx-[2rem]">
          <StorePriceBtn
            clickUrl={
              selectedGoods
                ? `https://${
                    isMobile ? "m." : ""
                  }store.nosearch.com/goods/goods_view.php?goodsNo=${
                    selectedGoods.goodsNo
                  }&specReviewUrl=/product/${parentCategoryKey}/${
                    modelReview.productCategoryKey
                  }/detail/${modelReview.modelName}`
                : ""
            }
            type="nosearch"
            isNPay
            price={storePrice}
            priceLabel={
              verificationName || (isSpecialPrice && "특가") || undefined
            }
            priceLabelColor={`${
              verificationName === "삼성 본사 인증점"
                ? "text-[#1C37DA]"
                : verificationName === "LG 본사 인증점"
                ? "text-[#BC0071]"
                : "text-[#FF455B]" // 타임딜, 특가
            }`}
          />

          <StorePriceBtn
            clickUrl={priceMetaData?.coupang.link || "#"}
            type="coupang"
            price={
              priceMetaData?.coupang.price ? priceMetaData?.coupang.price : 0
            }
          />

          <StorePriceBtn
            clickUrl={priceMetaData?.eleventhStreet.link || "#"}
            type="eleventhStreet"
            price={
              priceMetaData?.eleventhStreet.price
                ? priceMetaData?.eleventhStreet.price
                : 0
            }
          />
        </div>
      )}
      <div className="mx-[2rem]">
        <Text type="D3" className="mt-[2rem] text-gray-7">
          ※ (주)노써치는 제휴 링크를 통한 구매에 대해서 제휴 쇼핑몰(쿠팡,
          11번가)로부터 소정의 수수료를 받을 수 있습니다. 구매자에게 추가로
          발생하는 비용은 없습니다.
        </Text>
      </div>
    </div>
  );
};
export default Purchase;

interface IPurchaseProductProps {
  product: ISearchDocument;
  goodsInfo?: IGoods | null;
  isSelected?: boolean;
  onClickModel: () => void;
}

const PurchaseProduct = ({
  product,
  goodsInfo,
  isSelected,
  onClickModel,
}: IPurchaseProductProps) => {
  const ref = createRef<HTMLDivElement>();

  const modelPrice = isValidSpecValue(product.price)
    ? product.price
    : "가격정보 확인 중";

  const isTimeDeal = useMemo(() => {
    if (!goodsInfo) {
      return false;
    }
    const { isTimeDeal } = getDiscountState(goodsInfo);
    return isTimeDeal;
  }, [goodsInfo]);

  const onClick = () => {
    onClickModel();

    if (!ref.current) {
      return;
    }
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`h-[21.2rem] w-[14.3rem] flex-shrink-0 flex-grow-0 cursor-pointer rounded-[20px] border-[1px] p-[1.6rem] text-center ${
        isSelected ? "border-blue-7 bg-blue-1" : "border-gray-2 bg-gray-1"
      }`}
    >
      <div className="relative">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width="100rem"
            height="100rem"
            objectFit="contain"
          />
        )}
        {isTimeDeal &&
          goodsInfo &&
          goodsInfo.periodDiscountStart &&
          goodsInfo.periodDiscountEnd &&
          goodsInfo.benefitUseType && (
            <Timer
              id={product.name}
              periodDiscountStart={goodsInfo?.periodDiscountStart}
              periodDiscountEnd={goodsInfo?.periodDiscountEnd}
              benefitUseType={goodsInfo?.benefitUseType}
            />
          )}
      </div>
      <Heading
        level={6}
        className="line-clamp-1 mt-[0.7rem] break-all text-gray-10"
      >
        {isValidSpecValue(product.modelName) && product.modelName}
      </Heading>
      <Text type="B7" className="line-clamp-1 break-all text-gray-10">
        {isValidSpecValue(product.detailInfo) &&
          removeBRtag(product.detailInfo)}
      </Text>
      <Heading level={6} className="line-clamp-1 break-all text-gray-10">
        {isValidSpecValue(modelPrice) && modelPrice}
      </Heading>
    </div>
  );
};

interface IStorePriceBtnProps {
  clickUrl: string;
  type: "nosearch" | "eleventhStreet" | "coupang";
  isNPay?: boolean;
  price: string | number | null | undefined;
  priceLabel?: string;
  priceLabelColor?: string;
}

const StorePriceBtn = ({
  clickUrl,
  type,
  isNPay = false,
  price,
  priceLabel,
  priceLabelColor,
}: IStorePriceBtnProps) => {
  return (
    <Link href={clickUrl} passHref>
      <div className="mx-auto flex max-w-[40rem] cursor-pointer justify-between border-b-[1px] border-gray-3 p-[2rem]">
        <div className="flex items-center">
          <Image
            src={
              type === "nosearch"
                ? "/static/images/app_logo.png"
                : type === "coupang"
                ? "/static/images/coupang_logo.png"
                : "/static/images/eleventhStreet_logo.png"
            }
            alt={type}
            width={type === "nosearch" ? 24 : type === "coupang" ? 60 : 33}
            height={type === "nosearch" ? 24 : type === "coupang" ? 20 : 14}
          />
          <Heading level={6} className="ml-[0.4rem] mr-[1.2rem] text-gray-10">
            {type === "nosearch"
              ? "노써치"
              : type === "coupang"
              ? "쿠팡"
              : "11번가"}
          </Heading>
          {isNPay && (
            <Image
              src="/static/images/nPay_label.png"
              alt="네이버페이 구매"
              width={51}
              height={16}
            />
          )}
        </div>
        <div className="flex items-center">
          <div className="mr-[0.6rem] text-right">
            {priceLabel && (
              <Text type="D2" className={`${priceLabelColor}`}>
                {priceLabel}
              </Text>
            )}
            <Heading
              level={6}
              className={`${price ? "text-gray-10" : "text-gray-5"}`}
            >
              {price ? `${numberWithCommas(Number(price))}원` : "상품 없음"}
            </Heading>
          </div>
          {price ? <Caret size="2rem" /> : ""}
        </div>
      </div>
    </Link>
  );
};
