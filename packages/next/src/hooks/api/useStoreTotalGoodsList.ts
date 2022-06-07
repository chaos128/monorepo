import axios from "axios";
import { IGoods } from "ns-ts-interfaces";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";

const generateStoreTotalGoodsListKey = (cateCd: string) => {
  return ["getStoreTotalGoodsList", cateCd];
};

const fetchStoreTotalGoodsList = async (param: any) => {
  const { brandCdArray, goodsCdArray, modelNameArray, ...rest } = param;

  let queryString = getParamsString(rest);
  if (brandCdArray) {
    const brandCdNames = brandCdArray.toString();
    queryString += `&brandCdArray=${brandCdNames}`;
  }
  if (goodsCdArray && goodsCdArray.length > 0) {
    const goodsNames = goodsCdArray.toString();
    queryString += `&goodsCdArray=${goodsNames}`;
  }
  if (modelNameArray && modelNameArray.length > 0) {
    const modelNames = modelNameArray.toString();
    queryString += `&modelNameArray=${modelNames}`;
  }

  const path =
    (goodsCdArray && goodsCdArray.length > 0) ||
    (modelNameArray && modelNameArray.length > 0)
      ? "store/getExhibitionGoods"
      : "store/getTotalGoods";

  const { data } = await axios(`${BASE_URL}/ns_api/v1/${path}?${queryString}`);
  return data;
};

export default function useStoreTotalGoodsList(params?: IGetTotalGoodsParam) {
  const key = generateStoreTotalGoodsListKey("totalGoodsList");

  const { data, isLoading, isSuccess } = useQuery(key, () => {
    return fetchStoreTotalGoodsList(params);
  });

  return {
    goodsList: data ? (data as IGoods[]) : null,
    isLoading,
    isSuccess,
  };
}

export interface IGetSpecificGoodsParam {
  page?: number;
  size?: number;
  cateCd?: string;
  isPick?: boolean;
  relationCateCd?: string;
}
export interface IGetTotalGoodsParam extends IGetSpecificGoodsParam {
  brandCdArray?: string[];
  goodsCdArray?: string[];
  modelNameArray?: string[];
  isTimeDeal?: boolean;
  hasNosearchDeal?: boolean;
}
