import { useQuery } from 'react-query';
import { IGodoCategory } from 'ns-ts-interfaces';
import { useMemo } from 'react';
import axios from 'axios';

interface IGodoCategoryMap {
  [parentCateCd: string]: {
    cateNm: string;
    cateCd: string;
    child: IGodoCategory[];
  };
}

export async function getStoreCategoryList(isTimeDeal?: boolean) {
  const { data } = await axios.get(
    `/store/getCategories${isTimeDeal ? `?isTimeDeal=true` : ''}`,
  );
  return data;
}

export const useStoreCategoryList = (params?: {
  isTimeDeal?: boolean;
  initialData?: IGodoCategory[];
}) => {
  const { data, isLoading, isSuccess } = useQuery(
    params && params?.isTimeDeal !== undefined
      ? ['storeCategoryList', params?.isTimeDeal]
      : ['storeCategoryList', 'general'],
    () => {
      return getStoreCategoryList(params?.isTimeDeal);
    },
    {
      initialData: params?.initialData,
      staleTime: params?.initialData && 10000,
    },
  );
  const categoryList = isSuccess && data && data.filter ? (data as IGodoCategory[]) : [];

  const categoryMap = useMemo(() => {
    const result: IGodoCategoryMap = {};
    const parentArray: IGodoCategory[] = categoryList.filter(
      (row) => row.cateCd.length === 3,
    );
    parentArray.map((parent) => {
      result[parent.cateCd] = {
        cateCd: parent.cateCd,
        cateNm: parent.cateNm,
        child: [],
      };
    });
    const childArray: IGodoCategory[] = categoryList.filter(
      (row) => row.cateCd.length === 6,
    );
    childArray.map((child) => {
      const parentKey: string = child.cateCd.slice(0, 3);
      result[parentKey].child.push(child);
    });
    Object.keys(result).map((key) => {
      const parent = result[key];
      let sorted = parent.child.sort((a, b) => {
        if (b.cateNm > a.cateNm) return -1;
        if (a.cateNm > b.cateNm) return 1;
        return 0;
      });
      const etc = sorted.find((category) => category.cateNm === '기타');
      if (etc) {
        sorted = sorted.filter((v) => v.cateNm !== '기타');
        sorted.push(etc);
      }
      result[key].child = sorted;
    });

    return result;
  }, [categoryList]);
  return {
    categoryMap: categoryMap,
    isLoading,
    isSuccess,
  };
};
