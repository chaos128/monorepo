import axios from "axios";
import shuffle from "lodash/shuffle";
import { IReviewAnalysis } from "ns-ts-interfaces";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../../shared/variables";

export const generateAiReviewKey = (productCategoryKey: string) => {
  return ["getAiReview", productCategoryKey];
};

export const fetchAiReview = async (
  productCategoryKey: string | null,
  modelName: string | null
) => {
  try {
    const { data } = await axios(
      `${BASE_URL}/ns_api/v1/productReviews/${productCategoryKey}/${modelName}`
    );
    if (data === undefined) {
      return null;
    } else {
      return data;
    }
  } catch (error) {
    // const errorRespose = error.response.data;
    // console.log(errorRespose);
  }
};

export enum AiReviewType {
  ALL = "all",
  POSITIVE = "positive",
  NEGATIVE = "negative",
}
export interface IAiReviewContent {
  text: string;
  date: string;
  type?: AiReviewType;
}

export const REVIEW_PAGE_COUNT = 5;
export default function useAiReview(
  productCategoryKey: string | null,
  modelName: string | null,
  reviewFilter?: string | null
) {
  const key = generateAiReviewKey(productCategoryKey as string);

  const { data, isLoading, isSuccess } = useQuery(key, () => {
    return fetchAiReview(productCategoryKey, modelName);
  });

  const totalNumber = data
    ? data.sentiment?.positive +
      data.sentiment?.neutral +
      data.sentiment?.negative
    : null;

  const positiveNumber = data
    ? data.sentiment?.positive + data.sentiment?.neutral
    : null;

  const totalString = useMemo(() => {
    if (!totalNumber) {
      return "--";
    }
    let referValue = totalNumber;
    let digit = 1;
    while (referValue > 10) {
      referValue = Math.floor(referValue / 10);
      digit = digit * 10;
    }
    const unit = digit >= 10 ? "+" : "-";
    return String(referValue * digit) + unit;
  }, [totalNumber]);

  const positiveRatio = useMemo(() => {
    if (!totalNumber || !positiveNumber) {
      return null;
    } else {
      return Math.floor((positiveNumber / totalNumber) * 100);
    }
  }, [totalNumber, positiveNumber]);

  const negativeRatio = useMemo(() => {
    if (!data || !totalNumber) {
      return null;
    } else {
      return Math.floor((data.sentiment?.negative / totalNumber) * 100);
    }
  }, [data, totalNumber]);

  const summary = data?.summary;
  const contentsAll = useMemo(() => {
    if (!summary) {
      return null;
    }

    const refinePositive = summary.positive.map((value: any) => {
      return {
        ...value,
        type: AiReviewType.POSITIVE,
      };
    });

    const refineNegative = summary.negative.map((value: any) => {
      return {
        ...value,
        type: AiReviewType.NEGATIVE,
      };
    });

    const allContents = refinePositive.concat(refineNegative);
    const result = shuffle<IAiReviewContent>(allContents);

    const refine = result.slice().sort((prev, next) => {
      const prevDate = new Date(prev.date);
      const nextDate = new Date(next.date);
      return nextDate.getTime() - prevDate.getTime();
    });

    return refine;
  }, [summary]);

  const contents: IAiReviewContent[] | null = useMemo(() => {
    if (reviewFilter === AiReviewType.ALL) {
      return contentsAll;
    }
    if (
      summary &&
      (reviewFilter === AiReviewType.NEGATIVE ||
        reviewFilter === AiReviewType.POSITIVE)
    ) {
      return summary[reviewFilter];
    }

    return null;
  }, [reviewFilter, contentsAll, summary]);

  const pageLength = useMemo(() => {
    if (!contents || contents.length < REVIEW_PAGE_COUNT) {
      return 1;
    } else {
      return Math.floor(contents.length / REVIEW_PAGE_COUNT);
    }
  }, [contents]);

  const entireReviewLength = useMemo(() => {
    if (!summary) {
      return 0;
    } else {
      return (
        summary[AiReviewType.POSITIVE].length +
        summary[AiReviewType.NEGATIVE].length
      );
    }
  }, [summary]);

  return {
    aiReviewData: data ? (data as IReviewAnalysis) : null,
    reviews: contents,
    positiveRatio,
    negativeRatio,
    positiveNumber,
    negativeNumber: data && isSuccess ? data.sentiment?.negative : null,
    totalString,
    entireReviewLength,
    pageLength,
    isLoading,
  };
}
