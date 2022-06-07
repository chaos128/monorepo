import dynamic from "next/dynamic";

const ReviewTemPage = dynamic(
  () => import("../../pageComponents/store/ReviewTemPage")
);

export default ReviewTemPage;
