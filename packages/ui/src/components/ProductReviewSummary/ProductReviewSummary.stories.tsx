// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import ProductReviewSummary from "./ProductReviewSummary";

export default {
  title: "Components/ProductReviewSummary",
  component: ProductReviewSummary,
} as Meta;

const Template: ComponentStory<typeof ProductReviewSummary> = (args) => (
  <NosearchProvider>
    <ProductReviewSummary {...args} />
  </NosearchProvider>
);

export const ReviewSummary = Template.bind({});
ReviewSummary.args = {
  avgScore: 4.5,
  scoreCount: [30, 15, 5, 0, 0],
  reviewCountSum: 50,
};
