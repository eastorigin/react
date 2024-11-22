import { useRef } from "react";
import { postArticle } from "../http/http";

export default function ArticleForm({ onPostSaveActionHandler }) {
  const subjectRef = useRef();
  const contentRef = useRef();

  const onClickAddButtonHandler = async () => {
    const subject = subjectRef.current.value;
    const content = contentRef.current.value;

    const postJson = await postArticle(subject, content);

    if (!subject) {
      alert("제목을 입력해주세요");
      subjectRef.current.focus();
      return;
    }

    const status = postJson.status;
    if (status === 200) {
      console.log(postJson);
      subjectRef.current.value = "";
      contentRef.current.value = "";
    }

    onPostSaveActionHandler();
  };

  return (
    <div>
      <label htmlFor="subject">제목</label>
      <input type="text" id="subject" ref={subjectRef} />
      <label htmlFor="content">내용</label>
      <textarea id="content" ref={contentRef} />
      <button onClick={onClickAddButtonHandler}>등록</button>
    </div>
  );
}
