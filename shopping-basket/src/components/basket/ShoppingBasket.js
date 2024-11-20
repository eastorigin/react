import { ItemContext } from "./contexts/ItemContext";
import { useContext } from "react";
import Item from "./Item";
import AddItem from "./AddItem";

export default function ShoppingBasket() {
  const { contextItem } = useContext(ItemContext);
  const { contextAllChecked } = useContext(ItemContext);

  const checkedItemNumber = contextItem.filter((item) => item.isChecked).length;
  const totalItemNumber = contextItem.length;

  const onClickAllCheckHandler = (event) => {
    contextAllChecked(event);
  };

  return (
    <div>
      <ul>
        {contextItem.map((item) => (
          <Item key={item.id} item={item} />
        ))}
        <input onClick={onClickAllCheckHandler} type="checkbox" id="allCheck" />
        <label htmlFor="allCheck">
          전체 선택 ({checkedItemNumber}/{totalItemNumber})
        </label>
      </ul>
      <AddItem />
    </div>
  );
}
