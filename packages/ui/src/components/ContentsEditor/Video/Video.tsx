// Generated with util/create-component.js
import React from "react";
import Text from "../../UI/Text";
import ContentsEditorDivider from "../Divider";
import { VideoProps } from "./Video.types";

const VideoElement: React.FC<VideoProps> = ({
  src,
  poster,
  preload,
  controls = false,
  muted = true,
  autoplay = false,
  loop = true,
  widthRatio,
  heightRatio,
  title,
  description,
  style,
  isIOSApp,
  outerVideoDivClassname,
}) => {
  const ratio = widthRatio && heightRatio ? heightRatio / widthRatio : 9 / 16;

  return (
    <div
      data-testid="ContentsEditorVideo"
      className={`nrc--ContentsEditorVideo flex flex-col items-center ${outerVideoDivClassname}`}
    >
      {title && (
        <Text type="B5" className="text-gray-10 mb-[0.6rem]">
          {title}
        </Text>
      )}

      <div
        data-testid="Video"
        className="w-full nrc--Video relative"
        style={{ ...style, paddingTop: ratio * 100 + "%" }}
      >
        <video
          width="100%"
          height="auto"
          preload={preload}
          controls={isIOSApp ? true : controls}
          autoPlay={isIOSApp ? false : autoplay}
          poster={isIOSApp ? poster : undefined}
          muted={muted}
          controlsList="nofullscreen nodownload noremoteplayback"
          loop={loop}
          playsInline
          className="absolute top-0 left-0 bottom-0 right-0 object-fill"
        >
          <source src={src} width="100%" height="100%" />
        </video>
      </div>

      {description && (
        <div className="mt-[0.6rem] w-full">
          <ContentsEditorDivider color="#EFEFEF" height={1} />
          <Text
            type="B9"
            className="text-gray-7 mt-[0.6rem] text-center whitespace-pre-wrap"
          >
            {description}
          </Text>
        </div>
      )}
    </div>
  );
};

export default VideoElement;
