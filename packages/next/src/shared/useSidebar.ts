import { useEffect } from "react";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { useAtom } from "jotai";
import { useInView } from "react-intersection-observer";

export const sidebarOpenAtom = atomWithReset<boolean>(false);

export function useSidebar() {
  const [targetRef, inView] = useInView();

  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const resetSidebarOpen = useResetAtom(sidebarOpenAtom);

  useEffect(() => {
    setSidebarOpen(inView);

    return () => {
      resetSidebarOpen();
    };
  }, [inView]);

  return {
    targetRef,
    resetSidebarOpen,
  };
}
