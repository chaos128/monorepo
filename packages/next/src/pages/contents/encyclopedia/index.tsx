import dynamic from "next/dynamic";

const ContentsPage = dynamic(
  () => import("../../../pageComponents/contents/encyclopedia/index")
);

export default ContentsPage;
