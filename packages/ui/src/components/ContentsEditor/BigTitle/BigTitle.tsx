// Generated with util/create-component.js
import React from "react";
import Heading from "../../UI/Heading";
import TextElement from "../Text";
import { TitleProps } from "./BigTitle.types";

const BigTitle: React.FC<TitleProps> = ({
  label,
  title,
  subTitle,
  editorContent,
}) => {
  return (
    <div
      data-testid="ContentsEditorBigTitle"
      className="nrc--ContentsEditorBigTitle w-full max-w-[80rem] pt-[3rem] pb-[4rem] px-[2rem] pc:pt-[4rem] pc:pb-[6rem] bg-gray-1 border-y-[1px] border-gray-3"
    >
      <div className="flex items-center gap-x-[0.8rem]">
        <Heading
          level={5}
          className="bg-gray-10 px-[1rem] py-[0.2rem] inline-block text-white pc:text-heading-4"
        >
          {label}
        </Heading>
        <Heading level={3} className="text-gray-10 pc:text-heading-2">
          {title}
        </Heading>
      </div>
      <Heading level={5} className="text-gray-10 mt-[1.2rem] pc:mt-[2rem]">
        {subTitle}
      </Heading>
      {editorContent && (
        <>
          <hr className="border-dashed border-gray-3 my-[1.2rem] pc:mt-[2rem]" />
          <TextElement editorContent={editorContent} />
        </>
      )}
    </div>
  );
};

export default BigTitle;
