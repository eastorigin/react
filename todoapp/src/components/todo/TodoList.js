import { useContext } from "react";
import { TodoContext } from "./contexts/TodoContext";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

export default function TodoList() {
  const { contextTodo } = useContext(TodoContext);

  return (
    <div>
      <h4>
        완료: {contextTodo.filter((todo) => todo.isDone).length} / 미완료:{" "}
        {contextTodo.filter((todo) => !todo.isDone).length}
      </h4>
      {/* 갯수는 length 길이로 확인 */}
      <ul>
        {contextTodo.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      <AddTodo />
    </div>
  );
}
