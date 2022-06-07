// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import Video from "./Video";

export default {
  title: "ContentsEditor/Video",
  component: Video,
} as Meta;

const Template: ComponentStory<typeof Video> = (args) => (
  <NosearchProvider>
    <Video {...args} />
  </NosearchProvider>
);

const VideoData = {
  src:
    "https://d21x3meyyr2jva.cloudfront.net/image_temp/1645711034865_03 공동구매_로이드미이브플러스_16대9 용량다운.mp4",
  poster:
    "https://d21x3meyyr2jva.cloudfront.net/image_temp/1645711074829_03 공동구매_로이드미이브플러스_16대9 용량다운 0000002324ms.png",
  muted: true,
  loop: true,
  controls: false,
  autoplay: true,
  widthRatio: 16,
  heightRatio: 9,
};

const contentsEditorOuterStyle = "pt-[1.2rem] px-[2rem] w-full max-w-[80rem]";

export const BasicVideo = Template.bind({});
BasicVideo.args = VideoData;

export const VideoWithTitle = Template.bind({});
VideoWithTitle.args = {
  ...VideoData,
  title: "공동구매_로이드미이브플러스",
  outerVideoDivClassname: contentsEditorOuterStyle,
};

export const VideoWithDescription = Template.bind({});
VideoWithDescription.args = {
  ...VideoData,
  description: "공동구매_로이드미이브플러스",
  outerVideoDivClassname: contentsEditorOuterStyle,
};
