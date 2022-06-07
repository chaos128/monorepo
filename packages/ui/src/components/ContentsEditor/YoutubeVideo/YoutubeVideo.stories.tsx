// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import YoutubeVideo from "./YoutubeVideo";

export default {
  title: "ContentsEditor/YoutubeVideo",
  component: YoutubeVideo,
} as Meta;

const Template: ComponentStory<typeof YoutubeVideo> = (args) => (
  <NosearchProvider>
    <YoutubeVideo {...args} />
  </NosearchProvider>
);

const YoutubeVideoData = {
  videoUrl: "https://youtu.be/p5pASLxDgzc",
};

export const MobileYoutubeVideo = Template.bind({});
MobileYoutubeVideo.args = { ...YoutubeVideoData, isMobile: true };

export const PcYoutubeVideo = Template.bind({});
PcYoutubeVideo.args = { ...YoutubeVideoData, isMobile: false };

export const AppYoutubeVideo = Template.bind({});
AppYoutubeVideo.args = { ...YoutubeVideoData, isApp: true };
