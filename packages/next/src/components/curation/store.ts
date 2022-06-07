import { atomWithReset } from "jotai/utils";
import { ISearchDocument } from "ns-ts-interfaces";
import {
  ISelectedOption,
  ISelectedOptionTexts,
  ISurveyMultipleSelection,
  ISurveySelection,
  SurveyResultSortType,
} from "./type";

export const selectOptionStateAtom = atomWithReset<ISurveySelection>({
  surveyIndex: -1,
  optionIndex: -1,
});

export const selectMultipleOptionStateAtom = atomWithReset<ISurveyMultipleSelection>(
  {
    surveyIndex: -1,
    optionIndex: [],
  }
);

export const selectedOptionsAtom = atomWithReset<ISelectedOption>({
  queryGroupsWithOperator: [],
  optionKeys: [],
});

export const selectedOptionTextsAtom = atomWithReset<ISelectedOptionTexts>({
  questions: [],
  answers: [],
});

export const nowIndexAtom = atomWithReset<number>(0);

export const timeStampAtom = atomWithReset<string>("");

export const totalCountAtom = atomWithReset<number>(0);

export const surveyResultAtom = atomWithReset<ISearchDocument[]>([]);

export const surveyResultSortTypeAtom = atomWithReset<SurveyResultSortType>(
  "recommendation"
);
