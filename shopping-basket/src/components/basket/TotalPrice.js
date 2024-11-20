import { useContext } from "react";
import { ItemContext } from "./contexts/ItemContext";

export default function TotalPrice() {
  const { contextItem } = useContext(ItemContext);

  const totalItemPrice = contextItem.map((item) => ({
    ...item,
    totalItemPrice: item.price * item.number,
  }));

  const totalShoppingBasketPrice = totalItemPrice.reduce(
    (sum, item) => sum + item.totalItemPrice,
    0
  );

  return (
    <div>
      <h2>장바구니 총 가격</h2>
      <ul>
        {totalItemPrice.map((item) => (
          <li key={item.id}>
            <div>
              {item.name} 총 가격: {item.totalItemPrice}원
            </div>
          </li>
        ))}
      </ul>
      <h3>전체 장바구니 가격: {totalShoppingBasketPrice}원</h3>
    </div>
  );
}
