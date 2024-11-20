import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function AlertModal({ children, modalRef }) {
  const alertModalRef = useRef();

  useImperativeHandle(modalRef, () => {
    return {
      alert() {
        alertModalRef.current.showModal();
      },
      close() {
        alertModalRef.current.close();
      },
    };
  });

  const onClickCloseButtonHandler = () => {
    alertModalRef.current.close();
  };

  return (
    <>
      {createPortal(
        <dialog className="modal" ref={alertModalRef}>
          <div className="modal-body">
            <section
              className="modal-close-button"
              onClick={onClickCloseButtonHandler}
            >
              X
            </section>
            {children}
          </div>
        </dialog>,
        document.getElementById("modals")
      )}
    </>
  );
}

const ConfirmModal = forwardRef(
  ({ children, onOkClickHandler, onCancelClickHandler }, ref) => {
    const confirmModalRef = useRef();
    useImperativeHandle(ref, () => {
      return {
        alert() {
          confirmModalRef.current.showModal();
        },
        close() {
          confirmModalRef.current.close();
        },
      };
    });
    const onClickCloseButtonHandler = () => {
      ref.current.close();
    };
    return (
      <>
        {createPortal(
          <dialog className="modal" ref={confirmModalRef}>
            <div className="modal-body">
              <section
                className="modal-close-button"
                onClick={onClickCloseButtonHandler}
              >
                X
              </section>
              {children}
              <footer className="modal-footer">
                <button className="ok-button" onClick={onOkClickHandler}>
                  OK
                </button>
                <button
                  className="cancel-button"
                  onClick={onCancelClickHandler}
                >
                  Cancel
                </button>
              </footer>
            </div>
          </dialog>,
          document.getElementById("modals")
        )}
      </>
    );
  }
);

export { ConfirmModal };
