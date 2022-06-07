// Generated with util/create-component.js
import React from "react";
import YouTube from "react-youtube";
import {
  onReady,
  parseYoutubeLinkToParam,
  youtubeLinkToImage,
} from "./youtube-video-functions";
import { YoutubeVideoProps } from "./YoutubeVideo.types";

const YoutubeVideo: React.FC<YoutubeVideoProps> = ({
  isApp = false,
  isMobile = true,
  videoUrl,
  vedioId,
  width,
  height,
  ...rest
}) => {
  const options = {
    width: width ?? "100%",
    height: height ?? (isMobile ? "200px" : "360px"),
  };

  if (isApp) {
    return <YoutubeVideoForApp videoUrl={videoUrl} options={options} />;
  }

  return (
    <div
      data-testid="ContentsEditorYoutubeVideo"
      className="nrc--ContentsEditorYoutubeVideo"
      style={{ ...options }}
    >
      <YouTube
        {...parseYoutubeLinkToParam(videoUrl, options, vedioId)}
        {...rest}
        onReady={onReady}
        className="w-full h-full"
      />
    </div>
  );
};

export default YoutubeVideo;

const YoutubeVideoForApp = ({
  videoUrl,
  options,
}: {
  videoUrl: string;
  options: { width: string; height: string };
}) => {
  return (
    <a href={videoUrl} target="_blank" rel="noreferrer">
      <div
        data-testid="ContentsEditorYoutubeVideoApp"
        className="nrc--ContentsEditorYoutubeVideoApp relative text-center"
        style={{ ...options }}
      >
        <img
          src="https://nosearch.com/static/images/video_player.png"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3rem]"
        />
        <img
          src={youtubeLinkToImage(videoUrl ?? "")}
          className="max-w-full max-h-full z-[2] object-scale-down"
          style={{ ...options }}
        />
      </div>
    </a>
  );
};
