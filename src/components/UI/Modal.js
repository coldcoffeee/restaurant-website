import { Fragment } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const overlayDiv = document.getElementById("overlays");
  return (
    <Fragment>
      {createPortal(<Backdrop />, overlayDiv)}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayDiv)}
    </Fragment>
  );
};

export default Modal;
