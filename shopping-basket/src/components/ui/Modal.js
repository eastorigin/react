import { useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function Alert({ alertRef }) {
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
        <dialog ref={modalRef}>
          <section onClick={onClickCloseButtonHandler}>X</section>
          <ul>
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
