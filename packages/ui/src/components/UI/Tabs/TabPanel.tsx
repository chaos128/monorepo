import React from "react";

const TabPanel = (props: { children?: React.ReactNode }) => {
  return <div>{props.children}</div>;
};
TabPanel.defaultProps = {
  __TYPE: "TabPanel",
};

export default TabPanel;
