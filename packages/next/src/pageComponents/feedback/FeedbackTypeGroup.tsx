import { Text } from "@nosearch/ui";
import { FeedbackType } from "../../hooks/api/useFeedback";

const feedbackTypeMap = {
  inquiry: "문의",
  suggestion: "제안",
  report: "신고",
  partnership: "제휴",
  etc: "기타",
};

const FeedBackTypeGroup = ({
  feedbackType,
  setFeedbackType,
}: {
  feedbackType: FeedbackType;
  setFeedbackType: (type: FeedbackType) => void;
}) => {
  return (
    <div className="my-[2rem] flex justify-between gap-x-[0.8rem] pc:mt-[3rem]">
      {Object.entries(feedbackTypeMap).map(([key, value]) => {
        return (
          <button
            key={key}
            className={`flex w-full items-center justify-center rounded-full py-[0.6rem] ${
              feedbackType === key
                ? "bg-blue-7 text-white"
                : "border-[1px] border-gray-2 bg-gray-1 text-gray-10"
            }`}
            onClick={() => {
              setFeedbackType(key as FeedbackType);
            }}
          >
            <Text type="B5">{value}</Text>
          </button>
        );
      })}
    </div>
  );
};
export default FeedBackTypeGroup;
