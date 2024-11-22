export default function Article({
  id,
  subject,
  email,
  viewCnt,
  crtDt,
  mdfyDt,
}) {
  return (
    <tbody>
      <tr style={{ textAlign: "center" }}>
        <td>{id}</td>
        <td>{subject}</td>
        <td>{email}</td>
        <td>{viewCnt}</td>
        <td>{crtDt}</td>
        <td>{mdfyDt}</td>
      </tr>
    </tbody>
  );
}
