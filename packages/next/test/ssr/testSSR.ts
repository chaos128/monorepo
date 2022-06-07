import getPopularURL from "./getURL";
import customFetch from "./testUtils";

interface ISSRTestList {
  [key: string]: string;
}
// 구현에 따라서 변경 될 수 있는 부분
const ASSERTION: ISSRTestList = {
  productDetail: "purchase-info", // assertion keyword,
  guideDetail: "contents", // assertion keyword,
  encyclopediaDetail: "encyclopedia-content__wrapper", // assertion keyword,
};

const ASSERTION_DEV: ISSRTestList = {
  productDetail: "구매 정보",
  guideDetail: "",
  encyclopediaDetail: "",
};
console.log("==== START TEST SSR ====");

(async () => {
  const popularURL = await getPopularURL();
  console.log("popularURL => ", popularURL);
  const promises = Object.keys(popularURL).map(async (page) => {
    const urlList = popularURL[page];
    const assertion =
      process.env.NODE_ENV === "production"
        ? ASSERTION[page]
        : ASSERTION_DEV[page];
    return Promise.all(
      urlList.map(async (url: string, index) => {
        const response = await customFetch(url);

        try {
          if (!response) throw new Error("response is undefined");
          console.log("\x1b[37m", "URL => ", url);
          let isInclude = false;
          for await (const element of response) {
            if (element.indexOf(assertion) !== -1) isInclude = true;
          }

          if (!isInclude) {
            throw new Error(`${page} is not being SSR `);
          }
        } catch (error) {
          console.error("\x1b[31m", error);
          console.log("cannot found class name => ", "\x1b[31m", assertion);
          console.log("\x1b[37m", "check this page => ", "\x1b[34m", url);
          process.exit(1);
        }

        if (index === urlList.length - 1) {
          console.log(
            `\x1b[32m### ${page} compelete check ssr ${index} => ${urlList.length}`
          );
        }
      })
    );
  });
  await Promise.all(promises).then(() => {
    console.log("\x1b[32m", "==== pass test ====");
    process.exit(0);
  });
})();
