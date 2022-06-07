// Generated with util/create-component.js
import React from "react";
import Label from "../Label";
import NsImage from "../shared/ns-image";
import Text from "../UI/Text";
import { EncyclopediaProps } from "./Encyclopedia.types";

const Encyclopedia: React.FC<EncyclopediaProps> = (props) => {
  const { data, type, fluid } = props;
  const {
    title,
    categoryKr,
    thumbnail,
    ImageWrapper,
    isVideo = false,
    isNew = false,
  } = data;

  const imageSize = fluid
    ? "w-full max-w-[16rem] pc:max-w-[27rem]"
    : "w-[16rem] pc:w-[27rem]";

  return (
    <div
      data-testid="Encyclopedia"
      className={`nrc--Encyclopedia ${
        type === "column" ? "block" : "flex items-center"
      }`}
    >
      <div
        className={`relative h-[9rem] pc:h-[15.2rem] rounded-[10px] border-[1px] border-gray-3 overflow-hidden ${imageSize}`}
      >
        <div className={`relative h-[9rem] pc:h-[15.2rem] ${imageSize}`}>
          <NsImage
            ImageWrapper={ImageWrapper}
            imageUrl={thumbnail}
            className={imageSize}
          />
        </div>
        {isVideo && (
          <img
            src="https://nosearch.com/static/images/video_player.png"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4.5rem]"
          />
        )}
        {isNew && (
          <Label
            className="bg-red-4 rounded-[0.5rem] absolute top-[0.4rem] left-[0.4rem]"
            size="s"
            aria-label="NEW"
          >
            NEW
          </Label>
        )}
      </div>
      <div
        className={`${
          fluid
            ? "w-full max-w-[16.5rem] pc:max-w-[27rem]"
            : "w-[16.5rem] pc:w-[27rem]"
        } ${type === "row" ? "ml-[1rem]" : "mt-[1rem]"}`}
      >
        <div className="flex items-center">
          <Text type="D3" className="text-gray-7" aria-label="카테고리명">
            {categoryKr}
          </Text>
          {isVideo && (
            <img
              src="https://nosearch.com/static/images/youtube_logo.png"
              className="w-[1.8rem] ml-1.5"
            />
          )}
        </div>
        <Text
          type="B3"
          className="break-all text-gray-10 line-clamp-3 pc:line-clamp-2"
          aria-label="제목"
        >
          {title.replace(/<br>/g, "")}
        </Text>
      </div>
    </div>
  );
};

export default Encyclopedia;
