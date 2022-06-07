// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import TwoImage from "./TwoImage";

export default {
  title: "ContentsEditor/TwoImage",
  component: TwoImage,
} as Meta;

const Template: ComponentStory<typeof TwoImage> = (args) => (
  <NosearchProvider>
    <TwoImage {...args} />
  </NosearchProvider>
);

const FirstImageData = {
  url:
    "https://d21x3meyyr2jva.cloudfront.net/image_temp/1644395972000_keyboard1.png",
  ImageWrapper: (
    <img src="https://d21x3meyyr2jva.cloudfront.net/image_temp/1644395972000_keyboard1.png"></img>
  ),
  title: "",
  description: "",
  alt: "",
  routeToNewPage: false,
};

const SecondImageData = {
  url:
    "https://d21x3meyyr2jva.cloudfront.net/image_temp/1644395972000_keyboard1.png",
  ImageWrapper: (
    <img src="https://d21x3meyyr2jva.cloudfront.net/image_temp/1644395972000_keyboard1.png"></img>
  ),
  title: "",
  description: "",
  alt: "",
  routeToNewPage: false,
};

export const BasicTwoImage = Template.bind({});
BasicTwoImage.args = {
  firstImage: FirstImageData,
  secondImage: SecondImageData,
};

export const TwoImageWithTitle = Template.bind({});
TwoImageWithTitle.args = {
  firstImage: { ...FirstImageData, title: "접점(멤브레인,기계식) vs 무접점" },
  secondImage: { ...SecondImageData, title: "접점(멤브레인,기계식) vs 무접점" },
};

export const TwoImageWithDescription = Template.bind({});
TwoImageWithDescription.args = {
  firstImage: {
    ...FirstImageData,
    description:
      "걸쇠에 돌기가 걸리면서 구분감이 느껴짐\n슬라이더로 인한 타건음 발생",
  },
  secondImage: {
    ...SecondImageData,
    description:
      "걸쇠에 돌기가 걸리면서 구분감이 느껴짐\n슬라이더로 인한 타건음 발생",
  },
};

export const TwoImageWithLink = Template.bind({});
TwoImageWithLink.args = {
  firstImage: {
    ...FirstImageData,
    link: "https://nosearch.com/contents/guide/digitalit/keyboard",
  },
  secondImage: {
    ...SecondImageData,
    link: "https://nosearch.com/contents/guide/digitalit/keyboard",
  },
};

export const TwoImageWithLinkToNewPage = Template.bind({});
TwoImageWithLink.args = {
  firstImage: {
    ...FirstImageData,
    link: "https://nosearch.com/contents/guide/digitalit/keyboard",
    routeToNewPage: true,
  },
  secondImage: {
    ...SecondImageData,
    link: "https://nosearch.com/contents/guide/digitalit/keyboard",
    routeToNewPage: true,
  },
};
