// Generated with util/create-component.js
import React from "react";
import NsImage from "../shared/ns-image";
import Button from "../UI/Button";
import Heading from "../UI/Heading";
import { Caret } from "../UI/Icon";
import { PurchaseGuideProps } from "./PurchaseGuide.types";

const PurchaseGuide: React.FC<PurchaseGuideProps> = (props) => {
  const { viewType } = props;
  const {
    thumbnail,
    ImageWrapper,
    parentCategoryKey,
    categoryKey,
    categoryName,
    title,
    description,
  } = props.data;

  const imageSize =
    viewType === "home"
      ? "w-[5.6rem] h-[5.6rem] pc:w-[6.5rem] pc:h-[6.5rem]"
      : viewType === "pick"
      ? "w-[33.5rem] h-[22.3rem] pc:w-[34rem] pc:h-[22rem]"
      : viewType === "productDetail"
      ? "w-[33.5rem] h-[22.3rem] pc:w-[46rem] pc:h-[30rem]"
      : viewType === "purchaseGuideOverview"
      ? "pc:w-[37rem] pc:h-[24.6rem]"
      : "w-[5.6rem] h-[5.6rem] pc:w-[27rem] pc:h-[18rem]"; // purchaseGuide

  return (
    <div
      data-testid="PurchaseGuide"
      className={`nrc--PurchaseGuide ${
        viewType === "home"
          ? "flex items-center justify-between w-[33.5rem] h-[10rem] p-[1.5rem] border-[1px] border-gray-3 rounded-[10px] pc:w-[67.6rem] pc:py-[1rem]"
          : viewType === "pick"
          ? "w-[33.5rem] pc:w-[80rem] pc:p-[2rem] pc:border-[1px] pc:border-gray-3 pc:rounded-[10px]"
          : viewType === "productDetail"
          ? "w-[33.5rem] pc:w-[50rem] pc:h-[54.4rem] pc:p-[2rem] pc:border-[1px] pc:border-gray-3 pc:rounded-[10px]"
          : viewType === "purchaseGuideOverview"
          ? "w-[33.5rem] pc:w-[80rem]"
          : "flex items-center justify-between w-[33.5rem] h-[10rem] p-[1.5rem] border-[1px] border-gray-3 rounded-[10px] pc:w-[27rem] pc:h-[25rem] pc:border-none pc:p-0 pc:block pc:rounded-[20px]" // purchaseGuide
      }`}
    >
      <div
        className={`${
          viewType === "home"
            ? "flex items-center"
            : viewType === "pick" || viewType === "purchaseGuideOverview"
            ? "pc:flex pc:items-center"
            : viewType === "purchaseGuide"
            ? "flex items-center pc:block"
            : ""
        }`}
      >
        <div
          className={` ${
            viewType === "home"
              ? "w-[7rem] h-[7rem] pc:w-[8rem] pc:h-[8rem] rounded-[20px] bg-gray-1 flex justify-center items-center border-[1px] border-gray-2 flex-shrink-0"
              : viewType === "pick"
              ? "w-full h-auto pc:w-[34rem] pc:h-[22rem] flex-shrink-0"
              : viewType === "productDetail"
              ? "pc:w-[46rem] pc:h-[30rem]"
              : viewType === "purchaseGuideOverview"
              ? "w-full h-auto pc:w-[37rem] pc:h-[24.6rem] flex-shrink-0"
              : "w-[7rem] h-[7rem] pc:w-[27rem] pc:h-[18rem] rounded-[20px] bg-gray-1 flex justify-center items-center border-[1px] border-gray-2" // purchaseGuide
          }`}
        >
          <div
            className={`relative object-cover ${viewType === "purchaseGuide" &&
              "pc:rounded-[10px]"} ${imageSize}`}
          >
            <NsImage
              ImageWrapper={ImageWrapper}
              imageUrl={thumbnail}
              className={` object-cover ${viewType === "purchaseGuide" &&
                "pc:rounded-[10px]"} ${imageSize}`}
            />
          </div>
        </div>

        <div
          className={` ${
            viewType === "home"
              ? "w-full ml-[1.2rem]"
              : viewType === "pick"
              ? "w-full mt-[2rem] pc:flex pc:flex-col pc:justify-between pc:h-[22rem] pc:mt-0 pc:ml-[1.2rem]"
              : viewType === "productDetail"
              ? "w-full mt-[2rem]"
              : viewType === "purchaseGuideOverview"
              ? "p-[2rem] pc:p-0 pc:ml-[3rem]"
              : "w-full ml-[1.2rem]" // purchaseGuide
          }`}
        >
          <div>
            {/* 구매가이드 카테고리 */}
            {viewType === "home" && (
              <Heading level={5} className="text-black pc:text-heading-4">
                {categoryName} 구매가이드
              </Heading>
            )}
            {viewType === "purchaseGuide" && (
              <Heading level={6} className="text-black pc:mt-[0.7rem]">
                {categoryName}
              </Heading>
            )}

            {/* 구매가이드 제목 */}
            {viewType === "productDetail" ? (
              <Heading
                level={4}
                className="text-gray-10 break-all line-clamp-1 mb-[1.2rem]"
              >
                {title.replace(/<BR>/g, "")}
              </Heading>
            ) : (
              <p
                className={`text-gray-10 ${
                  viewType === "home"
                    ? "text-body-10 pc:text-body-7 break-all line-clamp-2"
                    : viewType === "purchaseGuide"
                    ? "text-body-10 pc:text-body-3 pc:w-[25rem] w-[19rem] line-clamp-2 break-all"
                    : "text-heading-4 font-extrabold mb-[1.2rem]"
                }`}
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            )}

            {/* 구매가이드 설명 */}
            {(viewType === "pick" ||
              viewType === "productDetail" ||
              viewType === "purchaseGuideOverview") &&
              description && (
                <p
                  className={`text-body-5 text-gray-10 break-words line-clamp-4 ${
                    viewType === "pick" ? "pc:line-clamp-5" : "pc:line-clamp-4"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              )}
          </div>

          {(viewType === "pick" ||
            viewType === "productDetail" ||
            viewType === "purchaseGuideOverview") && (
            <a href={`/contents/guide/${parentCategoryKey}/${categoryKey}`}>
              <Button size="l" type="primary" className="w-full mt-[1.2rem]">
                구매가이드 보기
              </Button>
            </a>
          )}
        </div>
      </div>
      {viewType === "home" && <Caret size={"2rem"} color="black" />}
      {viewType === "purchaseGuide" && (
        <div className="pc:hidden">
          <Caret size={"2rem"} color="black" />
        </div>
      )}
    </div>
  );
};

export default PurchaseGuide;
