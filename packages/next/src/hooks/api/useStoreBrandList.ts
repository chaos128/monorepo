import axios from "axios";
import { IGodoBrand } from "ns-ts-interfaces";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../../shared/variables";

export const generateStoreBrandListKey = (props: any) => {
  return ["getStoreBrandList", props];
};

export const fetchStoreBrandList = async (cateCd?: string) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/store/getBrands?${cateCd ? `cateCd=${cateCd}` : ""}`
  );
  console.log("[fetch] Store Brand List");
  return data;
};

export const useStoreBrandList = (props: { cateCd?: string }) => {
  const key = generateStoreBrandListKey(props);

  const { data, isLoading, isSuccess } = useQuery(key, () => {
    return fetchStoreBrandList(props.cateCd);
  });

  const brandList =
    isSuccess && data && data.sort ? (data as IGodoBrand[]) : [];
  const sortedBrandList = useMemo(() => {
    let sorted = brandList.sort((a, b) => {
      if (b.brandNm > a.brandNm) return -1;
      if (a.brandNm > b.brandNm) return 1;
      return 0;
    });
    const etc = sorted.find((brand) => brand.brandNm === "기타");
    if (etc) {
      sorted = sorted.filter((v) => v.brandNm !== "기타");
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
    brandList: sortedBrandList,
    brandMap: brandMap,
    isLoading,
    isSuccess,
  };
};
