import axios from "axios";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";

export interface IGetGoodsReviewsPreviewParams {
  size: number;
  goodsNo?: string;
  categoryKey?: string;
  modelNm?: string;
}

export interface IGoodsAIReview {
  text: string;
  date: string;
}

export interface IGoodsReviewsPreviewProps {
  storeCount: number;
  aiCount: number;
  store: IGoodsReview[];
  ai: IGoodsAIReview[] | string[];
}

export interface IGoodsReview {
  content: string;
  goodsPt: number;
  regDt: string;
  subject: string;
  writerNm: string;
  imageUrls?: string[];
}

export const generateGoodsReviewPreviewKey = (props: any) => {
  return ["getGoodsReviewPreview", props];
};

export const fetchGoodsReviewPreview = async (
  params: IGetGoodsReviewsPreviewParams
) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/store/getGoodsReviewsPreview?${getParamsString(
      params
    )}`
  );
  return data;
};

export function useGoodsReviewsPreview(props: IGetGoodsReviewsPreviewParams) {
  const key = generateGoodsReviewPreviewKey(props);

  const { data, isLoading, isError } = useQuery(key, () => {
    return fetchGoodsReviewPreview(props);
  });

  return {
    data,
    isLoading,
    isError,
  };
}
