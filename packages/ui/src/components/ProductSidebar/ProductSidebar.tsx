// Generated with util/create-component.js
import React, { useEffect, useState } from "react";
import PickLabel from "../PickLabel";
import NsImage from "../shared/ns-image";
import Button from "../UI/Button";
import {
  BookmarkDefault,
  BookmarkPressed,
  ComparisonDefault,
  ComparisonPressed,
  Share,
} from "../UI/Icon";
import Text from "../UI/Text";
import { ProductSidebarProps } from "./ProductSidebar.types";

const ProductSidebar: React.FC<ProductSidebarProps> = ({ data }) => {
  const {
    goodsName,
    modelName,
    brandName,
    image,
    ImageWrapper,
    pickType,
    likeCount,
    likeStatus,
    compareStatus,
    PayButton,
    ShareButton,
    BookmarkButton,
    CompareButton,
    SpecButton,
  } = data;

  return (
    <div
      data-testid="ProductSidebar"
      className="nrc--ProductSidebar w-[12.4rem] border-[1px] border-gray-3 rounded-[10px] p-[1.2rem] bg-white z-[200]"
    >
      <div className="space-y-[0.6rem]">
        <div className="relative w-[10rem] h-[10rem] border-[1px] border-gray-3">
          <NsImage
            ImageWrapper={ImageWrapper}
            imageUrl={image}
            className="w-[10rem] h-[10rem] object-contain"
            storeImage
          />
          <PickLabel
            pickType={pickType}
            labelStyle="text-detail-1 w-full text-center py-[0.2rem] absolute bottom-0 left-0"
          />
        </div>
        <div className="text-center">
          <Text type="B10" className="break-all text-gray-10 line-clamp-1">
            {brandName}
          </Text>
          <Text type="B5" className="break-all text-gray-10 line-clamp-1">
            {goodsName}
          </Text>
          <Text type="B5" className="break-all text-gray-10 line-clamp-1">
            {modelName}
          </Text>
        </div>
        <Button
          size="s"
          type="cta"
          onClick={() => {
            PayButton && PayButton();
          }}
        >
          <Text type="B8" className="text-white">
            구매하기
          </Text>
        </Button>
      </div>

      <div className="w-full h-[1px] bg-gray-3 my-[2rem]"></div>

      <div>
        <ActionButtons
          BookmarkButton={BookmarkButton}
          CompareButton={CompareButton}
          ShareButton={ShareButton}
          likeCount={likeCount}
          likeStatus={likeStatus}
          compareStatus={compareStatus}
        />
        <Button
          size="s"
          type="outline"
          color="gray"
          onClick={() => {
            SpecButton && SpecButton();
          }}
        >
          <Text type="B8" className="text-gray-10 whitespace-nowrap">
            스펙전체보기
          </Text>
        </Button>
      </div>
    </div>
  );
};

export default ProductSidebar;

const ActionButtons = (props: {
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
    <div className="w-full flex flex-col justify-center items-center space-y-[2rem] mb-[2rem]">
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
