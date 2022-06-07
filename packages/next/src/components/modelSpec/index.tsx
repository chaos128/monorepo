import { Table } from "@nosearch/ui";
import Image from "next/image";
import { useMemo } from "react";
import useModelSpec from "../../hooks/api/useModelSpec";

export const ModelSpec = ({
  productCategoryKey,
  modelName,
}: {
  productCategoryKey: string;
  modelName: string;
}) => {
  const { modelSpecData, isLoading } = useModelSpec(
    productCategoryKey,
    modelName
  );

  const getTotalRows = useMemo(() => {
    let count = 0;
    modelSpecData?.sections.map((section) => {
      count += section.specCategories.filter(
        (item) => item.value !== "X" && item.value !== "-"
      ).length;
    });
    return count;
  }, [modelSpecData]);

  const getHalfCategoryName = useMemo(() => {
    let count = 0;
    let categoryName = "";
    modelSpecData?.sections.map((section) => {
      if (count > getTotalRows / 2) {
        return;
      }
      categoryName = section.name;
      count += section.specCategories.length;
    });
    return categoryName;
  }, [modelSpecData, getTotalRows]);

  if (!modelSpecData) {
    return null;
  }

  return (
    <div className="p-[2rem] pb-[6rem] pc:p-[3.5rem]">
      <div className="relative mx-auto h-[17.5rem] w-[17.5rem]">
        {modelSpecData.imageUrl && (
          <Image
            priority
            src={modelSpecData.imageUrl}
            alt={modelSpecData.modelName}
            layout="fill"
            objectFit="contain"
          />
        )}
      </div>
      <div className="my-[2rem] h-[1px] w-full bg-gray-3"></div>
      <div className="pc:columns-2 pc:gap-x-[6rem]">
        {modelSpecData.sections &&
          modelSpecData.sections.map((section) => {
            return (
              <div
                key={section.id}
                className={`mb-[3rem] ${
                  section.name === getHalfCategoryName && "break-after-column"
                }`}
              >
                <Table data={section} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default ModelSpec;
