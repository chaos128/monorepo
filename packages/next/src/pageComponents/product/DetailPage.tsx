import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAiReviewHooks } from "../../components/aiReview/aiReviewHooks";
import { useProductCompareError } from "../../components/product/contentsComponents/productOverview/productOverviewHooks";
import ProductDetailContents from "../../components/product/productDetailContents";
import { useResetShareAtom } from "../../hooks/api/useShare";
import { useSidebar } from "../../shared/useSidebar";

const DetailPage = () => {
  const router = useRouter();
  const { parentCategory, category, modelName } = router.query;

  const { onResetReviewAtoms } = useAiReviewHooks();
  const { resetProductCompareErrorAtom } = useProductCompareError();
  const { onResetShareAtoms } = useResetShareAtom();
  const { onResetReviewFilterTypeAtoms } = useAiReviewHooks();
  const { resetSidebarOpen } = useSidebar();

  useEffect(() => {
    return () => {
      onResetReviewAtoms();
      resetProductCompareErrorAtom();
      onResetShareAtoms();
      onResetReviewFilterTypeAtoms();
      resetSidebarOpen();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ProductDetailContents
        parentCategoryKey={parentCategory as string}
        productCategoryKey={category as string}
        modelName={modelName as string}
      />
    </>
  );
};

export default DetailPage;
