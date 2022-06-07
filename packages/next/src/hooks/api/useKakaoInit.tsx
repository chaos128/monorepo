import { atom, useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export const kakaoInitStateAtom = atom<boolean>(false);

const useKakaoInit = () => {
  const [kakaoInit, setKakaoInit] = useAtom(kakaoInitStateAtom);
  const [kakaoError, setKakaoError] = useState<boolean>(false);

  useEffect(() => {
    if (!kakaoInit) {
      (window as any).KakaoInterval = setInterval(() => {
        if (window.Kakao) {
          window.Kakao.init("01bd5206ce6309f67ea08b4b39730a9b");
          setKakaoInit(true);
        }
      }, 0);

      (function (id) {
        var js: HTMLScriptElement,
          fjs = window.document.getElementsByTagName("script")[0];

        if (window.document.getElementById(id)) {
          return;
        }
        js = window.document.createElement("script");
        js.id = id;
        js.async = true;
        js.src = "https://developers.kakao.com/sdk/js/kakao.js";

        js.onerror = () => {
          var fjs = window.document.getElementsByTagName("script")[0];
          fjs.remove(); // error 발생시 해당 script 를 지우고 다시 실행
          setKakaoError(true);
          setKakaoInit(false);
        };

        if (fjs && fjs.parentNode) fjs.parentNode.insertBefore(js, fjs);
      })("kakao-jssdk");
    } else {
      clearInterval((window as any).KakaoInterval);
    }

    return () => {
      clearInterval((window as any).KakaoInterval);
    };
  }, [kakaoInit, setKakaoInit]);

  const kakaoErrorHandler = useCallback(() => {
    return <KakaoErrorAlert />;
  }, []);

  return { kakaoError, kakaoErrorHandler };
};
export default useKakaoInit;

const KakaoErrorAlert = () => {
  const router = useRouter();
  const onClickHandler = () => {
    router.reload();
  };
  return (
    <div
      onClick={() => {
        onClickHandler();
      }}
    >
      오류가 발생했습니다. 다시 시도해 주세요.
    </div>
  );
};
