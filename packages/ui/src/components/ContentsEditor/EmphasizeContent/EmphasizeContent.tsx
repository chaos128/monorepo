// Generated with util/create-component.js
import React from "react";
import Heading from "../../UI/Heading";
import { EmphasizeContentProps } from "./EmphasizeContent.types";

const EmphasizeContent: React.FC<EmphasizeContentProps> = ({ content }) => {
  return (
    <div
      data-testid="ContentsEditorEmphasizeContent"
      className="nrc--ContentsEditorEmphasizeContent w-full pt-[3rem] pb-[0.8rem] pc:pb-[1.8rem] mobile:px-[2rem]"
    >
      <div className="bg-blue-2 flex space-x-[0.8rem] p-[1rem]">
        <Heading level={1} className="text-gray-10 pt-[0.3rem] leading-none">
          *
        </Heading>
        <Heading level={5} className="whitespace-pre-wrap text-gray-10">
          {content}
        </Heading>
      </div>
    </div>
  );
};

export default EmphasizeContent;
