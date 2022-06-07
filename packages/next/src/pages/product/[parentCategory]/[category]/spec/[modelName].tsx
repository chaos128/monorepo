import dynamic from "next/dynamic";
import {
  fetchModelSpec,
  generateModelSpecKey,
} from "../../../../../hooks/api/useModelSpec";
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
  if (ctx.params.category && ctx.params.modelName) {
    const productCategoryKey = ctx.params.category;
    const modelName = ctx.params.modelName;

    keyAndQueries.push({
      key: generateModelSpecKey(productCategoryKey),
      queryFunc: () => fetchModelSpec(productCategoryKey, modelName),
    });
  }
  return prefetch(
    keyAndQueries,
    60 * 60 // 1hour
  );
}

const ModelSpecPage = dynamic(
  () => import("../../../../../pageComponents/product/ModelSpecPage")
);

export default ModelSpecPage;
