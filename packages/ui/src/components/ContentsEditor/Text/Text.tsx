// Generated with util/create-component.js
import React from "react";
import { TextProps } from "./Text.types";

const Text: React.FC<TextProps> = ({ editorContent }) => {
  return (
    <div
      data-testid="ContentsEditorText"
      className="w-full nrc--ContentsEditorText text-body-4 pc:text-body-1"
      dangerouslySetInnerHTML={{
        __html: editorContent,
      }}
    ></div>
  );
};

export default Text;
