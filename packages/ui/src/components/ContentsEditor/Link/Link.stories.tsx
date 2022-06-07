// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import Link from "./Link";

export default {
  title: "ContentsEditor/Link",
  component: Link,
} as Meta;

const Template: ComponentStory<typeof Link> = (args) => (
  <NosearchProvider>
    <Link {...args} />
  </NosearchProvider>
);

export const BasicLink = Template.bind({});
BasicLink.args = {
  url: "https://nosearch.com/",
  text: "나선형 구조 장점 더 자세히 보기 👉",
  routeToNewPage: false,
};

export const LinkToNewPage = Template.bind({});
LinkToNewPage.args = {
  url: "https://nosearch.com/",
  text: "나선형 구조 장점 더 자세히 보기 👉",
  routeToNewPage: true,
};
