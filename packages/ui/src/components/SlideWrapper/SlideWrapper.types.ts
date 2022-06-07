import { CSSProperties } from "react";

export interface SlideWrapperProps {
  children: React.ReactNodeArray;
  size: number;
  buttonStyle?: CSSProperties;
  floatButton?: boolean;
}
