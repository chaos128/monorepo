import { Text } from "@nosearch/ui";
import { motion } from "framer-motion";
import throttle from "lodash/throttle";
import { useEffect, useMemo, useState } from "react";
import Sticky from "react-stickynode";

const ProductTabs = ({
  defaultTabs,
  disabledTabSet,
  tabsScroll,
}: {
  defaultTabs: { key: string; value: string }[];
  disabledTabSet: Set<string>;
  tabsScroll: {
    purchaseTabScroll: number;
    nosearchReviewTabScroll: number;
    nosearchSpecReviewTabScroll: number;
    productDescTabScroll: number;
    productReviewTabScroll: number;
    aiReviewTabScroll: number;
    recommendationTabScroll: number;
  };
}) => {
  const availableTabs: {
    key: string;
    value: string;
  }[] = useMemo(() => {
    return defaultTabs.filter((tabInfo) => !disabledTabSet.has(tabInfo.key));
  }, [disabledTabSet, defaultTabs]);

  const [selectedTab, setSelectedTab] = useState<string>(availableTabs[0].key);

  // 탭 선택 관리
  useEffect(() => {
    const selectedIndex = availableTabs.findIndex(
      (tab) => tab.key === selectedTab
    );

    const elementsOffset = availableTabs.slice(1).map((titleData) => {
      return document.getElementById(String(titleData.key))?.offsetTop;
    });

    const selectTabIndex = throttle(() => {
      const scrollHeight = window.scrollY;

      // 맨 뒷쪽에 있는 경우
      const lastIndex = elementsOffset.length - 1;
      const lastItemOffsetTop = elementsOffset[lastIndex] ?? 0;
      if (lastItemOffsetTop <= scrollHeight) {
        if (selectedIndex === lastIndex + 1) return;
        setSelectedTab(availableTabs[lastIndex + 1].key);
      }

      const nextIndex = elementsOffset.findIndex(
        (offsetTop) => scrollHeight + 45 < (offsetTop ?? 0)
      );
      if (nextIndex >= 0) {
        setSelectedTab(availableTabs[nextIndex].key);
      }
    }, 300);

    window?.addEventListener("scroll", selectTabIndex);
    return () => {
      window?.removeEventListener("scroll", selectTabIndex);
    };
  }, [selectedTab, availableTabs]);

  const onClick = (tabKey: string) => {
    setSelectedTab(tabKey);
    let scroll;
    if (tabKey === "purchase-info") {
      scroll = tabsScroll.purchaseTabScroll - 20;
    } else if (tabKey === "nosearch-review") {
      scroll = tabsScroll.nosearchReviewTabScroll;
    } else if (tabKey === "spec-analysis") {
      scroll = tabsScroll.nosearchSpecReviewTabScroll;
    } else if (tabKey === "product-info") {
      scroll = tabsScroll.productDescTabScroll;
    } else if (tabKey === "user-review") {
      scroll = tabsScroll.productReviewTabScroll;
    } else if (tabKey === "ai-review") {
      scroll = tabsScroll.aiReviewTabScroll;
    } else if (tabKey === "recommend") {
      scroll = tabsScroll.recommendationTabScroll;
    }
    window.scrollTo({ top: scroll, behavior: "smooth" });
  };

  const tabVariants = {
    hidden: { width: 0, opacity: 0 },
    show: {
      opacity: 1,
      width: "100%",
    },
  };

  return (
    <Sticky enabled innerZ={100}>
      <div className="w-full bg-white">
        <div className="scrollbar-hide flex space-x-[0.5rem] overflow-x-scroll border-b-[1px] border-gray-3 px-[2rem] pt-[1rem] pc:mx-auto pc:w-[80rem]">
          {availableTabs.map((tab) => {
            return (
              <div
                key={tab.key}
                onClick={() => {
                  onClick(tab.key);
                }}
                className="cursor-pointer px-[0.6rem] pt-[1.2rem]"
              >
                {tab.key === selectedTab ? (
                  <Text type="B2" className="whitespace-nowrap text-blue-7">
                    {tab.value}
                  </Text>
                ) : (
                  <Text type="B6" className="whitespace-nowrap text-gray-10">
                    {tab.value}
                  </Text>
                )}
                <motion.div
                  transition={{
                    type: "ease",
                    default: { duration: 0.5 },
                  }}
                  className={`${
                    tab.key === selectedTab && "mt-[1.2rem] h-[3px] bg-blue-7"
                  }`}
                  initial="hidden"
                  animate={`${tab.key === selectedTab && "show"}`}
                  variants={tabVariants}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Sticky>
  );
};

export default ProductTabs;
