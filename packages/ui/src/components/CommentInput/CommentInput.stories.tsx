// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import CommentInput from "./CommentInput";

export default {
  title: "Components/CommentInput",
  component: CommentInput,
} as Meta;

const Template: ComponentStory<typeof CommentInput> = (args) => (
  <NosearchProvider>
    <CommentInput {...args} />
  </NosearchProvider>
);

export const Input = Template.bind({});
Input.args = {
  profileImage:
    "https://nosearch.com/static/webp/images/profile_default_image.webp",
  onSubmitContent: function onSubmitContent(comment: string) {
    console.log(comment);
  },
};

export const InputForReply = Template.bind({});
InputForReply.args = {
  nickNameForReply: "노써치",
  profileImage:
    "https://nosearch.com/static/webp/images/profile_default_image.webp",
  onSubmitContent: function onSubmitContent(comment: string) {
    console.log(comment);
  },
};

export const FixedInputForReply = Template.bind({});
FixedInputForReply.args = {
  nickNameForReply: "노써치",
  isFixedBottom: true,
  profileImage:
    "https://nosearch.com/static/webp/images/profile_default_image.webp",
  onSubmitContent: function onSubmitContent(comment: string) {
    console.log(comment);
  },
};
