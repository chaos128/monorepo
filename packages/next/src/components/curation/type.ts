import { QueryGroupsWithOperator } from "ns-ts-interfaces";

export interface IAddOptionProps {
  selectedOption: QueryGroupsWithOperator[];
  optionKey: string[];
}

export interface ISelectedOption {
  queryGroupsWithOperator: QueryGroupsWithOperator[];
  optionKeys: string[];
}

export interface ISurveySelection {
  surveyIndex: number;
  optionIndex: number;
}

export interface ISurveyMultipleSelection {
  surveyIndex: number;
  optionIndex: number[];
}

export interface ISelectedOptionTexts {
  questions: string[];
  answers: string[];
}

export type SurveyResultSortType =
  | "recommendation"
  | "recommendation_without_price"
  | "cheap"
  | "expensive";
