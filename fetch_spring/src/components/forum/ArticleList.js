import { useEffect, useState } from "react";
import Article from "./Article";
import { getArticleList } from "../http/http";

export default function ArticleList({
  needReload,
  articles,
  setArticles,
  pageNo,
  setPageNo,
}) {
  const [fetchcing, setFetching] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      setFetching(true);

      const response = await getArticleList(pageNo);

      setArticles((prevArticles) => {
        // state가 undefined에서 초기값으로 변경되는 순간,
        // useEffect가 중복 실행될 때 생기는 문제를 방지
        if (pageNo === 0 && prevArticles.length > 0) {
          return prevArticles;
        }

        return [...prevArticles, ...response.body];
      });
      setFetching(false);
    };

    getArticles();
  }, [pageNo, setArticles, needReload]);

  return (
    <>
      {fetchcing && <p>게시글 목록 조회 중</p>}
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
        {!fetchcing &&
          articles.map(({ id, subject, email, viewCnt, crtDt, mdfyDt }) => (
            <Article
              key={id}
              id={id}
              subject={subject}
              email={email}
              viewCnt={viewCnt}
              crtDt={crtDt}
              mdfyDt={mdfyDt}
            />
          ))}
      </table>
    </>
  );
}
