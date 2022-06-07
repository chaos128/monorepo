import { RefObject, useEffect, useMemo, useRef } from "react";

interface IGuideDetailContentsProps {
  contents: {
    __html: string;
  };
  index: number;
  id: number;
  selectedGroup: number;
  contentsRef: RefObject<HTMLDivElement> | null;
  onChange?: (value: number) => void;
}

function refineHtml(str: string) {
  let result = str;
  result = result.replace(/<iframe src=/g, "<a href=");

  const youtubeUrl = "https://www.youtube.com/embed";
  const regexYoutubeUrl = new RegExp(youtubeUrl, "gi");
  result = result.replace(regexYoutubeUrl, "https://youtu.be");

  const closeTag = "</iframe>";
  const regexCloseTag = new RegExp(closeTag, "gi");
  result = result.replace(regexCloseTag, "유튜브 보러가기</a>");

  return result;
}

const PurchaseGuideDetailContents = (props: IGuideDetailContentsProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const usingContent = useMemo(() => {
    return refineHtml("<div>" + props.contents + "</div>");
  }, [props.contents, refineHtml]);

  useEffect(() => {
    if (
      props.contentsRef &&
      props.contentsRef.current &&
      props.index === props.selectedGroup
    ) {
      window.scrollTo({});
    }
  }, [props.selectedGroup]);

  return (
    <div ref={props.contentsRef}>
      <div ref={ref} dangerouslySetInnerHTML={{ __html: usingContent }}></div>
    </div>
  );
};

export default PurchaseGuideDetailContents;
