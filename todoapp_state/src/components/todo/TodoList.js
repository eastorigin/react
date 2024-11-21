import { useCallback, useMemo, useState } from "react";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

export default function TodoList() {
  console.log("Run TodoList Component");
  const [todoList, setTodoList] = useState([]);

  const addTodoStyle = useMemo(() => {
    return {
      backgroundColor: "#FF0",
    };
  }, []);

  // const tempFunction = useCallback(() => {}, []);

  const onClickAddButtonHandler = useCallback(
    (task, dueDate) => {
      setTodoList((prevTodoList) => [
        {
          id: prevTodoList.length,
          isDone: false,
          task,
          dueDate,
        },
        ...prevTodoList,
      ]);
    },
    [] // setTodoList는 안 바뀌지만 todoList는 바뀐다. setTodoList는 useState 때문에 안 바뀌기 때문
  );

  return (
    <div>
      <h4>
        완료: {todoList.filter((todo) => todo.isDone).length} / 미완료:{" "}
        {todoList.filter((todo) => !todo.isDone).length}
      </h4>
      {/* 갯수는 length 길이로 확인 */}
      <ul>
        {todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
        ))}
      </ul>
      <AddTodo
        onClickAddButtonHandler={onClickAddButtonHandler}
        style={addTodoStyle}
      />
    </div>
  );
}
