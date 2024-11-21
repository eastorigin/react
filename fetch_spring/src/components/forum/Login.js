import { useRef } from "react";
import { login } from "../http/http";

export default function Login() {
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
    } else {
      const errorMessage = tokenJson.errors.join("\n");
      alert(errorMessage);
    }
  };

  return (
    <div>
      <input type="email" ref={emailRef} />
      <input type="password" ref={passwordRef} />
      <button onClick={onClickLoginHandler}>Login</button>
    </div>
  );
}
