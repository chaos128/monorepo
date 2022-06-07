import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

export const isAppChannelAtom = atom<boolean>(false);
export function useIsAppChannel() {
  const [isApp] = useAtom(isAppChannelAtom);

  return isApp;
}
