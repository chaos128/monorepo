import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";
import { INosearchDealRefinedProductData } from "./useNosearchDeal";

export interface IGetNosearchDealPreviewParam {
  productCategoryKey?: string;
  cateCd?: string | null;
  isFillItem?: boolean;
  isBeforeEventPeriod?: boolean;
  isValidEventPeriod?: boolean;
  sort?: string;
  size?: number;
}
interface IUseGetNosearchDealPreviewParam
  extends IGetNosearchDealPreviewParam {}

export const generateNosearchDealPreviewKey = (props: any) => {
  return ["getNosearchDealPreview", props];
};

export const fetchNosearchDealPreview = async (
  params?: IGetNosearchDealPreviewParam
) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/nosearchDeal/preview?${
      params ? getParamsString(params) : ""
    }`
  );
  console.log("[fetch] NosearchDeal Preview");
  return data;
};

export default function useNosearchDealPreview(
  props?: IUseGetNosearchDealPreviewParam
) {
  const key = generateNosearchDealPreviewKey(props);

  const { data, isLoading, isError } = useQuery(key, () => {
    return fetchNosearchDealPreview(props);
  });

  const nosearchDealList = useMemo(() => {
    if (!data || data.list.length < 1) {
      return null;
    }
    let tempDealList: INosearchDealRefinedProductData[] = [];
    data.list.map((value: any) => {
      const {
        goodsNo,
        goodsNm,
        summary,
        videoUrl,
        videoWebpUrl,
        fixedPrice,
        goodsPrice,
        endAt,
        goodsAccess,
        startAt,
        ...rest
      } = value;
      const startDate = startAt ? new Date(startAt) : undefined;

      tempDealList.push({
        video: videoUrl,
        videoWebp: videoWebpUrl ?? undefined,
        expireTime: endAt,
        description: summary,
        product: goodsNm,
        discountedPrice: goodsPrice,
        originPrice: fixedPrice,
        goodsCd: goodsNo,
        goodsAccess: goodsAccess === "all" ? "all" : "member",
        isComingSoon: false,
        startAt: startDate,
        ...rest,
      });
    });

    return tempDealList.length > 0 ? tempDealList : null;
  }, [data]);

  const nosearchDealPreviewCategory = useMemo(() => {
    if (!data || data.list.length < 1) {
      return null;
    }
    let categoryList: string[] = [];
    data.list.map((value: any) => {
      const { categoryName } = value;
      if (categoryList.indexOf(categoryName) === -1) {
        categoryList.push(categoryName);
      }
    });
    return categoryList.length > 0 ? categoryList : null;
  }, [data]);

  const nosearchDealMap = useMemo(() => {
    const map = new Map<string, INosearchDealRefinedProductData[]>();

    if (!nosearchDealList) {
      return map;
    }

    nosearchDealList.forEach((data: INosearchDealRefinedProductData) => {
      if (!data.categoryName) {
        return null;
      }
      map.set(
        data.categoryName,
        nosearchDealList.filter(
          (item) => item.categoryName === data.categoryName
        )
      );
    });

    return map;
  }, [data]);

  return {
    data: nosearchDealList,
    dataMap: nosearchDealMap,
    category: nosearchDealPreviewCategory,
    isLoading,
    isError,
  };
}
