export default function Section({ title, fontColor = "#333", children }) {
  console.log("Section 컴포넌트가 실행되었습니다");
  return (
    <div
      style={{
        backgroundColor: "#CCC",
        color: fontColor,
      }}
    >
      This is a {title} Component
      {children}
    </div>
  );
}
