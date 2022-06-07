// Generated with util/create-component.js
import React from "react";
import Heading from "../Heading";
import Text from "../Text";
import { TableProps } from "./Table.types";

const Table: React.FC<TableProps> = (props) => {
  const { name, specCategories } = props.data;

  return (
    <div data-testid="Table" className="nrc--Table">
      {name && (
        <Heading level={5} className="text-gray-10 mb-[1.2rem]">
          {name}
        </Heading>
      )}
      <div>
        {specCategories.map((spec) => {
          if (spec.value === "-" || spec.value === "X") return;
          return (
            <div
              key={`${spec.name}:${spec.value}`}
              className="grid"
              style={{ gridTemplateColumns: "13rem 1fr" }}
            >
              <Text
                type="B4"
                className="text-gray-10 border-[1px] border-r-0 border-gray-3 bg-gray-1 py-[0.9rem] px-[1.2rem] whitespace-nowrap"
              >
                {spec.name}
              </Text>
              <Text
                type="B4"
                className="text-gray-10 border-[1px] border-gray-3 py-[0.9rem] px-[1.2rem]"
              >
                {spec.value}
                {spec.unit}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
