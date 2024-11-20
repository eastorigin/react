/*
 * state를 관리하는 (변경시키는) 함수들만 별도로 분리 보관하는 함수 => 리듀서
 *
 * : context없이 reducer만으로도 state 통합관리 가능
 * : 보통은 context + reducer의 조합으로 사용
 * ==> reducer만으로 state를 관리할 경우, 복잡해질 가능성이 높다
 * @param state 리듀서가 관리하는 state
 * @param action state를 변경시킬 정보들 (Dispatcher에 의해 전달된다) => {type, payload}
 */
export const todoReducers = (state, action) => {
  /*
  todo 완료 처리할 경우의 action
  {type: "DONE", payload: todo의 id}
   */
  const type = action.type;
  if (type === "DONE") {
    // todo를 완료/미완료 토글하는 코드
    // 파라미터로 들어온 state는 어떻게 변경해야 하나?
    // 새로운 state를 반환
    return state.map((todo) => {
      if (todo.id === action.payload.id) {
        todo.isDone = action.payload.isChecked;
      }
      return todo;
    });
  } else if (type === "ADD") {
    /*
     * todo를 추가하는 경우의 action
     * {type: "ADD", payload: {task: "sample task", dueDate: "2024-11-20"}}
     */
    return [
      {
        id: state.length,
        isDone: false,
        task: action.payload.task,
        dueDate: action.payload.dueDate,
      },
      ...state,
    ];
  }

  // action type이 어디에도 해당되지 않을 땐, 원래의 state를 그대로 반환시킨다
  return state;
};
