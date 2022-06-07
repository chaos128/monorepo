// Generated with util/create-component.js
import React from "react";
import Heading from "../../UI/Heading";
import Text from "../../UI/Text";
import TextElement from "../Text";
import { IntroProps } from "./Intro.types";

const Intro: React.FC<IntroProps> = ({ label, title, editorContent }) => {
  return (
    <div
      data-testid="ContentsEditorIntro"
      className="nrc--ContentsEditorIntro w-full pt-[2rem] pc:pt-[3rem] py-[4rem] pc:py-[6rem] mobile:px-[2rem]"
    >
      {label && (
        <div className="bg-gray-10 px-[1rem] py-[0.3rem] inline-block mb-[1.2rem]">
          <Text type="D4" className="text-white pc:text-body-5">
            {label}
          </Text>
        </div>
      )}
      <Heading
        level={3}
        className="whitespace-pre-wrap text-gray-10 pc:text-heading-1 mb-[1.2rem]"
      >
        {title}
      </Heading>
      <TextElement editorContent={editorContent} />
    </div>
  );
};

export default Intro;
