import axios from "axios";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";

export interface IGetExihibitionsPreviewParam {
  relationViewType:
    | "home"
    | "storeHome"
    | "purchaseGuideDetail"
    | "applianceInfoDetail"
    | "productDetail"
    | "storeDetail";
  productCategoryKey?: string;
  cateCd?: string;
  size?: number;
}

export interface IExhibitionItem {
  id: number;
  title: string;
  mImageUrl: string;
  pcImageUrl: string;
  viewHeaderImageUrl?: string | null;
  goodsNos: string;
  cateCds: string;
  startAt: string;
  endAt: string;
}

export const generateExhibitionsPreviewKey = (props: any) => {
  return ["getExhibitionsPreview", props];
};

export const fetchExhibitionsPreview = async (
  params?: IGetExihibitionsPreviewParam
) => {
  const { data } = await axios.get<IExhibitionItem[]>(
    `${BASE_URL}/ns_api/v1/exhibitions/preview?${getParamsString(params)}`
  );
  console.log("[fetch] Exhibitions");
  return data;
};

export default function useExhibitionsPreview(
  props?: IGetExihibitionsPreviewParam
) {
  const key = generateExhibitionsPreviewKey(props);

  const { data, isLoading, isError } = useQuery(key, () => {
    return fetchExhibitionsPreview(props);
  });

  return {
    data: data ? data : null,
    isLoading,
    isError,
  };
}
