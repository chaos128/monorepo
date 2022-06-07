import { Heading, Text } from "@nosearch/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import CategoryModal from "../../../components/contents/category/categoryModal";
import PurchaseGuideContents from "../../../components/contents/purchaseGuide";

const PurchaseGuideContentsPage = () => {
  const router = useRouter();
  const selectedCategoryTab = router.query["selected-tab"] ?? "all";
  const selectedCategoryItem =
    router.query["selected-item"] ?? selectedCategoryTab;

  return (
    <div className="pb-[6rem]">
      <div className="mx-auto flex items-center justify-center pc:w-[80rem] pc:justify-between mobile:space-x-[1rem]">
        <Link href="/contents/guide?selected-tab=all" passHref>
          <div className="cursor-pointer border-b-[2px] border-blue-7 px-[4.875rem] py-[1.2rem] text-center pc:px-[16rem]">
            <Heading level={6} className="text-blue-7">
              구매가이드
            </Heading>
          </div>
        </Link>
        <Link href="/contents/encyclopedia?selected-tab=all" passHref>
          <div className="cursor-pointer px-[4.875rem] py-[1.2rem] text-center pc:px-[16rem]">
            <Text type="B2" className="text-gray-10">
              가전백과
            </Text>
          </div>
        </Link>
      </div>
      <PurchaseGuideContents
        selectedCategoryTab={selectedCategoryTab as string}
        selectedCategoryItem={selectedCategoryItem as string}
      />
      <CategoryModal type="purchaseGuide" />
    </div>
  );
};

export default PurchaseGuideContentsPage;
