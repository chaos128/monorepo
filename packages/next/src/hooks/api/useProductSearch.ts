import axios from "axios";
import { ISearchDocument, PickType } from "ns-ts-interfaces";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getParamsString, refineSearchDocument } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";

export const generateProductSearchKey = (props: any) => {
  return ["getProductSearch", props];
};

export const fetchProductSearch = async (params: any) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/product/search?${
      params ? getParamsString(params) : ""
    }`
  );
  return data;
};

export interface ISearchParam {
  productCategoryKey?: string | string[];
  isPick?: boolean;
  isRepresentative?: boolean;
  text?: string;
  prefix?: string;
  pickType?: PickType;
  size?: number;
  sort?: string;
  page?: number;
  sameGroup?: string;
  similarGroup?: string;
  names?: string[];
  condition?: "and" | "or";
}
export const useProductSearch = (props: {
  searchParam: ISearchParam | null;
}) => {
  const { searchParam } = props;
  const key = generateProductSearchKey(props);

  const { data, isLoading } = useQuery(key, () => {
    return fetchProductSearch(searchParam);
  });

  const productSearchMap = useMemo(() => {
    const map = new Map<string, ISearchDocument>();

    if (!data) {
      return map;
    }

    const productSearchData = data.data.documents;
    productSearchData.forEach((product: any) => {
      map.set(
        product.modelName,
        productSearchData.filter(
          (item: any) => item.modelName === product.modelName
        )[0]
      );
    });

    return map;
  }, [data]);

  const productArray: ISearchDocument[] = useMemo(() => {
    if (data && data.data) {
      let documents = refineSearchDocument(data.data.documents);

      if (searchParam && searchParam.isPick) {
        documents = documents.sort((a: ISearchDocument, b: ISearchDocument) => {
          const aPickIndex = getPickIndex(a.pickType);
          const bPickIndex = getPickIndex(b.pickType);
          return aPickIndex - bPickIndex;
        });
      }

      return documents;
    }
    return [];
  }, [data]);

  return {
    productSearchData: data ? (data.data.documents as ISearchDocument[]) : null,
    productSearchMap,
    productArray,
    isLoading: isLoading,
  };
};

function getPickIndex(
  a: "none" | "best" | "plus" | "premium" | "cost_effective"
) {
  if (a === "best") {
    return 0;
  } else if (a === "cost_effective") {
    return 1;
  } else if (a === "premium") {
    return 2;
  } else if (a === "plus") {
    return 3;
  } else {
    return 4;
  }
}
