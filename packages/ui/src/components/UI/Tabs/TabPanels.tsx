import { motion } from "framer-motion";
import { useAtom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import { selectedIndexAtom } from "./TabList";

const TabPanels = (props: { children?: React.ReactNode; eager?: boolean }) => {
  const { tabPanels } = useTabPanel(props.children);
  const [index, setIndex] = useAtom(selectedIndexAtom);
  const [loadingMap, setLoadingMap] = useState<{ [key: number]: boolean }>({});
  useEffect(() => {
    if (index != null && !loadingMap[index]) {
      const assigned = Object.assign({}, loadingMap);
      assigned[index] = true;
      setLoadingMap(assigned);
    }
  }, [index]);
  return (
    <div
      className="flex overflow-hidden w-full"
      // animate={props.eager && index ? { x: `-${100 * index}%` } : undefined}
    >
      {index !== null &&
        index > -1 &&
        tabPanels.map((tabPanel, i) => (
          <motion.div
            key={i}
            transition={{
              type: "ease",
            }}
            className="w-full"
            style={{ flex: "0 0 100%" }}
            initial={{ x: `-${index * 100}%` }}
            animate={{ x: `-${index * 100}%`, opacity: index === i ? 1 : 0 }}
          >
            {(props.eager || index === i || loadingMap[i]) &&
              React.cloneElement(tabPanel, {
                key: `tabPanel-${i}`,
              })}
          </motion.div>
        ))}
    </div>
  );
};

const useTabPanel = (children: React.ReactNode) => {
  const tabPanels = useMemo(() => {
    const tabPanels: React.ReactElement[] = [];

    React.Children.toArray(children).map((x) => {
      if ((x as any).props.__TYPE === "TabPanel") {
        tabPanels.push(x as React.ReactElement);
      }
    });
    return tabPanels;
  }, [children]);

  return {
    tabPanels,
  };
};

TabPanels.defaultProps = {
  __TYPE: "TabPanels",
};
export default TabPanels;
