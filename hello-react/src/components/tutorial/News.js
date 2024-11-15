export default function News({ news1, news2, news3, onItemClickHandler }) {
  return (
    <ul>
      {/* 주석 사용 불가 */}
      <li onClick={onItemClickHandler}>{news1}</li>
      <li onClick={onItemClickHandler}>{news2}</li>
      <li onClick={onItemClickHandler}>{news3}</li>
    </ul>
  );
}
