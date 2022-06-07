// Generated with util/create-component.js
import React, { useCallback, useRef, useState } from "react";
import NsImage from "../shared/ns-image";
import { Close } from "../UI/Icon";
import Text from "../UI/Text";
import { CommentInputProps } from "./CommentInput.types";

const CommentInput: React.FC<CommentInputProps> = (props) => {
  const {
    onSubmitContent,
    nickNameForReply,
    isFixedBottom = false,
    profileImage,
    profileImageWrapper,
  } = props;
  const [content, setContent] = useState<string>("");
  const [isReplying, setIsReplying] = useState<boolean>(
    nickNameForReply ? true : false
  );
  const [formHeight, setFormHeight] = useState<number>(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleResizeHeight = useCallback(() => {
    if (
      textareaRef === null ||
      textareaRef.current === null ||
      formRef === null ||
      formRef.current === null
    )
      return;
    textareaRef.current.style.height = "4.5rem";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    formRef.current.style.height = textareaRef.current.scrollHeight + 2 + "px";
    setFormHeight(textareaRef.current.scrollHeight + 2);
  }, [content]);

  const submitContent = () => {
    if (content === "") return;
    onSubmitContent(content);
    setContent("");

    if (
      textareaRef === null ||
      textareaRef.current === null ||
      formRef === null ||
      formRef.current === null
    )
      return;
    textareaRef.current.style.height = "4.5rem";
    formRef.current.style.height = "4.7rem";
    setIsReplying(false);
  };

  return (
    <>
      {isReplying && nickNameForReply && (
        <TargetBox
          formHeight={formHeight}
          isFixedBottom={isFixedBottom}
          nickNameForReply={nickNameForReply}
          onCloseTarget={setIsReplying}
        />
      )}
      <section
        className={`nrc--CommentInput flex items-center w-[37.5rem] pc:w-[80rem] px-[2rem] py-[1.2rem] border-t-[1px] border-gray-3 ${
          isFixedBottom ? "fixed bottom-0 left-0" : "relative"
        }`}
      >
        <div className="w-[3rem] h-[3rem] rounded-full mr-[1rem] flex-shrink-0">
          <NsImage
            ImageWrapper={profileImageWrapper}
            imageUrl={profileImage}
            className="w-[3rem] h-[3rem]"
          />
        </div>
        <form
          data-testid="CommentInput"
          className="w-[33.5rem] pc:w-[74rem] bg-gray-1 flex justify-between border-[1px] border-gray-2 rounded-[5px] box-border max-h-[40rem] pc:max-h-[20rem] "
          onSubmit={(e) => {
            e.preventDefault();
            submitContent();
          }}
          ref={formRef}
        >
          <textarea
            className="box-border overflow-hidden outline-none resize-none nrc--CommentInput-textarea bg-gray-1 p-[1rem] max-h-[40rem] pc:max-h-[20rem] break-all placeholder-gray-7 text-body-4 text-gray-10 flex-grow"
            placeholder="궁금한 점을 물어보세요!"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            onInput={handleResizeHeight}
            ref={textareaRef}
            rows={1}
            autoComplete="off"
            autoFocus={false}
          ></textarea>

          <button
            onClick={(e) => {
              e.preventDefault();
              submitContent();
            }}
            className={`mr-[1rem] ${content === "" && "cursor-not-allowed"}`}
          >
            <Text
              type="B2"
              className={` whitespace-nowrap ${
                content === "" ? "text-blue-5" : "text-blue-7"
              }`}
            >
              등록
            </Text>
          </button>
        </form>
      </section>
    </>
  );
};

export default CommentInput;

const TargetBox = (props: {
  formHeight: number;
  isFixedBottom: boolean;
  nickNameForReply: string;
  onCloseTarget: (props: boolean) => void;
}) => {
  const { formHeight, isFixedBottom, nickNameForReply, onCloseTarget } = props;
  const basicFormHeight = formHeight >= 37 ? 22 : 68;
  const targetBottom = (formHeight + basicFormHeight) / 10;
  return (
    <div
      className={`pc:hidden w-[37.5rem] h-[4.5rem] bg-blue-1 flex justify-between items-center px-[2rem] ${isFixedBottom &&
        "absolute left-0"}`}
      style={{ bottom: `${targetBottom > 40 ? 42.5 : targetBottom}rem` }}
    >
      <div className="flex">
        <Text type="B8" className="text-gray-10">
          {nickNameForReply}
        </Text>
        <Text type="B10" className="text-gray-10 ml-[0.4rem]">
          님에게 답글을 남기는 중
        </Text>
      </div>
      <button
        onClick={() => {
          onCloseTarget(false);
        }}
      >
        <Close size="1.5rem" />
      </button>
    </div>
  );
};
