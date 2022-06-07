import React from "react";

const NsImage = (props: {
  ImageWrapper?: JSX.Element;
  imageUrl?: string;
  alt?: string;
  storeImage?: boolean;
  className?: string;
  style?: object;
  draggable?: boolean;
}) => {
  const {
    ImageWrapper,
    imageUrl,
    alt,
    storeImage = false,
    className,
    style,
    draggable = true,
  } = props;
  const IMG = ImageWrapper ? (
    ImageWrapper
  ) : (
    <img
      src={`${
        storeImage
          ? "https://api.nosearch.com/ns_api/v1/product/storeImage?imageUrl="
          : ""
      }${imageUrl}`}
      alt={alt ?? ""}
      className={className}
      style={style}
      draggable={draggable}
    />
  );

  return IMG;
};

export default NsImage;
