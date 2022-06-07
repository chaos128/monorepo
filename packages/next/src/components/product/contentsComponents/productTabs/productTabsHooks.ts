import { useMemo, useState } from "react";

const useProductTabs = () => {
  const tabInfos: {
    key: string;
    value: string;
  }[] = useMemo(() => {
    return [
      {
        key: "purchase-info",
        value: "구매정보",
      },
      {
        key: "nosearch-review",
        value: "노써치 리뷰",
      },
      {
        key: "spec-analysis",
        value: "스펙분석",
      },
      {
        key: "product-info",
        value: "상품정보",
      },
      {
        key: "user-review",
        value: "구매후기",
      },
      {
        key: "ai-review",
        value: "리뷰분석",
      },
      {
        key: "recommend",
        value: "추천",
      },
    ];
  }, []);

  const [disabledTabSet, setDisabledTabSet] = useState<Set<string>>(
    new Set([
      tabInfos[1].key,
      tabInfos[2].key,
      tabInfos[3].key,
      tabInfos[4].key,
      tabInfos[5].key,
      tabInfos[6].key,
    ])
  );

  return {
    tabInfos,
    disabledTabSet,
    setDisabledTabSet,
  };
};
export default useProductTabs;
