// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import Text from "../UI/Text";
import StarRating from "./StarRating";

export default {
  title: "Components/StarRating",
  component: StarRating,
} as Meta;

const Template: ComponentStory<typeof StarRating> = (args) => (
  <NosearchProvider>
    <StarRating {...args} />
  </NosearchProvider>
);

export const StarRatingBasic = Template.bind({});
StarRatingBasic.args = {
  rating: 5,
  text: (
    <Text type="D3" className="text-gray-6 ml-[0.5rem]">
      (10)
    </Text>
  ),
};

export const StarRatingWithStyle = Template.bind({});
StarRatingWithStyle.args = {
  rating: 3.5,
  text: (
    <Text type="D3" className="text-gray-6 ml-[0.8rem]">
      후기 10
    </Text>
  ),
  styleFor: {
    size: 2,
    starColor: "#256FFF",
    bgColor: "#DFDFDF",
  },
};
