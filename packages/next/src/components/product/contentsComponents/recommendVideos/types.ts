export const videoPlayTypes = {
  PLAY: "play",
  PAUSE: "pause",
  END: "end",
} as const;
type VidePlayType = typeof videoPlayTypes[keyof typeof videoPlayTypes];

export type VideoEventFunctionType = (
  video: IRecommendVideosViewData,
  videoType?: VidePlayType
) => void;

export const videoPostTypes = {
  PICK_LIST: "pickList",
  PICK_DETAIL: "pickDetail",
} as const;
export type VideoPostType = typeof videoPostTypes[keyof typeof videoPostTypes];

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
}

export interface IContentAdminPick {
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

export interface IPickVideosDataStructure
  extends Omit<IContentAdminPick, "content"> {
  thumbnail?: string;
}

export interface IPickVideosPostParams
  extends Omit<IPickVideosDataStructure, "id" | "createdAt" | "updatedAt"> {}

export interface IPickVideosGetParams
  extends Omit<
    IPickVideosPostParams,
    "videoUrl" | "contentId" | "contentType" | "order"
  > {}

export interface IRecommendVideosProps extends IPickVideosGetParams {
  sameGroupName?: string;
  onEvent?: VideoEventFunctionType;
  onLoad?: (value?: any) => void;
}
export interface IRecommendVideosViewProps {
  videos: IRecommendVideosViewData[];
}
export interface IRecommendVideosViewData {
  thumbnail?: string;
  title?: string;
  description?: string;
  url?: string;
  onEvent: VideoEventFunctionType;
}
