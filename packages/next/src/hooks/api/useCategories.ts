import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../../shared/variables";

const categoriesQueryKey = ["categories"];

const fetchCategories = async () => {
  const res = await axios.get<ICategory[]>("/category");
  console.log("[fetch] Categories");
  const data = res.data.map((parent) => {
    parent.children = parent.children.map((child) => {
      child.config = null;
      return child;
    });
    return parent;
  });
  return data;
};

export const generateRankCategoriesKey = (props: any) => {
  return ["getRankCategories", props];
};

interface IRankCategory {
  category: string;
  id: string;
  count: number;
}
interface IRankCategoryData {
  rank: IRankCategory[];
}
export const fetchRankCategories = async () => {
  const { data } = await axios.get<IRankCategoryData>(
    `${BASE_URL}/ns_api/v1/rank?category=all&type=category`
  );
  return data;
};

const useCategories = () => {
  const { data, isLoading, isSuccess } = useQuery(
    categoriesQueryKey,
    fetchCategories
  );

  const key = generateRankCategoriesKey("rankCategories");
  const { data: rankData } = useQuery(key, () => {
    return fetchRankCategories();
  });

  const categoryMap = useMemo(() => {
    const map: { [key: string]: ICategory } = {};
    data?.map((mainCategory) => {
      if (mainCategory.children) {
        mainCategory.children.map((item) => {
          map[item.key] = item;
        });
      }
    });
    return map;
  }, [data]);

  const homeCategoryMap = useMemo(() => {
    const map: { [key: string]: ICategory[] } = {};
    data?.filter((mainCategory) => {
      map[mainCategory.key] = mainCategory.children;
    });
    let _rankDataList = <ICategory[]>[];
    rankData?.rank.map((data) => {
      if (categoryMap[data.id]) {
        _rankDataList.push({
          ...categoryMap[data.id],
          parentKey: data.category,
        });
      }
    });
    map["recommend"] = _rankDataList;
    return map;
  }, [data, rankData]);

  const homeSortCategoryMap = useMemo(() => {
    const map: { [key: string]: ICategory[] } = {};
    data?.filter((mainCategory) => {
      const sortedCategory = [...mainCategory.children].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const newSortedCategory = sortedCategory
        .filter((x) => x.isNew === true)
        .concat(sortedCategory.filter((x) => !x.isNew));

      map[mainCategory.key] = newSortedCategory;
    });

    return map;
  }, [data]);

  const mainCategoryHintMap = useMemo(() => {
    const map: { [key: string]: string } = {};
    data?.map((mainCategory) => {
      if (mainCategory.children) {
        mainCategory.children.map((item) => {
          map[item.key] = mainCategory.key;
        });
      }
    });

    return map;
  }, [data]);

  const parentCategory = useMemo(() => {
    const tempParentCategories: Partial<ICategory>[] = [];
    data?.map((value) => {
      const curCategory: ICategory = {
        ...value,
      };

      tempParentCategories.push(curCategory);
    });

    tempParentCategories.unshift({
      key: "recommend",
      name: "인기",
      godoCategoryId: "",
    });

    return tempParentCategories;
  }, [data]);

  return {
    parentCategory,
    mainCategoryHintMap,
    homeCategoryMap,
    homeSortCategoryMap,
    categoryMap,
    categories: data ? data : [],
    rankCategories: rankData ? rankData.rank : [],
    isLoading,
    isSuccess,
  };
};

export interface ICategory {
  id: number;
  name: string;
  key: string;
  isUse: boolean;
  createdAt: string;
  updatedAt: string;
  isPickActivate: boolean;
  isRecommandActive: boolean; // api 오타
  isFilterActivate: boolean;
  legacyCategoryId: number | null;
  godoCategoryId: string | null;
  config: any; // 크롤링 설정
  isNew: boolean;
  isComingSoon: boolean;
  startUseAt: string | null;
  children: ICategory[];
  parentKey?: string;
}

export { categoriesQueryKey, fetchCategories, useCategories };
