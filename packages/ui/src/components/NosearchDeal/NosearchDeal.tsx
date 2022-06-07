// Generated with util/create-component.js
import React from "react";
import Label from "../Label";
import NsImage from "../shared/ns-image";
import Timer from "../Timer";
import Heading from "../UI/Heading";
import Text from "../UI/Text";
import { NosearchDealProps } from "./NosearchDeal.types";

const NosearchDeal: React.FC<NosearchDealProps> = (props) => {
  const {
    data,
    viewType,
    fluid,
    type = "nosearchDeal",
    isLogin = false,
    isIOSApp = false,
  } = props;

  let state:
    | "NOSEARCH_DEAL"
    | "REVIEWTEM"
    | "MEMBERSHIP"
    | "SOLDOUT"
    | "MEMBERSHIP-SOLDOUT" = "NOSEARCH_DEAL";
  const itemState = () => {
    if (type === "reviewTem") state = "REVIEWTEM";
    if (type === "nosearchDeal") state = "NOSEARCH_DEAL";

    if (!isLogin && data.goodsAccess === "member") state = "MEMBERSHIP";
    if (data.soldOutFl === "y") state = "SOLDOUT";
    if (!isLogin && data.goodsAccess === "member" && data.soldOutFl === "y")
      state = "MEMBERSHIP-SOLDOUT";

    return state;
  };

  const imageSize = fluid
    ? `w-full max-w-[33.5rem] ${
        viewType === "home" ? "pc:max-w-[48rem]" : "pc:max-w-[38rem]"
      }`
    : `w-[33.5rem] ${viewType === "home" ? "pc:w-[48rem]" : "pc:w-[38rem]"}`;

  return (
    <article
      data-testid="NosearchDeal"
      className={`nrc--NosearchDeal overflow-hidden pc:p-[2rem] pc:bg-blue-1 ${type ===
        "nosearchDeal" && "bg-blue-1"} ${
        fluid
          ? `w-full max-w-[33.5rem] ${
              viewType === "home" ? "pc:max-w-[52rem]" : "pc:max-w-[80rem]"
            }`
          : `w-[33.5rem] ${
              viewType === "home" ? "pc:w-[52rem]" : "pc:w-[80rem]"
            }`
      } ${viewType === "pick" && "pc:flex"}`}
    >
      <div
        className={`relative h-auto ${imageSize} ${viewType !== "home" &&
          "pc:mr-[2rem] pc:flex-shrink-0"}`}
        style={{ aspectRatio: "16/9" }}
      >
        <ProductImage
          imageSize={imageSize}
          video={data.video}
          videoThumbnail={data.videoThumbnail}
          comingSoonImg={data.comingSoonImg}
          isComingSoon={data.isComingSoon}
          ImageWrapper={data.ImageWrapper}
          startAt={data.periodDiscountStart}
          isIOSApp={isIOSApp}
          videoKey={data.goodsNo}
        />
        {type === "nosearchDeal" && !data.isComingSoon && (
          <Timer
            id={data.goodsNo}
            type="nsDeal"
            periodDiscountStart={data.periodDiscountStart}
            periodDiscountEnd={data.periodDiscountEnd}
            benefitUseType={data.benefitUseType}
            timerText="남았어요!"
          />
        )}
      </div>
      <div
        className={`${viewType === "pick" &&
          "pc:flex pc:flex-col pc:justify-between"}`}
      >
        <div className={`${viewType === "home" && "my-[1.2rem]"}`}>
          <h5
            className="text-heading-5 pc:text-heading-4 font-bold text-gray-10 break-all line-clamp-2 mb-[0.4rem]"
            dangerouslySetInnerHTML={{
              __html: data.title,
            }}
            aria-label="노써치 공동구매 상품 제목"
          />
          {(type === "nosearchDeal" || viewType === "pick") && (
            <div className={`${viewType === "pick" && "hidden pc:block"}`}>
              <Text
                type="B6"
                className="break-all text-gray-10 line-clamp-3 pc:line-clamp-2"
                children={data.description}
                aria-label="노써치 공동구매 상품 설명"
              />
            </div>
          )}
        </div>
        <div className="pt-[1.2rem] border-t-[1px] border-gray-3">
          <Heading
            level={4}
            className={`text-gray-10 mb-[0.4rem] pc:text-heading-3 ${(itemState() ===
              "SOLDOUT" ||
              itemState() === "MEMBERSHIP-SOLDOUT") &&
              "text-gray-6"}`}
            children={data.dealGoodsNm}
            aria-label="상품명"
          />
          <div className="flex items-center justify-between pc:justify-start">
            {itemState() === "REVIEWTEM" && (
              <div className="flex space-x-2">
                {data.hasSpecialPrice && (
                  <Label className="bg-orange pc:mr-[1rem]">특가</Label>
                )}
                {data.hasCouponDiscount && (
                  <Label className="bg-white border-[1px] border-blue-7 text-blue-7 pc:mr-[1rem]">
                    쿠폰 적용가
                  </Label>
                )}
              </div>
            )}

            {/* PC Label */}
            {itemState() === "NOSEARCH_DEAL" && (
              <Label className="bg-red-4 hidden pc:block pc:mr-[1rem]">
                최저가 이하 특가
              </Label>
            )}
            {(itemState() === "SOLDOUT" ||
              itemState() === "MEMBERSHIP-SOLDOUT") && (
              <Label className="bg-gray-6 hidden pc:block pc:mr-[1rem]">
                품절
              </Label>
            )}
            {itemState() === "MEMBERSHIP" && (
              <Label className="bg-secret hidden pc:block pc:mr-[1rem]">
                회원전용 시크릿 특가 ✨
              </Label>
            )}

            {itemState() === "MEMBERSHIP" ||
            itemState() === "MEMBERSHIP-SOLDOUT" ? (
              <Heading
                level={5}
                className={`${
                  itemState() === "MEMBERSHIP" ? "text-secret" : "text-gray-6"
                }`}
                aria-label="회원전용 상품으로 가격 미공개"
              >
                시크릿 특가 확인하기
              </Heading>
            ) : (
              <div className="flex items-center">
                <h2
                  className={`text-heading-2 font-extrabold mr-[0.8rem] ${
                    data.isComingSoon
                      ? "text-[transparent]"
                      : itemState() === "SOLDOUT" ||
                        itemState() === "MEMBERSHIP-SOLDOUT"
                      ? "text-gray-6"
                      : "text-gray-10"
                  }`}
                  style={{
                    textShadow: `${
                      data.isComingSoon ? "0 0 20px rgba(0,0,0,0.4)" : ""
                    }`,
                  }}
                  aria-label="판매가"
                >
                  {numberWithCommas(data.discountedPrice)}원
                </h2>
                {!data.isComingSoon && (
                  <Text
                    type="B9"
                    className="line-through text-gray-6"
                    aria-label="정상가"
                  >
                    {numberWithCommas(data.originPrice)}원
                  </Text>
                )}
              </div>
            )}

            {/* Mobile Label */}
            {itemState() === "NOSEARCH_DEAL" && (
              <Label className="bg-red-4 pc:hidden">최저가 이하 특가</Label>
            )}
            {(itemState() === "SOLDOUT" ||
              itemState() === "MEMBERSHIP-SOLDOUT") && (
              <Label className="bg-gray-6 pc:hidden">품절</Label>
            )}
            {itemState() === "MEMBERSHIP" && (
              <Label className="bg-secret pc:hidden">
                회원전용 시크릿 특가 ✨
              </Label>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NosearchDeal;

const numberWithCommas = (num: number): string => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductImage = (props: {
  imageSize: string;
  video?: string;
  videoThumbnail?: string;
  comingSoonImg?: string;
  isComingSoon: boolean;
  ImageWrapper?: JSX.Element;
  startAt: string;
  isIOSApp?: boolean;
  videoKey: string;
}) => {
  const {
    imageSize,
    video,
    videoThumbnail,
    comingSoonImg,
    isComingSoon,
    ImageWrapper,
    startAt,
    isIOSApp,
    videoKey,
  } = props;

  const COMING_SOON_IMG = (
    <div className={`${imageSize} relative`}>
      <div className={`${imageSize} relative`}>
        <NsImage
          ImageWrapper={ImageWrapper}
          imageUrl={comingSoonImg}
          className={`${imageSize} object-cover`}
          style={{
            aspectRatio: "16/9",
          }}
        />
      </div>
      <div
        className={`${imageSize} bg-black opacity-40 absolute top-0 left-0`}
        style={{
          aspectRatio: "16/9",
        }}
      ></div>
      <div className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Heading level={3} className="text-white">
          coming soon
        </Heading>
        <Text type="B4" className="text-white">
          {startAt && startAt.substring(0, 10).replace(/-/g, ".")} 14:00 OPEN
        </Text>
      </div>
    </div>
  );

  const VIDEO = (
    <video
      width="100%"
      height="auto"
      controls={isIOSApp ? true : false}
      autoPlay={isIOSApp ? false : true}
      poster={isIOSApp ? videoThumbnail : undefined}
      muted
      controlsList="nofullscreen nodownload noremoteplayback"
      loop
      playsInline
      style={{
        objectFit: "fill",
        aspectRatio: "16/9",
      }}
      key={videoKey}
    >
      <source
        data-testid="NsDealItem_video"
        src={video}
        width="100%"
        height="100%"
      ></source>
    </video>
  );

  return isComingSoon ? (
    COMING_SOON_IMG
  ) : (
    <div
      onClick={(e) => {
        if (isIOSApp) e.preventDefault();
      }}
    >
      {VIDEO}
    </div>
  );
};
