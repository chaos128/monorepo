// Generated with util/create-component.js
import { Meta } from "@storybook/react";
import React, { useState } from "react";
import NosearchProvider from "../../NosearchProvider";
import Button from "../Button";
import Heading from "../Heading";
import Text from "../Text";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "./Modal";

export default {
  title: "UI/Modal",
  component: NosearchProvider,
} as Meta;

export const Default = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <NosearchProvider>
      <Button type="cta" onClick={openModal}>
        Modal 열기
      </Button>
      <Modal
        styleFor={{
          modalWidth: "w-[80rem]",
          showScroll: true,
          radius: "rounded-[15px]",
        }}
        visible={modalVisible}
        onClose={closeModal}
      >
        <ModalHeader>
          <Heading level={1}>Modal Header</Heading>
        </ModalHeader>
        <ModalBody>
          <Text>Modal body </Text>
        </ModalBody>
        <ModalFooter>footer</ModalFooter>
      </Modal>
    </NosearchProvider>
  );
};

export const Drawer = () => {
  const [direction, setDirection] = useState<
    "bottom" | "top" | "left" | "right"
  >("bottom");

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <NosearchProvider>
      <div className="flex flex-col space-y-3">
        <Button
          type="outline"
          color="gray"
          onClick={() => {
            setDirection("bottom");
            openModal();
          }}
        >
          Drawer bottom
        </Button>
        <Button
          type="outline"
          color="gray"
          onClick={() => {
            setDirection("top");
            openModal();
          }}
        >
          Drawer top
        </Button>
        <Button
          type="outline"
          color="gray"
          onClick={() => {
            setDirection("left");
            openModal();
          }}
        >
          Drawer left
        </Button>
        <Button
          type="outline"
          color="gray"
          onClick={() => {
            setDirection("right");
            openModal();
          }}
        >
          Drawer right
        </Button>
      </div>
      <Modal
        drawer
        drawerDirection={direction}
        styleFor={{
          radius: "rounded-t-[15px]",
        }}
        visible={modalVisible}
        onClose={closeModal}
      >
        <ModalHeader>
          <div>Header</div>
        </ModalHeader>
        <ModalBody>
          <div className="overflow-y-scroll">
            body AFASDFASASDFASDFASDFASDFASDFASFASDFA SDFASDFASDFASAFASDFASASDF
            ASDFASDFASDFASDFASFASDFASDFASDFASDFASAFASDFASASDFASDFASDFAS DFAS
            DFASFASDFASDFASDFASDFASAFASD
            FASASDFASDFASDFASDFASDFASFASDFASDFASDFASDFASAFASDFASASDFASDFASDFASDFASDFASFASDFASDFASDFASDFASAFASDFASASDFASDFASDFASDFA
            SDFASFASDFASDF
            ASDFASDFASAFASDFASASDFASDFASDFASDFASDFASFASDFASDFASDFASDF
            ASAFASDFASASDFASDF
            ASDFASDFASDFASFASDFASDFASDFASDFASAFASDFASASDFASDFASDFASDFASDFASFA
            SDFA SDFASDFASDFASAFASDFASASDFASDFASDFASDFASDFASFASD
            FASDFASDFASDFASAFASDFASASDFASDFASDFASDFASDFASFASDFASDFASDFASDFASAF
            ASDFASASDFASDFASDFASDFASDFASFASDFASDFASDFASDFASAFASDFASASDFASDFASDFAS
            DFASDFASFASDFASDFASDFASDFASAFASDFASASDFASDFASDFASDFASDFASFASDFASDFASDFASDFASAFASDFASASDFASDFASDFASDFASDFASFASDFASDFA
            SDFASDFASAFASDFASASDFASDFASDFASDFASDFASFASDFASDFASDFASDFASAFASDFA
            SASD FASDFAS DFASDFAS
            DFASFASDFASDFASDFASDFASAFASDFASASDFASDFASDFASDFASDFASFASDFASDFASDFASDFASAFASDFASASDFASDFASDFASDFASDFASFASDFASDFASDFASDFASAFASDFASASDFASDFASDFASDFASDFASFASDFASDFASDFASDFASAFASD
            FASASDFASDFASDFASDFASDFASFASDFASDFASDFASDFASAFASDFASASDFASDFASDFASDFASDFA
            SFASDFASDFASDFASDFASAFASDFASASDFASDFASDFASDFASDFASFASDFASD
          </div>
        </ModalBody>
        <ModalFooter>footer</ModalFooter>
      </Modal>
    </NosearchProvider>
  );
};
