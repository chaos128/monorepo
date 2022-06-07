import axios from "axios";
import { IGoods } from "ns-ts-interfaces";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";

export interface IGetStoreBestGoodsPreviewParam {
  relationViewType:
    | "home"
    | "storeHome"
    | "purchaseGuideDetail"
    | "appliancesInfoDetail"
    | "productDetail"
    | "storeDetail";
  size: number;
  relationCategoryKey?: string;
  relationCateCd?: string;
  isPick?: boolean;
  isFillItem?: boolean;
}

export interface IBestGoods extends IGoods {
  brandName: string;
}

export const generateBestGoodsPreviewKey = (props: any) => {
  return ["getBestGoodsPreview", props];
};

export const fetchBestGoodsPreview = async (
  params?: IGetStoreBestGoodsPreviewParam
) => {
  const { data } = await axios.get<IBestGoods[]>(
    `${BASE_URL}/ns_api/v1/store/getBestGoodsPreview?${getParamsString(params)}`
  );
  console.log("[fetch] BestGoods");
  return data;
};

export default function useBestGoodsPreview(
  props?: IGetStoreBestGoodsPreviewParam
) {
  const key = generateBestGoodsPreviewKey(props);

  const { data, isLoading, isError } = useQuery(key, () => {
    return fetchBestGoodsPreview(props);
  });

  return {
    data,
    isLoading,
    isError,
  };
}
