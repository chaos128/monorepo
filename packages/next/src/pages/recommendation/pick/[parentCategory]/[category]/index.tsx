import dynamic from "next/dynamic";
import {
  fetchNosearchDealPreview,
  generateNosearchDealPreviewKey,
} from "../../../../../hooks/api/useNosearchDealPreview";
import {
  fetchPickItems,
  generatePickKey,
} from "../../../../../hooks/api/usePickItems";
import {
  fetchPurchaseGuidePreview,
  generatePurchaseGuidePreviewKey,
} from "../../../../../hooks/api/usePurchaseGuide";
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
    const _params = {
      isPick: true,
      isRepresentative: true,
      productCategoryKey,
      size: 100,
    };
    keyAndQueries.push(
      {
        key: generatePickKey(_params),
        queryFunc: () => fetchPickItems(_params),
      },
      {
        key: generateNosearchDealPreviewKey({
          isBeforeEventPeriod: false,
          isFillItem: true,
          size: 8,
        }),
        queryFunc: () => {
          return fetchNosearchDealPreview({
            isBeforeEventPeriod: false,
            isFillItem: true,
            size: 8,
          });
        },
      },
      {
        key: generatePurchaseGuidePreviewKey({
          type: "home_true",
          productCategoryKeys: "all",
          take: 4,
          sort: "popular",
        }),
        queryFunc: () => {
          return fetchPurchaseGuidePreview({
            type: "home_true",
            productCategoryKeys: "all",
            take: 4,
            sort: "popular",
          });
        },
      }
    );
  }
  return prefetch(
    keyAndQueries,
    60 * 60 // 1hour
  );
}

const PickPage = dynamic(
  () => import("../../../../../pageComponents/recommendation/PickPage")
);

export default PickPage;
