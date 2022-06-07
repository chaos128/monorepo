import dynamic from "next/dynamic";
import {
  fetchCompareItemsSpec,
  generateCompareKey,
} from "../../../hooks/api/useCompare";
import { IKeyAndQueryFunction, prefetch } from "../../../shared/prefetch";

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
      key: generateCompareKey(productCategoryKey),
      queryFunc: () => fetchCompareItemsSpec(productCategoryKey),
    });
  }
  return prefetch(
    keyAndQueries,
    60 * 60 // 1hour
  );
}

const CompareTablePage = dynamic(
  () => import("../../../pageComponents/mypage/compare/CompareTablePage")
);

export default CompareTablePage;
