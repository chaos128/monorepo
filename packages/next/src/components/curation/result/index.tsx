import { useAtomValue } from "jotai/utils";
import { ISearchDocument } from "ns-ts-interfaces";
import { useEffect } from "react";
import {
  IFecthCurationParams,
  useSurveyConfigs,
} from "../../../hooks/api/useSurveyConfigs";
import {
  selectedOptionsAtom,
  selectedOptionTextsAtom,
  surveyResultAtom,
  surveyResultSortTypeAtom,
  totalCountAtom,
} from "../store";
import { useCurationSurvey } from "../surveyHooks";
import { ISelectedOptionTexts } from "../type";
import SortFilter from "./sortFilter";

const Result = ({
  parentCategory,
  category,
  timestamp,
}: {
  parentCategory: string;
  category: string;
  timestamp: string;
}) => {
  const { fetchCuration, fetchSelectedOption } = useSurveyConfigs({
    param: { productCategoryKey: category, type: "survey" },
  });
  const selectedOptions = useAtomValue(selectedOptionsAtom);
  const surveyResult = useAtomValue(surveyResultAtom);
  const totalCount = useAtomValue(totalCountAtom);
  const selectedOptionTexts = useAtomValue(selectedOptionTextsAtom);
  const sortType = useAtomValue(surveyResultSortTypeAtom);

  const { onSetTimeStamp, onSetSortType, onSetSurveyResult, onRestSurvey } =
    useCurationSurvey();

  useEffect(() => {
    if (
      selectedOptions.queryGroupsWithOperator.length === 0 ||
      selectedOptions.optionKeys.length === 0
    ) {
      return;
    }

    fetchCuration({
      productCategoryKey: category,
      type: "survey",
      selected: selectedOptions.queryGroupsWithOperator,
      selectedOptionKeys: selectedOptions.optionKeys,
      save: true,
      sort: "recommendation",
      page: 1,
    } as IFecthCurationParams).then((res) => {
      if (!res || !res.success) {
        return;
      }
      onSetSurveyResult({
        result: res.data.documents,
        totalCount: res.data.total,
      });
      const savingKey = res.hashKey;
      onSetTimeStamp(savingKey);
    });
  }, [selectedOptions]);

  useEffect(() => {
    if (!timestamp) {
      return;
    }

    fetchSelectedOption(timestamp).then((res) => {
      if (!res) {
        return;
      }

      fetchCuration({
        type: "survey",
        productCategoryKey: category,
        selected: res.filter,
        sort: sortType,
        size: 10,
      }).then((res) => {
        if (!res || !res.success) {
          return;
        }
        onSetSurveyResult({
          result: res.data.documents,
          totalCount: res.data.total,
        });
      });
    });
  }, [timestamp, sortType]);

  if (!selectedOptions || surveyResult.length === 0) {
    return null;
  }

  return (
    <div>
      <h1>
        ???????????? ????????? ?????? ?????? ????????????
        <span> {surveyResult.length < 3 ? surveyResult.length : 3}??? </span>
        ???????????????.
      </h1>
      <div>?????? ?????? {totalCount}</div>
      <MySelectedOptions selectedOptionTexts={selectedOptionTexts} />
      <SortFilter sortType={sortType} onSetSortType={onSetSortType} />
      <button
        type="button"
        onClick={() => {
          onRestSurvey(parentCategory, category);
        }}
      >
        ?????? ?????? ?????? ????????????
      </button>
      <ResultItems surveyResult={surveyResult} />
    </div>
  );
};

export default Result;

const ResultItems = (props: { surveyResult: ISearchDocument[] }) => {
  const { surveyResult } = props;
  return (
    <div>
      {surveyResult.map((item, i) => {
        return (
          <div key={`surveyResultItem_${i}`}>
            <div>{item.brand}</div>
            <div>{item.modelName}</div>
            <div>{item.price}??????</div>
          </div>
        );
      })}
    </div>
  );
};

const MySelectedOptions = (props: {
  selectedOptionTexts: ISelectedOptionTexts;
}) => {
  const { selectedOptionTexts } = props;

  return (
    <div>
      <div>?????? ????????? ?????? ??????</div>
      {selectedOptionTexts.questions.map((question, i) => {
        return (
          <div key={`mySelectedOption_${i}`}>
            <div>Q. {question}</div>
            <div>A. {selectedOptionTexts.answers[i]}</div>
          </div>
        );
      })}
    </div>
  );
};
