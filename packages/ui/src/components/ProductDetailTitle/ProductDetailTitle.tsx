// Generated with util/create-component.js
import React, { useEffect, useState } from "react";
import ColorChips from "../ColorChips";
import PickLabel from "../PickLabel";
import StarRating from "../StarRating";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import {
  BookmarkDefault,
  BookmarkPressed,
  Caret,
  ComparisonDefault,
  ComparisonPressed,
  Share,
} from "../UI/Icon";
import Text from "../UI/Text";
import { ProductDetailTitleProps } from "./ProductDetailTitle.types";

const ProductDetailTitle: React.FC<ProductDetailTitleProps> = (props) => {
  const {
    goodsName,
    modelName,
    brandName,
    productCategory,
    price,
    pickType,
    reviewAvg,
    reviewCnt,
    colors,
    likeCount,
    likeStatus,
    compareStatus,
    BookmarkButton,
    CompareButton,
    ShareButton,
    PayButton,
    ReviewButton,
  } = props.data;

  const getPriceString = (price: string) => {
    const endText = price.slice(-2, price.length);
    if (endText === "만원") return price;
    return price + "만원";
  };

  return (
    <div
      data-testid="ProductDetailTitle"
      className="nrc--ProductDetailTitle pc:flex"
    >
      <div className="relative w-full flex justify-center pb-[4.5rem] border-b-[1px] border-gray-3 pc:hidden">
        {colors && (
          <div className="absolute top-0 left-0">
            <ColorChips
              colors={colors}
              chipWidth="2"
              chipHeight="2"
              direction="column"
              shape="square"
              size={10}
            />
          </div>
        )}
        {/* <ImageSlider viewType="productDetail" data={mobileImageSliderProps} /> */}
      </div>
      <div className="mt-[2rem] flex justify-between items-end pc:items-start pc:ml-[2rem]">
        <div>
          <div className={`inline-block ${pickType === "none" && "hidden"}`}>
            <PickLabel
              pickType={pickType}
              categoryKr={productCategory}
              labelStyle="mb-[0.4rem] pc:mb-[2rem] pc:text-body-5 pc:px-[0.8rem] pc:py-[0.4rem]"
            />
          </div>
          <h1 className="font-bold text-heading-5 pc:text-heading-4">
            {brandName} {goodsName} {modelName}
          </h1>

          {/* PC 가격 */}
          <Heading level={5} className="hidden pc:block pc:mt-[0.4rem]">
            {getPriceString(price)}
          </Heading>

          {reviewAvg && reviewCnt ? (
            <div
              className="mt-[0.4rem] cursor-pointer"
              onClick={() => {
                ReviewButton && ReviewButton();
              }}
            >
              <StarRating
                rating={reviewAvg}
                styleFor={{
                  size: 1.3,
                }}
                text={
                  <Text
                    type="B5"
                    className="text-gray-10 ml-[0.8rem] flex items-center"
                  >
                    {reviewCnt}개의 구매후기 & 리뷰
                    <span className="ml-[0.8rem]">
                      <Caret size={12} color="#3A3A3A" />
                    </span>
                  </Text>
                }
              />
            </div>
          ) : (
            ""
          )}

          {/* PC 구매하기 버튼 */}
          <div className="hidden pc:block">
            <Button
              size="xl"
              type="cta"
              className="w-[30rem]"
              onClick={() => {
                PayButton();
              }}
            >
              구매하기
            </Button>
          </div>
        </div>

        {/* 모바일 공유하기 버튼 */}
        <div className="text-center pc:hidden">
          <button
            onClick={(e) => {
              e.preventDefault();
              if ((e.target as Element).nodeName === "svg" || "path") {
                ShareButton();
              }
            }}
          >
            <Share size="2.4rem" />
            <Text type="D3" className="text-gray-10">
              공유
            </Text>
          </button>
        </div>
      </div>

      {/* PC 버튼 */}
      <PcButtons
        BookmarkButton={BookmarkButton}
        CompareButton={CompareButton}
        ShareButton={ShareButton}
        likeCount={likeCount}
        likeStatus={likeStatus}
        compareStatus={compareStatus}
      />
    </div>
  );
};

export default ProductDetailTitle;

const PcButtons = (props: {
  BookmarkButton: Function;
  CompareButton: Function;
  ShareButton: Function;
  likeCount?: number;
  likeStatus?: boolean;
  compareStatus?: boolean;
}) => {
  const {
    BookmarkButton,
    CompareButton,
    ShareButton,
    likeCount = 0,
    likeStatus = false,
    compareStatus = false,
  } = props;

  const [likeCountState, setLikeCount] = useState<number>(likeCount);
  const [isLiked, setIsLiked] = useState<boolean>(likeStatus);
  const [isCompared, setIsCompared] = useState<boolean>(compareStatus);

  const onLikeCountStatus = (likeCount: number) => {
    setLikeCount(likeCount);
  };
  const onLikeStatus = (likeStatus: boolean) => {
    setIsLiked(likeStatus);
  };
  const onCompareStatus = (compareStatus: boolean) => {
    setIsCompared(compareStatus);
  };

  useEffect(() => {
    setLikeCount(likeCount);
    onLikeStatus(likeStatus);
    onCompareStatus(compareStatus);
  }, [likeStatus, compareStatus]);

  return (
    <div className="hidden pc:flex w-[4rem] h-[40rem] flex-col justify-center items-center ml-[3rem] space-y-[2rem]">
      {BookmarkButton && (
        <button
          onClick={(e) => {
            e.preventDefault();
            if ((e.target as Element).nodeName === "svg" || "path") {
              BookmarkButton();
              if (isLiked) onLikeCountStatus(likeCount);
              else onLikeCountStatus(likeCount + 1);
              onLikeStatus(!isLiked);
            }
          }}
        >
          <div className="flex flex-col items-center">
            {isLiked ? (
              <BookmarkPressed size="3rem" />
            ) : (
              <BookmarkDefault size="3rem" />
            )}
            <Text
              type="B10"
              className={`whitespace-nowrap ${
                isLiked ? "text-primary" : "text-gray-10"
              }`}
            >
              {likeCountState}
            </Text>
          </div>
        </button>
      )}

      {ShareButton && (
        <button
          onClick={(e) => {
            e.preventDefault();
            if ((e.target as Element).nodeName === "svg" || "path") {
              ShareButton();
            }
          }}
        >
          <Share size="3rem" />
          <Text type="B10" className="text-gray-10">
            공유
          </Text>
        </button>
      )}

      {CompareButton && (
        <button
          onClick={(e) => {
            e.preventDefault();
            if ((e.target as Element).nodeName === "svg" || "path") {
              CompareButton();
              onCompareStatus(!isCompared);
            }
          }}
        >
          <div className="flex flex-col items-center">
            {isCompared ? (
              <ComparisonPressed size="3rem" />
            ) : (
              <ComparisonDefault size="3rem" />
            )}
            <Text
              type="B10"
              className={`whitespace-nowrap ${
                isCompared ? "text-primary" : "text-gray-10"
              }`}
            >
              비교함
            </Text>
          </div>
        </button>
      )}
    </div>
  );
};
