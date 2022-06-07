import { Text } from "@nosearch/ui";
import { ISpecCategory } from "ns-ts-interfaces";

interface ICompareProductSpecItemProps extends ISpecCategory {
  isSameWithFirst: boolean;
}

const CompareProductSpecItem = ({
  spec,
}: {
  spec: ICompareProductSpecItemProps;
}) => {
  const { name, value, unit, isSameWithFirst } = spec;

  const valueString = value === "-" ? "-" : `${value} ${unit ?? ""}`;

  return (
    <div className="p-[0.5rem]">
      <Text type="B9" className="text-gray-6">
        {name}
      </Text>
      <Text type={`${isSameWithFirst ? "B7" : "B8"}`} className="text-gray-10">
        {valueString}
      </Text>
    </div>
  );
};

export default CompareProductSpecItem;
