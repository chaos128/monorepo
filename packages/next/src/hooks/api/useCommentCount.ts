import axios from "axios";
import { useQuery } from "react-query";
import { getParamsString } from "../../shared/utils";
import { BASE_URL } from "../../shared/variables";

export interface ICommentCountQuery {
  key: string | number;
  size?: number;
}
export interface ICommentsCountResponse {
  commentsCount: number;
  maxPageSize: number;
}
interface IUseCommentCountParams {
  key: string;
  size?: number;
  isReply?: boolean;
  initialCount?: number;
  callCammentCountApi?: (
    parms: any,
    isReply?: boolean
  ) => Promise<ICommentsCountResponse>;
}

export const generateCommentCountKey = (key: any, size: any) => {
  return ["getCommentCount", key, size];
};

export const fetchCommentCount = async (
  queryCommentCount: ICommentCountQuery,
  isReply?: boolean
) => {
  try {
    const { data } = await axios.get<ICommentsCountResponse | null>(
      `${BASE_URL}/ns_api/v1/comment/${
        isReply ? "reply/" : ""
      }count?${getParamsString(queryCommentCount)}`
    );
    return data;
  } catch (e) {
    return null;
  }
};

const useCommentCount = (params: IUseCommentCountParams) => {
  const { key, size = 10, isReply = false } = params;

  const querykey = generateCommentCountKey(key, size);

  const { data, isLoading } = useQuery(
    querykey,
    () => {
      if (key) {
        if (params.callCammentCountApi) {
          return params.callCammentCountApi({ key, size }, isReply);
        }
        return fetchCommentCount({ key, size }, isReply);
      }

      return null;
    },
    {
      staleTime: 5 * 60 * 1000,
      initialData: () => {
        if (typeof params.initialCount === "number") {
          return {
            commentsCount: params.initialCount ?? 0,
            maxPageSize:
              params.initialCount / size + (params.initialCount % size) > 0
                ? 1
                : 0,
          } as ICommentsCountResponse;
        }
      },
    }
  );

  return {
    data: data || null,
  };
};

export default useCommentCount;
