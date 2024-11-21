import { useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import modalStyle from "./Modal.module.css";

export function Alert({ alertRef }) {
  console.log("Run Alert Component");
  const modalRef = useRef();
  const [message, setMessage] = useState([]);

  useImperativeHandle(alertRef, () => {
    return {
      show(messages) {
        modalRef.current.showModal();
        setMessage(messages);
      },
      close() {
        modalRef.current.close();
        setMessage([]);
      },
    };
  });

  const onClickCloseButtonHandler = () => {
    modalRef.current.close();
  };

  return (
    <>
      {createPortal(
        <dialog className={modalStyle.modal} ref={modalRef}>
          <section
            onClick={onClickCloseButtonHandler}
            className={modalStyle.modalTitle}
          >
            X
          </section>
          <ul className={modalStyle.modalMessages}>
            {message.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </dialog>,
        document.getElementById("modals")
      )}
    </>
  );
}
