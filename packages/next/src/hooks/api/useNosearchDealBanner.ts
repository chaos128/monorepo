import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../shared/variables";

export enum NosearchDealBannerPostLocation {
  PICK = "pick",
  GUIDE = "guide",
  INFO = "info",
  PRODUCT_DETAIL = "productDetail",
  STORE_DETAIL = "storeDetail",
}

export enum NosearchDealBannerType {
  HOME = "home",
  STORE = "store",
  ADVERTISE = "advertise",
}

export interface INosearchBanner {
  cateCd: string;
  categoryDepth: number;
  categoryKey: string;
  endAt: string;
  link: string;
  mImageHeight?: number;
  mImageSize: number;
  mImageType: string;
  mImageUrl: string;
  order: number;
  parentCateCd: string;
  parentCategoryKey: string;
  pcImageHeight: null;
  pcImageSize: number;
  pcImageType: string;
  pcImageUrl: string;
  postLocation: string;
  postLocationDepth: number;
  startAt: string;
  status: string;
  type: string;
  videoFirst: boolean;
  videoSize: number;
  videoType: string;
  videoUrl?: string;
  videoWebpUrl?: string;
}

const generateNosearchDealBannerKey = (
  type: NosearchDealBannerType,
  productCategoryKey: string,
  postLocation: NosearchDealBannerPostLocation
) => {
  return [`getNosearchDealBanner_${type}_${postLocation}`, productCategoryKey];
};

const fetchNosearchDealBanner = async (
  type: any,
  productCategoryKey: any,
  postLocation: any
) => {
  const { data } = await axios.get<INosearchBanner[]>(
    `${BASE_URL}/ns_api/v1/banners?type=${type}&categoryKey=${productCategoryKey}&postLocation=${postLocation}`
  );
  return data;
};

interface INosearchDealBannerProps {
  type: NosearchDealBannerType;
  productCategoryKey: string | null;
  postLocation: NosearchDealBannerPostLocation;
}
export function useNosearchDealBanner(props: INosearchDealBannerProps) {
  const { type, productCategoryKey, postLocation } = props;
  const key = generateNosearchDealBannerKey(
    type,
    productCategoryKey as string,
    postLocation
  );

  const { data, isLoading } = useQuery(key, () => {
    return fetchNosearchDealBanner(type, productCategoryKey, postLocation);
  });

  return {
    nosearchDealBannerData: data ? data[0] : null,
    isLoading: isLoading,
  };
}
