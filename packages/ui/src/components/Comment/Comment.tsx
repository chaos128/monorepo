// Generated with util/create-component.js
import React, { useEffect, useState } from "react";
import NsImage from "../shared/ns-image";
import { Caret, HeartDefault, HeartPressed } from "../UI/Icon";
import Text from "../UI/Text";
import { CommentProps, ICommentData } from "./Comment.types";

const Comment: React.FC<CommentProps> = (props) => {
  const {
    data,
    isMine = false,
    isLoginedUser = false,
    isAdminUser = false,
  } = props;

  const [showAnswerComments, setShowAnswerComments] = useState<boolean>(false);
  const [showMoreComment, setShowMoreComment] = useState<boolean>(false);

  return (
    <div
      data-testid="Comment"
      className="nrc--Comment w-[37.5rem] px-[2rem] pc:w-[80rem] pc:px-0 pc:py-[3rem] box-border"
    >
      <CommnetBox
        type="comment"
        data={data}
        isLoginedUser={isLoginedUser}
        isMine={isMine}
        isAdminUser={isAdminUser}
        showAnswerComments={showAnswerComments}
        setShowAnswerComments={setShowAnswerComments}
      />

      {showAnswerComments &&
        data.answerComments.map((comment, index) => {
          return (
            <CommnetBox
              key={`answerComment_${comment.id}`}
              index={index}
              type="answerComment"
              data={comment}
              isLoginedUser={isLoginedUser}
              isMine={isMine}
              isAdminUser={isAdminUser}
              showMoreComment={showMoreComment}
              setShowMoreComment={setShowMoreComment}
            />
          );
        })}
    </div>
  );
};

export default Comment;

const CommnetBox = (props: {
  index?: number;
  type: "comment" | "answerComment";
  data: ICommentData;
  isMine: boolean;
  isLoginedUser: boolean;
  isAdminUser: boolean;
  showAnswerComments?: boolean;
  setShowAnswerComments?: (showAnswerComments: boolean) => void;
  showMoreComment?: boolean;
  setShowMoreComment?: (showMoreComment: boolean) => void;
}) => {
  const {
    index = 0,
    type,
    data,
    isMine,
    isLoginedUser,
    isAdminUser,
    showAnswerComments,
    setShowAnswerComments,
    showMoreComment,
    setShowMoreComment,
  } = props;
  const {
    id,
    user,
    content,
    likeStatus,
    createdAt,
    answerCommentsCount,
    onLikeComment,
    onReplyComment,
    onDeleteComment,
    onEditComment,
  } = data;

  const summaryContent = content.substring(0, 150);
  const [showAllContent, setShowAllContent] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(likeStatus);

  const onLikeStatus = (likeStatus: boolean) => {
    setIsLiked(likeStatus);
  };

  useEffect(() => {
    onLikeStatus(likeStatus);
  }, [likeStatus]);

  return (
    <>
      <div
        className={`w-[37.5rem] pc:w-[80rem] box-border ${type ===
          "answerComment" && "p-[2rem] pc:p-[3rem] bg-gray-1"} ${index > 2 &&
          !showMoreComment &&
          "hidden"}`}
      >
        <div className="flex justify-between">
          <div className="flex items-center space-x-[0.8rem]">
            <div className="relative w-[3rem] h-[3rem] rounded-full">
              <NsImage
                ImageWrapper={user.profileImageWrapper}
                imageUrl={user.profileImage}
                className="w-[3rem] h-[3rem]"
              />
            </div>
            <Text
              type="B5"
              className={`${user.isAdmin ? "text-blue-8" : "text-gray-10"}`}
            >
              {user.nickName}
            </Text>
          </div>
          <div className="flex items-center">
            {isMine && (
              <div className="flex items-center">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    onDeleteComment && onDeleteComment();
                  }}
                >
                  <Text type="B7" className="text-gray-7">
                    삭제
                  </Text>
                </div>
                <div className="w-[2px] h-[1.2rem] bg-gray-5 mx-[1rem]"></div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    onEditComment && onEditComment();
                  }}
                >
                  <Text type="B7" className="text-gray-7">
                    수정
                  </Text>
                </div>
              </div>
            )}
            {!isMine && isAdminUser && (
              <div
                className="cursor-pointer"
                onClick={() => {
                  onDeleteComment && onDeleteComment();
                }}
              >
                <Text type="B7" className="text-gray-7">
                  삭제
                </Text>
              </div>
            )}
          </div>
        </div>

        <div
          className={`my-[1.2rem] ${type === "comment" && "cursor-pointer"}`}
          onClick={() => {
            setShowAllContent(true);
          }}
        >
          <p className="break-all whitespace-pre-line text-body-7 text-gray-10 pc:text-body-4">
            {!showAllContent && type === "comment" ? summaryContent : content}
            {!showAllContent && type === "comment" && (
              <span className="text-body-7 text-gray-6">...더보기</span>
            )}
          </p>
        </div>

        <div className="flex items-center space-x-[1.6rem]">
          <p className="text-gray-6 text-detail-4 pc:text-body-10">
            {createdAt.substring(0, 10).replace(/-/g, ".")}
          </p>

          {isLoginedUser && (
            <>
              <div className="w-[0.4rem] h-[0.4rem] rounded-full bg-gray-3"></div>
              <button
                onClick={() => {
                  onReplyComment(id);
                }}
              >
                <Text type="B10" className="text-gray-10">
                  답글달기
                </Text>
              </button>
              <div className="w-[0.4rem] h-[0.4rem] rounded-full bg-gray-3"></div>
              <button
                className="flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  onLikeComment();
                  onLikeStatus(!isLiked);
                }}
              >
                {isLiked ? (
                  <HeartPressed size="1.6rem" />
                ) : (
                  <HeartDefault size="1.6rem" />
                )}
                <p
                  className={`ml-[0.6rem] ${
                    isLiked
                      ? "text-blue-7 font-bold text-body-7"
                      : "text-gray-10 text-detail-4 pc:text-body-10"
                  }`}
                >
                  좋아요
                </p>
              </button>
            </>
          )}
        </div>

        {type === "comment" && answerCommentsCount > 0 && (
          <div
            className="flex items-center space-x-[0.8rem] mt-[1.2rem] mb-[2rem] pc:mb-[3rem] cursor-pointer"
            onClick={() => {
              setShowAnswerComments &&
                setShowAnswerComments(!showAnswerComments);
            }}
          >
            <div className="w-[4rem] h-[1px] bg-gray-3"></div>
            <Text type="D4" className="text-gray-10">
              답글 {answerCommentsCount}개
              {showAnswerComments ? " 접기" : " 더보기"}
            </Text>
          </div>
        )}
      </div>

      {/* 답글이 3개 이상일 경우 답글 더보기 기능 제공 */}
      {index === 2 && !showMoreComment && (
        <button
          className="w-[37.5rem] h-[4.8rem] pc:w-[80rem] flex justify-center items-center space-x-[1.2rem] bg-gray-1 border-t-[1px] border-gray-3"
          onClick={() => {
            setShowMoreComment && setShowMoreComment(true);
          }}
        >
          <Text type="B7" className="text-gray-10">
            답글 더보기
          </Text>
          <div className="rotate-[90deg]">
            <Caret size={"3rem"} />
          </div>
        </button>
      )}
    </>
  );
};
