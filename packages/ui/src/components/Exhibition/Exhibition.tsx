// Generated with util/create-component.js
import React from "react";
import NsImage from "../shared/ns-image";
import Heading from "../UI/Heading";
import Text from "../UI/Text";
import { ExhibitionProps } from "./Exhibition.types";

const Exhibition: React.FC<ExhibitionProps> = (props) => {
  const { data, fluid } = props;
  const { title, startAt, endAt, imageUrl, ImageWrapper } = data;

  const getFormatDate = (date: string) => {
    if (!date) return "";
    return date.substring(0, 10).replace(/-/g, ".");
  };
  const exhibitionDuration = `${getFormatDate(startAt)}~${getFormatDate(
    endAt
  )}`;

  const imageSize = fluid
    ? "w-full max-w-[32.5rem] pc:max-w-[56rem]"
    : "w-[32.5rem] pc:w-[56rem]";

  return (
    <div data-testid="Exhibition" className={`nrc--Exhibition ${imageSize}`}>
      <div
        className={`relative rounded-[10px] overflow-hidden ${imageSize} h-[17.3rem] pc:h-[19.8rem] object-contain`}
      >
        <NsImage
          ImageWrapper={ImageWrapper}
          imageUrl={imageUrl}
          className={`${imageSize} h-[17.3rem] pc:h-[19.8rem]`}
        />
      </div>
      <div className="mx-[1rem]">
        <Heading
          level={5}
          className="text-gray-10 mt-[0.8rem]"
          aria-label="기획전 제목"
        >
          {title}
        </Heading>
        <Text type="B10" className="text-gray-6" aria-label="기획전 기간">
          {exhibitionDuration}
        </Text>
      </div>
    </div>
  );
};

export default Exhibition;
