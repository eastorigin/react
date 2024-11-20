import { useRef } from "react";
import githubStyle from "./GithubLogin.module.css";
import GithubModal from "./GithubModal";
// Styled Component
export default function Login() {
  const githubModalRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const signInClickHanlder = () => {
    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      githubModalRef.current.showModal();
    } else {
      console.log(usernameRef.current.value);
      console.log(passwordRef.current.value);
    }
  };

  return (
    <div className={githubStyle.loginWrapper}>
      <div>
        <label className={githubStyle.loginLabel} htmlFor="username">
          Username or email address
        </label>
        <input
          className={githubStyle.loginInput}
          type="text"
          id="username"
          ref={usernameRef}
        />
      </div>
      <div>
        <label className={githubStyle.loginLabel} htmlFor="password">
          Password
        </label>
        <input
          className={githubStyle.loginInput}
          type="password"
          id="password"
          ref={passwordRef}
        />
      </div>
      <button className={githubStyle.loginButton}>
        Sign in (모달 스테이트 이용)
      </button>
      <button onClick={signInClickHanlder} className={githubStyle.loginButton}>
        Sign in (children 이용)
      </button>
      <GithubModal modalRef={githubModalRef}>
        <div>
          <h1>이메일과 비밀번호를 모두 입력해주세요</h1>
        </div>
      </GithubModal>
    </div>
  );
}
