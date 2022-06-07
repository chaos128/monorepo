// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import Image from "./Image";

export default {
  title: "ContentsEditor/Image",
  component: Image,
} as Meta;

const Template: ComponentStory<typeof Image> = (args) => (
  <NosearchProvider>
    <Image {...args} />
  </NosearchProvider>
);

const ImageData = {
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

export const BasicImage = Template.bind({});
BasicImage.args = ImageData;

export const ImageWithTitle = Template.bind({});
ImageWithTitle.args = {
  ...ImageData,
  title: "접점(멤브레인,기계식) vs 무접점",
};

export const ImageWithDescription = Template.bind({});
ImageWithDescription.args = {
  ...ImageData,
  description:
    "걸쇠에 돌기가 걸리면서 구분감이 느껴짐\n슬라이더로 인한 타건음 발생",
};

export const BasicImageWithLink = Template.bind({});
BasicImageWithLink.args = {
  ...ImageData,
  link: "https://nosearch.com/contents/guide/digitalit/keyboard",
};

export const BasicImageWithLinkToNewPage = Template.bind({});
BasicImageWithLinkToNewPage.args = {
  ...ImageData,
  link: "https://nosearch.com/contents/guide/digitalit/keyboard",
  routeToNewPage: true,
};
