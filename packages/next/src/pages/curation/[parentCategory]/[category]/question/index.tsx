import dynamic from "next/dynamic";
import { getSurveyConfigsApi } from "../../../../../hooks/api/useSurveyConfigs";
import { IKeyAndQueryFunction, prefetch } from "../../../../../shared/prefetch";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(ctx: any) {
  const param = ctx.params.param;
  const keyAndQueries: IKeyAndQueryFunction[] = [];
  if (ctx.params.category) {
    const productCategoryKey = ctx.params.category;
    keyAndQueries.push({
      key: ["surveyConfigs", productCategoryKey, "type"],
      queryFunc: () =>
        getSurveyConfigsApi({ productCategoryKey, type: "survey" }),
    });
  }
  return prefetch(
    keyAndQueries,
    60 * 60 // 1hour
  );
}

const CompareTablePage = dynamic(
  () =>
    import("../../../../../pageComponents/recommendation/CurationQuestionPage")
);

export default CompareTablePage;
