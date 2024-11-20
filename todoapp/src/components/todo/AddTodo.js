import { useContext, useRef } from "react";
import addTodoStyle from "./AddTodo.module.css";
import { Alert } from "../ui/Modal";
import { TodoContext } from "./contexts/TodoContext";

export default function AddTodo() {
  const alertRef = useRef();
  const taskRef = useRef();
  const dueDateRef = useRef();

  const { contextAddTodo } = useContext(TodoContext);

  const onClickAddButtonHandler = () => {
    const task = taskRef.current.value;
    const dueDate = dueDateRef.current.value;

    // TodoContext에 있는 contextAddTodo를 호출
    const result = contextAddTodo(task, dueDate, alertRef);

    if (result) {
      taskRef.current.value = "";
      dueDateRef.current.value = "";
    }
  };

  return (
    <div className={addTodoStyle.addTodoWrapper}>
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

      <button
        onClick={onClickAddButtonHandler}
        className={addTodoStyle.addTodoButton}
      >
        등록
      </button>
      <Alert alertRef={alertRef} />
    </div>
  );
}
