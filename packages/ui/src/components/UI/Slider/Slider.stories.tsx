// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import Slider from "./Slider";

const images = [
  "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_026.jpg",
  "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_135.jpg",
  "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_242.jpg",
  "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_026.jpg",
  "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_135.jpg",
  "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_026.jpg",
  "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_135.jpg",
  "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_242.jpg",
  "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_026.jpg",
  "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_135.jpg",
];

const componentList = (withImage?: boolean) => {
  return ["bg-blue-8", "bg-green" /* "bg-violet"  "bg-yellow" */].map(
    (color, index) => {
      return (
        <div
          key={color}
          className={`h-full  flex justify-center items-center ${color}`}
        >
          {withImage ? (
            <img
              src={
                "https://api.nosearch.com/ns_api/v1/product/storeImage?imageUrl=" +
                images[index]
              }
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            index
          )}
        </div>
      );
    }
  );
};

export default {
  title: "UI/Slider",
  component: Slider,
} as Meta;

const Template: ComponentStory<typeof Slider> = (args) => (
  <NosearchProvider>
    <div className="w-full">
      <Slider {...args}>
        {componentList(args.sliderWidth === 25 && true)}
      </Slider>
    </div>
  </NosearchProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  sliderWidth: 30,
  sliderHeight: 30,
  autoPlay: false,
  showPageIndex: true,
  showPageIndicator: true,
  showPrevNextButton: false,
  unit: "rem",
  showThumbnails: true,
  thumbnailGap: 0.5,
  thumbnailWidth: 6.0,
};

export const AutoPlay = Template.bind({});
AutoPlay.args = {
  sliderWidth: 30,
  sliderHeight: 30,
  autoPlay: true,
  showPageIndex: true,
};

export const SliderWithImage = Template.bind({});
SliderWithImage.args = {
  sliderWidth: 25,
  sliderHeight: 25,
  autoPlay: false,
  showPageIndex: true,
  showPageIndicator: true,
  showPrevNextButton: false,
  unit: "rem",
  showThumbnails: true,
  thumbnailGap: 0.5,
  thumbnailWidth: 6.0,
};
