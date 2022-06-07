import { ISearchDocument } from "ns-ts-interfaces";
import { CSSProperties, useMemo } from "react";
import {
  IGoodsAIReview,
  useGoodsReviewsPreview,
} from "./useGoodsReviewsPreview";

interface IUseItemReviewsProps
  extends Pick<
    ISearchDocument,
    "productCategoryKey" | "modelName" | "twoLineSummary"
  > {
  dataSize: number;
  useReview?: boolean;
}

export interface IPickProductReviewData
  extends Pick<INSSimpleReviewProps, "title" | "description" | "reviewType">,
    Partial<
      Pick<INSSimpleReviewProps, "images" | "point" | "writer" | "createdAt">
    > {}

export interface INSSimpleReviewProps {
  title: string;
  description?: string;
  point?: number;
  writer?: string;
  createdAt?: string;
  images?: string[];

  width?: string | number;
  height?: string | number;
  fontSize?: string | number;
  fontWeight?: number;
  color?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: number;
  useScrollIntoView?: boolean;
  style?: CSSProperties;
  reviewType: "nosearch" | "user";
  detailViewType: "col" | "row";
}

export function useItemReviews({
  productCategoryKey,
  modelName,
  twoLineSummary,
  dataSize,
  useReview = true,
}: IUseItemReviewsProps) {
  const {
    data: goodsReviews,
    isLoading,
    isError,
  } = useGoodsReviewsPreview({
    size: dataSize,
    categoryKey: productCategoryKey,
    modelNm: modelName,
  });
  const reviewSum = useMemo(() => {
    if (goodsReviews) {
      const { aiCount, storeCount } = goodsReviews;
      const tempSum = aiCount + storeCount;
      return twoLineSummary ? tempSum - 1 : tempSum;
    }

    return 0;
  }, [goodsReviews, twoLineSummary]);

  const reviewList: IPickProductReviewData[] | null = useMemo(() => {
    const tempData: IPickProductReviewData[] = [];
    if (isLoading) {
      return [];
    }
    if (twoLineSummary) {
      tempData.push({ title: twoLineSummary, reviewType: "nosearch" });
    }
    if (!goodsReviews) {
      return tempData;
    }
    if (!useReview) {
      return tempData;
    }
    const { store, ai } = goodsReviews;

    store.map((storeReview: any) => {
      const { subject, content, regDt, writerNm, goodsPt, imageUrls } =
        storeReview;

      tempData.push({
        title: subject,
        description: content,
        createdAt: regDt,
        point: goodsPt,
        writer: writerNm,
        images: imageUrls,
        reviewType: "user",
      });
    });

    (ai as any).map((aiReview: IGoodsAIReview | string) => {
      if (typeof aiReview !== "string") {
        tempData.push({
          title: aiReview.text,
          description: aiReview.text,
          createdAt: aiReview.date,
          reviewType: "user",
        });
      } else {
        tempData.push({
          title: aiReview,
          description: aiReview,
          reviewType: "user",
        });
      }
    });

    return tempData.length > 0 ? tempData.slice(0, dataSize) : null;
  }, [twoLineSummary, goodsReviews, isLoading, useReview]);

  return {
    reviewSum,
    reviewList,
    isLoading,
  };
}
