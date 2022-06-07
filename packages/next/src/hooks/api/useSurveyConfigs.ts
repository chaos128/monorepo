import axios from "axios";
import produce from "immer";
import {
  ICurationResultData,
  ISurveyParam,
  ISurveyResponse,
  QueryGroupsWithOperator,
  SurveyConfig,
  SurveySetConfig,
} from "ns-ts-interfaces";
import { useCallback, useEffect, useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { getParamsString, refineSearchDocument } from "../../shared/utils";
import { useCurationBrandList } from "./useCurationBrandList";

async function fetchCurationResultApi(params: IFecthCurationParams) {
  const { selected, ...rest } = params;
  const { data } = await axios.post(
    `/curation?${getParamsString(rest)}`,
    selected
  );

  return data;
}

async function fetchSelectedOptionApi(hashKey: string) {
  const { data } = await axios.get(`/curation/${hashKey}`);
  return data;
}

export async function getSurveyConfigsApi(param: ISurveyParam) {
  const { data } = await axios.get(
    `/surveyConfigs?productCategoryKey=${param.productCategoryKey}&type=${param.type}`
  );
  return data;
}
export interface IFecthCurationParams {
  productCategoryKey: string;
  type: "survey" | "filter";
  selected: QueryGroupsWithOperator[];
  text?: string;
  save?: boolean;
  selectedOptionKeys?: string[];
  size?: number;
  sort?: string;
  page?: number;
}

export const useSurveyConfigs = (props: {
  param?: ISurveyParam;
  onCurationSuccess?: (res: ICurationResultData, hashKey?: string) => void;
  onCurationError?: () => void;
  initialData?: ISurveyResponse;
}) => {
  const { data, isLoading, isSuccess } = useQuery(
    props.param
      ? ["surveyConfigs", props.param.productCategoryKey, props.param.type]
      : ["surveyConfigs", null],
    () => {
      if (props.param) {
        return getSurveyConfigsApi(props.param);
      } else {
        return null;
      }
    },
    {
      initialData: props.initialData,
      staleTime: props.initialData ? 10000 : undefined,
    }
  );
  const { curationBrandList } = useCurationBrandList({
    productCategoryKey: props.param?.productCategoryKey,
  });

  // const [fetchSelectedOption, selectedOptionResult] = useMutation(
  const fetchSelectedOptionMutation = useMutation((hashKey: string) => {
    return fetchSelectedOptionApi(hashKey);
  });

  // 현재 fetchCurationMutaion에 response 사용시, onsuccess 데이터 처리가 늦는 감이 있어, 차후 수정이 필요할 것 같습니다.
  // hotfix 1.31.8
  const fetchCurationMutation = useMutation(
    (params: IFecthCurationParams) => {
      return fetchCurationResultApi(params);
    },
    {
      onSuccess: (res, param) => {
        const refinedResData: ICurationResultData = {
          ...res.data,
          documents:
            res.data.documents && refineSearchDocument(res.data.documents),
        };
        props.onCurationSuccess &&
          props.onCurationSuccess(refinedResData, res.hashKey);
        return {
          ...res,
          data: refinedResData,
        };
      },
      onError: () => {
        //  props.onAddSurveyQueryFailed && props.onAddSurveyQueryFailed();
      },
    }
  );

  const fetchCurationFunc = useCallback(
    async (params: IFecthCurationParams) => {
      try {
        return await fetchCurationMutation.mutateAsync(params);
      } catch (error) {
        props.onCurationError && props.onCurationError();
        if (process.env.NODE_ENV === "development") {
          // necessary console.log
          console.log(error);
        }
      }
    },
    [fetchCurationMutation.mutateAsync, props.onCurationError]
  );

  const memoizedSurveyConfig = useMemo(() => {
    let result: SurveySetConfig | null = null;
    if (!data) return null;
    if (curationBrandList.length === 0) {
      result = data.data as SurveySetConfig;
    } else {
      const newData = produce(data.data as SurveySetConfig, (prev) => {
        const found = prev.surveys.find((obj) => obj.title === "브랜드");
        if (found) {
          const displayedBrands = found.options.map((row) => row.title);

          curationBrandList.map((obj, i) => {
            if (displayedBrands.indexOf(obj.brandNm) === -1) {
              found.options.push({
                key: -1 * (i + 1),
                title: obj.brandNm,
                queryGroups: [
                  {
                    queryRules: [
                      {
                        type: "match",
                        symbol: "spec_common_4",
                        value: obj.brandNm,
                        startWith: false,
                      },
                    ],
                    type: "and",
                  },
                ],
              });
            }
          });
        }
      });
      result = newData;
    }

    const newResult = produce(result, (prevResult) => {
      prevResult.surveys = prevResult.surveys.filter(
        (survey) => survey.title !== "테마추천" && !survey.title.startsWith("#")
      );
    });

    return newResult;
  }, [curationBrandList.length, data]);

  const themeRecommends: SurveyConfig | null | undefined = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.data.surveys.find(
      (survey: SurveyConfig) => survey.title === "테마추천"
    );
  }, [data]);

  return {
    surveyConfigs: data ? memoizedSurveyConfig : null,
    fetchCuration: fetchCurationFunc,
    fetchSelectedOption: fetchSelectedOptionMutation.mutateAsync,
    isLoading:
      fetchCurationMutation.isLoading ||
      isLoading ||
      fetchSelectedOptionMutation.isLoading,
    curationResult: fetchCurationMutation,
    selectedOptionResult: fetchSelectedOptionMutation,
    themeRecommends,
    isSuccess,
  };
};
