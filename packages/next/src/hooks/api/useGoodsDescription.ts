import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../shared/variables";
import { getParamsString } from "../../shared/utils";

export interface IGoodsDescriptionParams {
  goodsNo?: string;
  categoryKey?: string;
  modelNm?: string;
}

export const generateGoodsDescriptionKey = (param: IGoodsDescriptionParams) => {
  return ["getGoodsDescription", param];
};

export const fetchGoodsDescription = async (param: IGoodsDescriptionParams) => {
  const { data } = await axios.get<{ images: string[] }>(
    `${BASE_URL}/ns_api/v1/store/getGoodsDescription?${getParamsString(param)}`
  );
  return data;
};

export const useGoodsDescription = (params: IGoodsDescriptionParams) => {
  const { goodsNo, modelNm, categoryKey } = params;

  const key = generateGoodsDescriptionKey(params);
  const { data, isLoading, isError, isSuccess } = useQuery(key, () => {
    if (goodsNo || (modelNm && categoryKey)) {
      return fetchGoodsDescription(params);
    }
    return null;
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
