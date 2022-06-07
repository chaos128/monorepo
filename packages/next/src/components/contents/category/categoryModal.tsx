import { useAtomValue } from "jotai";
import Link from "next/link";
/* import {
  Heading,
  Modal,
  ModalBody,
  ModalHeader,
} from "@nosearch/ui"; */
import { useEffect, useState } from "react";
import { ICategory, useCategories } from "../../../hooks/api/useCategories";
import {
  openedMobileAllCategoryItemsAtom,
  //parentCategoryList,
  useContentsCategory,
} from "./useContentsCategory";

const CategoryModal = ({
  type,
}: {
  type: "purchaseGuide" | "encyclopedia";
}) => {
  const openedMobileAllCategoryItems = useAtomValue(
    openedMobileAllCategoryItemsAtom
  );

  const { homeSortCategoryMap, mainCategoryHintMap } = useCategories();
  const { onCloseMobileAllCategoryItems } = useContentsCategory();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const onCloseModal = () => {
    close();
    onCloseMobileAllCategoryItems();
  };

  useEffect(() => {
    if (!openedMobileAllCategoryItems) {
      return;
    }
    open();
    setSelectedCategory("");
    onCloseMobileAllCategoryItems();
  }, [openedMobileAllCategoryItems]);

  if (!homeSortCategoryMap) {
    return null;
  }

  return (
    <div>
      {/* <Modal
        visible={false}
        onClose={() => {}}
        drawer
        drawerDirection="bottom"
        styleFor={{
          radius: "rounded-t-[15px]",
        }}
      >
        <ModalHeader>
          <Heading level={4} className="pt-[1.7rem] text-center text-gray-10">
            전체 카테고리
          </Heading>
        </ModalHeader>
        <ModalBody>
          {parentCategoryList.map((category) => {
            return (
              <Link
                key={`mobileContentCategory_${category.key}`}
                href={
                  type === "purchaseGuide"
                    ? "/contents/guide"
                    : "/contents/encyclopedia"
                }
                passHref
              >
                <div
                  onClick={() => {
                    if (category.value === "전체") onCloseModal();
                    setSelectedCategory(category.key);
                  }}
                >
                  <Heading
                    level={6}
                    className="py-[1.6rem] text-center text-gray-10"
                  >
                    {category.value}
                  </Heading>
                  {selectedCategory === category.key && (
                    <CategoryItemList
                      category={category.key}
                      categoryKr={category.value}
                      categoryList={homeSortCategoryMap[selectedCategory]}
                      onCloseModal={onCloseModal}
                      mainCategoryHintMap={mainCategoryHintMap}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </ModalBody>
      </Modal> */}
    </div>
  );
};

export default CategoryModal;

const CategoryItemList = ({
  category,
  categoryKr,
  categoryList,
  onCloseModal,
  mainCategoryHintMap,
}: {
  category: string;
  categoryKr: string;
  categoryList: ICategory[];
  onCloseModal: () => void;
  mainCategoryHintMap: {
    [key: string]: string;
  };
}) => {
  if (!categoryList) {
    return null;
  }

  return (
    <div className="grid w-full grid-cols-2 bg-gray-1 p-[2rem]">
      <Link href={`?selected-tab=${category}`} passHref>
        <div
          className="py-[1.2rem] pl-[0.8rem]"
          onClick={() => {
            onCloseModal();
          }}
        >
          <p className="text-body-4 text-gray-10">전체 {categoryKr}</p>
        </div>
      </Link>
      {categoryList.map((category) => {
        return (
          <Link
            key={`mobileContentCategoryItem_${category.id}`}
            href={`?selected-tab=${
              mainCategoryHintMap[category.key]
            }&selected-item=${category.key}`}
            passHref
          >
            <div
              className="py-[1.2rem] pl-[0.8rem]"
              onClick={() => {
                onCloseModal();
              }}
            >
              <p className="text-body-4 text-gray-10">{category.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
