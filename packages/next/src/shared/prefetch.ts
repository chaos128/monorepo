import Cookies from "cookies";
import { NextPageContext } from "next";
import { dehydrate, QueryClient, QueryFunction } from "react-query";
import { BASE_URL } from "./variables";

export interface IKeyAndQueryFunction {
  key: string | string[];
  queryFunc: QueryFunction;
}

const prefetch = async (
  keyAndQueryFunctions: IKeyAndQueryFunction[],
  revalidate?: number
) => {
  const queryClient = new QueryClient();

  await Promise.all(
    keyAndQueryFunctions.map((kq) => {
      console.log(`[prefetch] ${kq.key} processing..`);
      return queryClient.prefetchQuery(kq.key, kq.queryFunc).catch((err) => {
        console.log(`[prefetch] ${kq.key} failed`);
        console.log(err);
      });
    })
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      buildAt: new Date().getTime(),
    },
    revalidate: revalidate || 60 * 60 * 24,
  };
};

export { prefetch };
