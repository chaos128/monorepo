// Generated with util/create-component.js
import { Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import { Caret } from "../Icon";
import Button from "./Button";

export default {
  title: "UI/Button",
  component: Button,
} as Meta;

export const CTAButton = () => (
  <NosearchProvider>
    <div className="flex space-x-10">
      <div className="flex flex-col space-y-3">
        <div>
          <Button
            size="xl"
            fluid
            type="cta"
            onClick={() => {
              console.log("button clicked");
            }}
            className="w-[30rem]"
          >
            구매하기
          </Button>
        </div>
        <div>
          <Button size="l" type="cta">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="m" type="cta">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="s" type="cta">
            구매하기
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div>
          <Button size="xl" type="cta" color="gray">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="l" type="cta" color="gray">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="m" type="cta" color="gray">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="s" type="cta" color="gray">
            구매하기
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div>
          <Button size="xl" type="cta" color="gray" disabled>
            구매하기
          </Button>
        </div>
        <div>
          <Button size="l" type="cta" color="gray" disabled>
            구매하기
          </Button>
        </div>
        <div>
          <Button size="m" type="cta" color="gray" disabled>
            구매하기
          </Button>
        </div>
        <div>
          <Button size="s" type="cta" color="gray" disabled>
            구매하기
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div>
          <Button
            size="xl"
            type="cta"
            prefix={<Caret size={"2.4rem"} color="white" />}
            suffix={<Caret size={"2.4rem"} color="white" />}
          >
            구매하기
          </Button>
        </div>
        <div>
          <Button
            size="l"
            type="cta"
            suffix={
              <div className="rotate-90">
                <Caret size={"2.0rem"} color="white" />
              </div>
            }
          >
            구매하기
          </Button>
        </div>
        <div>
          <Button
            size="m"
            type="cta"
            suffix={<Caret size={"1.8rem"} color="white" />}
          >
            구매하기
          </Button>
        </div>
        <div>
          <Button
            size="s"
            type="cta"
            suffix={<Caret size={"1.6rem"} color="white" />}
          >
            구매하기
          </Button>
        </div>
      </div>
    </div>
  </NosearchProvider>
);

export const PrimaryButton = () => (
  <NosearchProvider>
    <div className="flex space-x-10">
      <div className="flex flex-col space-y-3">
        <div>
          <Button size="xl" type="primary">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="l" type="primary">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="m" type="primary">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="s" type="primary">
            구매하기
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div>
          <Button size="xl" type="primary" color="gray">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="l" type="primary" color="gray">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="m" type="primary" color="gray">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="s" type="primary" color="gray">
            구매하기
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div>
          <Button size="xl" type="primary" disabled>
            구매하기
          </Button>
        </div>
        <div>
          <Button size="l" type="primary" disabled>
            구매하기
          </Button>
        </div>
        <div>
          <Button size="m" type="primary" disabled>
            구매하기
          </Button>
        </div>
        <div>
          <Button size="s" type="primary" disabled>
            구매하기
          </Button>
        </div>
      </div>
    </div>
  </NosearchProvider>
);

export const OutlineButton = () => (
  <NosearchProvider>
    <div className="flex space-x-10">
      <div className="flex flex-col space-y-3">
        <div>
          <Button size="xl" type="outline">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="l" type="outline">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="m" type="outline">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="s" type="outline">
            구매하기
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div>
          <Button size="xl" type="outline" color="gray">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="l" type="outline" color="gray">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="m" type="outline" color="gray">
            구매하기
          </Button>
        </div>
        <div>
          <Button size="s" type="outline" color="gray">
            구매하기
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div>
          <Button size="xl" type="outline" disabled>
            구매하기
          </Button>
        </div>
        <div>
          <Button size="l" type="outline" disabled>
            구매하기
          </Button>
        </div>
        <div>
          <Button size="m" type="outline" disabled>
            구매하기
          </Button>
        </div>
        <div>
          <Button size="s" type="outline" disabled>
            구매하기
          </Button>
        </div>
      </div>
    </div>
  </NosearchProvider>
);

export const ActionButton = () => (
  <NosearchProvider>
    <div className="flex space-x-10">
      <div className="flex flex-col space-y-3">
        <div>
          <Button
            size="xl"
            type="outline"
            radius="s"
            suffix={<Caret size={"2.4rem"} color="#256FFF" />}
          >
            구매하기
          </Button>
        </div>
        <div>
          <Button
            size="l"
            type="outline"
            radius="xl"
            suffix={<Caret size={"2.0rem"} color="#256FFF" />}
          >
            구매하기
          </Button>
        </div>
        <div>
          <Button
            size="m"
            type="outline"
            radius="l"
            suffix={
              <div className="rotate-90">
                <Caret size={"1.8rem"} color="#256FFF" />
              </div>
            }
          >
            구매하기
          </Button>
        </div>
        <div>
          <Button
            size="s"
            type="outline"
            radius="m"
            suffix={<Caret size={"1.6rem"} color="#256FFF" />}
          >
            구매하기
          </Button>
        </div>
      </div>
    </div>
  </NosearchProvider>
);
