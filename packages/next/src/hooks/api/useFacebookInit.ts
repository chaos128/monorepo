import { atom, useAtom } from "jotai";
import { useEffect } from "react";

export const facebookInitStateAtom = atom<boolean>(false);

const useFacebookInit = () => {
  const [facebookInit, setFacebookInit] = useAtom(facebookInitStateAtom);

  useEffect(() => {
    if (!window.fbAsyncInit && facebookInit === false) {
      let FB = window.FB;
      window.fbAsyncInit = function () {
        FB.init({
          appId: "481250545857890",
          //xfbml: true,
          version: "v11.0",
        });
      };

      (function (id) {
        var js: HTMLScriptElement,
          fjs = window.document.getElementsByTagName("script")[0];
        if (window.document.getElementById(id)) {
          return;
        }

        js = window.document.createElement("script");
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        if (fjs && fjs.parentNode) fjs.parentNode.insertBefore(js, fjs);
      })("facebook-jssdk");
      setFacebookInit(true);
    }

    return () => {};
  }, [facebookInit, setFacebookInit]);
};
export default useFacebookInit;
