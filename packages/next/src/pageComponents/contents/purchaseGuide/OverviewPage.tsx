import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@nosearch/ui";
import { useRouter } from "next/router";
import PurchaseGuideOverview from "../../../components/contents/purchaseGuide/overview";

const PurchaseGuideOverviewPage = () => {
  const router = useRouter();
  const { parentCategory, category } = router.query;

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

  return (
    <div>
      <Tabs uniqueKey="pick-tabs" defaultIndex={index}>
        <TabList sticky tabWidth="w-[6.4rem] pc:w-[13.6rem]">
          <Tab onTabClick={onSelectTap("pick")}>노써치픽</Tab>
          <Tab onTabClick={onSelectTap("theme")}>테마추천</Tab>
          <Tab onTabClick={onSelectTap("curation")}>큐레이션</Tab>
          <Tab onTabClick={onSelectTap("self")}>탐색</Tab>
          <Tab onTabClick={onSelectTap("guide")}>구매가이드</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>{/* 노써치픽 */}</TabPanel>
          <TabPanel>{/* 테마추천 */}</TabPanel>
          <TabPanel>{/* 큐레이션 */}</TabPanel>
          <TabPanel>{/* 탐색 */}</TabPanel>
          <TabPanel>
            <Main parentCategory={parentCategory} category={category} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default PurchaseGuideOverviewPage;

const Main = ({
  parentCategory,
  category,
}: {
  parentCategory: any;
  category: any;
}) => {
  return (
    <PurchaseGuideOverview
      parentCategory={parentCategory}
      category={category}
    />
  );
};
