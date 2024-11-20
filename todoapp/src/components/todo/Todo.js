import { useContext } from "react";
import todoStyle from "./Todo.module.css";
import { TodoContext } from "./contexts/TodoContext";

export default function Todo({ todo }) {
  const { id, isDone, task, dueDate } = todo;

  const itemStyle = {
    color: isDone ? "#CCC" : "#333",
    textDecoration: isDone ? "line-through" : "none",
  };

  const { contextDone } = useContext(TodoContext);

  const onClickDoneHanlder = (event) => {
    // TodoContext에 있는 contextDone 함수 호출
    contextDone(event);
  };

  return (
    <li className={todoStyle.todoItem} style={itemStyle}>
      <div className={todoStyle.inputWrapper}>
        <input
          defaultValue={id}
          type="checkbox"
          onChange={onClickDoneHanlder}
          checked={isDone ? "checked" : ""}
        />
      </div>
      <div className={todoStyle.todoName}>{task}</div>
      <div>{dueDate}</div>
    </li>
  );
}
