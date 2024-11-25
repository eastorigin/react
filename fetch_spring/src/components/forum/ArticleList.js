import { useCallback, useEffect, useState } from "react";
import { getArticleList } from "../http/http";
import Article from "./Article";
import { useFetch } from "../hooks/fetch";
import { useDispatch, useSelector } from "react-redux";
import ArticleForm from "./ArticleForm";
import { articleAction } from "../../stores/ToolkitStore";

export default function ArticleList() {
  const { article, member } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = useState(false);

  const onClickMoreHandler = () => {
    // setPageNo((prevPageNo) => prevPageNo + 1);
    articleDispatcher(articleAction.updatePageNo(article.pageNo + 1));
  };

  const loadArticles = useCallback(() => {
    return getArticleList(article.pageNo);
  }, [article.pageNo, article.data]);

  const { fectchData, isLoading, errors } = useFetch(
    { body: [] },
    loadArticles
  );

  const articleDispatcher = useDispatch();
  useEffect(() => {
    articleDispatcher(articleAction.readList(fectchData));
  }, [fectchData]);

  // const [fetching, setFetching] = useState(true);

  // useEffect(() => {
  //   const getArticles = async () => {
  //     setFetching(true);

  //     const response = await getArticleList(pageNo);

  //     setArticles((prevArticles) => {
  //       // state가 undefined에서 초기값으로 변경되는 순간,
  //       // useEffect가 중복 실행될 때 생기는 문제를 방지
  //       if (pageNo === 0 && prevArticles.length > 0) {
  //         return prevArticles;
  //       }

  //       return [...prevArticles, ...response.body];
  //     });
  //     setFetching(false);
  //   };

  return (
    <>
      <div>
        {isLoading && <p>게시글목록 조회중입니다...</p>}
        {errors && (
          <>
            <div>에러가 발생했습니다.</div>
            <div>{errors}</div>
          </>
        )}
        {!errors && fectchData.body && (
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
        )}
        <button onClick={onClickMoreHandler}>더보기</button>

        {isLoading && <div>게시글 조회중입니다.</div>}
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
