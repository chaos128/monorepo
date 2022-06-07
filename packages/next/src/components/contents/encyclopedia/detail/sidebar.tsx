import { ContentSidebar as NrcEncyclopediaSidebar } from "@nosearch/ui";
import { IContentSidebarData } from "@nosearch/ui/src/components/ContentSidebar/ContentSidebar.types";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
import { IEncyclopediaDetail } from "../../../../hooks/api/useAppliancesDetailInfo";
import useCommentCount from "../../../../hooks/api/useCommentCount";
import { sidebarOpenAtom } from "../../../../shared/useSidebar";
import { useContentsAction } from "../../useContentsAction";

interface IEncyclopediaSidebar {
  data: IEncyclopediaDetail;
  parentCategory: string;
  productCategory: string;
  productCategoryKr: string;
}

const EncyclopediaSidebar = ({
  data,
  parentCategory,
  productCategory,
  productCategoryKr,
}: IEncyclopediaSidebar) => {
  const router = useRouter();
  const sidebarOpen = useAtomValue(sidebarOpenAtom);

  const { data: commentCount } = useCommentCount({
    key: `appliancesInfo|${data.id}`,
  });

  const { onLikeItem, onShareItem, onClickComment } = useContentsAction({
    contentId: data.id,
    contentType: "appliancesInfo",
  });

  const sidebarData: IContentSidebarData = {
    category: productCategoryKr,
    likeCount: data.favoriteCount,
    likeStatus: data.likeStatus,
    ShareButton: onShareItem,
    BookmarkButton: onLikeItem,
    commentCount: commentCount?.commentsCount,
    CommentButton: function comment() {
      onClickComment();
    },
    RecommendProductsButton: function recommend() {
      router.push(`/recommendation/pick/${parentCategory}/${productCategory}`);
    },
  };

  if (!sidebarOpen) {
    return null;
  }

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
      <NrcEncyclopediaSidebar data={sidebarData} type={"encyclopedia"} />
    </motion.div>
  );
};

export default EncyclopediaSidebar;
