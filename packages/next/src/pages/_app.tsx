import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import FontSizeStyle from "../components/layout/FontSizeStyle";
import { initAxios } from "../hooks/api";
import useAppDetect from "../hooks/useAppDetect";
import { useLogin } from "../hooks/useLogin";
import { useWindowWidth } from "../hooks/useWindowWidth";
import "../styles/globals.css";

const Header = dynamic(() => import("../components/layout/Header"));
const Footer = dynamic(() => import("../components/layout/Footer"));
const Scripts = dynamic(() => import("../components/scripts"));
const MobileMenu = dynamic(() => import("../components/layout/MobileMenu"));
initAxios(); // TODO: Replace with nosearchServiceAxiosInstance

function MyApp({
  Component,
  pageProps,
  router,
}: {
  Component: any;
  pageProps: any;
  router: any;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // useRouteChange();
  useLogin();
  const { isApp } = useAppDetect();
  const { windowWidth } = useWindowWidth();

  return (
    <>
      <Head>
        <title>노써치 홈</title>
        <meta name="description" content="Put your description here."></meta>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>

      <Scripts />
      <FontSizeStyle windowWidth={windowWidth} />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Header route={router.route as string} />
          <Component {...pageProps} />
          <Footer />
          {!isApp && <MobileMenu route={router.route as string} />}
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
