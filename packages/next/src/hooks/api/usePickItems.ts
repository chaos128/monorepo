import axios from "axios";
import { ISearchDocument, ISearchResult } from "ns-ts-interfaces";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";

export const generatePickKey = (params: any) => {
  return ["getPickItems", params];
};

export const fetchPickItems = async (params: any) => {
  try {
    const { data } = await axios.get<{ data: ISearchResult }>(
      `${BASE_URL}/ns_api/v1/product/search?${getParamsString(params)}`
    );
    return data.data;
  } catch (e) {
    return null;
  }
};

const usePickItems = (props: any) => {
  const key = generatePickKey(props);

  const { data, isLoading } = useQuery(key, () => {
    return fetchPickItems(props);
  });

  const groupDataMap = useMemo(() => {
    const map = new Map<string, ISearchDocument[]>();

    if (!data) {
      return map;
    }

    data.groups.forEach((group: string) => {
      map.set(
        group,
        data.documents.filter((item) => item.group === group)
      );
    });

    return map;
  }, [data]);

  return {
    pickItemsData: data,
    pickItemsGroupData: groupDataMap,
    isLoading: isLoading,
  };
};

export default usePickItems;
