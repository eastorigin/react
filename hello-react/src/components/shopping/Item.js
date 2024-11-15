export default function Item({ src, title }) {
  return (
    <div>
      <img src={src} alt={title} style={{ width: "12vw", height: "30vh" }} />
      <div>{title}</div>
    </div>
  );
}
