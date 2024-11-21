import { Alert } from "../ui/Modal";
import { ItemContext } from "./contexts/ItemContext";
import { useContext, useRef } from "react";

export default function AddItem() {
  const alertRef = useRef();
  const nameRef = useRef();
  const pictureRef = useRef();
  const priceRef = useRef();
  const numberRef = useRef();

  const { contextAddItem } = useContext(ItemContext);

  const onClickAddButtonHandler = () => {
    const name = nameRef.current.value;
    const number = numberRef.current.value;
    const picture = pictureRef.current.files[0];
    const price = priceRef.current.value;

    const result = contextAddItem(name, price, number, picture, alertRef);

    if (result) {
      nameRef.current.value = "";
      numberRef.current.value = "";
      priceRef.current.value = "";
      pictureRef.current.value = null;
    }
  };

  return (
    <div>
      <label htmlFor="name">상품명</label>
      <input
        type="text"
        id="name"
        placeholder="상품명을 입력하세요"
        ref={nameRef}
      />

      <label htmlFor="price">개당 가격</label>
      <input
        type="number"
        id="price"
        placeholder="가격을 입력하세요"
        ref={priceRef}
      />

      <label htmlFor="number">개수</label>
      <input
        type="number"
        id="number"
        placeholder="개수를 입력하세요"
        ref={numberRef}
      />

      <label htmlFor="picture">상품 사진</label>
      <input
        type="file"
        id="picture"
        placeholder="상품 사진을 등록해주세요"
        ref={pictureRef}
      />

      <button onClick={onClickAddButtonHandler}>장바구니 담기</button>
      <Alert alertRef={alertRef} />
    </div>
  );
}
