// Generated with util/create-component.js
import React from "react";
import Text from "../../UI/Text";
import { LinkProps } from "./Link.types";

const Link: React.FC<LinkProps> = ({ url, text, routeToNewPage }) => {
  return (
    <a
      href={url}
      target={routeToNewPage ? "_blank" : ""}
      data-testid="ContentsEditorLink"
      className="nrc--ContentsEditorLink"
    >
      <Text type="B2" className="underline text-blue-7">
        {text}
      </Text>
    </a>
  );
};

export default Link;
