import { useState } from "react";
import Section from "./Section";

export default function State() {
  console.log("State 컴포넌트가 실행되었습니다", this);

  const [title, setTitle] = useState("initiate state value");

  const onKeyUpHandler = (event) => {
    const value = event.target.value;
    console.log(value);
    setTitle(value);
  };
  return (
    <div>
      {title} Component
      <input type="text" defaultValue={title} onKeyUp={onKeyUpHandler} />
      <Section title={title} />
    </div>
  );
}
