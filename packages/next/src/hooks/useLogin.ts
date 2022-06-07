import { atom, useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { Cookies } from "react-cookie";
import { BASE_URL } from "../shared/variables";
import { setInterceptor } from "./api";

export enum ELoginMethod {
  "kakao" = "kakao",
  "email" = "email",
  "naver" = "naver",
  "apple" = "apple",
}

const accessTokenAtom = atom<string>("");

function kakaoLogin(redirectUrl?: string) {
  location.href =
    BASE_URL +
    `/ns_api/v1/auth/kakao?redirectUri=${
      redirectUrl ? redirectUrl : window.location.origin
    }`;
}

function naverLogin(redirectUrl?: string) {
  location.href =
    BASE_URL +
    `/ns_api/v1/auth/naver?redirectUri=${
      redirectUrl ? redirectUrl : window.location.origin
    }`;
}

function appleLogin(redirectUrl?: string) {}

function getUrl(url?: string) {
  if (!url) return window.location.origin + "/";
  else if (url.indexOf("/") === 0) {
    return window.location.origin + url;
  }
  return url;
}

const cookies = new Cookies();

const useLogin = () => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  useEffect(() => {
    const accessToken = cookies.get("accessToken");
    setInterceptor(accessToken);
    setAccessToken(accessToken);
  }, [setAccessToken]);

  const isLogin = useMemo(() => {
    return !!accessToken && accessToken.length > 0;
  }, [accessToken]);

  const logout = (redirectUrl?: string) => {
    location.href =
      BASE_URL +
      `/ns_api/v1/auth/signout?redirectUri=${
        redirectUrl ? redirectUrl : window.location.origin
      }&accessToken=${accessToken}`;
  };

  const login = (method: ELoginMethod, redirectUrl?: string) => {
    switch (method) {
      case ELoginMethod.kakao:
        kakaoLogin(getUrl(redirectUrl));
        break;
      case ELoginMethod.naver:
        naverLogin(getUrl(redirectUrl));
        break;
      case ELoginMethod.apple:
        appleLogin(getUrl(redirectUrl));
        break;
    }
  };

  return {
    isLogin,
    accessToken,
    login,
    logout,
  };
};

export { useLogin };
