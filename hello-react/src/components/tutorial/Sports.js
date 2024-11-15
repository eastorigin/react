export default function Sports() {
  const sportsList = ["축구", "농구", "야구", "배구", "골프"];
  return (
    <div>
      {sportsList.map((sport) => (
        <p>{sport}</p>
      ))}
    </div>
  );
}
