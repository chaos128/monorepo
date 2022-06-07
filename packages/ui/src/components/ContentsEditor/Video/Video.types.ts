// Generated with util/create-component.js
import { CSSProperties } from "react";

export interface VideoProps
  extends Partial<
    Pick<
      HTMLVideoElement,
      "preload" | "controls" | "autoplay" | "src" | "muted" | "loop" | "poster"
    >
  > {
  title?: string;
  description?: string;
  widthRatio?: number;
  heightRatio?: number;
  style?: CSSProperties;
  isIOSApp?: boolean;
  outerVideoDivClassname?: string;
}
