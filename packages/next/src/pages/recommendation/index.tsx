import dynamic from "next/dynamic";

const RecommendationPage = dynamic(
  () => import("../../pageComponents/recommendation")
);
export default RecommendationPage;
