import { useRouter } from "next/router";
import { useEffect } from "react";
import EncyclopediaDetail from "../../../components/contents/encyclopedia/detail";
import { useSidebar } from "../../../shared/useSidebar";

const EncyclopediaDetailPage = () => {
  const router = useRouter();
  const { parentCategory, category, index } = router.query;
  const { resetSidebarOpen } = useSidebar();

  useEffect(() => {
    return () => {
      resetSidebarOpen();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <EncyclopediaDetail
        parentCategory={parentCategory as string}
        productCategory={category as string}
        index={index as string}
      />
    </>
  );
};

export default EncyclopediaDetailPage;
