import { useQuery } from 'react-query';
import axios from 'axios';

import {
  IGodoBrand,
  IGodoCategory,
  IGoods,
  IStoreGoods,
} from 'ns-ts-interfaces';
import { useMemo } from 'react';

export async function getCurationBrandList(productCategoryKey: string) {
  const { data } = await axios.get(
    `/api/getBrandList?productCategoryKey=${productCategoryKey}`,
  );
  return data;
}
export const useCurationBrandList = (props: {
  productCategoryKey?: string;
}) => {
  const { data, isLoading, isSuccess } = useQuery(
    ['curationBrandList', props.productCategoryKey],
    () => {
      if (!props.productCategoryKey) return null;
      return getCurationBrandList(props.productCategoryKey);
    },
  );

  const brandList =
    isSuccess && data
      ? (data.data.map((row: string) => {
          return {
            brandCd: row,
            brandNm: row,
          } as IGodoBrand;
        }) as IGodoBrand[])
      : [];
  const sortedBrandList = useMemo(() => {
    let sorted = brandList.sort((a, b) => {
      if (b.brandNm > a.brandNm) return -1;
      if (a.brandNm > b.brandNm) return 1;
      return 0;
    });
    const etc = sorted.find((brand) => brand.brandNm === '기타');
    if (etc) {
      sorted = sorted.filter((v) => v.brandNm !== '기타');
      sorted.push(etc);
    }
    return sorted;
  }, [brandList]);
  const brandMap = useMemo(() => {
    const result: { [brandCd: string]: IGodoBrand } = {};
    brandList.map((row) => {
      result[row.brandCd] = row;
    });
    return result;
  }, [brandList]);

  return {
    curationBrandList: sortedBrandList,
    brandMap: brandMap,
    isLoading,
    isSuccess,
  };
};
