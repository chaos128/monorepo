import dynamic from "next/dynamic";

const CurationResultPage = dynamic(
  () =>
    import("../../../../../pageComponents/recommendation/CurationResultPage")
);

export default CurationResultPage;
