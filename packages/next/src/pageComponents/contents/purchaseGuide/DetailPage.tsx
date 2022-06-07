import { useResetAtom } from "jotai/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PurchaseGuideDetail, {
  sidebarIndexAtom,
} from "../../../components/contents/purchaseGuide/detail";
import { useSidebar } from "../../../shared/useSidebar";

const PurchaseGuideDetailPage = () => {
  const router = useRouter();
  const { parentCategory, category } = router.query;
  const { resetSidebarOpen } = useSidebar();
  const resetSidebarIndexAtom = useResetAtom(sidebarIndexAtom);

  useEffect(() => {
    return () => {
      resetSidebarOpen();
      resetSidebarIndexAtom();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PurchaseGuideDetail
      parentCategory={parentCategory as string}
      category={category as string}
    />
  );
};

export default PurchaseGuideDetailPage;
