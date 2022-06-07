// Generated with util/create-component.js
import React from "react";
import Heading from "../../UI/Heading";
import Text from "../../UI/Text";
import { TitleProps } from "../BigTitle/BigTitle.types";

const MiddleTitle: React.FC<TitleProps> = ({ label, title, subTitle }) => {
  return (
    <div
      data-testid="ContentsEditorMiddleTitle"
      className="nrc--ContentsEditorMiddleTitle w-full max-w-[80rem] pt-[3rem] pb-[2rem] px-[2rem] pc:pt-[4rem] pc:pb-[3rem] border-b-[1px] border-gray-3"
    >
      <div className="flex space-x-[0.8rem]">
        <div className="w-[2.7rem] h-[2.7rem] bg-gray-10 flex justify-center items-center flex-shrink-0">
          <Heading level={5} className="text-white">
            {label}
          </Heading>
        </div>
        <Heading level={4} className="text-gray-10 pc:text-heading-3">
          {title}
        </Heading>
      </div>
      <Text
        type="B2"
        className="whitespace-pre-wrap text-gray-10 mt-[1.2rem] pc:mt-[2rem]"
      >
        {subTitle}
      </Text>
    </div>
  );
};

export default MiddleTitle;
