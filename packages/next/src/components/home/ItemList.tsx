import { Heading } from "@nosearch/ui";
import { useCategories } from "../../hooks/api/useCategories";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../../pageComponents/Home";
import Item from "../itemList/item";

const ItemList = ({ parentKey }: { parentKey: HomeParentKey }) => {
  const { isMobile } = useMobileDetect();
  const { homeCategoryMap } = useCategories();

  if (!homeCategoryMap) {
    return null;
  }

  return (
    <div className="pt-[2rem] pb-[4rem]">
      <div className="mb-[2rem] text-center">
        <Heading level={6} className="pc:text-heading-5">
          어떤 제품을 찾고 있나요?
        </Heading>
      </div>
      <div className="mx-[2rem] grid grid-cols-4 gap-[1.2rem] pc:flex pc:justify-center pc:space-x-[2rem]">
        {homeCategoryMap[parentKey !== "all" ? parentKey : "recommend"].map(
          (_data, i: number) => {
            if ((isMobile && i > 6) || (!isMobile && i > 8)) return;
            return (
              <Item
                key={`item_${i}`}
                data={_data}
                type="item"
                parentCategory={parentKey}
              />
            );
          }
        )}
        <Item type="moreBtn" parentCategory={parentKey} />
      </div>
    </div>
  );
};

export default ItemList;
