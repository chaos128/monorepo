import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../shared/variables";
import { getParamsString } from "../../shared/utils";

export interface IUseGetProductThumbnailParams {
  productCategoryKey: string;
  modelName: string;
  sameGroup?: string;
}

export const generateProductThumbnailsKey = (
  params: IUseGetProductThumbnailParams
) => {
  return ["getProductThumbnails", params.productCategoryKey, params.modelName];
};

export const fetchProductThumbnails = async (
  param: IUseGetProductThumbnailParams
) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/product/getThumbnails?${getParamsString(param)}`
  );
  return data;
};

export default function useProductThumbnail(
  params: IUseGetProductThumbnailParams
) {
  const key = generateProductThumbnailsKey(params);

  const { data, isLoading, isError } = useQuery(key, () => {
    return fetchProductThumbnails(params);
  });

  return {
    data: data ?? null,
    isLoading,
    isError,
  };
}
