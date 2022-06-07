import { Caret, Text } from "@nosearch/ui";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import Sticky from "react-stickynode";
import { ICategory, useCategories } from "../../../hooks/api/useCategories";
import { useMobileDetect } from "../../../hooks/useMobileDetect";
import PcItemList from "../../itemList/pcItemList";
import {
  contentsCategoryItemProps,
  contentsDefaultCategoryProps,
  contentsViewType,
  openedAllCategoryItemsAtom,
  openedCategoryItemAtom,
  parentCategoryList,
  useContentsCategory,
} from "./useContentsCategory";

const CategoryTab = ({
  viewType,
  selectedCategoryTab,
  selectedCategoryItem,
}: {
  viewType: contentsViewType;
  selectedCategoryTab: string;
  selectedCategoryItem: string;
}) => {
  const { isMobile } = useMobileDetect();

  const { homeSortCategoryMap } = useCategories();
  const categoryList = homeSortCategoryMap[selectedCategoryTab as string];

  const openedAllCategoryItems = useAtomValue(openedAllCategoryItemsAtom);

  const { onClickOpenCategoryItem, onClickDefaultCategory } =
    useContentsCategory();

  if (!homeSortCategoryMap) {
    return null;
  }

  return (
    <Sticky enabled innerZ={100}>
      <div className=" scrollbar-hide flex h-[4.5rem] w-full items-center border-b-[1px] border-gray-3 bg-gray-1 pl-[2rem] pc:justify-center mobile:overflow-x-scroll">
        <DefaultCategoryButton
          isMobile={isMobile}
          viewType={viewType}
          onClickDefaultCategory={onClickDefaultCategory}
        />
        <div className="flex items-center justify-center space-x-[1rem]  pc:space-x-[2rem] ">
          {parentCategoryList.map((category) => {
            return (
              <CategoryButton
                key={category.key}
                viewType={viewType}
                category={category.key}
                categoryKr={category.value}
                selectedCategoryTab={selectedCategoryTab}
                onClickOpenCategoryItem={onClickOpenCategoryItem}
              />
            );
          })}
        </div>
      </div>
      {categoryList && (
        <CategoryItemList
          viewType={viewType}
          parentCategoryList={parentCategoryList}
          categoryList={categoryList}
          selectedCategoryTab={selectedCategoryTab as string}
          selectedCategoryItem={selectedCategoryItem as string}
          onClickOpenCategoryItem={onClickOpenCategoryItem}
        />
      )}

      {openedAllCategoryItems && !isMobile && (
        <PcItemList viewType={viewType} />
      )}
    </Sticky>
  );
};

export default CategoryTab;

const DefaultCategoryButton = ({
  isMobile,
  viewType,
  onClickDefaultCategory,
}: {
  isMobile: boolean;
  viewType: contentsViewType;
  onClickDefaultCategory: (props: contentsDefaultCategoryProps) => void;
}) => {
  const openedAllCategoryItems = useAtomValue(openedAllCategoryItemsAtom);
  return (
    <div
      className="mr-[1rem] flex cursor-pointer items-center justify-center whitespace-nowrap pc:min-w-[17.6rem]"
      onClick={() => {
        onClickDefaultCategory({
          isMobile,
          viewType,
          type: openedAllCategoryItems ? "hide" : "show",
        });
      }}
    >
      <div className="relative h-[2rem] w-[2rem]">
        <Image
          src="/static/images/category_default.png"
          alt="default category"
          layout="fill"
        />
      </div>
      <Text type="B5" className="ml-[0.6rem] text-gray-10">
        카테고리
      </Text>
    </div>
  );
};

const CategoryButton = ({
  viewType,
  category,
  categoryKr,
  selectedCategoryTab,
  onClickOpenCategoryItem,
}: {
  viewType: "purchaseGuide" | "encyclopedia";
  category: string;
  categoryKr: string;
  selectedCategoryTab: string;
  onClickOpenCategoryItem: (props: contentsCategoryItemProps) => void;
}) => {
  const isSelected = category === selectedCategoryTab;

  return (
    <Link href={`?selected-tab=${category}`} passHref>
      <div
        className={`cursor-pointer whitespace-nowrap px-[0.6rem] py-[1.2rem] pc:min-w-[17.6rem] pc:text-center ${
          isSelected && "border-blue-7"
        } ${isSelected && viewType === "purchaseGuide" && "border-b-[2px]"}`}
        onClick={() => {
          onClickOpenCategoryItem({ viewType, type: "show" });
        }}
      >
        <p
          className={`${
            isSelected
              ? "text-body-2 font-bold text-blue-7"
              : "text-body-6 font-medium text-gray-10"
          }`}
        >
          {categoryKr}
        </p>
      </div>
    </Link>
  );
};

const CategoryItemList = ({
  viewType,
  parentCategoryList,
  categoryList,
  selectedCategoryTab,
  selectedCategoryItem,
  onClickOpenCategoryItem,
}: {
  viewType: contentsViewType;
  parentCategoryList: { key: string; value: string }[];
  categoryList: ICategory[];
  selectedCategoryTab: string;
  selectedCategoryItem: string;
  onClickOpenCategoryItem: (props: contentsCategoryItemProps) => void;
}) => {
  const openedCategoryItem = useAtomValue(openedCategoryItemAtom);

  const allCategoryBtnText =
    "전체 " +
    parentCategoryList.filter(
      (category) => category.key === selectedCategoryTab
    )[0].value;

  return (
    <div
      className={`absolute w-full ${
        openedCategoryItem && "!visible !max-h-[50rem] !overflow-visible"
      } invisible max-h-0 overflow-hidden transition-all duration-500 ease-in-out`}
    >
      <div className="grid w-full grid-cols-2 bg-gray-1 px-[2rem] py-[1rem] pc:grid-cols-6 pc:px-[10rem]">
        <Link href={`?selected-tab=${selectedCategoryTab}`} passHref>
          <div className="cursor-pointer py-[1.2rem] pl-[0.8rem]">
            <p
              className={`text-body-4 text-gray-10 ${
                selectedCategoryItem === selectedCategoryTab &&
                "text-body-2 font-bold text-blue-7"
              }`}
            >
              {allCategoryBtnText}
            </p>
          </div>
        </Link>
        {categoryList.map((category) => {
          return (
            <Link
              key={category.id}
              href={`?selected-tab=${selectedCategoryTab}&selected-item=${category.key}`}
              passHref
            >
              <div className="cursor-pointer py-[1.2rem] pl-[0.8rem]">
                <p
                  className={`text-body-4 text-gray-10 ${
                    selectedCategoryItem === category.key &&
                    "text-body-2 font-bold text-blue-7"
                  }`}
                >
                  {category.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <div
        className="flex h-[4.4rem] w-full cursor-pointer items-center justify-center border-y-[1px] border-gray-3 bg-white"
        onClick={() => {
          onClickOpenCategoryItem({ viewType, type: "hide" });
        }}
      >
        <div className="rotate-[270deg]">
          <Caret size="2.4rem" />
        </div>
      </div>
    </div>
  );
};
