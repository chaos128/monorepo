import { Heading } from "@nosearch/ui";
import Image from "next/image";
import { useEffect } from "react";
import Spacing from "../../../components/ui/spacing";
import useNosearchReview from "../../../hooks/api/useNosearchReview";
import { IProductDetailProps } from "./type";

const NosearchReview = ({
  productCategoryKey,
  modelName,
  onLoad,
}: IProductDetailProps) => {
  const { nosearchReviewData, isLoading } = useNosearchReview(
    productCategoryKey,
    modelName
  );

  useEffect(() => {
    if (
      onLoad &&
      nosearchReviewData &&
      nosearchReviewData.contents.length > 0 &&
      !isLoading
    )
      onLoad({ type: "nosearch-review" });
  }, [onLoad, nosearchReviewData, isLoading]);

  if (!nosearchReviewData) {
    return null;
  }
  const { elementList } = nosearchReviewData.contents[0].contents;

  // ui/admin/elements/variations 안에 노써치 리뷰와 관련된 UI 컴포넌트가 존재
  // 해당 컴포넌트에서는 recoil을 사용하고 있고, 여기서는 recoil을 사용하지 않고 있음. 즉, NosearchReview 컴포넌트가 recoilRoot 안에 존재하지 않아서 ui/admin/elements/variations 에 위치한 컴포넌트를 사용하는 것이 어려운 상황
  return (
    <div className="mt-[4rem] pb-[6rem]">
      <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      <div className="mx-[2rem] mt-[4rem] pb-[2rem] pc:mx-0 pc:pb-[3rem] pc:text-center">
        <Heading level={2} className="text-gray-10">
          노써치 리뷰
        </Heading>
      </div>
      <NsElement elementList={elementList} />
    </div>
  );
};

export default NosearchReview;

const NsElement = ({ elementList }: { elementList: any }) => {
  // editorElement, bigTitle, middleTitle, smallTitle, linkElement, emphasizeContent, numberingElement, imageElement, twoImageElement, dividerElement, tipButton, introElement, menuTab, productList, youtubeElement, plainVideoElement, spacing, loginUserOnlyElement, anonymousUserElement
  return (
    <div>
      {elementList?.map((element: any, i: number) => {
        return (
          <div key={`nsReviewElement_${i}`}>
            {element.elementName === "BigTitle" && (
              <BigTitle element={element} />
            )}
            {element.elementName === "MiddleTitle" && (
              <MiddleTitle element={element} />
            )}
            {element.elementName === "SmallTitle" && (
              <SmallTitle element={element} />
            )}
            {element.elementName === "EditorElement" && (
              <EditorElement element={element} />
            )}
            {element.elementName === "ImageElement" && (
              <ImageElement element={element} />
            )}
            {element.elementName === "EmphathizeContentElement" && (
              <EmphathizeContentElement element={element} />
            )}
            {element.elementName === "PlainVideoElement" && (
              <PlainVideoElement element={element} />
            )}
          </div>
        );
      })}
    </div>
  );
};

const EditorElement = ({ element }: { element: any }) => {
  const blocks = element.elementData.editorState.blocks;
  return (
    <div>
      {blocks.map((block: any) => {
        return <div key={block.key}>{block.text}</div>;
      })}
    </div>
  );
};

const ImageElement = ({ element }: { element: any }) => {
  return (
    <div>
      <div key={`{nsReviewImage_${element.elementData.alt}}`}>
        <Image
          src={element.elementData.url}
          alt={element.elementData.alt}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};

const EmphathizeContentElement = ({ element }: { element: any }) => {
  return <div>{element.elementData.content}</div>;
};

const BigTitle = ({ element }: { element: any }) => {
  return (
    <div>
      {element.elementData.chapterText} {element.elementData.mainTitle}
      {element.elementData.summary}
    </div>
  );
};

const MiddleTitle = ({ element }: { element: any }) => {
  return (
    <div>
      {element.elementData.headerValue} {element.elementData.mainTitle}
      {element.elementData.summary}
    </div>
  );
};

const SmallTitle = ({ element }: { element: any }) => {
  return <div>{element.elementData.title}</div>;
};

const PlainVideoElement = ({ element }: { element: any }) => {
  return (
    <video
      loop
      autoPlay
      width="30%"
      max-width="800px"
      height="auto"
      playsInline
    >
      <source src={element.elementData.src} width="100%" height="100%" />
    </video>
  );
};
