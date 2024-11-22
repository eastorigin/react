import { useState } from "react";
import ArticleForm from "./components/forum/ArticleForm";
import ArticleList from "./components/forum/ArticleList";
import Login from "./components/forum/Login";

export default function App() {
  const token = sessionStorage.getItem("token") || "";
  const info = JSON.parse(sessionStorage.getItem("info")) || {};

  const [articles, setArticles] = useState([]);
  const [needReload, setNeedReload] = useState(0);
  const [pageNo, setPageNo] = useState(0);

  const [visible, setVisible] = useState(false);

  const [loginState, setLoginState] = useState({
    token,
    info,
  });

  // 글 쓰고 나면 페이지 번호만큼 articles가 존재할테니까 그거 비워라
  // 처음부터 다시 불러오고
  const onPostSaveActionHandler = () => {
    setPageNo(0);
    setArticles([]);
    setNeedReload(Math.random());
  };

  const onClickMoreHandler = () => {
    setPageNo((prevPageNo) => prevPageNo + 1);
  };

  return (
    <div>
      <Login loginState={loginState} setLoginState={setLoginState} />
      <ArticleList
        needReload={needReload}
        articles={articles}
        setArticles={setArticles}
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
      {loginState.info &&
        loginState.info.authority &&
        loginState.info.authority.filter(
          (auth) => auth.authorityName === "ARTICLE_CREATE"
        ).length > 0 &&
        visible && (
          <ArticleForm onPostSaveActionHandler={onPostSaveActionHandler} />
        )}
      {loginState.info &&
        loginState.info.authority &&
        loginState.info.authority.filter(
          (auth) => auth.authorityName === "ARTICLE_CREATE"
        ).length > 0 && (
          <button
            onClick={() => {
              setVisible(!visible);
            }}
          >
            {visible ? "취소" : "글쓰기"}
          </button>
        )}
      <button onClick={onClickMoreHandler}>더보기</button>
    </div>
  );
}

/**
 * App -> article, pageNo, needReload, login (state)
 * L Login -> info (state)
 * L ArticleList -> fetching (state) : useEffect => fetch => setArticles 호출 (state 변경) / setPageNo
 *    L Article
 * L ArticleForm
 * state가 바뀔 때 재실행된다. state가 누구꺼냐?
 */
