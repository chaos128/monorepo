import { getParamsString } from "./utils";

export const getProductUrl = (
  parentCategoryKey: string,
  productCategoryKey: string,
  modelName?: string,
  purchaseFlag?: boolean,
  etc?: object
) => {
  let refined = modelName ?? "";
  refined = refined.replace("/", "0xE2");

  const queries = {
    purchaseFlag,
    ...(etc ?? {}),
  };

  return `/product/${parentCategoryKey}/${productCategoryKey}/detail/${refined}?${getParamsString(
    queries
  )}`;
};
