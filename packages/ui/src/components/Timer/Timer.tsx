// Generated with util/create-component.js
import React, { useEffect, useRef, useState } from "react";
import Label from "../Label";
import Text from "../UI/Text";
import { TimerProps } from "./Timer.types";

const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Timer: React.FC<TimerProps> = (props: TimerProps) => {
  const {
    id,
    type = "timedeal",
    periodDiscountStart,
    periodDiscountEnd,
    benefitUseType,
    timerText,
  } = props;

  if (!periodDiscountStart || !periodDiscountEnd) return null;

  const TIME_FOR_TIMER_COLOR = 86400000; // 1 day

  const getTimerText = (_differenceTime: number): string => {
    const secondsInMs = Math.floor(_differenceTime / 1000);
    const minutesInMs = Math.floor(secondsInMs / 60);
    const hoursInMs = Math.floor(minutesInMs / 60);
    const days = Math.floor(hoursInMs / 24);
    const seconds = secondsInMs % 60;
    const minutes = minutesInMs % 60;
    const hours = hoursInMs % 24;

    const daysStr = `${days}일 `;
    const hoursStr = `${hours < 10 ? `0${hours}` : hours}:`;
    const minutesStr = `${minutes < 10 ? `0${minutes}` : minutes}`;
    const secondsStr = `${seconds < 10 ? `0${seconds}` : seconds}`;

    if (days > 0) return `${daysStr}${hoursStr}${minutesStr}`;
    else return `${hoursStr}${minutesStr}:${secondsStr}`;
  };

  const ddate: Date = new Date(periodDiscountEnd.replace(/-/gi, "/"));
  const now = new Date();
  const [differenceTime, setDifferenceTime] = useState(
    Number(new Date(+ddate - +now))
  );
  const startTime = new Date(periodDiscountStart.replace(/-/gi, "/")).getTime();
  const endTime = new Date(periodDiscountEnd.replace(/-/gi, "/")).getTime();
  const nowTime = new Date().getTime();

  if (
    benefitUseType !== "periodDiscount" ||
    startTime > nowTime ||
    nowTime >= endTime
  ) {
    useInterval(() => {}, 0);
    return <div></div>;
  }

  useInterval(() => {
    setDifferenceTime(differenceTime - 1000);
  }, 1000);

  return (
    <div data-testid="Timer" className="nrc--Time" id={id}>
      <Label
        className={`${type === "timedeal" && "absolute bottom-0"} ${
          differenceTime < TIME_FOR_TIMER_COLOR ? "bg-red-3" : "bg-gray-9"
        }`}
        fluid
      >
        <Text
          type="B8"
          className={`${
            differenceTime < TIME_FOR_TIMER_COLOR ? "text-black" : "text-white"
          }`}
          aria-label="타임딜 남은 시간"
        >
          {getTimerText(differenceTime)} {timerText}
        </Text>
      </Label>
    </div>
  );
};

export default Timer;
