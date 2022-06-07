import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";
import useCustomInfiniteQuery from "../useCustomInfiniteQuery";

export interface IPurchaseGuideParams {
  type: string;
  take: number;
  page?: number;
  productCategoryKeys?: string;
  relationCategoryKey?: string;
  relationCateCd?: string;
  relationViewType?: string;
  title?: string;
  sort?: "popular" | "default";
}

export interface IPurchaseGuide {
  id: number;
  key: string;
  thumbnail: string;
  title: string;
  outline: string;
  name: string;
  parentCategoryKey: string;
  videoUrl: string | null;
}

export interface IPurchaseGuideDetail {
  id: number;
  name: string;
  thumbnail: string;
  title: string;
  outline: string;
  category: {
    id: number;
    key: string;
    name: string;
  };
  purchaseGuideThemes?: IPurchaseGuideTheme[];
  favoriteCount: number;
  viewCount: number;
  shareCount: number;
  createdAt: string;
  updatedAt: string;
  likeStatus?: boolean | null;
  contents?: any[];
  contentsSort?: string[];
  viewMode: string;
}

export interface IPurchaseGuideTheme {
  id: number;
  theme: string;
  contentText: {
    __html: string;
  };
}

export const generatePurchaseGuidePreviewKey = (props: any) => {
  return ["getPurchaseGuidePreview", props];
};

export const fetchPurchaseGuidePreview = async (
  params?: IPurchaseGuideParams
) => {
  const { data } = await axios.get<{
    list: IPurchaseGuideDetail[];
    totalCount: number;
  }>(`${BASE_URL}/ns_api/v1/purchaseGuides?${getParamsString(params)}`);
  console.log("[fetch] PurchaseGuide");
  return data;
};

export function usePurchaseGuide(props?: IPurchaseGuideParams) {
  const key = generatePurchaseGuidePreviewKey(props);

  const { data, isLoading, isError } = useQuery(key, () => {
    return fetchPurchaseGuidePreview(props);
  });

  const resultData: IPurchaseGuide[] | null = useMemo(() => {
    if (data && data.list) {
      const returnData: IPurchaseGuide[] = [];
      data.list.map((value: any, index: number) => {
        if (value.category) {
          const thumbnailUrl =
            Array.isArray(value.contents) && value.contents.length > 1
              ? value.contents[0].thumbnail
              : null;

          const currentData: IPurchaseGuide = {
            id: value.id,
            key: value.category.key,
            title: value.title,
            thumbnail:
              thumbnailUrl ?? value.thumbnail ?? "/static/images/no_image.png",
            outline: value.outline,
            name: value.category.name,
            parentCategoryKey: value.category.parentCategoryKey,
            videoUrl: null,
          };
          returnData.push(currentData);
        }
      });

      return returnData;
    }
    return null;
  }, [data]);

  return {
    resultData,
    isLoading,
    isError,
  };
}

export function useInfinitePurchaseGuide(params: IPurchaseGuideParams) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useCustomInfiniteQuery<IPurchaseGuide>({
    queryKeyString: "useInfinitePurchaseGuide",
    apiURL: "/purchaseGuides",
    params: { ...params },
  });

  const resultData: IPurchaseGuide[] | null = useMemo(() => {
    if (!data) {
      return null;
    }

    const returnData: IPurchaseGuide[] = [];
    data.pages.map((page) => {
      page.data.list.map((value: any, index: number) => {
        if (value.category) {
          const thumbnailUrl =
            Array.isArray(value.contents) && value.contents.length > 1
              ? value.contents[0].thumbnail
              : null;

          const currentData: IPurchaseGuide = {
            id: value.id,
            key: value.category.key,
            title: value.title,
            thumbnail:
              thumbnailUrl ?? value.thumbnail ?? "/static/images/no_image.png",
            outline: value.outline,
            name: value.category.name,
            parentCategoryKey: value.category.parentCategoryKey,
            videoUrl: null,
          };
          returnData.push(currentData);
        }
      });
    });

    return returnData;
  }, [data]);

  return {
    resultData,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
