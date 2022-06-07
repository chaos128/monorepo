// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import Modal from "./Modal";
import { ModalProps } from "./Modal.types";

describe("Test Component", () => {
  let props: ModalProps;

  beforeEach(() => {
    props = { visible: false, onClose: () => {} };
  });

  const renderComponent = () => render(<Modal {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("Modal");
  });
});
