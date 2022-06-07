import Script from "next/script";
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
const Scripts = () => {
  useEffect(() => {
    console.log("init mixpanel, gtm");
    mixpanel.init("3f1ae1780e3a0f1b802beebd30a6c297", { debug: true });
  }, []);
  return (
    <>
      {/* <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KRT9CCC');
  `,
        }}
      /> */}
    </>
  );
};

export default Scripts;
