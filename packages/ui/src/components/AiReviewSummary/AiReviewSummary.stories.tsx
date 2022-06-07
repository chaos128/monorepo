// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import AiReviewSummary from "./AiReviewSummary";

export default {
  title: "Components/AiReviewSummary",
  component: AiReviewSummary,
} as Meta;

const Template: ComponentStory<typeof AiReviewSummary> = (args) => (
  <NosearchProvider>
    <AiReviewSummary {...args} />
  </NosearchProvider>
);

export const ReviewSummary = Template.bind({});
ReviewSummary.args = {
  totalString: "+999",
  positiveNumber: 841,
  negativeNumber: 84,
  positiveRatio: 90,
  negativeRatio: 10,
};
