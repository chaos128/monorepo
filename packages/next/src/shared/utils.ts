import { IScoreMetaMap, ISearchDocument } from "ns-ts-interfaces";

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#AAA" offset="20%" />
      <stop stop-color="#AAA" offset="50%" />
      <stop stop-color="#AAA" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#AAA" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const getParamsString = <T>(value: T, exceptionKeys?: string[]) => {
  let params: string = "";

  Object.keys(value).map((key: string, index: number) => {
    if ((value as any)[key] === null || (value as any)[key] === undefined) {
      delete (value as any)[key];
    }

    if (exceptionKeys && exceptionKeys.indexOf(key) !== -1) {
      delete (value as any)[key];
    }
  });

  Object.keys(value).map((key: string, index: number) => {
    const currentParams =
      index === 0
        ? `${key}=${(value as any)[key]}`
        : `&${key}=${(value as any)[key]}`;
    params += currentParams;
  });

  return params;
};
function refineSearchDocument(
  searchDocuments: ISearchDocument[]
): ISearchDocument[] {
  return searchDocuments.map((document) => {
    return {
      ...document,
      name: checkIfU(document.name) ? "" : document.name,
      price: checkIfU(document.price)
        ? "가격 미확인"
        : `${document.price} 만원`,
      scoreMetaMap: refineScoreMetaMap(
        document.scoringRules,
        document.scoreMetaMap
      ),
    };
  });

  function checkIfU(target: any) {
    return target == "U";
  }

  function refineScoreMetaMap(
    scoringRule: string[],
    scoreMetaMap: IScoreMetaMap
  ): IScoreMetaMap {
    const refinedScoreMetaMap: IScoreMetaMap = {};
    scoringRule?.forEach((rule) => {
      const currentMetaData = scoreMetaMap[rule];
      refinedScoreMetaMap[rule] = {
        ...currentMetaData,
        score: currentMetaData.score < 0 ? 0 : currentMetaData.score,
      };
    });

    return refinedScoreMetaMap;
  }
}

function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: any, e2: any, e3: any) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: any, g: any, b: any) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export {
  shimmer,
  toBase64,
  getParamsString,
  refineSearchDocument,
  hasOwnProperty,
  rgbDataURL,
};
