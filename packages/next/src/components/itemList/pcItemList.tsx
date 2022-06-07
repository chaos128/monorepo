import { Heading } from "@nosearch/ui";
import Link from "../../components/Link";
import { useCategories } from "../../hooks/api/useCategories";
import { contentsViewType } from "../contents/category/useContentsCategory";

type ItemListType = "category" | "purchaseGuide" | "encyclopedia" | "store";
type CategoryType = "living" | "kitchen" | "season" | "digitalit";

const PcItemList = ({
  viewType,
  onCloseDefaultCategoryOfContents,
}: {
  viewType: ItemListType;
  onCloseDefaultCategoryOfContents?: (props: {
    viewType: contentsViewType;
  }) => void;
}) => {
  const { homeSortCategoryMap } = useCategories();

  const categoryGroupList = [
    { key: "living", value: "생활가전 🛋" },
    { key: "kitchen", value: "주방가전 🍽" },
    { key: "season", value: "계절가전 🌷" },
    { key: "digitalit", value: " 디지털·IT 🖥" },
  ];

  const getItemLink = (props: {
    viewType: ItemListType;
    category: CategoryType;
    categoryItem: string;
  }) => {
    const { viewType, category, categoryItem } = props;
    if (viewType === "category") {
      return `/recommendation/pick/${category}/${categoryItem}`;
    } else if (viewType === "purchaseGuide") {
      return `/contents/guide?selected-tab=${category}&selected-item=${categoryItem}`;
    } else if (viewType === "encyclopedia") {
      return `/contents/encyclopedia?selected-tab=${category}&selected-item=${categoryItem}`;
    } else {
      return "";
    }
  };

  if (!homeSortCategoryMap) {
    return null;
  }

  return (
    <div
      className={`grid grid-cols-4 gap-[4rem] ${
        (viewType === "purchaseGuide" || viewType === "encyclopedia") &&
        "bg-gray-1 py-[2rem] px-[3rem]"
      }`}
    >
      {categoryGroupList.map((category) => {
        return (
          <PcCategoryGroupView
            key={category.value}
            viewType={viewType}
            homeSortCategoryMap={homeSortCategoryMap}
            category={category.key}
            categoryKr={category.value}
            getItemLink={getItemLink}
            onCloseDefaultCategoryOfContents={onCloseDefaultCategoryOfContents}
          />
        );
      })}
    </div>
  );
};

export default PcItemList;

const PcCategoryGroupView = ({
  homeSortCategoryMap,
  viewType,
  category,
  categoryKr,
  getItemLink,
  onCloseDefaultCategoryOfContents,
}: {
  homeSortCategoryMap: any;
  viewType: any;
  category: any;
  categoryKr: any;
  getItemLink: any;
  onCloseDefaultCategoryOfContents: any;
}) => {
  return (
    <div className="mr-[4rem]">
      <Heading level={4} className="mb-[1rem] text-gray-10">
        {categoryKr}
      </Heading>
      <div className="grid grid-cols-2 gap-[1.1rem]">
        {homeSortCategoryMap[`${category}`] &&
          homeSortCategoryMap[`${category}`].map((_category: any) => {
            return (
              <Link
                href={getItemLink({
                  viewType,
                  category,
                  categoryItem: _category?.key,
                })}
                passHref
                key={_category.id}
              >
                <div
                  className="flex h-[4.5rem] w-[11rem] cursor-pointer items-center pl-[1rem] text-body-7 font-normal hover:bg-blue-1 hover:text-body-4 hover:font-bold hover:text-blue-7"
                  onClick={() => {
                    if (
                      viewType === "purchaseGuide" ||
                      viewType === "encyclopedia"
                    ) {
                      onCloseDefaultCategoryOfContents &&
                        onCloseDefaultCategoryOfContents({ viewType });
                    }
                  }}
                >
                  <div className="flex">
                    {_category.name}
                    {_category.isNew && (
                      <div className="ml-[0.5rem] h-[0.5rem] w-[0.5rem] rounded-full bg-red-4"></div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
