import { ContentSidebar as NrcPurchaseGuideSidebar } from "@nosearch/ui";
import { IContentSidebarData } from "@nosearch/ui/src/components/ContentSidebar/ContentSidebar.types";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
import { sidebarIndexAtom } from ".";
import { IPurchaseGuideDetail } from "../../../../hooks/api/usePurchaseGuideDetail";
import { sidebarOpenAtom } from "../../../../shared/useSidebar";
import { useContentsAction } from "../../useContentsAction";

interface IPurchaseGuideSidebar {
  data: IPurchaseGuideDetail;
  commentCount: number;
  parentCategory: string;
  productCategory: string;
  productCategoryKr: string;
}

const PurchaseGuideSidebar = (props: IPurchaseGuideSidebar) => {
  const router = useRouter();
  const sidebarOpen = useAtomValue(sidebarOpenAtom);
  const {
    data,
    commentCount,
    parentCategory,
    productCategory,
    productCategoryKr,
  } = props;

  const { onLikeItem, onShareItem, onClickComment } = useContentsAction({
    contentId: data.id,
    contentType: "purchaseGuide",
  });

  const [sidebarIndex, setSidebarIndex] = useAtom(sidebarIndexAtom);
  const indexData = data.purchaseGuideThemes
    ? data.purchaseGuideThemes.map((data, index) => {
        return {
          title: data.theme,
          desc: "",
          onClickIndex: function clickIndex() {
            setSidebarIndex(index);
          },
        };
      })
    : undefined;

  const sidebarData: IContentSidebarData = {
    category: productCategoryKr,
    likeCount: data.favoriteCount,
    likeStatus: data.likeStatus ?? false,
    ShareButton: onShareItem,
    BookmarkButton: onLikeItem,
    commentCount,
    CommentButton: function comment() {
      onClickComment();
    },
    RecommendProductsButton: function recommend() {
      router.push(`/recommendation/pick/${parentCategory}/${productCategory}`);
    },
    indexData,
  };

  if (!sidebarOpen) return null;

  return (
    <motion.div
      className="fixed top-1/2 z-[200] -translate-y-1/2"
      style={{ left: "calc(50% + 48rem)" }}
      transition={{
        type: "ease",
        default: { duration: 0.5 },
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <NrcPurchaseGuideSidebar data={sidebarData} type={"purchaseGuide"} />
    </motion.div>
  );
};

export default PurchaseGuideSidebar;
