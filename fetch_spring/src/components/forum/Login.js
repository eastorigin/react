import { useEffect, useRef } from "react";
import { getLoginUserInfo, login } from "../http/http";
import { useDispatch, useSelector } from "react-redux";
import { memberAction } from "../../stores/ToolkitStore";

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

    const tokenJson = await login(email, password);
    console.log(tokenJson);

    const status = tokenJson.status;
    if (status === 200) {
      const token = tokenJson.body;
      console.log(token);

      // Browser의 database에 token 값을 작성한다
      // sessionStorage는 브라우저가 종료되면, 데이터가 삭제된다
      // sessionStorage.setItem("token", token);
      // setLoginState((prevLoginState) => ({ ...prevLoginState, token })); // token 값만 변경시킨다
      // memberSliceStore.reducers.setToken(token) 실행
      loginDispatcher(memberAction.setToken(token));

      // login 사용자의 정보를 얻어온다
      const myInfoJson = await getLoginUserInfo();
      loginDispatcher(memberAction.setMyInfo(myInfoJson.body));
      // sessionStorage.setItem("info", JSON.stringify(myInfoJson.body)); // 객체 리터럴을 json으로 바꿔준다.
      // setLoginState((prevLoginState) => ({
      //   ...prevLoginState,
      //   info: myInfoJson.body,
      // }));
    } else {
      const errorMessage = tokenJson.errors.join("\n");
      alert(errorMessage);
    }
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
