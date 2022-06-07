// Generated with util/create-component.js
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import {
  BookmarkDefault,
  BookmarkPressed,
  Close,
  Comment,
  Index,
  Share,
} from "../UI/Icon";
import Text from "../UI/Text";
import {
  ContentSidebarProps,
  purchaseGuideIndex,
} from "./ContentSidebar.types";

const ContentSidebar: React.FC<ContentSidebarProps> = (props) => {
  const { type, data } = props;
  const {
    category,
    likeCount,
    likeStatus,
    ShareButton,
    BookmarkButton,
    CommentButton,
    commentCount,
    RecommendProductsButton,
    indexData,
  } = data;

  const [indexOpened, setIndexOpend] = useState<boolean>(false);

  return (
    <div
      data-testid="ContentSidebar"
      className="nrc--ContentSidebar w-[12.4rem] border-[1px] border-gray-3 rounded-[10px] p-[1.2rem] bg-white z-[200] relative"
    >
      {type === "purchaseGuide" && indexData && indexOpened && (
        <IndexView indexData={indexData} setIndexOpend={setIndexOpend} />
      )}

      <Text type="B5" className="text-center text-gray-10 mb-[2rem]">
        {category} <br />
        {type === "purchaseGuide" ? "구매가이드" : "가전백과"}
      </Text>

      <div className="w-full h-[1px] bg-gray-3"></div>

      <div className="mt-[2rem]">
        <ActionButtons
          type={type}
          likeCount={likeCount}
          likeStatus={likeStatus}
          BookmarkButton={BookmarkButton}
          CommentButton={CommentButton}
          commentCount={commentCount}
          ShareButton={ShareButton}
          indexOpened={indexOpened}
          setIndexOpend={setIndexOpend}
        />
        <Button
          size="s"
          type="outline"
          onClick={() => {
            RecommendProductsButton && RecommendProductsButton();
          }}
        >
          <Text type="B8" className="text-blue-7 whitespace-nowrap">
            추천제품 보기
          </Text>
        </Button>
      </div>
    </div>
  );
};
export default ContentSidebar;

const ActionButtons = (props: {
  type: "purchaseGuide" | "encyclopedia";
  likeCount?: number;
  likeStatus?: boolean;
  BookmarkButton: Function;
  commentCount?: number;
  CommentButton: Function;
  ShareButton: Function;
  indexOpened?: Boolean;
  setIndexOpend?: Function;
}) => {
  const {
    type,
    likeCount = 0,
    likeStatus = false,
    BookmarkButton,
    commentCount = 0,
    CommentButton,
    ShareButton,
    setIndexOpend,
    indexOpened,
  } = props;

  const [likeCountState, setLikeCount] = useState<number>(likeCount);
  const [isLiked, setIsLiked] = useState<boolean>(likeStatus);

  const onLikeCountStatus = (likeCount: number) => {
    setLikeCount(likeCount);
  };
  const onLikeStatus = (likeStatus: boolean) => {
    setIsLiked(likeStatus);
  };

  useEffect(() => {
    setLikeCount(likeCount);
    onLikeStatus(likeStatus);
  }, [likeStatus]);

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-[2rem] mb-[2rem]">
      {type === "purchaseGuide" && (
        <button
          onClick={(e) => {
            e.preventDefault();
            if ((e.target as Element).nodeName === "svg" || "path") {
              setIndexOpend && setIndexOpend(!indexOpened);
            }
          }}
        >
          <Index size="3rem" />
          <Text type="B10" className="text-gray-10">
            목차
          </Text>
        </button>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          if ((e.target as Element).nodeName === "svg" || "path") {
            BookmarkButton && BookmarkButton();
            if (isLiked) onLikeCountStatus(likeCount);
            else onLikeCountStatus(likeCount + 1);
            onLikeStatus(!isLiked);
          }
        }}
      >
        <div className="flex flex-col items-center">
          {isLiked ? (
            <BookmarkPressed size="3rem" />
          ) : (
            <BookmarkDefault size="3rem" />
          )}
          <Text
            type="B10"
            className={`whitespace-nowrap ${
              isLiked ? "text-primary" : "text-gray-10"
            }`}
          >
            {likeCountState}
          </Text>
        </div>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          if ((e.target as Element).nodeName === "svg" || "path") {
            ShareButton && ShareButton();
          }
        }}
      >
        <Share size="3rem" />
        <Text type="B10" className="text-gray-10">
          공유
        </Text>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          if ((e.target as Element).nodeName === "svg" || "path") {
            CommentButton && CommentButton();
          }
        }}
      >
        <Comment size="3rem" />
        <Text type="B10" className="text-gray-10">
          {commentCount}
        </Text>
      </button>
    </div>
  );
};

const IndexView = (props: {
  indexData: purchaseGuideIndex[];
  setIndexOpend?: Function;
}) => {
  const { indexData, setIndexOpend } = props;
  return (
    <div className="w-[32.3rem] border-[1px] border-gray-3 rounded-[10px] p-[2rem] bg-white z-[200] absolute top-0 right-[13.2rem]">
      <div className="flex items-center justify-between mb-[2rem]">
        <Heading level={4} className="text-gray-10">
          목차
        </Heading>
        <button
          onClick={() => {
            setIndexOpend && setIndexOpend(false);
          }}
        >
          <Close size="2rem" />
        </button>
      </div>
      <div className="space-y-[2rem] cursor-pointer">
        {indexData.map((data, i: number) => {
          return <IndexBox key={`purchaseGuideIndex_${i}`} data={data} />;
        })}
      </div>
    </div>
  );
};

const IndexBox = (props: { data: purchaseGuideIndex }) => {
  const { title, desc, onClickIndex } = props.data;
  return (
    <div
      onClick={() => {
        onClickIndex && onClickIndex();
      }}
    >
      <div className="w-full h-[1px] bg-gray-3"></div>
      <div className="mt-[2rem]">
        <Heading level={6} className="text-gray-10">
          {title}
        </Heading>
        <Text type="B10" className="text-gray-10">
          {desc}
        </Text>
      </div>
    </div>
  );
};
