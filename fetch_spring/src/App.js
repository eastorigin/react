import ArticleForm from "./components/forum/ArticleForm";
import ArticleList from "./components/forum/ArticleList";
import Login from "./components/forum/Login";

export default function App() {
  return (
    <div>
      <Login />
      <ArticleList />
      <ArticleForm />
    </div>
  );
}
