// Generated with util/create-component.js
import React from "react";
import PickLabel from "../PickLabel";
import NsImage from "../shared/ns-image";
import Timer from "../Timer";
import Heading from "../UI/Heading";
import Text from "../UI/Text";
import { TimedealProps } from "./Timedeal.types";

const Timedeal: React.FC<TimedealProps> = (props) => {
  const { data, isLogin = false } = props;
  const {
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

  return (
    <article
      data-testid="Timedeal"
      className="nrc--Timedeal flex w-[32.4rem] h-[14.4rem] p-[1.2rem] border-[1px] border-gray-3 rounded-[10px] pc:block pc:w-[27rem] pc:border-0 pc:p-0 pc:h-auto"
    >
      <div
        className="relative w-[12rem] h-[12rem] overflow-hidden rounded-[10px] border-[1px] border-gray-2 pc:w-[27rem] pc:h-[27rem]"
        style={{ aspectRatio: "1/1" }}
      >
        <div className="relative w-[12rem] h-[12rem] pc:w-[27rem] pc:h-[27rem]">
          <NsImage
            ImageWrapper={ImageWrapper}
            imageUrl={imageUrl}
            storeImage
            className="w-[12rem] h-[12rem] pc:w-[27rem] pc:h-[27rem]"
          />
        </div>
        <Timer
          id={goodsNo}
          periodDiscountStart={periodDiscountStart}
          periodDiscountEnd={periodDiscountEnd}
          benefitUseType={benefitUseType}
        />
        {pickType !== "none" && (
          // 아직 시안이 나오지 않아서 이미지는 추후 변경될 예정
          <img
            src="https://nosearch.com/static/images/pick_best_rectangle.png"
            className="hidden w-[5rem] h-[5rem] absolute top-0 right-0 rounded-bl-[10px] pc:block"
          />
        )}
      </div>
      <div className="w-[17rem] h-[12rem] flex flex-col justify-between ml-[1rem] pc:w-[27rem] pc:h-auto pc:ml-0 pc:mt-[1.2rem] ">
        <div>
          <PickLabel pickType={pickType} labelStyle="pc:hidden" />
          <Text
            type="B10"
            className="hidden text-gray-7 pc:block"
            aria-label="브랜드명"
          >
            {brandName}
          </Text>
          <Text
            type="B6"
            className="text-black break-all line-clamp-2 mt-[0.4rem] pc:text-body-4 pc:font-normal"
            aria-label="상품명"
          >
            {goodsName}
          </Text>
        </div>
        {!isLogin && goodsAccess === "member" ? (
          <Heading
            level={5}
            className="text-secret mt-[0.4rem] pc:text-heading-4 pc:font-extrabold"
            aria-label="회원전용 상품으로 가격 비공개"
          >
            회원전용 시크릿 특가
          </Heading>
        ) : (
          <div className="flex items-center space-x-3">
            {fixedPrice > goodsPrice ? (
              <Heading level={1} className="text-red-4" aria-label="할인율">
                {discountPercetage({ fixedPrice, goodsPrice })}%
              </Heading>
            ) : (
              ""
            )}
            <Heading level={3} className="text-black" aria-label="판매가">
              {numberWithCommas(goodsPrice)}원
            </Heading>
          </div>
        )}
      </div>
    </article>
  );
};

export default Timedeal;

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
