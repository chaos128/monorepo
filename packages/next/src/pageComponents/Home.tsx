import { Tab, TabList, Tabs } from "@nosearch/ui";
import dynamic from "next/dynamic";
import { useState } from "react";
import CategoryListWithImage from "../components/category/CategoryListWithImage";
import CurationButton from "../components/curation/curationButton";
import Encyclopedia from "../components/home/Encyclopedia";
import Exhibition from "../components/home/exhibition";
import NosearchDeal from "../components/home/NosearchDeal";
import WeeklyBest from "../components/home/WeeklyBest";
import Loading from "../components/Loading";
import NosearchPickList from "../components/nosearchPick/NosearchPickList";
import PurchaseGuideList from "../components/purchaseGuide/PurchaseGuideList";
import ReviewTemList from "../components/reviewTem/ReviewTemList";
import TimedealList from "../components/timedeal/TimedealList";
import { useBanners } from "../hooks/api/useBanners";
import { useLogin } from "../hooks/useLogin";

export type HomeParentKey =
  | "living"
  | "kitchen"
  | "season"
  | "digitalit"
  | "all";

const Banners = dynamic(() => import("../components/ui/banners"), {
  ssr: false,
  loading: () => <Loading />,
});

function Home() {
  const { logout, isLogin, accessToken } = useLogin();
  const { banners } = useBanners({
    type: "home",
  });

  const onSelectTap = (category: HomeParentKey) => {
    setCategory(category);
  };

  const [category, setCategory] = useState<HomeParentKey>("all");

  const categories: Array<{ text: string; key: HomeParentKey }> = [
    { text: "인기", key: "all" },
    { text: "생활가전", key: "living" },
    { text: "주방가전", key: "kitchen" },
    { text: "계절가전", key: "season" },
    { text: "디지털IT", key: "digitalit" },
  ];

  return (
    <div>
      <div className="flex h-[25rem] w-full items-center justify-center bg-gray-4 text-white">
        Banner
      </div>
      <Tabs uniqueKey="main-tabs" defaultIndex={0}>
        <TabList sticky tabWidth="mobile:w-[20%] mobile: ml-0 pc:w-[16rem]">
          {categories.map(({ text, key }) => {
            return (
              <Tab key={key} onTabClick={() => onSelectTap(key)}>
                {text}
              </Tab>
            );
          })}
        </TabList>

        <div className="w-full">
          <CategoryListWithImage parentKey={category} />
          <NosearchDeal />
          <TimedealList parentKey={category} />
          <div className="pc:flex pc:items-center">
            <PurchaseGuideList parentKey={category} viewType="home" />
            <CurationButton
              viewType="home"
              text="나에게 딱 맞는 가전제품을 추천해드려요!"
            />
          </div>
          <ReviewTemList parentKey={category} viewType="home" />
          <NosearchPickList parentKey={category} />
          <Exhibition parentKey={category} />
          <WeeklyBest parentKey={category} />
          <Encyclopedia parentKey={category} />
        </div>
      </Tabs>
    </div>
  );
}

export default Home;
