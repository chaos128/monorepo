import { useAtom } from "jotai";
import { isMobileAtomPrimitive } from "./useWindowWidth";

const useMobileDetect = () => {
  const [isMobile, _] = useAtom(isMobileAtomPrimitive);

  return { isMobile };
};

export { useMobileDetect };
