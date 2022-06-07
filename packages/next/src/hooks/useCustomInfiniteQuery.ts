import { useInfiniteQuery } from "react-query";
import { nosearchServiceAxiosInstance } from "../shared/axiosInstances";

/*  
EXAMPLE

useCustomInfiniteQuery<IAppliancesInfoData>({
  queryKeyString: "useInfiniteAppliancesInfo",
  apiURL: "/appliancesInfo",
  params: { take: 16, ...params },
});

*/

interface ICustomInfiniteQueryResponse<TData> {
  totalCount: number;
  list: Array<TData>;
}

function useCustomInfiniteQuery<TData>({
  queryKeyString,
  apiURL,
  params,
  options,
}: {
  queryKeyString: string;
  apiURL: string;
  params: { [key: string]: any };
  options?: {};
}) {
  const queryFn = async ({ pageParam = 1 }) => {
    const { data }: { data: ICustomInfiniteQueryResponse<TData> } =
      await nosearchServiceAxiosInstance.get(apiURL, {
        params: { ...params, page: pageParam },
      });

    return {
      data,
      nextPage: pageParam + 1,
      isLast: data.totalCount === params.take ? false : true,
    };
  };

  return useInfiniteQuery(
    [queryKeyString, params],
    queryFn,
    options ?? {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) {
          return lastPage.nextPage;
        } else {
          return undefined;
        }
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    }
  );
}

export default useCustomInfiniteQuery;
