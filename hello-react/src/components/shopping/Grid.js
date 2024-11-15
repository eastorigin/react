export default function Grid({ rows, cols, children }) {
  const gridStyle = {
    display: "grid",
    gridTemplateRow: rows,
    gridTemplateColumns: cols,
    gap: "5vw",
  };
  return <div style={gridStyle}>{children}</div>;
}
