// Generated with util/create-component.js
import React from "react";
import NsImage from "../shared/ns-image";
import Timer from "../Timer";
import Heading from "../UI/Heading";
import Text from "../UI/Text";
import { StoreItemProps } from "./StoreItem.types";

const StoreItem: React.FC<StoreItemProps> = (props) => {
  const { data, isLogin = false, fluid } = props;
  const {
    type = "none",
    index,
    goodsNo,
    goodsName,
    brandName,
    imageUrl,
    ImageWrapper,
    goodsPrice,
    fixedPrice,
    periodDiscountStart,
    periodDiscountEnd,
    pickType,
    benefitUseType,
    goodsAccess,
  } = data;

  const imageSize = fluid
    ? "w-full max-w-[16rem] pc:max-w-[27rem]"
    : "w-[16rem] pc:w-[27rem]";

  return (
    <article
      data-testid="StoreItem"
      className={`nrc--StoreItem ${
        fluid
          ? "w-full max-w-[16rem] pc:max-w-[27rem] pr-[1rem]"
          : "w-[16rem] pc:w-[27rem]"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[10px] border-[1px] border-gray-2 ${imageSize}`}
        style={{ aspectRatio: "1/1" }}
      >
        <div className={`relative ${imageSize}`}>
          <NsImage
            ImageWrapper={ImageWrapper}
            imageUrl={imageUrl}
            className={imageSize}
            storeImage
          />
        </div>
        {type === "best" && index && (
          <div className="bg-gray-10 w-[2.8rem] h-[2.8rem] flex justify-center items-center absolute top-0 left-0 rounded-br-[10px]">
            <Heading
              level={5}
              className="text-white"
              aria-label="인기상품 순위"
            >
              {index}
            </Heading>
          </div>
        )}
        {pickType !== "none" && (
          // 아직 시안이 나오지 않아서 이미지는 추후 변경될 예정
          <img
            src="https://nosearch.com/static/images/pick_best_rectangle.png"
            className="w-[4rem] h-[4rem] absolute top-0 right-0 rounded-bl-[10px] pc:w-[5rem] pc:h-[5rem]"
          />
        )}
        {type === "timedeal" && (
          <Timer
            id={goodsNo}
            type="timedeal"
            periodDiscountStart={periodDiscountStart}
            periodDiscountEnd={periodDiscountEnd}
            benefitUseType={benefitUseType}
          />
        )}
      </div>
      <div className="my-[0.8rem]">
        <Text
          type="D3"
          className="text-gray-7 pc:text-body-10"
          aria-label="브랜드명"
        >
          {brandName}
        </Text>
        <Text
          type="B6"
          className="break-all text-gray-10 line-clamp-2 pc:text-body-4"
          aria-label="상품명"
        >
          {goodsName}
        </Text>
      </div>
      <div>
        {fixedPrice > goodsPrice ? (
          <Text
            type="B10"
            className="line-through text-gray-6 pc:hidden"
            aria-label="정상가"
          >
            {numberWithCommas(fixedPrice)}원
          </Text>
        ) : (
          ""
        )}
        {!isLogin && goodsAccess === "member" ? (
          <Heading
            level={5}
            className="text-secret pc:text-heading-4 pc:font-extrabold"
            aria-label="회원전용 상품으로 가격 비공개"
          >
            회원전용 시크릿 특가
          </Heading>
        ) : (
          <div className="flex items-center space-x-[0.6rem]">
            {fixedPrice > goodsPrice ? (
              <Heading
                level={4}
                className={`pc:text-heading-1 ${
                  type === "timedeal" ? "text-red-4" : "text-blue-7"
                }`}
                aria-label="할인율"
              >
                {discountPercetage({ fixedPrice, goodsPrice })}%
              </Heading>
            ) : (
              ""
            )}
            <Heading
              level={4}
              className="text-gray-10 pc:text-heading-3"
              aria-label="판매가"
            >
              {numberWithCommas(goodsPrice)}원
            </Heading>
          </div>
        )}
      </div>
    </article>
  );
};

export default StoreItem;

const numberWithCommas = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const discountPercetage = (props: {
  fixedPrice: number;
  goodsPrice: number;
}): number => {
  const { fixedPrice, goodsPrice } = props;
  if (fixedPrice > goodsPrice) {
    return Math.round(((fixedPrice - goodsPrice) / fixedPrice) * 100);
  }
  return 0;
};
