// Generated with util/create-component.js
import React from "react";
import NsImage from "../../shared/ns-image";
import Text from "../../UI/Text";
import ContentsEditorDivider from "../Divider";
import { ImageProps } from "./Image.types";

const Image: React.FC<ImageProps> = ({
  url,
  ImageWrapper,
  title,
  description,
  alt,
  link,
  routeToNewPage,
  style,
}) => {
  return (
    <div
      data-testid="ContentsEditorImage"
      className="nrc--ContentsEditorImage pt-[1.2rem] w-full max-w-[80rem] px-[2rem]"
      style={style}
    >
      {link ? (
        <a href={link} target={routeToNewPage ? "_blank" : ""}>
          <ImageContent
            url={url}
            ImageWrapper={ImageWrapper}
            alt={alt}
            title={title}
            description={description}
          />
        </a>
      ) : (
        <ImageContent
          url={url}
          ImageWrapper={ImageWrapper}
          alt={alt}
          title={title}
          description={description}
        />
      )}
    </div>
  );
};

const ImageContent = ({
  url,
  ImageWrapper,
  alt,
  title,
  description,
}: {
  url: string;
  ImageWrapper?: JSX.Element;
  alt: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="">
      {title && (
        <Text type="B5" className="text-gray-10 mb-[0.6rem] text-center">
          {title}
        </Text>
      )}
      <div className="relative w-full h-auto">
        <NsImage
          ImageWrapper={ImageWrapper}
          imageUrl={url}
          alt={alt}
          className="w-full h-auto"
        />
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

export default Image;
