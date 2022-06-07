import axios from "axios";
import { ISearchDocument } from "ns-ts-interfaces";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { refineSearchDocument } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";

const generateModelKey = (productCategoryKey: string, modelName: string) => {
  return ["getModelReview", productCategoryKey, modelName];
};

const fetchModelReviews = async (productCategoryKey: any, modelName: any) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/product/review?productCategoryKey=${productCategoryKey}&modelName=${encodeURI(
      modelName
    )}`
  );
  return data;
};

const useModelReview = (
  productCategoryKey: string | null,
  modelName: string | null
) => {
  const key = generateModelKey(
    productCategoryKey as string,
    modelName as string
  );

  const { data, isLoading } = useQuery(key, () => {
    return fetchModelReviews(productCategoryKey, modelName);
  });

  const productOverview = useMemo(() => {
    if (!data) {
      return null;
    }

    const refineData = refineSearchDocument([data.data as ISearchDocument])[0];
    const productData = {
      brand: refineData.brand,
      name: refineData.name,
      modelName: refineData.modelName,
      pickType: refineData.pickType,
      imageUrl: refineData.imageUrl,
      likeCount: refineData.likeCount,
      productId: refineData.productId,
    };
    return productData;
  }, [data]);

  const keySpecs = useMemo(() => {
    if (!data) {
      return null;
    }

    const refineData = refineSearchDocument([data.data as ISearchDocument])[0];
    const keySpecsData = refineData.reviewData?.keySpecs;
    return keySpecsData;
  }, [data]);

  const specReview = useMemo(() => {
    if (!data) {
      return null;
    }

    const refineData = refineSearchDocument([data.data as ISearchDocument])[0];
    const specReviewData = refineData.reviewData?.reviewByScoringRuleMap;
    return specReviewData;
  }, [data]);

  const summary = useMemo(() => {
    if (!data) {
      return null;
    }
    const refineData = refineSearchDocument([data.data as ISearchDocument])[0];
    const reviewData = refineData.reviewData;
    const twoLineSummary = refineData.twoLineSummary;
    const scoreData = refineData.scoreMetaMap;
    const tagsData = refineData.tags;
    const summaryData = { reviewData, twoLineSummary, scoreData, tagsData };
    return summaryData;
  }, [data]);

  const sameGroup = useMemo(() => {
    if (!data) {
      return null;
    }
    const refineData = refineSearchDocument([data.data as ISearchDocument])[0];
    const sameGroupData = refineData.sameGroup;
    return sameGroupData;
  }, [data]);

  const similarGroup = useMemo(() => {
    if (!data) {
      return "";
    }

    const refineData = refineSearchDocument([data.data as ISearchDocument])[0];
    const similarGroupData = refineData.similarGroup;
    return similarGroupData;
  }, [data]);

  return {
    modelReviewData: data
      ? refineSearchDocument([data.data as ISearchDocument])[0]
      : null,
    productOverviewData: productOverview,
    keySpecsData: keySpecs,
    specReviewData: specReview,
    summaryData: summary,
    sameGroupData: sameGroup,
    similarGroupData: similarGroup,
    isLoading: isLoading,
  };
};

export { generateModelKey, fetchModelReviews, useModelReview };
