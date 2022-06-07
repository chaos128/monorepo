export type TFontUnit = "rem" | "px";

export interface SliderProps {
  sliderWidth: number;
  sliderHeight: number;
  unit?: TFontUnit;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showPageIndex?: boolean;
  showPageIndicator?: boolean;
  showPrevNextButton?: boolean;
  showThumbnails?: boolean;
  showThumbnailCaret?: boolean;
  thumbnailWidth?: number;
  thumbnailGap?: number;
}
