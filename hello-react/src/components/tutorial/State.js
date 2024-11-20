import { useRef, useState } from "react";
import Section from "./Section";
import AlertModal, { ConfirmModal } from "./Modal";

export default function State() {
  console.log("State 컴포넌트가 실행되었습니다", this);

  const [title, setTitle] = useState("initiate state value");

  // const onKeyUpHandler = (event) => {
  //   const value = event.target.value;
  //   console.log(value);
  //   setTitle(value);
  // };

  const componentNameRef = useRef();
  const alertModalRef = useRef();
  const confirmModalRef = useRef();

  const onButtonClickHandler = () => {
    console.log("alertModal", alertModalRef.current);
    console.log("confirmModal", confirmModalRef.current);

    if (componentNameRef.current.value === "") {
      // alert("컴포넌트 이름을 입력해야 합니다!");
      // componentNameRef.current.focus();
      console.log(confirmModalRef.current);
      // alertModalRef.current.alert();
      confirmModalRef.current.alert();
      // alertModalRef.current.showModal();
      // confirmModalRef.current.showModal();
      return;
    }

    setTitle(componentNameRef.current.value);
  };

  const onOkClickHandler = () => {
    confirmModalRef.current.close();
    alert("확인을 클릭했습니다");
    // setTitle 때문에 Modal.js가 아닌 State.js에 작성
    setTitle("기본 컴포넌트 이름");
  };
  const onCancelClickHandler = () => {
    confirmModalRef.current.close();
  };

  return (
    <div>
      {title} Component
      <input type="text" defaultValue={title} ref={componentNameRef} />
      <button onClick={onButtonClickHandler}>컴포넌트 이름 변경하기!</button>
      <Section title={title} />
      <AlertModal modalRef={alertModalRef}>
        <div>
          <h3>컴포넌트의 이름을 입력하세요</h3>
        </div>
      </AlertModal>
      <ConfirmModal
        ref={confirmModalRef}
        onOkClickHandler={onOkClickHandler}
        onCancelClickHandler={onCancelClickHandler}
      >
        <div>
          <h3>컴포넌트의 이름을 입력하세요</h3>
        </div>
      </ConfirmModal>
    </div>
  );
}
