import Axios from "axios";
import { IEventInfo, SurveyConfig, SurveyOptionConfig } from "ns-ts-interfaces";
import { BASE_URL } from "./variables";
import { isAvailableTime, koreanPostWord, removeBRtag } from "./functions";

export interface IOgMeta {
  title: string;
  description: string;
  image: string;
}
const DEFAULT_OG_TITLE = "가전제품 고민? 검색은 그만 노써치!";
const DEFAULT_OG_DESCRIPTION =
  "가전 구매 필수앱. 정보의 홍수에 지친 소비자들을 위한 똑똑한 플랫폼. 구매가이드, 성능비교, 추천, 구매까지 한 번에!";
export const DEFAULT_OG_IMAGE =
  "https://dfcwlq4sk5y81.cloudfront.net/uploads/page_og_attachment/nosearch_og_main.png";
const THROW_ERROR_MESSAGE = "is blank or null or undefined";
export async function getOgMetaByPath(path: string): Promise<IOgMeta> {
  let title = DEFAULT_OG_TITLE;
  let description = DEFAULT_OG_DESCRIPTION;
  let image = DEFAULT_OG_IMAGE;

  try {
    if (path.startsWith("/product")) {
      return await handleProduct(path);
    } else if (path.startsWith("/draw")) {
      return await handleDraw();
    } else if (path.startsWith("/recommendation")) {
      return await handleRecommendation(path);
    } else if (path.startsWith("/contents/guide")) {
      return await handleGuide(path);
    } else if (path.startsWith("/contents/encyclopedia")) {
      return await handleEncyclopedia(path);
    } else if (path.startsWith("/mypage")) {
      return await handleMypage(path);
    } else if (path.startsWith("/policy")) {
      return await handlePolicy();
    } else if (path.startsWith("/feedback")) {
      return await handleFeedback();
    } else if (path.startsWith("/intro")) {
      return await handleIntro();
    } else if (path.startsWith("/login")) {
      return await handleLogin(path);
    } else if (path.startsWith("/reset-password")) {
      return await handleResetPassword();
    } else if (path.startsWith("/notice")) {
      return await handleNotice();
    } else if (path.startsWith("/faq")) {
      return await handleFaq();
    } else if (path.startsWith("/search?query")) {
      return await handleSearchResult(path);
    } else if (path.startsWith("/community")) {
      return await handleCommunity(path);
    } else if (path.startsWith("/store/nosearchDeal")) {
      return await handelNosearchDeal();
    }
  } catch (e) {
    // necessary console.log
    console.log("og error-------------\n", e);
  }

  return {
    title: title,
    description: description,
    image: image,
  };
}

async function handleProduct(path: string): Promise<IOgMeta> {
  const split = path.split("?")[0].split("/");
  const categoryKey = split[3];
  const modelName = split[5];
  const ogResponse = await Axios.get(
    `${BASE_URL}ogTag?type=productDetail&categoryKey=${categoryKey}&modelName=${modelName}`
  );

  let title = ``;
  let description = ``;
  let image = "";

  const dataModelName = ogResponse.data.modelName;
  const dataThumbnail = ogResponse.data.thumbnail;
  const categoryName = ogResponse.data.categoryName;

  if (
    dataModelName &&
    dataModelName.length > 0 &&
    categoryName &&
    categoryName.length > 0
  ) {
    title = `${ogResponse.data.modelName} ${ogResponse.data.categoryName} 성능분석 리뷰 | 노써치`;
    description = `전문가가 분석한 ${ogResponse.data.modelName} ${ogResponse.data.categoryName} 스펙 성능 평가 리뷰를 꼭 읽어보세요`;
  } else {
    throw `model name or category name ${THROW_ERROR_MESSAGE}`;
  }

  if (dataThumbnail && dataThumbnail.length > 0) {
    image = dataThumbnail;
  } else {
    throw `product image ${THROW_ERROR_MESSAGE}`;
  }

  return {
    title,
    description,
    image,
  };
}

function handleRecommendationItemList(): IOgMeta {
  return {
    title: "개인별 맞춤 가전제품 추천 | 노써치",
    description:
      "구매조건만 넣으면 알아서 딱 맞는 제품을 찾아주는 스마트한 추천",
    image: DEFAULT_OG_IMAGE,
  };
}

async function handleRecommendation(path: string): Promise<IOgMeta> {
  const key = path.split("?")[1]?.split("=")[1];
  const split = path.split("?")[0].split("/");
  const menu = split[2];

  if (menu === "item-list") return handleRecommendationItemList();

  const categoryKey = split[4];
  const ogResponse = await Axios.get(
    `${BASE_URL}ogTag?type=purchaseGuideDetail&categoryKey=${categoryKey}`
  );
  let categoryName = ogResponse.data.categoryName;
  let thumbnail = ogResponse.data.thumbnail;

  let title = "";
  let description = "";
  let image = "";
  const year = new Date().getFullYear();
  if (categoryName && categoryName.length > 0) {
    if (menu === "pick") {
      title = `노써치의 ${categoryName} 추천 제품 BEST 5 (${year}) | 노써치`;
      description = `소비자 기준에서 노써치가 먼저 골라보고 직접 써본 ${categoryName} 추천 BEST 5 (${year})`;
    } else if (menu === "curation") {
      title = `우리집에 딱 맞는 ${categoryName} 추천 | 노써치`;
      description = `${categoryName} 구매 조건만 입력하면 스펙 성능을 분석해 알아서 찾아주는 스마트한 추천`;
    } else if (menu === "self") {
      title = `${categoryName} 성능 스펙 비교 분석 | 노써치`;
      description = `${categoryName} 원하는 스펙을 직접 비교해보고 구매하세요`;
    } else if (menu === "theme") {
      const temp = await Axios.get(
        `${BASE_URL}surveyConfigs?productCategoryKey=${categoryKey}&type=filter`
      );
      const data: SurveyOptionConfig = temp.data.data?.surveys
        ?.find((survey: SurveyConfig) => survey?.title === "테마추천")
        ?.options?.find(
          (item: SurveyOptionConfig) => item.key.toString() === key
        );
      title = `${categoryName} 테마 추천 | 노써치`;
      const tempDescription = removeBRtag(data?.title);
      description = tempDescription
        ? Array.isArray(tempDescription)
          ? tempDescription?.join(" ")
          : tempDescription
        : `라이프 스타일에 맞는 ${categoryName}를 추천해 드려요!`;
      thumbnail = data?.imageUrl ?? thumbnail;
    }
  } else {
    throw `category name ${THROW_ERROR_MESSAGE}`;
  }

  if (thumbnail && thumbnail.length > 0) {
    image = thumbnail;
  } else {
    throw `thumbnail ${THROW_ERROR_MESSAGE}`;
  }

  return {
    title: title,
    description: description,
    image: image,
  };
}

function handleGuideMain(): IOgMeta {
  return {
    title: "가전제품 구매가이드 | 노써치",
    description:
      "전문가가 장기간 실제 사용하며 꼭 필요한 핵심 구매 기준을 정리한 구매가이드입니다.",
    image: DEFAULT_OG_IMAGE,
  };
}

async function handleGuide(path: string): Promise<IOgMeta> {
  const split = path.split("/");
  const category = split[3];
  const item = split[4] ? split[4].split("?")[0] : undefined;
  if (category === undefined || item === undefined) {
    return handleGuideMain();
  }

  const ogResponse = await Axios.get(
    `${BASE_URL}ogTag?type=purchaseGuideDetail&categoryKey=${item}`
  );

  let title = "";
  let description = "";
  let image = "";
  const year = new Date().getFullYear();
  const categoryName = ogResponse.data.categoryName;
  const thumbnail = ogResponse.data.thumbnail;
  const categoryNamePostWord = koreanPostWord(categoryName); // -을 or -를 조사 붙이기
  //  TV 예외 case가 존재, 해당 단어는 -를 붙여서 return

  if (categoryName && categoryName.length > 0) {
    title = `믿고 보는 ${categoryName} 구매가이드 (${year}) | 노써치`;
    description = `전문가가 장기간 ${categoryNamePostWord} 실 사용하며 정리한 핵심 구매 기준 (구매가이드/추천)`;
  } else {
    throw `categoryName ${THROW_ERROR_MESSAGE}`;
  }

  if (thumbnail && thumbnail.length > 0) {
    image = thumbnail;
  } else {
    throw `thumbnail ${THROW_ERROR_MESSAGE}`;
  }

  return {
    title: title,
    description: description,
    image: image,
  };
}

function handleEncyclopediaMain(): IOgMeta {
  return {
    title: "생활 속 가전제품 꿀팁 | 노써치",
    description:
      "일상 생활 속 실제 사용자들이 궁금했던 가전제품의 모든 정보를 알려줍니다.",
    image: DEFAULT_OG_IMAGE,
  };
}

function getRefinedIntroText(value: string) {
  const refineTextArray = value.split("<br />");
  let refineText = "";
  refineTextArray.map((value: string, index: number) => {
    if (value.length < 1) {
      refineText += " ";
    }
    refineText += value;
  });

  return refineText.substring(0, 117) + "...";
}

async function handleEncyclopedia(path: string): Promise<IOgMeta> {
  const split = path.split("/");
  const category = split[3];
  const item = split[4];
  const id = split[5];

  if (item === undefined || id === undefined) {
    return handleEncyclopediaMain();
  }

  let title = "";
  let description = "";
  let image = "";

  const ogResponse = await Axios.get(
    `${BASE_URL}ogTag?type=appliancesInfoDetail&id=${id}`
  );

  // og data가 충분치 않은 경우 대비
  const newApplianceInfo = await Axios.get(
    `${BASE_URL}appliancesInfo/${id}`
  ).then((res) => {
    if (Array.isArray(res.data.contents)) {
      return res.data.contents[0];
    }
    return res.data;
  });

  // title
  if (ogResponse.data.title && ogResponse.data.title.length > 0) {
    title = newApplianceInfo?.ogTitle || ogResponse.data.title;
  } else {
    throw `encyclopedia title ${THROW_ERROR_MESSAGE}`;
  }

  // intro
  const isOgResponseIntroExist =
    ogResponse.data.intro && ogResponse.data.intro.length > 0;
  const isNewIntroExist = newApplianceInfo?.ogDescription;

  if (isOgResponseIntroExist) {
    description = getRefinedIntroText(ogResponse.data.intro);
  } else if (isNewIntroExist) {
    description = getRefinedIntroText(newApplianceInfo.ogDescription);
  }

  // thumbnail
  const isOgThumbnailExist =
    ogResponse.data.intro && ogResponse.data.intro.length > 0;
  const isNewThumbnailExist = newApplianceInfo?.thumbnail;

  if (isOgThumbnailExist) {
    image = ogResponse.data.thumbnail;
  } else if (isNewThumbnailExist) {
    image = newApplianceInfo.thumbnail;
  } else {
    throw `encyclopedia image ${THROW_ERROR_MESSAGE}`;
  }

  return {
    title: title,
    description: description,
    image: image,
  };
}

function handleFavoriteContents(): IOgMeta {
  return {
    title: "관심콘텐츠 | 노써치",
    description: "스크랩한 관심콘텐츠를 확인할 수 있습니다.",
    image: DEFAULT_OG_IMAGE,
  };
}

function handleFavoriteProducts(): IOgMeta {
  return {
    title: "관심상품 | 노써치",
    description: "찜했던 관심상품을 확인할 수 있습니다.",
    image: DEFAULT_OG_IMAGE,
  };
}

function handleSetting(): IOgMeta {
  return {
    title: "구매조건 설정 | 노써치",
    description: "구매 조건을 설정하고 나에게 딱 맞는 가전제품을 추천 받으세요",
    image: DEFAULT_OG_IMAGE,
  };
}

function handleCompare(): IOgMeta {
  return {
    title: "관심상품 성능비교 | 노써치",
    description: "비교함에 담은 상품들의 성능을 비교해보세요.",
    image: DEFAULT_OG_IMAGE,
  };
}
async function handleMypage(path: string): Promise<IOgMeta> {
  const split = path.split("/");
  const page = split[1];
  const contents = split[2];

  if (contents && contents.indexOf("favorite-contents") > -1) {
    return handleFavoriteContents();
  }

  if (contents && contents.indexOf("favorite-product") > -1) {
    return handleFavoriteProducts();
  }

  if (contents && contents.indexOf("setting") > -1) {
    return handleSetting();
  }

  if (contents && contents.indexOf("compare") > -1) {
    return handleCompare();
  }

  return {
    title: "마이페이지 | 노써치",
    description: "-",
    image: DEFAULT_OG_IMAGE,
  };
}

async function handlePolicy(): Promise<IOgMeta> {
  return {
    title: "이용약관 / 개인정보 보호정책 | 노써치",
    description:
      "노써치 서비스의 이용약관 및 개인정보 보호정책을 확인할 수 있는 페이지입니다.",
    image: DEFAULT_OG_IMAGE,
  };
}

async function handleFeedback(): Promise<IOgMeta> {
  return {
    title: "고객의 소리, 의견 보내기 | 노써치",
    description:
      "노써치는 소비자와 함께 만들어가는 서비스입니다. 더 좋은 서비스를 제공할 수 있도록 많은 의견 부탁드립니다 :)",
    image: DEFAULT_OG_IMAGE,
  };
}

async function handleIntro(): Promise<IOgMeta> {
  return {
    title: "노써치 소개",
    description:
      "정보의 홍수에 지친 소비자를 위해 가전제품 전문가들이 먼저 골라서 사용해보고, 성능을 비교/분석/추천합니다.",
    image: DEFAULT_OG_IMAGE,
  };
}

async function handleLogin(path: string): Promise<IOgMeta> {
  const split = path.split("/");
  const page = split[2];

  if (page === "join") {
    return {
      title: "회원가입 | 노써치",
      description: "노써치 회원이 되면 더 편리하게 서비스를 이용할 수 있습니다",
      image: DEFAULT_OG_IMAGE,
    };
  }
  return {
    title: "로그인하기 | 노써치",
    description: "간편하게 로그인하고 노써치의 모든 서비스를 이용하세요",
    image: DEFAULT_OG_IMAGE,
  };
}

async function handleResetPassword(): Promise<IOgMeta> {
  return {
    title: "비밀번호 재설정 | 노써치",
    description: "가입 정보를 입력하여 비밀번호를 재설정 할 수 있습니다.",
    image: DEFAULT_OG_IMAGE,
  };
}

async function handleNotice(): Promise<IOgMeta> {
  return {
    title: "공지사항 | 노써치",
    description:
      "공지사항을 확인하고 노써치의 새로운 소식을 빠르게 만나보세요 :)",
    image: DEFAULT_OG_IMAGE,
  };
}

async function handleFaq(): Promise<IOgMeta> {
  return {
    title: "자주하는 질문 | 노써치",
    description:
      "노써치가 처음이신가요? 자주하는 질문을 먼저 확인하시면 더 쉽게 노써치 서비스를 이용할 수 있습니다.",
    image: DEFAULT_OG_IMAGE,
  };
}

async function handleSearchResult(path: string): Promise<IOgMeta> {
  const split = path.split("/");

  const query = split[1].split("?").map((str) => str.split("query="))[1];
  const refineQuery = decodeURI(query[1]);

  return {
    title: `${refineQuery} 검색결과 | 노써치`,
    description: `${refineQuery}에 대한 추천제품, 콘텐츠, 판매상품 결과입니다.`,
    image: DEFAULT_OG_IMAGE,
  };
}

async function handleDraw(): Promise<IOgMeta> {
  const recentlyEvent = await Axios.get(`${BASE_URL}events/recently?count=1`);
  let title = "";
  let description = "";
  let image = "";

  if (recentlyEvent && recentlyEvent.data) {
    const activeEvent: IEventInfo[] = [];
    recentlyEvent.data.map((value: IEventInfo, index: number) => {
      const { startAt, status, nextStartAt } = value;

      const isAvailable = isAvailableTime({
        start: startAt,
        deadline: nextStartAt,
      });

      if (status === "on" && isAvailable) {
        activeEvent.push(value);
      }
    });

    if (activeEvent.length > 0) {
      const { episodeNumber, eventType } = activeEvent[0];

      const eventInfo = await Axios.get(
        `${BASE_URL}events?eventType=${encodeURI(
          eventType
        )}&episodeNumber=${episodeNumber}`
      );

      if (eventInfo.data) {
        const { ogTag = "", ogImage = "", ogDescription = "" } = eventInfo.data;

        title = ogTag;
        description = ogDescription;
        image = encodeURI(ogImage);
      }
    }
  }

  return {
    title: title,
    description: description,
    image: image,
  };
}

async function handleCommunity(path: string) {
  if (path.indexOf("/detail") !== -1) {
    const pathList = path.split("/");
    const id = pathList
      .map((value, index) => {
        if (value === "detail") {
          return pathList[index + 1].split("?")[0];
        }
      })
      .filter((value) => value)[0];

    const ogResponse = id
      ? await Axios.get(`${BASE_URL}ogTag?type=postDetail&id=${parseInt(id)}`)
      : null;

    if (ogResponse) {
      const { title, intro, thumbnail } = ogResponse.data as any;
      return {
        title: title,
        description: intro,
        image: thumbnail ? thumbnail : DEFAULT_OG_IMAGE,
      };
    }
  }

  return {
    title: "가전제품 커뮤니티 (2022) | 노써치",
    description:
      "가전제품 고민 끝! 노써치 커뮤니티에서 가전제품에 대한 정보를 확인하세요.",
    image: DEFAULT_OG_IMAGE,
  };
}

async function handelNosearchDeal() {
  return {
    title: "노써치가 먼저 써보고 추천한다!",
    description: "온라인 최저가 이하 특가상품 공동구매 기회를 놓치지 마세요!",
    image: "https://nosearch.com/static/images/nosearchDeal_og.png",
  };
}
