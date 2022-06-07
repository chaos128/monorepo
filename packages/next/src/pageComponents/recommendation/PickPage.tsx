import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from "@nosearch/ui";
import { useRouter } from "next/router";
import CurationButton from "../../components/curation/curationButton";
import Exhibition from "../../components/pick/exhibition";
import PurchaseGuide from "../../components/pick/purchaseGuide";
import ReviewTem from "../../components/pick/reviewTem";
import PickTimedeal from "../../components/pick/timedeal";
import PickItems from "../../components/pickItems";
import { useCategories } from "../../hooks/api/useCategories";

const PickPage = () => {
  const router = useRouter();
  const { parentCategory, category, groupType } = router.query;
  const { categoryMap } = useCategories();

  const onSelectTap = (
    type: "pick" | "curation" | "guide" | "theme" | "self"
  ) => {
    return () => {
      if (type === "pick")
        return router.push(
          `/recommendation/pick/${parentCategory}/${category}`
        );
      else if (type === "curation")
        return router.push(
          `/recommendation/curation/${parentCategory}/${category}`
        );
      else if (type === "theme")
        return router.push(
          `/recommendation/theme/${parentCategory}/${category}`
        );
      else if (type === "self")
        return router.push(
          `/recommendation/self/${parentCategory}/${category}`
        );
      else if (type === "guide")
        return router.push(
          `/contents/guide/overview/${parentCategory}/${category}`
        );
    };
  };

  const index =
    router.pathname.indexOf("pick") > 0
      ? 0
      : router.pathname.indexOf("theme") > 0
      ? 1
      : router.pathname.indexOf("curation") > 0
      ? 2
      : router.pathname.indexOf("self") > 0
      ? 3
      : 4;

  if (!categoryMap || !category) return null;

  return (
    <div className="pb-[6rem]">
      {categoryMap[category as string] && (
        <div className="hidden bg-gray-1 py-[3rem] pc:block">
          <Heading
            level={2}
            className="hidden text-center text-gray-10 pc:block"
          >
            {categoryMap[category as string].name}
          </Heading>
        </div>
      )}
      <Tabs uniqueKey="pick-tabs" defaultIndex={index}>
        <TabList sticky tabWidth="w-[6.4rem] pc:w-[13.6rem]">
          <Tab onTabClick={onSelectTap("pick")}>노써치픽</Tab>
          <Tab onTabClick={onSelectTap("theme")}>테마추천</Tab>
          <Tab onTabClick={onSelectTap("curation")}>큐레이션</Tab>
          <Tab onTabClick={onSelectTap("self")}>탐색</Tab>
          <Tab onTabClick={onSelectTap("guide")}>구매가이드</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Main
              parentCategory={parentCategory}
              category={category}
              groupType={groupType}
            />
          </TabPanel>
          <TabPanel>{/* 테마추천 */}</TabPanel>
          <TabPanel>{/* 큐레이션 */}</TabPanel>
          <TabPanel>{/* 탐색 */}</TabPanel>
          <TabPanel>{/* 구매가이드 */}</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default PickPage;

const Main = ({
  parentCategory,
  category,
  groupType,
}: {
  parentCategory: any;
  category: any;
  groupType: any;
}) => {
  const { categoryMap } = useCategories();

  return (
    <div>
      <ReviewTem parentKey={parentCategory} productCategoryKey={category} />
      <PickItems
        parentKey={parentCategory}
        productCategoryKey={category as string}
        groupType={groupType as string}
      />
      <CurationButton
        viewType="pick"
        text="마음에 드는 상품을 찾지 못했나요? 🤔"
      />
      <PurchaseGuide parentKey={category} productCategoryKey={category} />
      <PickTimedeal
        size={6}
        relationCateCd={categoryMap[category]?.godoCategoryId || undefined}
        relationViewType="productDetail"
      />
      <Exhibition parentKey={parentCategory} />
    </div>
  );
};
