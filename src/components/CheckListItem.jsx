export default function CheckListItem(prop) {
  const { name, handleCheckboxChange, checked, id } = prop;
  return (
    <li
      id={`item-${id}`}
      className={`mt-2 ${checked ? "line-through" : ""}`}
      onClick={() => handleCheckboxChange(id)}
      style={{ cursor: "pointer" }}
    >
      {name}
    </li>
  );
}
