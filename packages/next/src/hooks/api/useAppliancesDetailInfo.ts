import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../shared/variables";

export interface IEncyclopediaDetail {
  id: number;
  thumbnail: string;
  contentType: "normal" | "video";
  videoUrl?: string;
  title: string;
  intro?: string;
  favoriteCount: number;
  likeStatus: boolean;
  contentText: string;
  category: {
    id?: number;
    name: string;
    key: string;
  };
  viewCount: number;
  shareCount: number;
  contents?: IContentPageInfo[];
  contentsSort?: string[];
  viewMode: string;
}

export interface IContentPageInfo {
  thumbnail: string;
  title: string;
  subTitle: string;
  subject: string;
  contents: any;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export interface IContentsDetailParam<T> {
  id: string | null;
  initialData?: CONTENT_DETAIL<T>;
}

export type CONTENT_DETAIL<T> = T extends IEncyclopediaDetail ? T : never;

export const generateAppliancesDetailKey = (param: any) => {
  return ["getAppliancesDetail", param];
};

export const fetchAppliancesDetail = async <T>(id: string) => {
  const { data } = await axios.get<CONTENT_DETAIL<T>>(
    `${BASE_URL}/ns_api/v1/appliancesInfo/${id}`
  );
  return data;
};

export default function useAppliancesDetailInfo<T>(
  param: IContentsDetailParam<T>
) {
  const key = generateAppliancesDetailKey(param);

  const { id, initialData } = param;
  const { data, isLoading, error, isSuccess, isError, isFetching } = useQuery(
    key,
    () => {
      if (!id) {
        return null;
      } else {
        return fetchAppliancesDetail<T>(id as string);
      }
    },

    {
      initialData: initialData,
      staleTime: initialData ? 10000 : undefined,
    }
  );

  return {
    data: data && isSuccess ? data : null,
    isLoading: isLoading || isFetching,
    error,
    isError,
  };
}
