import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getOgMetaByPath } from "../../shared/og";
import { useIsAppChannel } from "../useIsAppChannel";

export const shareTypeAtom = atomWithReset<
  "guide" | "product" | "encyclopedia" | "charity" | "communityDetail" | ""
>("");
export const shareCustomUrlAtom = atomWithReset<string>("");

export const useResetShareAtom = () => {
  const resetShareTypeAtom = useResetAtom(shareTypeAtom);
  const resetShareCustomUrlAtom = useResetAtom(shareCustomUrlAtom);

  const onResetShareAtoms = () => {
    resetShareTypeAtom();
    resetShareCustomUrlAtom();
  };
  return { onResetShareAtoms };
};

declare global {
  export interface Window {
    Kakao: any;
    FB: any;
    fbAsyncInit: any;
  }
}

export enum KakaoShareContentType {
  COMMERCE = "commerce",
  FEED = "feed",
}

export interface IKakaoShareContent {
  title: string;
  description?: string;
  imageUrl: string;
  link: {
    mobileWebUrl?: string;
    webUrl?: string;
    androidExecutionParams?: string;
  };
}
export interface IKakaoSocial {
  likeCount?: number;
  commentCount?: number;
  sharedCount?: number;
}

export interface IKakaoButtons {
  title: string;
  link: {
    mobileWebUrl?: string;
    webUrl?: string;
  };
}

export interface IKakaoCommerce {
  productName: string;
  regularPrice?: number;
  discountRate?: number;
  discountPrice?: number;
}
export interface IKakaoShareProps {
  objectType: KakaoShareContentType;
  content: IKakaoShareContent;
  social?: IKakaoSocial;
  commerce?: IKakaoCommerce;
  buttons?: IKakaoButtons[];
}

export interface ITwitterFormat {
  PWidth: string;
  pWidth: string;
  pLeft: string;
  pRight: string;
  linke: string;
}

const useShare = (customUrl?: string) => {
  const router = useRouter();
  const { asPath } = router;
  const isAppChannel = useIsAppChannel();
  const [currentURL, setCurrentURL] = useState<string>("");

  const shareToKakaoTalk = useCallback((param: IKakaoShareProps | null) => {
    if (typeof window !== "undefined" && param) {
      window.Kakao?.Link?.sendDefault({ ...param });
    }
  }, []);

  const url = customUrl ? customUrl : "https://nosearch.com" + asPath;
  const shareToFB = useCallback(() => {
    if (typeof window !== "undefined") {
      let FB = window.FB;
      FB.ui(
        {
          method: "share",
          href: url,
        },
        (response: any) => {}
      );
    }
  }, [currentURL, isAppChannel, asPath]);

  const shareToTwitter = useCallback(() => {
    if (typeof window !== undefined) {
      const shareURL = `https://twitter.com/share?url=${url}`;
      window.open(shareURL, "Share to twitter");
    }
  }, [asPath]);

  const shareToKakaoStory = useCallback(() => {
    if (typeof window !== "undefined") {
      window.Kakao?.Story?.share({
        url: url,
        text: "가전제품이 고민될 땐 노써치",
      });
    }
  }, [asPath]);

  useEffect(() => {
    setCurrentURL(window.origin + router.asPath);
  }, [router]);

  return {
    currentURL,
    shareToKakaoTalk,
    shareToFB,
    shareToTwitter,
    shareToKakaoStory,
  };
};
export default useShare;

export const useShareView = (customUrl?: string) => {
  const isAppChannel = useIsAppChannel();
  const router = useRouter();
  const { asPath, query } = router;
  const { param } = query;

  const type = useMemo(() => {
    if (asPath.indexOf("product") !== -1) return "product";

    return null;
  }, [asPath]);

  const origin = "https://nosearch.com";
  const url = customUrl ? customUrl : origin + asPath;
  const [shareType, setShareType] = useAtom(shareTypeAtom);
  const [shareCustomUrl, setShareCustomUrl] = useAtom(shareCustomUrlAtom);

  const setShare = () => {
    if (isAppChannel === true && (global as any).Share) {
      try {
        getOgMetaByPath(asPath).then((value) => {
          let { title } = value;
          if ((global as any).Share)
            (global as any).Share.postMessage(`${title ? title : ""} ${url}`);
        });
      } catch {
        if ((global as any).Share) (global as any).Share.postMessage(`${url}`);
      }
    } else {
      if (type) {
        setShareType(type);
        if (customUrl) setShareCustomUrl(customUrl);
        //return <Share type={type} customUrl={customUrl} />;
      }
    }
  };

  return { setShare };
};
