// Generated with util/create-component.js
import React from "react";
import Heading from "../../UI/Heading";
import ContentsEditorDivider from "../Divider";
import { NumberingProps } from "./Numbering.types";

const Numbering: React.FC<NumberingProps> = ({ numbering, content }) => {
  return (
    <div
      data-testid="ContentsEditorNumbering"
      className="nrc--ContentsEditorNumbering w-full pt-[3rem] px-[2rem] "
    >
      <div className="flex space-x-[0.8rem] pb-[2rem] pc:pb-[3rem]">
        <div className="w-[2.7rem] h-[2.7rem] bg-gray-10 flex justify-center items-center flex-shrink-0">
          <Heading level={5} className="text-white">
            {numbering}
          </Heading>
        </div>
        <Heading level={5} className="text-gray-10 pc:text-heading-3">
          {content}
        </Heading>
      </div>
      <ContentsEditorDivider height={1} color="#DFDFDF" />
    </div>
  );
};

export default Numbering;
