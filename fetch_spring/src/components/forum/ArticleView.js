import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readOneArticle } from "../../stores/thunks/articleThunk";
import { useEffect } from "react";

export default function ArticleView() {
  const { id } = useParams();

  // 1. slice store에서 id에 해당하는 게시글 내용을 조회
  // 1. 게시글 조회수 1 증가
  const articleDispatcher = useDispatch();
  useEffect(() => {
    articleDispatcher(readOneArticle(id));
  }, [articleDispatcher, id]);

  const [article] = useSelector((state) =>
    state.article.data.filter((article) => article.id === parseInt(id))
  );

  console.log(article);

  return (
    <>
      <div>{id} 게시글 상세 컴포넌트</div>
      <h1>{article.subject}</h1>
      <div>{article.viewCnt}</div>
      <div>{article.content}</div>
    </>
  );
}
