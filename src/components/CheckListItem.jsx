export default function CheckListItem(prop) {
  const { name, handleCheckboxChange, checked, id, index } = prop;
  return (
    <li key={index} className={`mt-2`}>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => handleCheckboxChange(id)}
          className="hidden" // Hide the default checkbox
        />
        <span
          className={`checkbox-label ${checked ? "line-through" : ""}`}
          style={{ cursor: "pointer" }}
        >
          {name}
        </span>
      </label>
    </li>
  );
}
// <li
//   id={`item-${id}`}
//   className={`mt-2 ${checked ? "line-through" : ""}`}
//   onClick={() => handleCheckboxChange(id)}
//   style={{ cursor: "pointer" }}
// >
//   {name}
// </li>
