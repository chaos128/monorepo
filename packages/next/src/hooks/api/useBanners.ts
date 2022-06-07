import axios from "axios";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { NosearchDealBannerPostLocation } from "./useNosearchDealBanner";

interface IUseBannerProps {
  type: string;
  categoryKey?: string | null;
  postLocation?: NosearchDealBannerPostLocation | null;
}

const fetchBanners = async (params: IUseBannerProps) => {
  const res = await axios.get<IBanner[]>(`/banners?${getParamsString(params)}`);
  console.log("[fetch] Banners", params.type);
  return res.data;
};

const generateBannerKey = (type: string) => {
  return ["banners", type];
};

const useBanners = (params: IUseBannerProps) => {
  const key = generateBannerKey(params.type);
  const { data, isLoading, isSuccess, isError } = useQuery(key, () => {
    return fetchBanners(params);
  });

  return {
    banners: data ? data : [],
    isLoading,
    isSuccess,
    isError,
  };
};

export interface IBanner {
  startAt: string | null;
  mImageUrl: string;
  mImageType: string;
  mImageSize: number;
  order: number;
  pcImageUrl: string;
  pcImageType: string;
  pcImageSize: number;
  status: string;
  type: string;
  link: string;
  endAt: string | null;
  mImageHeight: number | null;
  pcImageHeight: number | null;
  videoUrl: string | null;
  videoType: string | null;
  videoSize: number | null;
  videoWebpUrl: string | null;
  videoFirst: boolean | null;
  postLocation: string | null;
  postLocationDepth: number | null;
  categoryKey: string | null;
  cateCd: string | null;
  categoryDepth: number | null;
}

export { generateBannerKey, useBanners, fetchBanners };
