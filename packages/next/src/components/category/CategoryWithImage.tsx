import { Text } from "@nosearch/ui";
import Image from "next/image";
import Link from "../../components/Link";
import { ICategory } from "../../hooks/api/useCategories";
import { rgbDataURL } from "../../shared/utils";

const CategoryWithImage = ({
  data,
  type,
  parentCategory,
}: {
  data?: ICategory;
  type: "item" | "moreBtn";
  parentCategory?: string;
}) => {
  const imgName = type === "item" ? `${data?.key}_grey_circle` : "option_plus";

  if (type === "item" && !data) {
    return null;
  }

  return (
    <Link
      href={
        type === "item"
          ? `/recommendation/pick/${
              parentCategory ? parentCategory : data?.parentKey
            }/${data?.key}`
          : parentCategory
          ? `/recommendation/item-list?selected-tab=${parentCategory}`
          : "/recommendation/item-list"
      }
      passHref
    >
      <div className="flex cursor-pointer flex-col items-center">
        <div className="relative flex h-[8rem] w-[8rem] items-center justify-center rounded-[20px] bg-gray-1 pc:border-[1px] pc:border-gray-2">
          <Image
            src={`https://nosearch.com/static/webp/images/${imgName}.webp`}
            width={type === "item" ? 70 : 24}
            height={type === "item" ? 70 : 24}
            objectFit="contain"
            alt={type === "item" ? data?.name : "show all categories button"}
            placeholder="blur"
            blurDataURL={rgbDataURL(238, 238, 238)}
          />
          {data?.isNew && (
            <div className="absolute top-0 right-0 flex h-[1.6rem] w-[1.6rem] items-center justify-center rounded-[5px] bg-red-4 text-[1rem] font-bold text-white">
              N
            </div>
          )}
        </div>
        <Text type="B10" className="mt-[0.4rem] text-black pc:text-body-4">
          {type === "item" ? data?.name : "전체보기"}
        </Text>
      </div>
    </Link>
  );
};

export default CategoryWithImage;
