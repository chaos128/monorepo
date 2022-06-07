import axios from "axios";
import { useQuery } from "react-query";
import {
  IPickVideosDataStructure,
  IPickVideosGetParams,
  VideoPostType,
} from "../../components/product/contentsComponents/recommendVideos/types";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";
import { IAppliancesInfoData } from "./useAppliancesInfo";

interface IContentAdminPick {
  status?: string;
  model?: string;
  group?: string;
  contentId?: number;
  contentType?: string;
  order?: number;
  categoryKey: string;
  postType: VideoPostType;
  videoUrl: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  title?: string;
  description?: string;
  content?: IAppliancesInfoData;
}

export type ContentAdminPicksApiReturnType =
  | IContentAdminPick
  | IContentAdminPick[];

export const generatePickVideoKey = (params: any) => {
  return ["getPickVideos", params];
};

export const fetchPickVideosByProductKey = async (params: {
  categoryKey: string;
  group?: string;
  status?: string;
}) => {
  const { data } = await axios.get<ContentAdminPicksApiReturnType>(
    `${BASE_URL}/ns_api/v1/contentsAdminPicks/findByCategory?${getParamsString(
      params
    )}`
  );
  return data;
};

export const fetchPickVideos = async (params: {
  categoryKey: string;
  group?: string;
  status?: string;
}) => {
  const { data } = await axios.get<ContentAdminPicksApiReturnType>(
    `${BASE_URL}/ns_api/v1/contentsAdminPicks?${getParamsString(params)}`
  );
  return data;
};

interface IUseGetPickVideosParam extends IPickVideosGetParams {
  findWithKey?: boolean;
}
const usePickVideos = (params: IUseGetPickVideosParam) => {
  const { categoryKey, status, group, postType, findWithKey } = params;
  const key = generatePickVideoKey(params);

  const { data, isLoading, isFetching, isError } = useQuery(key, () => {
    if (postType === "pickList" && findWithKey) {
      return fetchPickVideosByProductKey({
        categoryKey,
        status,
        group,
      });
    }
    return fetchPickVideos(params);
  });

  function parseToPickVideo(
    videos?: ContentAdminPicksApiReturnType
  ): IPickVideosDataStructure[] {
    if (!videos) {
      return [];
    }

    if (Array.isArray(videos)) {
      return videos.map((video) => {
        const { content, ...rest } = video;
        return {
          ...rest,
          title: rest.title ?? content?.title,
          thumbnail: content?.thumbnail,
        };
      });
    }

    // 단일 content admin pick data 구조입니다.
    return [videos];
  }

  return {
    videos: parseToPickVideo(data),
    isLoading: isLoading || isFetching,
    isError,
  };
};

export default usePickVideos;
