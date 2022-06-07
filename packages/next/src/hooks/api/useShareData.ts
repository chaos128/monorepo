import { useRouter } from "next/router";
import { ISearchDocument } from "ns-ts-interfaces";
import { useCallback, useMemo } from "react";
import { useCategories } from "../api/useCategories";
import { useOgTagData } from "./useOgTagData";
import {
  IKakaoButtons,
  IKakaoShareContent,
  IKakaoShareProps,
  IKakaoSocial,
  KakaoShareContentType,
} from "./useShare";

export enum ShareContentsType {
  PRODUCT = "product",
  GUIDE = "guide",
  ENCYCLOPEDIA = "encyclopedia",
}
export interface IKakaoShareCommon {
  type: ShareContentsType;
  image: string | null;
  categoryKey: string;
  link: string;
  likeCount?: number;
  commentCount?: number;
  shareCoune?: number;
}
export interface IShareProductParam extends IKakaoShareCommon {
  brand: string | null;
  product?: string | null;
  modelName: string | null;
  price?: number | null;
  likeCount?: number;
}

export interface IShareGuideParam extends IKakaoShareCommon {
  image: string | null;
  categoryKey: string;
  likeCount?: number;
  commentCount?: number;
}

export default function useShareData(
  customUrl?: string,
  modelReviewData?: ISearchDocument | null
) {
  const router = useRouter();
  const redirectURL = customUrl
    ? customUrl
    : "https://nosearch.com" + router.asPath;

  const { categoryMap } = useCategories();
  const itemName = useMemo(() => {
    if (modelReviewData) {
      return modelReviewData.productCategoryName;
    } else {
      return null;
    }
  }, [modelReviewData]);

  const productName = useMemo(() => {
    if (modelReviewData) {
      return modelReviewData.modelName;
    } else {
      return null;
    }
  }, [modelReviewData]);

  const ogParam = useMemo(() => {
    if (modelReviewData) {
      const { modelName, productCategoryKey } = modelReviewData;
      return {
        modelName: modelName,
        key: productCategoryKey,
        type: "productDetail",
      };
    }

    return null;
  }, [modelReviewData]);

  const ogData = useOgTagData({ ...ogParam });

  //const recentlyEvents = useEventsRecently(5);
  //const { mostRecentEvent } = recentlyEvents;

  const getProductKakaoShareData = useCallback(() => {
    if (modelReviewData) {
      const { imageUrl, productCategoryKey, modelName, likeCount } =
        modelReviewData;
      const itemName = productCategoryKey
        ? categoryMap[productCategoryKey].name
        : "";
      if (modelName) {
        const social: IKakaoSocial = {
          likeCount: likeCount ? likeCount : 0,
        };

        const content: IKakaoShareContent = {
          imageUrl: imageUrl ? imageUrl : "",
          title: modelName + " " + itemName + " 성능분석 리뷰 | 노써치",
          description: `전문가가 분석한 ${modelName} ${itemName} 스펙 성능 평가 리뷰를 꼭 읽어보세요.`,
          link: {
            mobileWebUrl: redirectURL,
            webUrl: redirectURL,
          },
        };

        const buttons: IKakaoButtons[] = [
          {
            title: "사러가기",
            link: {
              mobileWebUrl: redirectURL,
              webUrl: redirectURL,
            },
          },
        ];

        const shareData: IKakaoShareProps = {
          objectType: "feed" as KakaoShareContentType,
          social: social,
          content: content,
          buttons: buttons,
        };

        return shareData;
      }
    }
    return null;
  }, [categoryMap, modelReviewData, redirectURL]);

  return {
    ogTitle: ogData.data ? ogData.data.title : null,
    itemName,
    productName,
    getProductKakaoShareData,
  };
}
