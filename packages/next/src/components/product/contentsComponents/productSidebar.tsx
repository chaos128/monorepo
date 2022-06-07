import { ProductSidebar as ProductSidebarComponent } from "@nosearch/ui";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
// import { IProductSidebarData } from "@nosearch/ui/lib/components/ProductSidebar/ProductSidebar.types";
import { ISearchDocument } from "ns-ts-interfaces";
import { sidebarOpenAtom } from "../../../shared/useSidebar";
import {
  useProductAction,
  useProductCompareError,
} from "./productOverview/productOverviewHooks";
import { IProductDetailProps } from "./type";

interface IProductSidebarProps extends IProductDetailProps {
  modelReviewData: ISearchDocument;
  productOverviewData: {
    brand: string;
    name: string;
    modelName: string;
    pickType: "none" | "best" | "plus" | "premium" | "cost_effective";
    imageUrl: string;
    likeCount: number | undefined;
    productId: number | undefined;
  };
}

const ProductSidebar = ({
  modelReviewData,
  productOverviewData,
  parentCategoryKey: storeCategoryKey,
  productCategoryKey,
  modelName,
}: IProductSidebarProps) => {
  const router = useRouter();
  const sidebarOpen = useAtomValue(sidebarOpenAtom);

  const { onCompareError } = useProductCompareError();
  const { onLikeItem, onShareItem, onCompareItem } = useProductAction({
    contentId: productOverviewData?.productId ?? 0,
    contentType: "product",
    productCategoryKey,
    productData: productOverviewData,
    onCompareError,
  });

  const sidebarData: any /* IProductSidebarData */ = {
    goodsName: modelReviewData.name,
    modelName: modelReviewData.modelName,
    brandName: modelReviewData?.brand,
    image: modelReviewData.imageUrl,
    pickType: modelReviewData.pickType,
    likeCount: modelReviewData.likeCount,
    likeStatus: modelReviewData.likeStatus,
    compareStatus: modelReviewData.compareStatus,
    BookmarkButton: onLikeItem,
    CompareButton: onCompareItem,
    ShareButton: onShareItem,
    PayButton: function pay() {
      router.replace(
        `/product/${storeCategoryKey}/${productCategoryKey}/detail/${modelName}?purchaseFlag=true`,
        undefined,
        {
          scroll: false,
          shallow: true,
        }
      );
    },
    SpecButton: function spec() {
      router.push(
        `/product/${storeCategoryKey}/${productCategoryKey}/spec/${modelName}`
      );
    },
  };

  if (!sidebarOpen) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-1/2 z-[200] -translate-y-1/2"
      style={{ left: "calc(50% + 50rem)" }}
      transition={{
        type: "ease",
        default: { duration: 0.5 },
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ProductSidebarComponent data={sidebarData} />
    </motion.div>
  );
};

export default ProductSidebar;
