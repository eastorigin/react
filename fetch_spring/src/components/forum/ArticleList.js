import { useEffect, useState } from "react";
import Article from "./Article";
import { useDispatch, useSelector } from "react-redux";
import ArticleForm from "./ArticleForm";
import { articleAction } from "../../stores/ToolkitStore";
import { readArticles } from "../../stores/thunks/articleThunk";
import { Spinner } from "../ui/Spinner";

export default function ArticleList() {
  const { article, member } = useSelector((state) => ({ ...state }));
  const { isLoading, errors } = article;

  const [visible, setVisible] = useState(false);

  const onClickMoreHandler = () => {
    articleDispatcher(articleAction.updatePageNo(article.pageNo + 1));
  };

  const articleDispatcher = useDispatch();
  useEffect(() => {
    articleDispatcher(readArticles(article.pageNo));
  }, [article.pageNo, article.data, articleDispatcher]);

  return (
    <>
      <div>
        {isLoading && <Spinner />}
        {errors && (
          <>
            <div>에러가 발생했습니다.</div>
            <div>{errors}</div>
          </>
        )}
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>NO.</th>
              <th>Subject</th>
              <th>Author</th>
              <th>Views</th>
              <th>Create Date</th>
              <th>Last Modify Date</th>
            </tr>
          </thead>

          {!isLoading &&
            article.data.map(
              ({ id, subject, email, viewCnt, crtDt, mdfyDt }) => (
                <Article
                  key={id}
                  id={id}
                  subject={subject}
                  email={email}
                  viewCnt={viewCnt}
                  crtDt={crtDt}
                  mdfyDt={mdfyDt}
                />
              )
            )}
        </table>
        <button onClick={onClickMoreHandler}>더보기</button>

        {member.info && member.info.email && (
          <button
            onClick={() => {
              setVisible(!visible);
            }}
          >
            {visible ? "취소" : "글쓰기"}
          </button>
        )}
        {member.info && member.info.email && visible && (
          <ArticleForm
            articleDispatcher={articleDispatcher}
            articleAction={articleAction}
          />
        )}
      </div>
    </>
  );
}

/**
 * SliceStore (reducers => Action)
 * useSelector(); -> Store(SliceStore, SliceStore, .........)
 */
