// Generated with util/create-component.js
import { Provider } from "jotai";
import React, { cloneElement } from "react";
import { TabsProps } from "./Tabs.types";

const Tabs: React.FC<TabsProps> = ({ children, defaultIndex, uniqueKey }) => {
  return (
    <Provider>
      <div data-testid="Tabs" className="nrc--Tabs">
        {React.Children.toArray(children).map((x) => {
          if ((x as any).props.__TYPE === "TabList") {
            return cloneElement(x as React.ReactElement, {
              defaultIndex: defaultIndex,
              parentKey: uniqueKey,
            });
          }
          return x;
        })}
      </div>
    </Provider>
  );
};

export default Tabs;
