export default function Item({ item }) {
  const { id, name, isChecked, picture, price, number } = item;

  return (
    <li>
      <div>
        <input
          defaultValue={id}
          type="checkbox"
          checked={isChecked ? "checked" : ""}
        />
      </div>
      <div>{name}</div>
      <div>
        <image src={picture} />
      </div>
      <div>{price}원</div>
      <div>{number}개</div>
    </li>
  );
}
