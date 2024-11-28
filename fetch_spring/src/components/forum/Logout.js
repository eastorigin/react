import { useDispatch, useSelector } from "react-redux";
import { memberAction } from "../../stores/ToolkitStore";
import { useEffect } from "react";

export default function Logout() {
  const loginState = useSelector((state) => ({ ...state.member }));
  const loginDispatcher = useDispatch();

  const onClickLogoutHandler = () => {
    loginDispatcher(memberAction.clearMember());
  };

  // 회원 정보 로드하기
  useEffect(() => {
    loginDispatcher(memberAction.reload());
  }, [loginDispatcher]);

  return (
    <>
      {loginState.info && loginState.info.email && (
        <>
          {loginState.info.name} ({loginState.info.email})
          <button onClick={onClickLogoutHandler}>Logout</button>
        </>
      )}
    </>
  );
}
