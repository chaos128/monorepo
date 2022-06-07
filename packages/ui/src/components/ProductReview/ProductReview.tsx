// Generated with util/create-component.js
import React, { useEffect, useRef, useState } from "react";
import NsImage from "../shared/ns-image";
import StarRating from "../StarRating";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import { Caret } from "../UI/Icon";
import Text from "../UI/Text";
import { ProductReviewProps } from "./ProductReview.types";

const ProductReview: React.FC<ProductReviewProps> = (props) => {
  const {
    writerNm,
    goodsPt,
    regDt,
    content,
    imageUrls,
    isUseful = false,
    onClickUseful,
  } = props.data;

  const contentRef = useRef<HTMLDivElement>(null);
  const [_isUseful, setIsUseful] = useState<boolean>(isUseful);
  const [hasOpenBtn, setHasOpenBtn] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    const contentDivScroll = (contentRef.current as HTMLDivElement)
      .scrollHeight;
    const contentTextScroll = (contentRef.current
      ?.childNodes[0] as HTMLParagraphElement).scrollHeight;
    if (contentTextScroll > contentDivScroll || imageUrls.length > 0)
      setHasOpenBtn(true);
  }, [contentRef.current]);

  return (
    <div
      data-testid="ProductReview"
      className={`nrc--ProductReview w-[33.5rem] pc:w-[80rem] ${hasOpenBtn &&
        "cursor-pointer"}`}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (
          target.nodeName === "BUTTON" ||
          target.nodeName === "IMG" ||
          target.tagName === "H3"
        )
          return;
        setIsOpened(!isOpened);
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <StarRating rating={goodsPt} styleFor={{ size: 1.5 }} />
          <div className="w-[1px] h-[1.5rem] mx-[1rem] bg-gray-3"></div>
          <Text type="B9" className="text-gray-10">
            {writerNm}
          </Text>
        </div>
        <Text type="D3" className="text-gray-6">
          {regDt && regDt.substring(0, 10).replace(/-/g, ".")}
        </Text>
      </div>
      <div className="pc:flex pc:items-center pc:justify-between">
        <div ref={contentRef} className="mt-[1.6rem]">
          <Text
            type="B4"
            className={`text-gray-10 whitespace-pre-wrap ${!isOpened &&
              "line-clamp-4"}`}
          >
            {content}
          </Text>
        </div>
        {imageUrls.length > 0 && !isOpened && (
          <ThumnailImage
            imageUrl={imageUrls[0]}
            imageCount={imageUrls.length}
          />
        )}
      </div>
      {/* -7 photo */}
      {isOpened && imageUrls.length <= 7 && (
        <div className="mt-[1.6rem] space-y-[1rem] pc:flex pc:space-x-[1rem] pc:space-y-0">
          {imageUrls.map((image) => {
            return (
              <div className="relative w-[33.5rem] object-contain pc:w-[10rem] pc:h-[10rem] pc:object-cover">
                <NsImage
                  imageUrl={image}
                  className="w-[33.5rem] object-contain pc:w-[10rem] pc:h-[10rem] pc:object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
      {/* +7 photo */}
      {isOpened && imageUrls.length > 7 && (
        <div className="mt-[1.6rem] space-y-[1rem] pc:flex pc:items-center pc:space-x-[1rem] pc:space-y-0">
          {imageUrls.map((image, i: number) => {
            return (
              <div
                className={`relative w-[33.5rem] object-contain pc:w-[10rem] pc:h-[10rem] pc:object-cover ${i >=
                  6 && "pc:hidden"}`}
              >
                <NsImage
                  imageUrl={image}
                  className="w-[33.5rem] object-contain pc:w-[10rem] pc:h-[10rem] pc:object-cover"
                />
              </div>
            );
          })}
          <ThumnailImage
            imageUrl={imageUrls[7]}
            imageCount={imageUrls.length - 7}
            openedReivew
          />
        </div>
      )}

      <div className="flex justify-between items-center mt-[1.6rem]">
        <Button
          size="s"
          type="outline"
          color={`${_isUseful ? "blue" : "gray"}`}
          className="w-[7rem]"
          onClick={() => {
            onClickUseful();
            setIsUseful(!_isUseful);
          }}
        >
          도움이 돼요
        </Button>
        {hasOpenBtn && (
          <div className="flex items-center space-x-[0.5rem]">
            <Text type="B8" className="text-gray-10">
              리뷰 {isOpened ? "접기" : "펼치기"}
            </Text>
            <div className={`${isOpened ? "rotate-[270deg]" : "rotate-90"}`}>
              <Caret size="1.8rem" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReview;

const ThumnailImage = (props: {
  imageUrl: string;
  imageCount: number;
  openedReivew?: boolean;
}) => {
  const { imageUrl, imageCount, openedReivew = false } = props;
  return (
    <div
      className={`relative pc:flex-shrink-0 pc:ml-[2rem] ${
        openedReivew
          ? "hidden pc:inline-block w-[10rem] h-[10rem]"
          : "w-[7.2rem] h-[7.2rem] mt-[1.6rem]"
      }`}
    >
      <div
        className={`relative object-cover ${
          openedReivew ? "w-[10rem] h-[10rem]" : "w-[7.2rem] h-[7.2rem]"
        }`}
      >
        <NsImage
          imageUrl={imageUrl}
          className={`object-cover ${
            openedReivew ? "w-[10rem] h-[10rem]" : "w-[7.2rem] h-[7.2rem]"
          }`}
        />
      </div>
      {imageCount > 1 && (
        <div>
          <div
            className={`bg-black opacity-30 absolute top-0 left-0 ${
              openedReivew ? "w-[10rem] h-[10rem]" : "w-[7.2rem] h-[7.2rem]"
            }`}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <Heading level={3} className="text-white">
              +{imageCount - 1}
            </Heading>
          </div>
        </div>
      )}
    </div>
  );
};
