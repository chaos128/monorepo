import { Component, MouseEvent, ReactNode } from "react";

// Generated with util/create-component.js
export interface ModalProps {
  drawer?: boolean;
  children?: ReactNode;
  drawerDirection?: "bottom" | "top" | "left" | "right";
  styleFor?: {
    showScroll?: boolean;
    modalWidth?: string;
    modalHeight?: string;
    radius?: string;
  };
  visible: boolean;
  onClose: (e: MouseEvent<HTMLDivElement>) => void;
  rootElementID?: string;
}

export interface IModalComponent {
  ModalHeader: Component | null;
  ModalBody: Component | null;
  ModalFooter: Component | null;
}
