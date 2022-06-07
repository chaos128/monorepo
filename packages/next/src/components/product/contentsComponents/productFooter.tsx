import {
  BookmarkDefault,
  BookmarkPressed,
  Button,
  ComparisonDefault,
  ComparisonPressed,
  Share,
  Text,
} from "@nosearch/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { ISearchDocument } from "ns-ts-interfaces";
import { useEffect, useState } from "react";
import {
  useProductAction,
  useProductCompareError,
} from "./productOverview/productOverviewHooks";

interface IProductFooterProps {
  productCategoryKey: string;
  modelReviewData: ISearchDocument | null;
  productOverviewData: {
    brand: string;
    name: string;
    modelName: string;
    pickType: "none" | "best" | "plus" | "premium" | "cost_effective";
    imageUrl: string;
    likeCount: number | undefined;
    productId: number | undefined;
  } | null;
}

const ProductFooter = ({
  productCategoryKey,
  modelReviewData,
  productOverviewData,
}: IProductFooterProps) => {
  const router = useRouter();

  if (!modelReviewData || !productOverviewData) {
    return null;
  }
  return (
    <div className="fixed bottom-0 z-[200] flex h-[5.8rem] w-full max-w-[1200px] content-around items-center justify-around border-t border-gray-3 bg-white pc:hidden">
      <div>
        <ActionButtons
          productCategoryKey={productCategoryKey}
          modelReviewData={modelReviewData}
          productOverviewData={productOverviewData}
        />
      </div>
      <Link href={`${router.asPath}?purchaseFlag=true`} passHref>
        <Button size="l" type="cta" className="w-[42vw]">
          구매하기
        </Button>
      </Link>
    </div>
  );
};

export default ProductFooter;

const ActionButtons = ({
  productCategoryKey,
  modelReviewData,
  productOverviewData,
}: {
  productCategoryKey: any;
  modelReviewData: any;
  productOverviewData: any;
}) => {
  const { likeStatus = false, compareStatus = false } = modelReviewData;

  const { onCompareError } = useProductCompareError();
  const { onLikeItem, onShareItem, onCompareItem } = useProductAction({
    contentId: productOverviewData?.productId ?? 0,
    contentType: "product",
    productCategoryKey,
    productData: productOverviewData,
    onCompareError,
  });

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
    <div className="flex items-center justify-center space-x-[3.5rem]">
      <button
        onClick={(e) => {
          e.preventDefault();
          if ((e.target as Element).nodeName === "svg" || "path") {
            onLikeItem();
            onLikeStatus(!isLiked);
          }
        }}
      >
        <div className="flex flex-col items-center">
          {isLiked ? (
            <BookmarkPressed size="2.4rem" />
          ) : (
            <BookmarkDefault size="2.4rem" />
          )}
          <Text
            type="D3"
            className={`mt-[0.1rem] whitespace-nowrap ${
              isLiked ? "text-primary" : "text-gray-10"
            }`}
          >
            스크랩
          </Text>
        </div>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          if ((e.target as Element).nodeName === "svg" || "path") {
            onShareItem();
          }
        }}
      >
        <Share size="2.4rem" />
        <Text type="D3" className="mt-[0.1rem] text-gray-10">
          공유
        </Text>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          if ((e.target as Element).nodeName === "svg" || "path") {
            onCompareItem();
            onCompareStatus(!isCompared);
          }
        }}
      >
        <div className="flex flex-col items-center">
          {isCompared ? (
            <ComparisonPressed size="2.4rem" />
          ) : (
            <ComparisonDefault size="2.4rem" />
          )}
          <Text
            type="D3"
            className={`mt-[0.1rem] whitespace-nowrap ${
              isCompared ? "text-primary" : "text-gray-10"
            }`}
          >
            비교함
          </Text>
        </div>
      </button>
    </div>
  );
};
