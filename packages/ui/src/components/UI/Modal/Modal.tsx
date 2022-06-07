// Generated with util/create-component.js
import { AnimatePresence, motion } from "framer-motion";
import React, { useMemo } from "react";
import "./Modal.scss";
import { IModalComponent, ModalProps } from "./Modal.types";

/* export const isModalOpenAtom = atom<boolean>(false);
export const isModalMountedAtom = atom<boolean>(false);

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
  const [isModalMounted, setIsModalMounted] = useAtom(isModalMountedAtom);
  function open() {
    setIsModalMounted(true);
    setIsModalOpen(true);
  }
  function close() {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsModalMounted(false);
    }, 500);
  }
  return {
    isOpen: isModalOpen,
    isMounted: isModalMounted,
    open,
    close,
  };
};
 */
const modalBgId = "modal-bg";

const Modal: React.FC<ModalProps> = ({
  children,
  drawer,
  drawerDirection = "bottom",
  styleFor,
  visible,
  onClose,
  rootElementID,
}) => {
  const ModalComponent = useMemo(() => {
    const result: IModalComponent = {
      ModalHeader: null,
      ModalBody: null,
      ModalFooter: null,
    };
    if (children) {
      React.Children.toArray(children).map((x) => {
        if ((x as any).props.__TYPE === MODAL_HEADER) {
          result.ModalHeader = x as React.Component;
        } else if ((x as any).props.__TYPE === MODAL_BODY) {
          result.ModalBody = x as React.Component;
        } else if ((x as any).props.__TYPE === MODAL_FOOTER) {
          result.ModalFooter = x as React.Component;
        }
      });
    }
    return result;
  }, [children]);

  const modalAnim = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };
  const drawerAnim = {
    bottom: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    },
    top: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    },

    left: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    },
    right: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    },
  };

  const anim = drawer ? drawerAnim[drawerDirection] : modalAnim;
  const css = drawer
    ? `${
        ["bottom", "top"].indexOf(drawerDirection) > -1 ? "w-full" : "h-full"
      } ${
        styleFor && styleFor.radius ? styleFor.radius : "rounded-none"
      } border-[1px] bg-white border-gray-4`
    : `${
        styleFor && styleFor.modalWidth ? styleFor.modalWidth : "max-w-[80rem]"
      } ${
        styleFor && styleFor.modalHeight ? styleFor.modalHeight : "max-h-[80vh]"
      } ${
        styleFor && styleFor.radius ? styleFor.radius : "rounded-lg"
      } border-[1px] bg-white border-gray-4`;
  const wrapperCss = drawer
    ? `fixed top-0 left-0 flex w-full h-full ${
        drawerDirection === "bottom" ? "items-end" : ""
      } ${drawerDirection === "top" ? "items-start" : ""} ${
        drawerDirection === "left" ? "justify-start" : ""
      } ${drawerDirection === "right" ? "justify-end" : ""}`
    : "fixed  top-0 left-0 flex w-full h-full justify-center items-center ";
  const { ModalHeader, ModalBody, ModalFooter } = ModalComponent;

  return (
    <div data-testid="Modal">
      <ModalOverlay visible={visible} />
      <div
        id={modalBgId}
        className={`${wrapperCss} ${visible ? "z-10" : "z-[-1]"}`}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if ((e.target as any).id === modalBgId) {
            onClose(e);
          }
        }}
      >
        <AnimatePresence>
          {visible && (
            <motion.div
              className={css}
              transition={{ type: "ease", duration: 0.2, delay: 0 }}
              {...anim}
            >
              <div
                className={`w-full h-full flex flex-col ${drawer &&
                  "max-h-[90vh] min-h-[50vh]"}`}
              >
                <div className="p-4">{ModalHeader}</div>
                <div
                  className={`p-4 break-all overflow-y-auto ${!styleFor?.showScroll &&
                    "hideScroll"} `}
                >
                  {ModalBody}
                </div>
                <div className="p-4">{ModalFooter}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
const MODAL_HEADER = "ModalHeader";
const MODAL_BODY = "ModalBody";
const MODAL_FOOTER = "ModalFooter";

export const ModalHeader = (props: { children?: React.ReactNode }) => {
  return <>{props.children}</>;
};
ModalHeader.defaultProps = {
  __TYPE: MODAL_HEADER,
};

export const ModalBody = (props: { children?: React.ReactNode }) => {
  return <>{props.children}</>;
};
ModalBody.defaultProps = {
  __TYPE: MODAL_BODY,
};

export const ModalFooter = (props: { children?: React.ReactNode }) => {
  return <>{props.children}</>;
};
ModalFooter.defaultProps = {
  __TYPE: MODAL_FOOTER,
};

const ModalOverlay = ({ visible }: { visible: boolean }) => {
  return (
    <div
      className={`top-0 left-0 absolute w-full h-full bg-black ${
        visible ? "opacity-[0.48] z-0" : "opacity-0 z-[-1]"
      } transition-opacity duration-500`}
    ></div>
  );
};

export default Modal;
