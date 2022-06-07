import { atom, useAtom } from "jotai";
import React, { useEffect, useMemo } from "react";
import Sticky from "react-stickynode";

export const selectedIndexAtom = atom<number>(-1);
const TabList = (props: {
  children?: React.ReactNode;
  defaultIndex?: number;
  parentKey?: string;
  sticky?: boolean;
  tabWidth?: string;
}) => {
  const { tabs } = useTab(props.children);
  const [index, setIndex] = useAtom(selectedIndexAtom);
  useEffect(() => {
    props.defaultIndex ? setIndex(props.defaultIndex) : setIndex(0);
  }, []);

  return (
    <Sticky enabled={props.sticky || false} innerZ={100}>
      <div className="flex justify-around w-full overflow-auto bg-white border-b hide-scroll border-gray-3">
        <div
          className={`flex overflow-x-auto `}
          //style={{ minWidth: `${8 * tabs.length}rem` }}
        >
          <ul
            // className="bg-white border-b border-gray-3"
            style={{ flex: "0 0 100%" }}
          >
            {tabs.map((tab, i) =>
              React.cloneElement(tab, {
                key: `tab-${i}`,
                selected: i === index,
                parentKey: props.parentKey,
                onClick: () => {
                  setIndex(i);
                },
                tabWidth: props.tabWidth,
              })
            )}
          </ul>
        </div>
      </div>
    </Sticky>
  );
};

const useTab = (children: React.ReactNode) => {
  const tabs = useMemo(() => {
    const tabs: React.ReactElement[] = [];

    React.Children.toArray(children).map((x) => {
      if ((x as any).props.__TYPE === "Tab") {
        tabs.push(x as React.ReactElement);
      }
    });
    return tabs;
  }, [children]);

  return {
    tabs,
  };
};

TabList.defaultProps = {
  __TYPE: "TabList",
};
export default TabList;
