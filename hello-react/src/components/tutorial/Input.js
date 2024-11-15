export default function Input({
  title,
  id,
  className,
  type,
  placeholder,
  value,
  children,
}) {
  return (
    <>
      <label htmlFor={id}>{title}</label>
      {type === "select" ? (
        <select id={id}>{children}</select>
      ) : (
        <input
          id={id}
          className={className}
          type={type}
          placeholder={placeholder}
          defaultValue={value}
        />
      )}
    </>
  );
}
