import dynamic from "next/dynamic";
import {
  fetchAppliancesDetail,
  generateAppliancesDetailKey,
} from "../../../../../hooks/api/useAppliancesDetailInfo";
import {
  fetchCommentCount,
  generateCommentCountKey,
} from "../../../../../hooks/api/useCommentCount";
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
  const productCategoryKey = ctx.params.category;
  const indexKey = ctx.params.index;

  if (productCategoryKey) {
    keyAndQueries.push(
      {
        key: generateAppliancesDetailKey({ id: indexKey }),
        queryFunc: () => fetchAppliancesDetail(indexKey),
      },
      {
        key: generateCommentCountKey(`appliancesInfo|${indexKey}`, 10),
        queryFunc: () =>
          fetchCommentCount({ key: `appliancesInfo|${indexKey}`, size: 10 }),
      }
    );
  }
  return prefetch(
    keyAndQueries,
    60 * 60 // 1hour
  );
}

const EncyclopediaPage = dynamic(
  () => import("../../../../../pageComponents/contents/encyclopedia/DetailPage")
);

export default EncyclopediaPage;
