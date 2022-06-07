import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";

export const generateReviewCountDetailKey = (params: any) => {
  return ["getReviewCountDetail", params];
};

export const fetchReviewCountDetail = async (
  params: IUsetReviewCountParams
) => {
  const { data } = await axios.get<string>(
    `${BASE_URL}/ns_api/v1/store/getGoodsReviewCntDetails?${getParamsString(
      params
    )}`
  );
  return data;
};

export interface IUsetReviewCountParams {
  goodsNo?: string | null;
  categoryKey?: string | null;
  modelName?: string | null;
}
const useReviewCountDetail = (params: IUsetReviewCountParams) => {
  const key = generateReviewCountDetailKey(params);

  const { data, isLoading, isSuccess } = useQuery(key, () => {
    const { goodsNo, categoryKey, modelName } = params;
    if (goodsNo || (categoryKey && modelName)) {
      return fetchReviewCountDetail(params);
    }
    return null;
  });

  const reviewCount: number[] | null = useMemo(() => {
    if (data) {
      return data.split(",").map((score) => {
        return parseInt(score);
      });
    }

    return null;
  }, [data]);

  const reviewCountSum = useMemo(() => {
    return reviewCount
      ? reviewCount.reduce((prev, cur) => prev + cur, 0)
      : null;
  }, [reviewCount]);

  const reviewAvgScore = useMemo(() => {
    if (reviewCount && reviewCountSum !== null) {
      const reviewScore = reviewCount.map((score, index) => {
        const scoreBoardLength = 5;
        return score * (scoreBoardLength - index);
      });
      const reviewScoreSum = reviewScore.reduce((prev, cur) => prev + cur, 0);

      return parseFloat((reviewScoreSum / reviewCountSum).toFixed(1));
    }
    return null;
  }, [reviewCount, reviewCountSum]);

  return {
    data: reviewCount,
    reviewCountSum,
    reviewAvgScore,
    isLoading,
    isSuccess,
  };
};

export default useReviewCountDetail;
