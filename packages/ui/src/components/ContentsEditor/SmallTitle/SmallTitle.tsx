// Generated with util/create-component.js
import React from "react";
import Heading from "../../UI/Heading";
import { TitleProps } from "../BigTitle/BigTitle.types";

const SmallTitle: React.FC<TitleProps> = ({ title }) => {
  return (
    <div
      data-testid="ContentsEditorSmallTitle"
      className="nrc--ContentsEditorSmallTitle w-full flex space-x-[0.8rem] pt-[3rem] px-[2rem]"
    >
      <Heading level={1}>*</Heading>
      <Heading level={5} className="whitespace-pre-wrap text-gray-10">
        {title}
      </Heading>
    </div>
  );
};

export default SmallTitle;
