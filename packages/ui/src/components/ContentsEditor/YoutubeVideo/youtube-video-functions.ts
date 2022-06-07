import { Options } from "./YoutubeVideo.types";

export function onReady(event: any) {
  const player = event.target;
  player.pauseVideo();
  if (!(global as any).players) {
    (global as any).players = [];
  }
  (global as any).players = (global as any).players.filter(
    (player: any) => player != null && player.i !== null
  );
  (global as any).players.push(player);
}

export function parseYoutubeLinkToParam(
  link: string,
  opts: Options,
  videoId?: string
) {
  return {
    videoId: parseYoutubeLinkToId(link) ?? videoId,
    opts: {
      playerVars: {
        start: parseYoutubeLinkToStartTime(link),
      },
      ...opts,
    } as Options,
  };
}

export function parseProperties(targetString: string) {
  if (!targetString) {
    return;
  }
  const chunkedString = targetString.split("?");
  if (chunkedString?.length < 1) {
    return null;
  }

  const queryOptions = chunkedString[1]?.split("&")?.map((s) => {
    const temp = s.split("=");
    if (temp.length > 1) {
      return {
        key: temp[0],
        value: temp[1],
      };
    }
    return {};
  });

  return queryOptions?.filter((option) => option.key);
}

export function parseYoutubeLinkToId(url: string) {
  if (!url) {
    return;
  }
  const urlChunks = url.split("?");

  const queryOptions = parseProperties(url);
  const videoId = queryOptions?.find((option) => option.key === "v")?.value;
  if (videoId) {
    return videoId;
  }

  const links = urlChunks[0].split("/");
  return links[links.length - 1];
}

export function parseYoutubeLinkToStartTime(url: string) {
  const queryOptions = parseProperties(url);

  const timeString = queryOptions?.find((option) => option.key === "t")?.value;
  if (!timeString) {
    return 0;
  }

  const hour = timeString.match(/([0-9]*)h/);
  const min = timeString.match(/([0-9]*)m/);
  const sec = timeString.match(/([0-9]*)s/);

  const seconds = [
    {
      regArr: hour,
      weight: 3600,
    },
    {
      regArr: min,
      weight: 60,
    },
    {
      regArr: sec,
      weight: 1,
    },
  ].reduce((prev, curr) => {
    const { regArr, weight } = curr;
    return prev + parseRegexArrayToSecond(regArr, weight);
  }, 0);

  return seconds;

  function parseRegexArrayToSecond(
    regArr: RegExpMatchArray | null,
    weight: number
  ) {
    if (regArr === null) {
      return 0;
    }
    return parseInt(regArr[1]) * weight;
  }
}

export function youtubeLinkToImage(url: string) {
  const videoId = parseYoutubeLinkToId(url);
  if (!videoId) {
    return ""; // TODO: 이미지가 없을 때 표시할 이미지 추가
  }

  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}
