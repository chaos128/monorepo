import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import useCustomInfiniteQuery from "../useCustomInfiniteQuery";

export interface IAppliancesInfoParams {
  take?: number;
  page?: number;
  categoryId?: number;
  title?: string;
  sort?: "popular" | null;
  contentType?: "normal" | "video";
  productCategoryKeys?: string | null;
  relationViewType?: string | null;
  relationCategoryKey?: string | null;
  applianceInfoId?: string | null;
}

export interface IAppliancesInfoData {
  id: number;
  thumbnail: string;
  contentType: "video" | "normal";
  videoUrl: string | null;
  title: string;
  viewCount: string;
  favoriteCount: number;
  shareCount: number;
  category: {
    id: number;
    key: string;
    name: string;
    parentCategoryKey: string;
  };
  contents?: Array<{ thumbnail: string }>;
}

export const generateAppliancesInfoKey = (key: any, value: any) => {
  return ["useAppliancesInfo", key, value];
};

export async function getAppliancesInfo(value?: IAppliancesInfoParams) {
  if (value) {
    const params = getParamsString(value);
    const { data } = await axios(`appliancesInfo?${params}`);
    return data;
  }
  const { data } = await axios(`appliancesInfo`);
  return data;
}

export function useAppliancesInfo(
  type: string,
  value?: IAppliancesInfoParams,
  key?: string,
  initialData?: IAppliancesInfoData[]
) {
  const queryKey = generateAppliancesInfoKey(key, value);
  const { data, isLoading, error, isSuccess } = useQuery(
    queryKey,
    () => {
      return getAppliancesInfo(value);
    },
    {
      initialData,
      staleTime: initialData && 10000,
    }
  );

  const encyclopediaList: IAppliancesInfoData[] | null = useMemo(() => {
    if (!data?.list || data.list.length < 1) {
      return null;
    }
    return data.list.map((item: any) => {
      const thumbnail =
        Array.isArray(item.contents) && item.contents.length > 0
          ? item.contents[0].thumbnail
          : null;
      return {
        ...item,
        thumbnail: thumbnail ?? item.thumbnail ?? Image,
      };
    });
  }, [data]);

  return {
    encyclopediaList,
    isSuccess,
    isLoading,
  };
}

export const useInfiniteAppliancesInfo = (params: IAppliancesInfoParams) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useCustomInfiniteQuery<IAppliancesInfoData>({
    queryKeyString: "useInfiniteAppliancesInfo",
    apiURL: "/appliancesInfo",
    params: { take: 16, ...params },
  });

  const encyclopediaList: IAppliancesInfoData[] | null = useMemo(() => {
    if (!data) {
      return null;
    }

    const returnData: IAppliancesInfoData[] = [];
    data.pages.map((page) => {
      page.data.list.map((item) => {
        const thumbnail =
          Array.isArray(item.contents) && item.contents.length > 0
            ? item.contents[0]?.thumbnail
            : null;
        const currentData: IAppliancesInfoData = {
          ...item,
          thumbnail: thumbnail ?? item.thumbnail ?? Image,
        };
        returnData.push(currentData);
      });
    });

    return returnData;
  }, [data]);

  return {
    encyclopediaList,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};
