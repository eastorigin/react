import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function GithubModal({ children, modalRef }) {
  const githubModalRef = useRef();
  const onClickCloseButtonHandler = () => {
    githubModalRef.current.close();
  };

  // 이걸 쓸라면 <dialog className="modal" ref={githubModalRef}>
  //   useImperativeHandle(modalRef, () => {
  //     return {
  //       alert() {
  //         githubModalRef.current.showModal();
  //       },
  //       close() {
  //         githubModalRef.current.close();
  //       },
  //     };
  //   });

  return (
    <>
      {createPortal(
        <dialog className="modal" ref={modalRef}>
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
