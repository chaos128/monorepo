import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../shared/variables";

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

export const generatePurchaseGuideDetailKey = (productCategoryKey: string) => {
  return ["getPurchaseGuideDetail", productCategoryKey];
};

export const fetchPurchaseGuideDetail = async (productCategoryKey: string) => {
  try {
    const { data } = await axios.get<IPurchaseGuideDetail>(
      `${BASE_URL}/ns_api/v1/purchaseGuide?productCategoryKey=${productCategoryKey}`
    );
    return data;
  } catch (e) {
    return null;
  }
};

const usePurchaseGuideDetail = (productCategoryKey: string) => {
  const key = generatePurchaseGuideDetailKey(productCategoryKey);

  const { data, isLoading, isError, isSuccess } = useQuery(key, () => {
    return fetchPurchaseGuideDetail(productCategoryKey);
  });

  return {
    data: isSuccess && data ? data : null,
    isLoading: isLoading,
    isError: isError,
  };
};

export default usePurchaseGuideDetail;
