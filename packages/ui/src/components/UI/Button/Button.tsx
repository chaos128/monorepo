import React, { createRef, useEffect, useMemo } from "react";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = (props) => {
  const ref = createRef<HTMLButtonElement>();
  const size = props.size || "m";
  const className = useMemo(() => {
    const type = props.type || "primary";
    const color = props.color || "blue";
    const radius = props.radius || "s";
    const disabled = props.disabled || false;
    return getClassName({
      size: size,
      type: type,
      color: color,
      radius: radius,
      disabled: disabled,
    });
  }, [props]);

  useEffect(() => {
    addRippleEffect(ref);
  }, []);

  return (
    <div
      data-testid="Button"
      className={`${props.fluid ? "" : "inline-block"} ${props.className}`}
    >
      <button
        ref={ref}
        className={`${className} relative w-full select-none overflow-hidden`}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.prefix && (
          <span
            className={`${
              ["m", "s"].indexOf(size) > -1 ? "mr-[0.4rem]" : "mr-[0.8rem]"
            }`}
          >
            {props.prefix}
          </span>
        )}
        {props.children}
        {props.suffix && (
          <span
            className={`${
              ["m", "s"].indexOf(size) > -1 ? "ml-[0.4rem]" : "ml-[0.8rem]"
            }`}
          >
            {props.suffix}
          </span>
        )}
      </button>
    </div>
  );
};

function getClassName(props: ButtonProps): string {
  let className =
    "flex justify-center items-center min-w-[10rem] hover:opacity-90 active:scale-95 transition-all px-[1.3rem]";

  //radius
  switch (props.radius) {
    case "xl":
      className += " rounded-[2.2rem]";
      break;
    case "l":
      className += " rounded-[2.0rem]";
      break;
    case "m":
      className += " rounded-[1.8rem]";
      break;
    case "s":
      className += " rounded-[1rem]";
      break;
  }

  //size
  switch (props.size) {
    case "xl":
      className += " h-[5rem] text-heading-5 font-bold";
      break;
    case "l":
      className += " h-[4.4rem] text-body-2 font-bold";
      break;
    case "m":
      className += " h-[4rem] text-body-5 font-bold";
      break;
    case "s":
      className += " h-[3.6rem] text-body-8 font-bold";
      break;
  }

  //type
  switch (props.type) {
    case "cta":
      switch (props.color) {
        case "blue":
          if (!props.disabled) className += ` bg-primary text-white`;
          break;
        case "gray":
          if (!props.disabled) className += ` bg-gray-7 text-white`;
          break;
      }
      break;
    case "primary":
      //color
      switch (props.color) {
        case "blue":
          if (!props.disabled) className += " bg-blue-2 text-primary";
          break;
        case "gray":
          if (!props.disabled) className += " bg-gray-2 text-gray-10";
          break;
      }
      break;
    case "outline":
      className += " border text-primary bg-white";
      //color
      switch (props.color) {
        case "blue":
          if (!props.disabled)
            className += " border-primary text-primary active:bg-blue-1";
          break;
        case "gray":
          if (!props.disabled) className += " border-gray-3 text-gray-10";
          break;
      }
      break;
  }

  //disabled
  if (props.disabled) {
    className += " cursor-not-allowed";
    switch (props.type) {
      case "cta":
      case "primary":
        className += " bg-gray-2 text-gray-6";
        break;
      case "outline":
        className += " border-gray-4 text-gray-4";
        break;
    }
  }

  if (props.className) {
    className += ` ${props.className}`;
  }

  return className;
}

function addRippleEffect(ref: React.RefObject<HTMLButtonElement>) {
  function rippleEffect(event: any) {
    const btn = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
    circle.classList.add("ripple");

    const ripple = btn.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    btn.appendChild(circle);
  }

  ref.current?.addEventListener("click", rippleEffect);
}

export default Button;
