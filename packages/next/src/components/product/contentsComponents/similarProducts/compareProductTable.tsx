import { IDocumentWithSpec } from "ns-ts-interfaces";
import { useMemo } from "react";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import CompareProductHeader from "./compareProductHeader";
import CompareProductSpecItem from "./compareProductSpecItem";
import { COMPARE_TABLE_WIDTH, COMPARE_TABLE_WIDTH_PC } from "./similarProducts";

const CompareProductTable = ({
  modelSpecData,
  bannedCategoryMap,
  currentModelName,
  categoryKey,
}: {
  currentModelName: string;
  modelSpecData: IDocumentWithSpec[];
  categoryKey: string;
  bannedCategoryMap?: Map<string, boolean>;
}) => {
  const { isMobile } = useMobileDetect();

  const productInfos = useMemo(() => {
    return modelSpecData.map((modelSpecData) => {
      const { sections, imageUrl, pickType, modelName, productCategoryKey } =
        modelSpecData;

      return {
        specCategories: sections[0].specCategories,
        imageUrl,
        pickType,
        modelName,
        productCategoryKey,
      };
    });
  }, [modelSpecData]);

  const productSpecCategories = useMemo(() => {
    // 첫 스펙은 제품 정보로 위쪽에서 처리합니다.
    const sectionLength = modelSpecData[0].sections.length - 2;

    const modelSpecSections = Array(sectionLength)
      .fill(0)
      .map((_, index) => {
        return modelSpecData.map(
          (modelSpec) => modelSpec.sections[index + 1].specCategories
        );
      });

    return modelSpecSections.flatMap((sections) => {
      const sectionLength = sections[0].length;

      return Array(sectionLength)
        .fill(0)
        .map((_, i) => {
          const categoryName = sections[0][i].name;
          if (
            categoryName &&
            bannedCategoryMap &&
            bannedCategoryMap.has(categoryName)
          ) {
            return [];
          }
          return sections.map((section) => {
            return {
              ...section[i],
              isSameWithFirst: sections[0][i].value === section[i].value,
            };
          });
        })
        .filter((sections) => sections.length > 0);
    });
  }, [modelSpecData, bannedCategoryMap]);

  return (
    <table
      className="table-fixed border-collapse break-all bg-white text-center"
      style={{
        width: `${
          isMobile
            ? COMPARE_TABLE_WIDTH * (modelSpecData.length - 1)
            : COMPARE_TABLE_WIDTH_PC * (modelSpecData.length - 1)
        }rem`,
      }}
    >
      <tbody>
        <tr className="border-t-[1px] border-gray-2 last:border-b-[1px]">
          {productInfos.map((productInfo, index) => {
            const { modelName, productCategoryKey, ...rest } = productInfo;
            return (
              <td
                key={modelName + index}
                className="w-[13rem] border-l-[1px] border-gray-2 align-top last:border-r-[1px] pc:w-[20rem]"
              >
                <CompareProductHeader
                  currentModelName={currentModelName}
                  modelName={modelName}
                  {...rest}
                />
              </td>
            );
          })}
        </tr>
        {productSpecCategories?.map((specCategories, index) => {
          return (
            <tr
              key={index}
              className="border-t-[1px] border-gray-2 last:border-b-[1px]"
            >
              {specCategories.map((spec, i) => {
                return (
                  <td
                    key={spec.name + i}
                    className="border-l-[1px] border-gray-2 align-top last:border-r-[1px]"
                  >
                    <CompareProductSpecItem spec={spec} />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CompareProductTable;
