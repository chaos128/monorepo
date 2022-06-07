import dynamic from "next/dynamic";
import {
  generateAppliancesInfoKey,
  getAppliancesInfo,
} from "../../../../../hooks/api/useAppliancesInfo";
import {
  fetchPurchaseGuideDetail,
  generatePurchaseGuideDetailKey,
} from "../../../../../hooks/api/usePurchaseGuideDetail";
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
  const params = { take: 8, productCategoryKeys: productCategoryKey };

  if (productCategoryKey) {
    keyAndQueries.push(
      {
        key: generatePurchaseGuideDetailKey(productCategoryKey),
        queryFunc: () => fetchPurchaseGuideDetail(productCategoryKey),
      },
      {
        key: generateAppliancesInfoKey("useInfiniteAppliancesInfo", params),
        queryFunc: () => getAppliancesInfo(params),
      }
    );
  }

  return prefetch(
    keyAndQueries,
    60 * 60 // 1hour
  );
}

const PurchaseGuidePage = dynamic(
  () =>
    import("../../../../../pageComponents/contents/purchaseGuide/OverviewPage")
);

export default PurchaseGuidePage;
