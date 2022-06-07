import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";

export interface INosearchDealRequestQuery {
  cateCd?: string;
  productCategoryKey?: string;
  page?: number;
  size?: number;
  isValidEventPeriod?: boolean;
  isValidDiscountPeriod?: boolean;
  isBeforeEventPeriod?: boolean;
}
export interface INosearchDealProductData {
  title: string;
  video: string;
  dealGoodsNm: string;
  videoWebp?: string;
  expireTime: string;
  description: string;
  product: string;
  discountedPrice: number;
  originPrice: number;
  goodsCd?: string;
  productCategoryKey: string;
  videoThumbnail?: string | null;
  modelNm?: string;
  periodDiscountEnd: string;
  periodDiscountStart?: string;
  goodsDiscountFl?: string;
  soldOutFl?: string;
  benefitUseType?: string;
  goodsAccess: "all" | "member";
  startAt?: Date;
  categoryName?: string;
}
export interface INosearchDealRefinedProductData
  extends INosearchDealProductData {
  isComingSoon?: boolean;
  soldoutFl?: string;
}

export interface INosearchDealApiRespone {
  list: INosearchDealApiItem[];
  totalCount: number;
}
export interface INosearchDealApiItem {
  goodsNo?: string;
  dealGoodsNm: string;
  cateCd: string;
  categoryName: string;
  fixedPrice: number;
  goodsPrice: number;
  modelNm: string;
  goodsNm: string;

  endAt: string;
  productCategoryKey: string;
  title: string;
  summary: string;
  videoType: string;
  videoUrl: string;
  videoWebpUrl: string;
  videoThumbnail?: string | null;
  periodDiscountEnd: string;
  periodDiscountStart?: string;
  goodsDiscountFl?: string;
  benefitUseType?: string;
  soldOutFl?: string;
  startAt?: Date;
  goodsAccess?: "all" | "member";
}

export const generateNosearchDealKey = (props: any) => {
  return ["getNosearchDeal", props];
};

export const fetchNosearchDeal = async (params?: INosearchDealRequestQuery) => {
  const { data } = await axios.get<INosearchDealApiRespone>(
    `${BASE_URL}/ns_api/v1/nosearchDeal?${
      params ? getParamsString(params) : ""
    }`
  );
  console.log("[fetch] NosearchDeal");
  return data;
};

export default function useNosearchDeal(props?: INosearchDealRequestQuery) {
  const key = generateNosearchDealKey(props);

  const { data, isLoading, isError } = useQuery(key, () => {
    return fetchNosearchDeal(props);
  });

  const nosearchDealList = useMemo(() => {
    let tempDealList: INosearchDealRefinedProductData[] = [];
    data?.list?.map((value) => {
      const {
        goodsNo,
        goodsNm,
        title,
        summary,
        videoUrl,
        videoWebpUrl,
        fixedPrice,
        goodsPrice,
        endAt,
        productCategoryKey,
        modelNm,
        periodDiscountEnd,
        periodDiscountStart,
        goodsDiscountFl,
        benefitUseType,
        videoThumbnail,
        goodsAccess,
        dealGoodsNm,
        soldOutFl,
        startAt,
      } = value;
      const startDate = startAt ? new Date(startAt) : undefined;

      tempDealList.push({
        title: title,
        video: videoUrl,
        videoWebp: videoWebpUrl ?? undefined,
        expireTime: endAt,
        description: summary,
        product: goodsNm,
        discountedPrice: goodsPrice,
        originPrice: fixedPrice,
        goodsCd: goodsNo,
        productCategoryKey: productCategoryKey,
        modelNm: modelNm,
        periodDiscountEnd: periodDiscountEnd,
        periodDiscountStart: periodDiscountStart,
        goodsDiscountFl: goodsDiscountFl,
        benefitUseType: benefitUseType,
        videoThumbnail: videoThumbnail,
        goodsAccess: goodsAccess === "all" ? "all" : "member",
        dealGoodsNm: dealGoodsNm,
        isComingSoon: props?.isBeforeEventPeriod ?? false,
        soldOutFl: soldOutFl,
        startAt: startDate,
      });
    });

    return tempDealList.length > 0 ? tempDealList : [];
  }, [data]);

  return {
    data: nosearchDealList,
    isLoading,
    isError,
  };
}
