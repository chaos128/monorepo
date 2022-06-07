import { Heading } from "@nosearch/ui";
import { useMemo } from "react";
import Spacing from "../../../../components/ui/spacing";
import usePickVideos from "../../../../hooks/api/usePickVideos";
import { useIsAppChannel } from "../../../../hooks/useIsAppChannel";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import {
  IPickVideosDataStructure,
  IRecommendVideosProps,
  IRecommendVideosViewData,
  IRecommendVideosViewProps,
  videoPlayTypes,
} from "./types";

const RecommendVideos = ({
  postType,
  categoryKey,
  sameGroupName,
  model,
  group,
  onEvent = () => {},
  onLoad,
}: IRecommendVideosProps) => {
  const { videos } = usePickVideos({
    postType,
    categoryKey,
    model: sameGroupName ?? model,
    group,
    status: "on",
  });

  const toRecommendVideoData = (
    videos: IPickVideosDataStructure[]
  ): IRecommendVideosViewData[] => {
    return videos.map((video) => ({
      thumbnail: video.thumbnail,
      title: video.title,
      description: video.description,
      url: video.videoUrl,
      onEvent,
    }));
  };

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <article className="mt-[4rem] pb-[6rem]">
      <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      <div className="mx-[2rem] mt-[4rem] pb-[2rem] pc:mx-0 pc:pb-[3rem] pc:text-center">
        <Heading level={2} className="text-gray-10">
          이 제품의 성능 테스트
        </Heading>
      </div>
      <RecommendVideosView videos={toRecommendVideoData(videos)} />
    </article>
  );
};

export default RecommendVideos;

const RecommendVideosView = ({ videos }: IRecommendVideosViewProps) => {
  const RecommendVideos = useMemo(() => {
    return videos.map((video, index) => {
      return (
        <RecommendVideoItem key={`${video?.title} + ${index}`} {...video} />
      );
    });
  }, [videos]);

  return <div>{RecommendVideos}</div>;
};

const RecommendVideoItem = (props: IRecommendVideosViewData) => {
  const { url = "", onEvent, title, description } = props;
  const { isMobile } = useMobileDetect();
  const isAppChannel = useIsAppChannel();

  const onPlay = () => {
    onEvent(props, videoPlayTypes.PLAY);
  };
  const onPause = () => {
    onEvent(props, videoPlayTypes.PAUSE);
  };
  const onEnd = () => {
    onEvent(props, videoPlayTypes.END);
  };

  // const ElementToShow = !isAppChannel ? (
  //   <YoutubeElement
  //     viewMode
  //     display={"view"}
  //     platform={!isMobile ? "pc" : "mobile"}
  //     boxStyle={{
  //       padding: 0,
  //     }}
  //     data={{
  //       videoUrl: url ?? "",
  //       width: "100%",
  //       height: "100%",
  //       onPlay,
  //       onPause,
  //       onEnd,
  //     }}
  //   />
  // ) : (
  //   <a href={url} target={"_blank"} rel={"noopener noreferrer"}>
  //     <Image
  //       src="https://nosearch.com/static/images/video_player.png"
  //       width={50}
  //       height={50}
  //       alt="video player"
  //     />
  //     <Image
  //       src={youtubeLinkToImage(url ?? "")}
  //       width={50}
  //       height={50}
  //       alt="video"
  //     />
  //   </a>
  // );

  return (
    <div>
      <div
        className="mx-auto w-full max-w-[64rem]"
        style={{ aspectRatio: "16/9" }}
      >
        {/* {ElementToShow} */}
      </div>
      {title && <span>{title}</span>}
      {description && <span>{description}</span>}
    </div>
  );
};
