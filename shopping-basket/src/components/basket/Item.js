import { useContext } from "react";
import { ItemContext } from "./contexts/ItemContext";

export default function Item({ item }) {
  const { id, name, isChecked, picture, price, number } = item;

  const { contextChecked } = useContext(ItemContext);
  const { contextDeleteItem } = useContext(ItemContext);
  const { contextUpdateNumber } = useContext(ItemContext);

  const onClickCheckHandler = (event) => {
    contextChecked(event);
  };

  const onClickDeleteHandler = () => {
    contextDeleteItem(id);
  };

  const decreaseHandler = () => {
    contextUpdateNumber(id, -1);
  };

  const increaseHandler = () => {
    contextUpdateNumber(id, 1);
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
        <img src={picture} alt={name} />
      </div>
      <div>{price}원</div>
      <button onClick={decreaseHandler}>-</button>
      <div>{number}개</div>
      <button onClick={increaseHandler}>+</button>
      <button onClick={onClickDeleteHandler}>삭제</button>
    </li>
  );
}
