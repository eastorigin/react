import { memo, useRef } from "react";
import addTodoStyle from "./AddTodo.module.css";
import { Alert } from "../ui/Modal";

export default memo(function AddTodo({ onClickAddButtonHandler, style }) {
  console.log("Run AddTodo Component");
  const alertRef = useRef();
  const taskRef = useRef();
  const dueDateRef = useRef();

  const onClickHandler = () => {
    const task = taskRef.current.value;
    const dueDate = dueDateRef.current.value;

    let alertMessages = [];
    if (!task) {
      alertMessages.push("task를 입력하세요");
    }

    if (!dueDate) {
      alertMessages.push("due date를 입력하세요");
    }

    if (!task || !dueDate) {
      alertRef.current.show(alertMessages);
      return;
    }

    onClickAddButtonHandler(task, dueDate);

    taskRef.current.value = "";
    dueDateRef.current.value = "";
  };

  return (
    <div className={addTodoStyle.addTodoWrapper} style={style}>
      <label className={addTodoStyle.addTodoLabel} htmlFor="task">
        Task
      </label>
      <input
        className={addTodoStyle.addTodoInput}
        type="text"
        id="task"
        placeholder="Input task"
        ref={taskRef}
      />

      <label className={addTodoStyle.addTodoLabel} htmlFor="due-date">
        Due date
      </label>
      <input
        className={addTodoStyle.addTodoInput}
        type="date"
        id="due-date"
        ref={dueDateRef}
      />

      <button onClick={onClickHandler} className={addTodoStyle.addTodoButton}>
        등록
      </button>
      <Alert alertRef={alertRef} />
    </div>
  );
});
