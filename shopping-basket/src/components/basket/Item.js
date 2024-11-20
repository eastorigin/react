import { useContext } from "react";
import { ItemContext } from "./contexts/ItemContext";

export default function Item({ item }) {
  const { id, name, isChecked, picture, price, number } = item;

  const { contextChecked } = useContext(ItemContext);
  const { contextDeleteItem } = useContext(ItemContext);

  const onClickCheckHandler = (event) => {
    contextChecked(event);
  };

  const onClickDeleteHandler = () => {
    contextDeleteItem({ target: { value: id } });
  };

  return (
    <li>
      <div>
        <input
          defaultValue={id}
          type="checkbox"
          checked={isChecked ? "checked" : ""}
          onChange={onClickCheckHandler}
        />
      </div>
      <div>{name}</div>
      <div>
        <image src={picture} />
      </div>
      <div>{price}원</div>
      <div>{number}개</div>
      <button onClick={onClickDeleteHandler}>삭제</button>
    </li>
  );
}
