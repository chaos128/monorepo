import axios from "axios";
import { useEffect, useMemo } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";

export const generateGoodsReviewKey = (params: any) => {
  return ["getGoodsReview", params];
};

export const fetchGoodsReview = async (params: IGetGoodsReviewsParams) => {
  const { data } = await axios.get<IGoodsReview[]>(
    `${BASE_URL}/ns_api/v1/store/getGoodsReviews?${getParamsString(params)}`
  );
  return data;
};

export interface IGetGoodsReviewsParams {
  categoryKey?: string | null;
  modelNm?: string | null;
  goodsNo?: string | null;
  page?: number;
  size?: number;
  canFetch?: boolean;
  onSuccessCallback?: (value?: any) => void;
}

export interface IGoodsReview {
  content: string;
  goodsPt: number;
  regDt: string;
  subject: string;
  writerNm: string;
  imageUrls?: string[];
}

export const useGoodsReview = (params: IGetGoodsReviewsParams) => {
  const {
    canFetch = true,
    onSuccessCallback,
    categoryKey,
    modelNm,
    goodsNo,
    size,
    page,
  } = params;

  const key = generateGoodsReviewKey(params);
  const { data, isSuccess, isLoading, isError } = useQuery(
    key,
    () => {
      if (canFetch && (goodsNo || (categoryKey && modelNm))) {
        return fetchGoodsReview({
          categoryKey,
          modelNm,
          size,
          page,
          canFetch,
          goodsNo,
        });
      }
      return null;
    },
    {
      onSuccess: () => {
        if (onSuccessCallback) onSuccessCallback(data);
      },
    }
  );

  return {
    data,
    isLoading,
    isError,
  };
};

export const generateGoodsReviewInfiniteKey = (params: any) => {
  return ["getGoodsReviewInfinite", params];
};
export function useGoodsReviewsInfinite(params: IGetGoodsReviewsParams) {
  const { size = 10, canFetch = true, page } = params;

  const key = generateGoodsReviewInfiniteKey(params);
  const { status, data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    key,
    ({ pageParam = 1 }) => {
      if (canFetch) return fetchGoodsReview({ ...params, page: pageParam });
      return [];
    },
    {
      getNextPageParam: (lastPage, allPage) => {
        if (!lastPage) return undefined;
        if (lastPage.length < size) return undefined;

        return allPage.length + 1;
      },
    }
  );

  const refinedData = useMemo(() => {
    if (data && data.pages && data.pages.length > 0) return data.pages;

    return null;
  }, [data]);

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.resetQueries(`getGoodsReviewInfinite`);
    };
  }, []);

  return {
    data: refinedData,
    isLoading,
    isError,
    fetchNextPage,
  };
}
