import axios from "axios";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";
import { IStoreGoods } from "./useStoreGoodsList";

export interface IGetTimedealPreviewParam {
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
  isFillItem?: boolean;
}

export const generateTimedealPreviewKey = (props: any) => {
  return ["getTimedealPreview", props];
};

export const fetchTimedealPreview = async (
  params?: IGetTimedealPreviewParam
) => {
  const { data } = await axios.get<IStoreGoods[]>(
    `${BASE_URL}/ns_api/v1/store/getDealGoodsPreview?${getParamsString(params)}`
  );
  console.log("[fetch] Timedeal");
  return data;
};

export default function useTimedealPreview(props?: IGetTimedealPreviewParam) {
  const key = generateTimedealPreviewKey(props);

  const { data, isLoading, isError } = useQuery(key, () => {
    return fetchTimedealPreview(props);
  });

  return {
    data,
    isLoading,
    isError,
  };
}
