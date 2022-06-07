import React, { useEffect, useState } from "react";
import ColorChips from "../ColorChips";
import PickLabel from "../PickLabel";
import Score from "../Score";
import NsImage from "../shared/ns-image";
import SlideWrapper from "../SlideWrapper";
import StarRating from "../StarRating";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import {
  BookmarkDefault,
  BookmarkPressed,
  ComparisonDefault,
  ComparisonPressed,
} from "../UI/Icon";
import Text from "../UI/Text";
import { IReviewData, NosearchPickProps } from "./NosearchPick.types";
import ReviewBox from "./ReviewBox";

interface INosearchPickBox extends NosearchPickProps {
  onClickReivewModal: () => void;
  onSetClickedReview: (review: IReviewData) => void;
}

const NosearchPickBox = ({
  viewType: type,
  data,
  index,
  onClickReivewModal,
  onSetClickedReview,
}: INosearchPickBox) => {
  const {
    goodsName,
    modelName,
    brandName,
    productCategoryName,
    price,
    imageUrl,
    ImageWrapper,
    pickType,
    likeStatus,
    compareStatus,
    reviewAvg,
    reviewCnt,
    reviews,
    colors,
    scoreMetaMap,
    BookmarkButton,
    CompareButton,
    AllReviewsButton,
  } = data;

  const getPriceString = (price: string) => {
    const endText = price.slice(-2, price.length);
    if (endText === "만원") return price;
    return price + "만원";
  };

  const imageSize = `w-[12rem] h-[12rem] ${type === "pick" &&
    "pc:w-[18rem] pc:h-[18rem]"}`;

  return (
    <article
      data-testid="NosearchPick"
      className={`nrc--NosearchPick w-[33.5rem] p-[1.4rem] border-[1px] border-gray-3 rounded-[10px] ${
        type === "home" ? "pc:w-[36.7rem]" : "pc:w-[80rem]"
      }`}
    >
      <div
        className={`flex justify-between ${reviews &&
          reviews?.length > 0 &&
          "mb-[1.2rem]"}`}
      >
        <div
          className={`flex ${
            type === "home"
              ? "pc:h-[13.5rem]"
              : "pc:h-[22rem] pc:bg-gray-1 pc:py-[1rem] pc:px-[2rem] pc:rounded-[10px]"
          }`}
        >
          <div className={`${type === "home" ? "mr-[1.2rem]" : "mr-[1.6rem]"}`}>
            <div
              className={`relative object-contain border-[1px] border-gray-3 rounded-[10px] ${imageSize} bg-white overflow-hidden `}
            >
              <NsImage
                ImageWrapper={ImageWrapper}
                imageUrl={imageUrl}
                className={`object-contain bg-white ${imageSize}`}
              />
              {index && (
                <div className="w-[2.8rem] h-[2.8rem] pc:w-[3rem] pc:h-[3rem] absolute top-0 left-0 bg-gray-10 flex justify-center items-center rounded-br-[10px]">
                  <Heading level={6} className="text-white pc:text-heading-5">
                    {index}
                  </Heading>
                </div>
              )}
            </div>
            {colors && (
              <div
                className={`w-[12rem] flex justify-center mt-[0.4rem] ${type ===
                  "pick" && "pc:w-[18rem]"}`}
              >
                <ColorChips colors={colors} chipWidth="1.1" chipHeight="1.1" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <div className="inline-block">
              <PickLabel
                pickType={pickType}
                categoryKr={productCategoryName}
                labelStyle="mb-[0.4rem]"
              />
            </div>
            <Text type="B5" className="text-gray-10" aria-label="브랜드명">
              {brandName}
            </Text>
            <Text
              type="B5"
              className="break-all text-gray-10 line-clamp-1"
              aria-label="상품명"
            >
              {goodsName}
            </Text>
            <Text
              type="B5"
              className="break-all text-gray-10 line-clamp-1"
              aria-label="모델명"
            >
              {modelName}
            </Text>
            <Text
              type="B10"
              className="break-all text-gray-10 line-clamp-2"
              aria-label="가격대"
            >
              {getPriceString(price)}
            </Text>
            {reviewAvg && reviewCnt ? (
              <div className="mt-[0.4rem]">
                <StarRating
                  rating={reviewAvg}
                  text={
                    <Text type="D3" className="text-gray-6">
                      ({reviewCnt})
                    </Text>
                  }
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* pc pick page */}
        {type === "pick" && scoreMetaMap && (
          <div className="hidden w-[33.5rem] mobile:border-l-[1px] border-gray-3 pl-[1.6rem] pc:flex flex-col justify-center">
            <p
              className="font-bold text-body-5 mb-[1.6rem]"
              dangerouslySetInnerHTML={{
                __html:
                  reviews?.filter((review) => review.type === "nosearch")[0]
                    .content ?? "",
              }}
            />

            <Score data={scoreMetaMap} type="pick" />
          </div>
        )}
        <Buttons
          type={type}
          BookmarkButton={BookmarkButton}
          CompareButton={CompareButton}
          likeStatus={likeStatus}
          compareStatus={compareStatus}
        />
      </div>

      {/* mobile pick page */}
      {type === "pick" && scoreMetaMap && (
        <div className="pc:hidden">
          <div className="w-full h-[1px] bg-gray-3 my-[1.2rem]"></div>
          <Score data={scoreMetaMap} type="pick" />
        </div>
      )}

      {reviews && reviews.length !== 0 && (
        <>
          {/* home & mobile pick page */}
          <div
            className={`${type === "home" &&
              "border-t-[1px] border-gray-3"} ${type === "pick" &&
              "pc:hidden pc:border-t-[1px] pc:border-gray-3 pc:pt-[2rem]"}`}
          >
            <div className="flex items-center">
              <div
                className={`hideScroll flex overflow-x-scroll space-x-2 pc:overflow-hidden pt-[1.2rem] ${type ===
                  "pick" && "pc:pt-0"}`}
              >
                {reviews.map((review, i: number) => {
                  return (
                    <div key={`nsPick_review${i}`}>
                      <ReviewBox
                        type={type}
                        review={review}
                        reviewCnt={reviews.length}
                        onClickReivewModal={onClickReivewModal}
                        onSetClickedReview={onSetClickedReview}
                      />
                    </div>
                  );
                })}

                {/* 홈 페이지에서 Mobile버전일 경우 */}
                {reviews.length > 3 && (
                  <div
                    className="pc:hidden"
                    onClick={() => {
                      AllReviewsButton && AllReviewsButton();
                    }}
                  >
                    <Text
                      type="B2"
                      className="text-gray-10 w-[8.6rem] h-[8.6rem] bg-blue-2 rounded-full flex justify-center items-center"
                    >
                      구매후기 <br /> 전체보기
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* only pc pick page */}
          {type === "pick" && (
            <PcReviewsOnNosearchPick
              reviews={reviews}
              AllReviewsButton={AllReviewsButton}
              onClickReivewModal={onClickReivewModal}
              onSetClickedReview={onSetClickedReview}
            />
          )}
        </>
      )}
    </article>
  );
};

export default NosearchPickBox;

const Buttons = (props: {
  type: string;
  BookmarkButton: Function;
  CompareButton: Function;
  likeStatus?: boolean;
  compareStatus?: boolean;
}) => {
  const {
    type,
    BookmarkButton,
    CompareButton,
    likeStatus = false,
    compareStatus = false,
  } = props;

  const [isLiked, setIsLiked] = useState<boolean>(likeStatus);
  const [isCompared, setIsCompared] = useState<boolean>(compareStatus);

  const onLikeStatus = (likeStatus: boolean) => {
    setIsLiked(likeStatus);
  };
  const onCompareStatus = (compareStatus: boolean) => {
    setIsCompared(compareStatus);
  };

  useEffect(() => {
    onLikeStatus(likeStatus);
    onCompareStatus(compareStatus);
  }, [likeStatus, compareStatus]);

  return (
    <div
      className={`w-[4rem] flex flex-col items-center ml-[1rem] ${type ===
        "pick" && "pc:mt-[2.2rem]"}`}
    >
      {BookmarkButton && (
        <button
          onClick={(e) => {
            e.preventDefault();
            if ((e.target as Element).nodeName === "svg" || "path") {
              BookmarkButton();
              onLikeStatus(!isLiked);
            }
          }}
        >
          {isLiked ? (
            <BookmarkPressed size="2.4rem" />
          ) : (
            <BookmarkDefault size="2.4rem" />
          )}
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
          <div className="mt-[2rem] flex flex-col items-center">
            {isCompared ? (
              <ComparisonPressed size="2.4rem" />
            ) : (
              <ComparisonDefault size="2.4rem" />
            )}
            <Text
              type="D3"
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

const PcReviewsOnNosearchPick = ({
  reviews,
  AllReviewsButton,
  onClickReivewModal,
  onSetClickedReview,
}: {
  reviews: IReviewData[];
  AllReviewsButton?: Function;
  onClickReivewModal: () => void;
  onSetClickedReview: (review: IReviewData) => void;
}) => {
  return (
    <div className="border-t-[1px] border-gray-3 pt-[2rem] mobile:hidden">
      <div
        className={`mobile:hidden flex justify-between items-center mb-[1.2rem]`}
      >
        <div className="flex space-x-[0.6rem]">
          <Text type="B2" className="text-gray-10">
            구매 후기
          </Text>
          <Text type="B2" className="text-blue-7">
            {reviews.length - 1}
          </Text>
        </div>
        {reviews.length > 3 && (
          <Button
            size="s"
            type="primary"
            onClick={() => {
              AllReviewsButton && AllReviewsButton();
            }}
          >
            전체보기
          </Button>
        )}
      </div>
      <SlideWrapper
        size={3}
        floatButton={false}
        buttonStyle={{
          width: "3rem",
        }}
      >
        {reviews
          .filter((review) => review.type === "user")
          .map((review, i: number) => {
            return (
              <div key={`nsPick_review${i}`}>
                <ReviewBox
                  type="pick"
                  review={review}
                  reviewCnt={reviews.length}
                  onClickReivewModal={onClickReivewModal}
                  onSetClickedReview={onSetClickedReview}
                />
              </div>
            );
          })}
      </SlideWrapper>
    </div>
  );
};
