import { useCallback, useEffect, useReducer, useRef } from "react";
import { TFontUnit } from "./Slider.types";
import { moveElementScroll } from "./Slider.utils";

const TOUCH_MOVE_MINIMUM_WIDTH = 5; // rem

function reducer(
  state: {
    numberOfSlides: number;
    index: number;
    opacityList: Array<number>;
    translateList: Array<number>;
    savedTranslateListForTouch: Array<number>;
    autoPlay: boolean;
    startPosition: number;
    unit: TFontUnit;
    sliderWidth: number;
    isTransitionEnd: boolean;
  },
  action: {
    type: string;
    pageIndex?: number;
    startPosition?: number;
    currentPosition?: number;
    endPosition?: number;
  }
) {
  const handleClickPrev = () => {
    const {
      index,
      numberOfSlides,
      translateList,
      opacityList,
      sliderWidth,
      autoPlay,
      savedTranslateListForTouch,
    } = state;

    let newIndex = index - 1;

    const newTranslateList = [...translateList];
    const newOpacityList = [...opacityList];
    for (let i = 0; i < newTranslateList.length; i++) {
      newTranslateList[i] = savedTranslateListForTouch[i] + sliderWidth;
      newOpacityList[i] = 1;
    }

    if (autoPlay) {
      if (newIndex === -1) {
        newIndex = numberOfSlides - 1;
      }
      const outerIndex = newIndex % numberOfSlides;
      newTranslateList[outerIndex] =
        newTranslateList[outerIndex] - sliderWidth * numberOfSlides;
      newOpacityList[outerIndex] = 0;
    }

    return {
      ...state,
      index: newIndex,
      translateList: newTranslateList,
      savedTranslateListForTouch: [...newTranslateList],
      opacityList: newOpacityList,
      isTransitionEnd: false,
    };
  };

  const handleClickNext = () => {
    const {
      index,
      numberOfSlides,
      translateList,
      opacityList,
      sliderWidth,
      autoPlay,
      savedTranslateListForTouch,
    } = state;

    let newIndex = index + 1;
    const newTranslateList = [...translateList];
    const newOpacityList = [...opacityList];

    for (let i = 0; i < newTranslateList.length; i++) {
      newTranslateList[i] = savedTranslateListForTouch[i] - sliderWidth;
      newOpacityList[i] = 1;
    }

    if (autoPlay) {
      if (index === numberOfSlides - 1) {
        newIndex = 0;
      }

      const outerIndex = index % numberOfSlides;
      newTranslateList[outerIndex] =
        newTranslateList[outerIndex] + sliderWidth * numberOfSlides;
      newOpacityList[outerIndex] = 0;
    }

    return {
      ...state,
      index: newIndex,
      translateList: newTranslateList,
      savedTranslateListForTouch: [...newTranslateList],
      opacityList: newOpacityList,
      isTransitionEnd: false,
    };
  };

  switch (action.type) {
    case "handleClickPrev": {
      const { isTransitionEnd } = state;
      if (isTransitionEnd) {
        return handleClickPrev();
      } else {
        return { ...state };
      }
    }
    case "handleClickNext": {
      const { isTransitionEnd } = state;
      if (isTransitionEnd) {
        return handleClickNext();
      } else {
        return { ...state };
      }
    }
    case "handleClickPageIndex": {
      const { index, translateList, opacityList, sliderWidth } = state;
      const { pageIndex } = action;

      if (pageIndex !== undefined) {
        const diff = Math.abs(index - pageIndex);
        const newTranslateList = [...translateList];
        const newOpacityList = [...opacityList];
        for (let i = 0; i < newTranslateList.length; i++) {
          if (pageIndex > index) {
            newTranslateList[i] -= sliderWidth * diff;
          } else {
            newTranslateList[i] += sliderWidth * diff;
          }
          newOpacityList[i] = 1;
        }

        return {
          ...state,
          index: pageIndex,
          translateList: newTranslateList,
          opacityList: newOpacityList,
          savedTranslateListForTouch: [...newTranslateList],
        };
      } else {
        return { ...state };
      }
    }
    case "touchStart": {
      const { startPosition = 0 } = action;
      return { ...state, startPosition };
    }
    case "touchMove": {
      const {
        startPosition,
        translateList,
        unit,
        sliderWidth,
        savedTranslateListForTouch,
        numberOfSlides,
        index,
        autoPlay,
      } = state;

      const { currentPosition = 0 } = action;
      let newCurrentPosition = currentPosition;
      const newSliderWidth =
        sliderWidth * (unit === "rem" ? 10 : 1) + startPosition;
      if (currentPosition > newSliderWidth) {
        newCurrentPosition = newSliderWidth;
      }
      if (currentPosition < 0) {
        newCurrentPosition = 0;
      }
      let offset = newCurrentPosition - startPosition;

      if (
        (!autoPlay && index === 0 && offset > 0) ||
        (index + 1 === numberOfSlides && offset < 0)
      ) {
        return { ...state };
      }

      if (unit === "rem") {
        offset /= 10;
      }

      const newTranslateList = [...translateList];
      for (let i = 0; i < newTranslateList.length; i++) {
        newTranslateList[i] = savedTranslateListForTouch[i] + offset;
      }

      return {
        ...state,
        offset,
        translateList: newTranslateList,
        opacityList: Array.from({ length: numberOfSlides }, () => 1),
      };
    }
    case "touchEnd": {
      const {
        startPosition,
        index,
        numberOfSlides,
        autoPlay,
        savedTranslateListForTouch,
      } = state;
      const { endPosition = 0 } = action;
      const offset = (startPosition - endPosition) / 10;

      if (offset > 0) {
        // Go Next Page
        if (
          (autoPlay || index < numberOfSlides - 1) &&
          offset > TOUCH_MOVE_MINIMUM_WIDTH
        ) {
          return handleClickNext();
        }
      } else {
        // Go Prev Page
        if ((autoPlay || index > 0) && -offset > TOUCH_MOVE_MINIMUM_WIDTH) {
          return handleClickPrev();
        }
      }
      return {
        // bounce back
        ...state,
        translateList: [...savedTranslateListForTouch],
      };
    }
    case "transitionEnd": {
      return {
        ...state,
        isTransitionEnd: true,
      };
    }
    default:
      throw new Error();
  }
}

const useSlider = ({
  numberOfSlides,
  autoPlay,
  sliderWidth,
  autoPlayInterval,
  unit,
}: {
  numberOfSlides: number;
  autoPlay: boolean;
  sliderWidth: number;
  autoPlayInterval: number;
  unit: TFontUnit;
}) => {
  const thumbnailElement = useRef(null);
  const sliderContainer = useRef(null);

  const [
    { opacityList, translateList, index: currentIndex },
    dispatch,
  ] = useReducer(reducer, {
    numberOfSlides,
    index: 0,
    opacityList: Array.from({ length: numberOfSlides }, () => 1),
    translateList: Array.from({ length: numberOfSlides }, () =>
      autoPlay ? -sliderWidth : 0
    ),
    savedTranslateListForTouch: Array.from({ length: numberOfSlides }, () =>
      autoPlay ? -sliderWidth : 0
    ),
    sliderWidth,
    autoPlay,
    startPosition: 0,
    unit,
    isTransitionEnd: true,
  });

  const prev = useCallback(() => {
    dispatch({ type: "handleClickPrev" });
  }, []);

  const next = useCallback(() => {
    dispatch({ type: "handleClickNext" });
  }, []);

  // Use useCallback to prevent re-rendering SilderThunmnail when touchmove event fires
  const moveToSelectedIndex = useCallback((pageIndex: number) => {
    moveElementScroll(thumbnailElement, pageIndex * 60);
    dispatch({ type: "handleClickPageIndex", pageIndex });
  }, []);

  function touchStart(startPosition: number) {
    dispatch({ type: "touchStart", startPosition });
  }

  function touchMove(currentPosition: number) {
    dispatch({ type: "touchMove", currentPosition });
  }

  function touchEnd(endPosition: number) {
    dispatch({ type: "touchEnd", endPosition });
  }

  useEffect(() => {
    let intervalID: NodeJS.Timer | undefined;

    if (autoPlay) {
      intervalID = setInterval(() => {
        next();
      }, autoPlayInterval);
    }

    if (sliderContainer && sliderContainer.current) {
      const currentSliderContainer = sliderContainer.current as HTMLElement;

      currentSliderContainer.addEventListener("touchstart", (e) => {
        if (autoPlay) {
          if (intervalID !== undefined) {
            clearInterval(intervalID);
          }
        }

        Array.from(currentSliderContainer.getElementsByTagName("li")).forEach(
          (li) => {
            li.style.transitionDuration = "0ms";
          }
        );

        touchStart(e.touches[0].pageX);
      });

      currentSliderContainer.addEventListener("touchmove", (e) => {
        touchMove(e.targetTouches[0].pageX);
      });

      currentSliderContainer.addEventListener("touchend", (e) => {
        Array.from(currentSliderContainer.getElementsByTagName("li")).forEach(
          (li) => {
            li.style.transitionDuration = "";
          }
        );

        touchEnd(e.changedTouches[0].pageX);
        if (autoPlay) {
          intervalID = setInterval(() => {
            next();
          }, autoPlayInterval);
        }
      });

      currentSliderContainer.addEventListener("transitionend", () => {
        dispatch({ type: "transitionEnd" });
      });
    }

    return () => {
      if (intervalID !== undefined) {
        clearInterval(intervalID);
      }
    };
  }, [autoPlay, autoPlayInterval, next]);

  useEffect(() => {
    if (thumbnailElement?.current) {
      moveElementScroll(
        thumbnailElement,
        ((thumbnailElement.current as HTMLElement).scrollHeight *
          (currentIndex - 1)) /
          numberOfSlides
      );
    }
  }, [currentIndex, numberOfSlides]);

  return {
    prev,
    next,
    moveToSelectedIndex,
    currentIndex,
    translateList,
    opacityList,
    thumbnailElement,
    sliderContainer,
  };
};

export default useSlider;
