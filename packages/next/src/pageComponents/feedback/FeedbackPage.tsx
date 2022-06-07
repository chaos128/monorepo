import { Button, Heading, Text } from "@nosearch/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FeedbackType,
  IFeedbackData,
  usePostFeedback,
} from "../../hooks/api/useFeedback";
import FeedbackSuccessPage from "./FeedbackSuccessPage";
import FeedBackTypeGroup from "./FeedbackTypeGroup";

const CONTENT_LIMIT = 3000;

const FeedbackPage = () => {
  const [feedbackSuccessed, setFeedbackSuccessed] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("inquiry");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFeedbackData>({ mode: "onChange" });

  const { postFeedback, isFeedbackLoading, isFeedbackError } =
    usePostFeedback();

  if (isFeedbackLoading) {
    return (
      <Heading level={5} className="my-[10rem] text-center text-gray-10">
        의견 전송 중 📮
      </Heading>
    );
  }

  const onValid = (data: IFeedbackData) => {
    const { subject, contentText, feedbackEmail } = data;

    postFeedback(
      {
        contentType: feedbackType,
        subject,
        contentText,
        feedbackEmail,
      },
      {
        onSuccess: () => {
          reset();
          setFeedbackSuccessed(true);
        },
      }
    );
  };

  const handleClickResettingFeedback = () => {
    setFeedbackSuccessed(false);
    setFeedbackType("inquiry");
  };

  if (!isFeedbackLoading && feedbackSuccessed) {
    return (
      <FeedbackSuccessPage
        onClickResettingFeedback={handleClickResettingFeedback}
      />
    );
  }

  return (
    <div className="mx-auto mt-[3rem] mb-[4rem] max-w-[80rem] mobile:px-[2rem]">
      <Heading level={2} className="text-gray-10 mobile:hidden">
        의견 보내기
      </Heading>
      <Heading level={4} className="mt-[3rem] text-gray-10">
        노써치에게 바라는 점을 알려주세요.
      </Heading>
      <FeedBackTypeGroup
        feedbackType={feedbackType}
        setFeedbackType={setFeedbackType}
      />

      <form onSubmit={handleSubmit(onValid)}>
        {/* feedback title */}
        <input
          {...register("subject", { required: "제목을 입력해주세요." })}
          className={`w-full rounded-[10px] border-[1px] bg-gray-1 px-[1.6rem] py-[1.2rem] text-body-4 outline-none ${
            Boolean(errors.subject) ? "border-red-2 bg-red-1" : "border-gray-2"
          }`}
          type="text"
          placeholder="제목을 입력해주세요"
        />
        <Text type="B10" className="my-[0.5rem] text-red-4">
          {errors.subject?.message}
        </Text>

        {/* feedback content */}
        <div className="mt-[1.2rem]">
          <textarea
            {...register("contentText", {
              required: "내용을 입력해주세요.",
              maxLength: {
                value: CONTENT_LIMIT,
                message: `최대 ${CONTENT_LIMIT}자 까지 입력할 수 있습니다.`,
              },
            })}
            className={`h-[27.5rem] w-full rounded-[10px] border-[1px] bg-gray-1 p-[1.6rem] text-body-4 outline-none pc:h-[25.8rem] ${
              Boolean(errors.contentText)
                ? "border-red-2 bg-red-1"
                : "border-gray-2"
            }`}
            placeholder="제품에 대한 문의는 회신이 어려울 수 있으니 구매가이드와 노써치픽 서비스의 댓글을 통해 문의해주세요. 😊"
          ></textarea>
          {watch("contentText") && (
            <Text type="B10" className="text-gray-7">{`${
              watch("contentText").length
            } / ${CONTENT_LIMIT}`}</Text>
          )}

          <Text type="B10" className="my-[0.5rem] text-red-4">
            {errors.contentText?.message}
          </Text>
        </div>

        {/* feedback email */}
        <div className="mt-[2rem] mb-[4.8rem]">
          <Text
            type="B2"
            className={`mb-[0.8rem]  ${
              Boolean(errors.feedbackEmail) ? "text-red-4" : "text-gray-10"
            }`}
          >
            연락 받으실 이메일
          </Text>
          <input
            {...register("feedbackEmail", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                message: "올바른 이메일을 입력해주세요.",
              },
            })}
            className={`w-full rounded-[10px] border-[1px] bg-gray-1 px-[1.6rem] py-[1.2rem] text-body-4 outline-none ${
              Boolean(errors.feedbackEmail)
                ? "border-red-2 bg-red-1"
                : "border-gray-2"
            }`}
            type="text"
            placeholder="aaa@aaa.com"
          />
          <Text type="B10" className="my-[0.5rem] text-red-4">
            {errors.feedbackEmail?.message}
          </Text>
        </div>

        {/* feedback send button */}
        {isFeedbackError && (
          <div>Error{/* TODO: Replace to Custom Error Page */}</div>
        )}
        <div className="text-center">
          <Button
            size="xl"
            type="cta"
            disabled={
              Boolean(errors.subject) ||
              Boolean(errors.contentText) ||
              Boolean(errors.feedbackEmail)
            }
            className="w-full pc:w-[40rem]"
            onClick={handleSubmit(onValid)}
          >
            보내기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackPage;
