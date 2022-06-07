import dynamic from "next/dynamic";

const ContentsPage = dynamic(
  () => import("../../../pageComponents/contents/purchaseGuide/index")
);

export default ContentsPage;
