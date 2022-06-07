import { useEffect, useState } from "react";

const useAppDetect = () => {
  // WILL REPLACE useIsAppChannel
  const APP_USER_AGENT_STRING = "flutter"; // NEED TO SYNC WITH FLUTTER APP
  const [isApp, setIsApp] = useState<boolean>(false);

  useEffect(() => {
    if (navigator.userAgent.indexOf(APP_USER_AGENT_STRING) >= 0) {
      setIsApp(true);
    }
  }, []);

  return {
    isApp,
  };
};

export default useAppDetect;
