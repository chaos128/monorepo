import dynamic from "next/dynamic";
import {
  fetchCommentCount,
  generateCommentCountKey,
} from "../../../../hooks/api/useCommentCount";
import {
  fetchPurchaseGuideDetail,
  generatePurchaseGuideDetailKey,
} from "../../../../hooks/api/usePurchaseGuideDetail";
import { IKeyAndQueryFunction, prefetch } from "../../../../shared/prefetch";

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

  if (productCategoryKey) {
    keyAndQueries.push(
      {
        key: generatePurchaseGuideDetailKey(productCategoryKey),
        queryFunc: () => fetchPurchaseGuideDetail(productCategoryKey),
      },
      {
        key: generateCommentCountKey(`purchaseGuide|${productCategoryKey}`, 10),
        queryFunc: () =>
          fetchCommentCount({
            key: `purchaseGuide|${productCategoryKey}`,
            size: 10,
          }),
      }
    );
  }
  return prefetch(
    keyAndQueries,
    60 * 60 // 1hour
  );
}
const PurchaseGuideDetailPage = dynamic(
  () => import("../../../../pageComponents/contents/purchaseGuide/DetailPage")
);

export default PurchaseGuideDetailPage;
