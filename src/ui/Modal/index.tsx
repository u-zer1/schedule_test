import React from "react";
import "./styles.scss";

export const Modal = ({
  isOpen,
  handleOpen,
  children,
}: {
  isOpen: boolean;
  handleOpen: () => void;
  children: React.ReactNode;
}) => {
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.body.style.overscrollBehaviorY = isOpen ? "none" : "";
  }, [isOpen]);

  return isOpen ? (
    <div className="modal">
      <div className="content">
        {children}
        <button className="close" onClick={handleOpen}>
          close modal
        </button>
      </div>
      <div className="darken" />
    </div>
  ) : null;
};
