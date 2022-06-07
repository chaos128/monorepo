import dynamic from "next/dynamic";

const FeedbackPage = dynamic(
  () => import("../../pageComponents/feedback/FeedbackPage")
);

export default FeedbackPage;
