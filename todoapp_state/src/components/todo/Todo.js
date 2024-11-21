import todoStyle from "./Todo.module.css";

export default function Todo({ todo, setTodoList }) {
  console.log("Run Todo Component");
  const { id, isDone, task, dueDate } = todo;

  const itemStyle = {
    color: isDone ? "#CCC" : "#333",
    textDecoration: isDone ? "line-through" : "none",
  };

  const onClickDoneHanlder = (event) => {
    const checkedDoneId = parseInt(event.target.value); // 체크된 Todo의 ID
    const isChecked = event.target.checked; // 체크 여부

    setTodoList((prevTodoList) =>
      prevTodoList.map((todo) => {
        if (todo.id === checkedDoneId) {
          todo.isDone = isChecked;
        }
        return todo;
      })
    );
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
