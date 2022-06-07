import { NextPageContext } from "next";
import dynamic from "next/dynamic";
import { getAppliancesInfo } from "../hooks/api/useAppliancesInfo";
import { fetchBanners, generateBannerKey } from "../hooks/api/useBanners";
import {
  fetchBestGoodsPreview,
  generateBestGoodsPreviewKey
} from "../hooks/api/useBestGoodsPreview";
import {
  categoriesQueryKey,
  fetchCategories,
  fetchRankCategories,
  generateRankCategoriesKey
} from "../hooks/api/useCategories";
import {
  fetchExhibitionsPreview,
  generateExhibitionsPreviewKey
} from "../hooks/api/useExhibitionsPreview";
import {
  fetchNosearchDeal,
  generateNosearchDealKey
} from "../hooks/api/useNosearchDeal";
import {
  fetchNosearchDealPreview,
  generateNosearchDealPreviewKey
} from "../hooks/api/useNosearchDealPreview";
import {
  fetchPurchaseGuidePreview,
  generatePurchaseGuidePreviewKey
} from "../hooks/api/usePurchaseGuide";
import {
  fetchTimedealPreview,
  generateTimedealPreviewKey
} from "../hooks/api/useTimedealPreview";
import { prefetch } from "../shared/prefetch";

export async function getStaticProps(ctx: NextPageContext) {
  const param = ctx;
  return prefetch(
    [
      { key: categoriesQueryKey, queryFunc: fetchCategories },
      {
        key: generateRankCategoriesKey("rankCategories"),
        queryFunc: fetchRankCategories,
      },
      {
        key: generateBannerKey("home"),
        queryFunc: () => {
          return fetchBanners({
            type: "home",
          });
        },
      },
      {
        key: generateNosearchDealKey({
          isValidEventPeriod: true,
        }),
        queryFunc: () => {
          return fetchNosearchDeal({
            isValidEventPeriod: true,
          });
        },
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
        key: generateTimedealPreviewKey({
          relationCategoryKey: "all",
          relationViewType: "home",
          size: 8,
        }),
        queryFunc: () => {
          return fetchTimedealPreview({
            relationCategoryKey: "all",
            relationViewType: "home",
            size: 8,
          });
        },
      },
      {
        key: generateBestGoodsPreviewKey({
          relationCategoryKey: "all",
          relationViewType: "storeHome",
          size: 6,
        }),
        queryFunc: () => {
          return fetchBestGoodsPreview({
            relationCategoryKey: "all",
            relationViewType: "storeHome",
            size: 6,
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
      },
      {
        key: [
          "useAppliancesInfo",
          "encyclopedia",
          {
            productCategoryKeys: "all",
            take: 5,
          },
        ],
        queryFunc: () => {
          return getAppliancesInfo({
            productCategoryKeys: "all",
            take: 5,
          });
        },
      },
      {
        key: generateExhibitionsPreviewKey({
          relationViewType: "home",
        }),
        queryFunc: () => {
          return fetchExhibitionsPreview({
            relationViewType: "home",
          });
        },
      },
    ],
    60 * 60 // 1hour
  );
}

const Home = dynamic(() => import("../pageComponents/Home"));

export default Home;
