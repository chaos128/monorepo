import dynamic from "next/dynamic";
import {
  categoriesQueryKey,
  fetchCategories,
} from "../../../../../hooks/api/useCategories";
import {
  fetchModelReviews,
  generateModelKey,
} from "../../../../../hooks/api/useModelReview";
import {
  fetchNosearchReview,
  generateNosearchReviewKey,
} from "../../../../../hooks/api/useNosearchReview";
import {
  fetchProductThumbnails,
  generateProductThumbnailsKey,
} from "../../../../../hooks/api/useProductThumbnail";
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

    keyAndQueries.push(
      {
        key: generateModelKey(productCategoryKey, modelName),
        queryFunc: () => fetchModelReviews(productCategoryKey, modelName),
      },
      {
        key: categoriesQueryKey,
        queryFunc: () => fetchCategories(),
      },
      {
        key: generateNosearchReviewKey(productCategoryKey),
        queryFunc: () => fetchNosearchReview(productCategoryKey, modelName),
      },
      {
        key: generateProductThumbnailsKey({ productCategoryKey, modelName }),
        queryFunc: () =>
          fetchProductThumbnails({ productCategoryKey, modelName }),
      }
    );
  }

  return prefetch(
    keyAndQueries,
    60 * 60 // 1hour
  );
}

const ProductDetailPage = dynamic(
  () => import("../../../../../pageComponents/product/DetailPage")
);

export default ProductDetailPage;
