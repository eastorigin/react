import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { memberAction } from "../../stores/ToolkitStore";
import { getMyToken } from "../../stores/thunks/loginThunk";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // redux의 store를 가져온다
  // redux.store = { article: [], member: {}}
  const loginState = useSelector((state) => ({ ...state.member }));
  const loginDispatcher = useDispatch();
  // loginDispatcher(memberAction.setToken(token value))

  // 회원 정보 로드하기
  useEffect(() => {
    loginDispatcher(memberAction.reload());
  }, [loginDispatcher]);

  const onClickLoginHandler = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) {
      alert("email을 입력해주세요");
      return;
    }

    if (!password) {
      alert("password를 입력해주세요");
      return;
    }

    loginDispatcher(getMyToken(email, password));
  };

  const onClickLogoutHandler = () => {
    loginDispatcher(memberAction.clearMember());
    // sessionStorage.removeItem("token");
    // sessionStorage.removeItem("info");
    // setLoginState({
    //   token: "",
    //   info: {},
    // });
  };

  return (
    <div>
      {(!loginState.info || !loginState.info.email) && (
        <>
          <input type="email" ref={emailRef} />
          <input type="password" ref={passwordRef} />
          <button onClick={onClickLoginHandler}>Login</button>
        </>
      )}
      {loginState.info && loginState.info.email && (
        <>
          {loginState.info.name} ({loginState.info.email})
          <button onClick={onClickLogoutHandler}>Logout</button>
        </>
      )}
    </div>
  );
}
