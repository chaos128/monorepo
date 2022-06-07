import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useRouter } from "next/router";
import {
  ISearchDocument,
  QueryGroupsWithOperator,
  SurveyConfig,
} from "ns-ts-interfaces";
import {
  nowIndexAtom,
  selectedOptionsAtom,
  selectedOptionTextsAtom,
  selectMultipleOptionStateAtom,
  selectOptionStateAtom,
  surveyResultAtom,
  surveyResultSortTypeAtom,
  timeStampAtom,
  totalCountAtom,
} from "./store";
import { IAddOptionProps, SurveyResultSortType } from "./type";

export const useCurationSurvey = () => {
  const router = useRouter();

  const [nowIndex, setNowIndex] = useAtom(nowIndexAtom);
  const [timeStamp, setTimeStamp] = useAtom(timeStampAtom);
  const [selectOptionState, setSelectOptionState] = useAtom(
    selectOptionStateAtom
  );
  const [selectMultipleOptionState, setSelectMultipleOptionState] = useAtom(
    selectMultipleOptionStateAtom
  );
  const [selectedOptions, setSelectedOptions] = useAtom(selectedOptionsAtom);
  const [selectedOptionTexts, setSelectedOptionTexts] = useAtom(
    selectedOptionTextsAtom
  );
  const [surveyResult, setSurveyResult] = useAtom(surveyResultAtom);
  const [totalCount, setTotalCount] = useAtom(totalCountAtom);
  const [sortType, setSortType] = useAtom(surveyResultSortTypeAtom);

  const resetNowIndex = useResetAtom(nowIndexAtom);
  const resetTimeStamp = useResetAtom(timeStampAtom);
  const resetSortType = useResetAtom(surveyResultSortTypeAtom);
  const resetSelectOptionState = useResetAtom(selectOptionStateAtom);
  const resetSelectMultipleOptionState = useResetAtom(
    selectMultipleOptionStateAtom
  );
  const resetSelectedOptions = useResetAtom(selectedOptionsAtom);
  const resetSelectedOptionTexts = useResetAtom(selectedOptionTextsAtom);
  const resetSurveyResult = useResetAtom(surveyResultAtom);

  const onSelectOption = (props: any) => {
    const { maxChoiceCount, surveyIndex, optionIndex } = props;
    if (maxChoiceCount === 1)
      setSelectOptionState({ surveyIndex, optionIndex });
    if (maxChoiceCount > 1)
      setSelectMultipleOptionState({ surveyIndex, optionIndex });
  };

  const onAddOption = (props: IAddOptionProps) => {
    const { selectedOption, optionKey } = props;
    const selectOption = {
      queryGroupsWithOperator: selectedOption,
      optionKeys: [...selectedOptions.optionKeys, ...optionKey],
    };
    setSelectedOptions(selectOption);
    resetSelectOptionState();
    resetSelectMultipleOptionState();
  };

  const onSaveOptionText = (props: any) => {
    const { question, answer } = props;
    const _selectedOptionTexts = {
      questions: [...selectedOptionTexts.questions, question],
      answers: [...selectedOptionTexts.answers, answer],
    };
    setSelectedOptionTexts(_selectedOptionTexts);
  };

  const onGetSelectOption = ({ data }: { data: any }) => {
    const selectOption_queryGroups =
      data.maxChoiceCount === 1
        ? data.options[selectOptionState.optionIndex].queryGroups
        : selectMultipleOptionState.optionIndex.map((index) => {
            return data.options[index].queryGroups[0];
          });
    const selected = [
      ...selectedOptions.queryGroupsWithOperator,
      { operator: data.operator, queryGroups: selectOption_queryGroups },
    ];
    return selected;
  };

  // 다음 질문으로 넘어가기 위해 필요한 값들을 atom에 저장
  const onClickNextQuestion = (props: {
    data: SurveyConfig;
    selectedOption: QueryGroupsWithOperator[];
  }) => {
    const { data, selectedOption } = props;

    if (data.maxChoiceCount === 1 && selectOptionState.optionIndex === -1)
      return;
    if (
      data.maxChoiceCount > 1 &&
      selectMultipleOptionState.optionIndex.length === 0
    )
      return;

    const selectOption = data.options[selectOptionState.optionIndex];
    const selectOption_keys =
      data.maxChoiceCount === 1
        ? [selectOption.key + ""]
        : selectMultipleOptionState.optionIndex.map((index) => {
            return data.options[index].key + "";
          });

    // 선택한 옵션 데이터를 selectedOptionsAtom에 저장
    onAddOption({
      selectedOption,
      optionKey: selectOption_keys,
    });

    // 선택한 옵션 데이터를 selectedOptionTextsAtom에 저장해서 결과 페이지에서 내가 선택한 조건 정보를 볼 때 사용
    const selecOption_answer =
      data.maxChoiceCount === 1
        ? selectOption.title
        : selectMultipleOptionState.optionIndex
            .map((index) => {
              return data.options[index].title;
            })
            .join();
    onSaveOptionText({ question: data.title, answer: selecOption_answer });

    // 다음 질문으로 이동을 위해 nextIndex으로 설정
    if (data.nextIndex || selectOption?.nextIndex) {
      if (data.nextIndex) onIncrementIndex(data.nextIndex);
      if (selectOption?.nextIndex) onIncrementIndex(selectOption.nextIndex);
    } else onIncrementIndex(nowIndex + 1);
  };

  const onRestSurvey = (parentCategory: any, category: any) => {
    onResetCurationAtoms();
    router.replace(
      `/curation/${parentCategory}/${category}/question?questionNumber=0`
    );
  };

  const onIncrementIndex = (nextIndex: number) => {
    setNowIndex(nextIndex);
  };

  const onSetTimeStamp = (timestamp: string) => {
    setTimeStamp(timestamp);
  };

  const onSetSortType = (sortType: SurveyResultSortType) => {
    setSortType(sortType);
  };

  const onResetSortType = () => {
    resetSortType();
  };

  const onResetCurationAtoms = () => {
    resetNowIndex();
    resetTimeStamp();
    resetSelectedOptions();
    resetSelectOptionState();
    resetSelectMultipleOptionState();
    resetSelectedOptionTexts();
    resetSurveyResult();
  };

  const onResetSelectOptions = () => {
    resetSelectOptionState();
    resetSelectMultipleOptionState();
  };

  const onSetSurveyResult = (props: {
    result: ISearchDocument[];
    totalCount: number;
  }) => {
    const { result, totalCount } = props;
    setSurveyResult(result);
    setTotalCount(totalCount);
  };

  return {
    onGetSelectOption,
    onSelectOption,
    onAddOption,
    onSaveOptionText,
    onClickNextQuestion,
    onIncrementIndex,
    onSetTimeStamp,
    onSetSortType,
    onResetSortType,
    onRestSurvey,
    onResetCurationAtoms,
    onResetSelectOptions,
    onSetSurveyResult,
  };
};
