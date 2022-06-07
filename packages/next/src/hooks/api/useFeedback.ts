import axios from "axios";
import { useMutation } from "react-query";
import { BASE_URL } from "../../shared/variables";

export type FeedbackType =
  | "inquiry"
  | "suggestion"
  | "report"
  | "partnership"
  | "feedback";

export interface IFeedbackData {
  contentType: FeedbackType;
  subject: string;
  contentText: string;
  feedbackEmail: string;
  productId?: number;
}

export const postFeedback = async (value: IFeedbackData) => {
  const { data } = await axios.post(`${BASE_URL}/ns_api/v1/userFeedback`, {
    ...value,
  });
  return data;
};

export const usePostFeedback = () => {
  const { mutate, isLoading, isError } = useMutation((value: IFeedbackData) => {
    return postFeedback(value);
  });

  return {
    postFeedback: mutate,
    isFeedbackLoading: isLoading,
    isFeedbackError: isError,
  };
};
