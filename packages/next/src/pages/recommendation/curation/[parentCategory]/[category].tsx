import dynamic from "next/dynamic";

const CurationPage = dynamic(
  () => import("../../../../pageComponents/recommendation/CurationPage")
);

export default CurationPage;
