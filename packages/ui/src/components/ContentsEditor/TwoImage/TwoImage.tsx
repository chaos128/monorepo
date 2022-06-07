// Generated with util/create-component.js
import React from "react";
import ContentsEditorImage from "../Image";
import { TwoImageProps } from "./TwoImage.types";

const TwoImage: React.FC<TwoImageProps> = ({ firstImage, secondImage }) => {
  return (
    <div
      data-testid="ContentsEditorTwoImage"
      className="flex nrc--ContentsEditorTwoImage px-[2rem] gap-x-[1rem]"
    >
      <ContentsEditorImage
        {...firstImage}
        style={{ paddingLeft: 0, paddingRight: 0 }}
      />
      <ContentsEditorImage
        {...secondImage}
        style={{ paddingLeft: 0, paddingRight: 0 }}
      />
    </div>
  );
};

export default TwoImage;
