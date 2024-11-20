import { TodoContextProvider } from "./components/todo/contexts/TodoContext";
import TodoList from "./components/todo/TodoList";

export default function App() {
  return (
    <TodoContextProvider>
      <TodoList />
    </TodoContextProvider>
  );
}
