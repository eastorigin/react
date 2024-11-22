import { useRef } from "react";
import { getLoginUserInfo, login } from "../http/http";

export default function Login({ loginState, setLoginState }) {
  const emailRef = useRef();
  const passwordRef = useRef();

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
      sessionStorage.setItem("token", token);
      setLoginState((prevLoginState) => ({ ...prevLoginState, token })); // token 값만 변경시킨다

      // login 사용자의 정보를 얻어온다
      const myInfoJson = await getLoginUserInfo();
      sessionStorage.setItem("info", JSON.stringify(myInfoJson.body)); // 객체 리터럴을 json으로 바꿔준다.
      setLoginState((prevLoginState) => ({
        ...prevLoginState,
        info: myInfoJson.body,
      }));
    } else {
      const errorMessage = tokenJson.errors.join("\n");
      alert(errorMessage);
    }
  };

  const onClickLogoutHandler = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("info");
    setLoginState({
      token: "",
      info: {},
    });
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
