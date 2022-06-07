// Generated with util/create-component.js
import { Meta } from "@storybook/react";
import React from "react";
import Heading from "../UI/Heading";
import NosearchProvider from "./NosearchProvider";

export default {
  title: "UI/NosearchProvider/Color",
  component: NosearchProvider,
} as Meta;

export const Color = () => (
  <NosearchProvider>
    <Heading level={1}>Color</Heading>
    <div className="flex mt-20">
      <div className="w-[10rem]">
        <Heading level={1}>Gray</Heading>
      </div>
      <div className="flex-1 ml-10 flex-col space-y-4">
        <div className="w-[3rem] h-[3rem] bg-white inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-gray-1 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-gray-2 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-gray-3 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-gray-4 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-gray-5 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-gray-6 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-gray-7 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-gray-8 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-gray-9 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-gray-10 inline-block"></div>
      </div>
    </div>
    <div className="flex mt-10">
      <div className="w-[10rem]">
        <Heading level={1}>Blue</Heading>
      </div>
      <div className="flex-1 ml-10 flex-col space-y-4">
        <div className="w-[3rem] h-[3rem] bg-blue-1 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-blue-2 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-blue-3 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-blue-4 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-blue-5 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-blue-6 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-blue-7 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-blue-8 inline-block"></div>
      </div>
    </div>
    <div className="flex mt-10">
      <div className="w-[10rem]">
        <Heading level={1}>Red</Heading>
      </div>
      <div className="flex-1 ml-10 flex-col space-y-4">
        <div className="w-[3rem] h-[3rem] bg-red-1 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-red-2 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-red-3 inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-red-4 inline-block"></div>
      </div>
    </div>
    <div className="flex">
      <div className="w-[10rem]"></div>
      <div className="flex-1 ml-10 flex-col space-y-4">
        <div className="w-[3rem] h-[3rem] bg-white inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-yellow inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-yellow-orange inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-orange inline-block"></div>
      </div>
    </div>
    <div className="flex">
      <div className="w-[10rem]"></div>
      <div className="flex-1 ml-10 flex-col space-y-4">
        <div className="w-[3rem] h-[3rem] bg-white inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-white inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-white-orange inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-green inline-block"></div>
      </div>
    </div>
    <div className="flex">
      <div className="w-[10rem]"></div>
      <div className="flex-1 ml-10 flex-col space-y-4">
        <div className="w-[3rem] h-[3rem] bg-white inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-white inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-white-orange inline-block"></div>
        <div className="w-[3rem] h-[3rem] bg-violet inline-block"></div>
      </div>
    </div>
  </NosearchProvider>
);
