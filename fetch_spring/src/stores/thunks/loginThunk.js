import { getLoginUserInfo, login } from "../../components/http/http";
import { memberAction } from "../ToolkitStore";

/**
 * Login Thunk
 *
 * thunk 함수는 dispatch(useDispatch)를 함수로 받는 비동기 함수를 반환시켜야 한다
 * thunk 함수는 컴포넌트에서 sliceStore action을 대체한다
 * @returns
 */
export const getMyToken = (email, password) => {
  return async (dispatcher) => {
    // dispatcher 자체가 loginDispatcher
    // fetch 수행
    const tokenJson = await login(email, password);
    const status = tokenJson.status;
    if (status === 200) {
      // dispatch 호출
      const token = tokenJson.body;
      dispatcher(memberAction.setToken(token));
      // fetch 수행
      const myInfoJson = await getLoginUserInfo();
      // dispatch 호출
      dispatcher(memberAction.setMyInfo(myInfoJson.body));
    } else {
      const errorMessage = tokenJson.errors.join("\n");
      alert(errorMessage);
    }
  };
};
