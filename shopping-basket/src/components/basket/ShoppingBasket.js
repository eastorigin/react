import { ItemContext } from "./contexts/ItemContext";
import { useContext } from "react";
import Item from "./Item";
import AddItem from "./AddItem";

export default function ShoppingBasket() {
  const { contextItem } = useContext(ItemContext);
  return (
    <div>
      <ul>
        {contextItem.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
      <AddItem />
    </div>
  );
}
