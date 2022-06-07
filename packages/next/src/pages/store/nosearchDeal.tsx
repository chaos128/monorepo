import dynamic from "next/dynamic";

const NosearchDealPage = dynamic(
  () => import("../../pageComponents/store/NosearchDealPage")
);

export default NosearchDealPage;
