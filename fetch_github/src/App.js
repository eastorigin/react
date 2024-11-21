import { useState, useEffect } from "react";
import Post from "./components/Post";

export default function App() {
  const jsonplaceholderApiUrl = "https://jsonplaceholder.typicode.com/posts";

  const [fetchcing, setFetching] = useState(true);
  const [posts, setPosts] = useState([]); // 받아올 데이터가 배열이면 배열을 넣어줘야 함수를 호출할 때 에러가 생기지 않음
  // getPosts가 비동기 함수이기 때문 (동시에 실행된다) 언제 끝나는지 모르기 때문에 return에 필요한 값은 반드시 무언가로 지정되어야 한다
  // |-------|------------------|-----------|
  //      getPosts            return

  useEffect(() => {
    const getPosts = async () => {
      setFetching(true);

      const response = await fetch(jsonplaceholderApiUrl); // get request
      console.log(response);

      const status = response.status;
      const isOk = response.ok;

      console.log("status", status);
      console.log("ok", isOk);

      // response body
      const postsJson = await response.json();
      console.log(postsJson);

      setPosts(postsJson);
      setFetching(false);
    };

    getPosts();
  }, []); // componentDidMount (Component가 최초로 실행되었을 때)

  return (
    <ul>
      {fetchcing && <p>데이터를 가져오는 중입니다. 잠시만 기다려 주십시오.</p>}
      {!fetchcing && // 언제 false 되는지 모른다
        posts.map(({ id, userId, title, body }) => (
          <Post key={id} id={id} userId={userId} title={title} body={body} />
        ))}
    </ul>
  );
}
