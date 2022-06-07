import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { PC_BREAKPOINT } from "../shared/variables";

export const isMobileAtomPrimitive = atom<boolean>(false);
const writeIsMobileAtom = atom(null, (get, set, update: boolean) => {
  if (get(isMobileAtomPrimitive) !== update) {
    set(isMobileAtomPrimitive, update);
  }
});

const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(
    global.window ? global.window.innerWidth : 375
  );
  const [, setIsMobileAtom] = useAtom(writeIsMobileAtom);

  function handleWindowSizeChange() {
    setWidth(global.window.innerWidth);
    setIsMobileAtom(global.window.innerWidth < PC_BREAKPOINT);
  }

  useEffect(() => {
    handleWindowSizeChange();

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { windowWidth: width };
};

export { useWindowWidth };
