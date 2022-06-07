import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@nosearch/ui";
import { useRouter } from "next/router";
import MobileItemList from "../../components/itemList/mobileItemList";
import PcItemList from "../../components/itemList/pcItemList";
import UpdateNotice from "../../components/itemList/updateNotice";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../Home";

const ItemListPage = () => {
  const { isMobile } = useMobileDetect();
  const router = useRouter();

  const onSelectTap = (category: string) => {
    return () => {
      router.push(`?selected-tab=${category}`);
    };
  };

  const parentKey: HomeParentKey = router.query[
    "selected-tab"
  ] as HomeParentKey;

  const index =
    parentKey === "living"
      ? 0
      : parentKey === "kitchen"
      ? 1
      : parentKey === "season"
      ? 2
      : parentKey === "digitalit"
      ? 3
      : 0;

  return (
    <div>
      {isMobile ? (
        <div>
          <Tabs uniqueKey="category-tabs" defaultIndex={index}>
            <TabList sticky tabWidth="w-[6.3rem]">
              <Tab>
                <div onClick={onSelectTap("living")}>생활가전</div>
              </Tab>
              <Tab>
                <div onClick={onSelectTap("kitchen")}>주방가전</div>
              </Tab>
              <Tab>
                <div onClick={onSelectTap("season")}>계절가전</div>
              </Tab>
              <Tab>
                <div onClick={onSelectTap("digitalit")}>디지털IT</div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <MobileItemList parentKey={parentKey} />
              </TabPanel>
              <TabPanel>
                <MobileItemList parentKey={parentKey} />
              </TabPanel>
              <TabPanel>
                <MobileItemList parentKey={parentKey} />
              </TabPanel>
              <TabPanel>
                <MobileItemList parentKey={parentKey} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <UpdateNotice />
        </div>
      ) : (
        <div className="m-[3rem]">
          <PcItemList viewType="category" />
          <UpdateNotice />
        </div>
      )}
    </div>
  );
};

export default ItemListPage;
