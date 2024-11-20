import { createContext, useReducer } from "react";
import { todoReducers } from "../reducers/todoReducer";
// state interface
// 1. state의 원형 제작
// 1-1. state를 변경시킬 함수들의 원형 제작
export const TodoContext = createContext({
  // createContext: 전역 상태의 초기값과 구조를 정의. Todo 앱에서 사용할 전역 상태의 기본 틀을 정의
  contextTodo: [], // Todo 리스트를 저장할 상태
  // checkbox를 체크/체크해제 했을 때, 해당 todo의 checkbox 값을 얻어오기 위해
  contextDone(event) {}, // Todo 완료 여부를 변경하는 함수
  contextAddTodo(task, dueDate, alertRef) {}, // 새 Todo를 추가하는 함수
});

// 2. state interface implementation (ContextProvider)
// 2-1. context의 함수들(1-1)을 구현
export function TodoContextProvider({ children }) {
  // TodoContextProvider는 Context 데이터를 실제로 처리하고 컴포넌트에 전달
  // Provider: 데이터를 실제로 전달하는 역할
  const [todo, todoDispatcher] = useReducer(todoReducers, []);
  // todo: 현재 Todo 상태. todoDispatcher: 상태를 업데이트하는 함수.

  const contextImplementation = {
    contextTodo: todo, // 현재 Todo 상태
    contextDone(event) {
      const checkedDoneId = parseInt(event.target.value); // 체크된 Todo의 ID
      const isChecked = event.target.checked; // 체크 여부

      todoDispatcher({
        type: "DONE",
        payload: { id: checkedDoneId, isChecked }, // Reducer로 상태 업데이트
      });
    },
    contextAddTodo(task, dueDate, alertRef) {
      let alertMessages = [];
      if (!task) {
        alertMessages.push("task를 입력하세요");
      }

      if (!dueDate) {
        alertMessages.push("due date를 입력하세요");
      }

      if (!task || !dueDate) {
        alertRef.current.show(alertMessages);
        return false;
      }

      todoDispatcher({ type: "ADD", payload: { task, dueDate } });
      return true;
    },
  };

  // 3. ContextProvider를 전역으로 구성
  // 3-1. ContextProvider를 사용할 컴포넌트들을 관리
  return (
    <TodoContext.Provider value={contextImplementation}>
      {children}
      {/* children: TodoContextProvider로 감싼 컴포넌트들입니다. 이들 컴포넌트는 TodoContext의 데이터를 사용할 수 있습니다. */}
    </TodoContext.Provider>
  );
}
