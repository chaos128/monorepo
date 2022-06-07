import { useCategories } from "../../hooks/api/useCategories";
import { HomeParentKey } from "../../pageComponents/Home";
import Item from "./item";

const MobileItemList = ({ parentKey }: { parentKey: HomeParentKey }) => {
  const { homeSortCategoryMap, mainCategoryHintMap } = useCategories();
  if (
    !homeSortCategoryMap ||
    !homeSortCategoryMap[parentKey ? parentKey : "living"]
  ) {
    return null;
  }

  return (
    <div className="m-[2rem] grid grid-cols-4 gap-[1.2rem] pc:mx-[6rem] pc:flex pc:space-x-[2rem]">
      {homeSortCategoryMap[parentKey ? parentKey : "living"].map(
        (_data, i: number) => {
          return (
            <Item
              key={`item_${i}`}
              data={_data}
              type="item"
              parentCategory={mainCategoryHintMap[_data.key]}
            />
          );
        }
      )}
    </div>
  );
};

export default MobileItemList;
