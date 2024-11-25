import ArticleList from "./components/forum/ArticleList";
import Login from "./components/forum/Login";
import { AppProvider } from "./stores/ToolkitStore";

export default function App() {
  // 글 쓰고 나면 페이지 번호만큼 articles가 존재할테니까 그거 비워라
  // 처음부터 다시 불러오고

  return (
    <AppProvider>
      <div>
        <Login />
        <ArticleList />
      </div>
    </AppProvider>
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
