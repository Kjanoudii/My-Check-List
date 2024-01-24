/* eslint-disable no-unused-vars */
export default function List(prop) {
  const { setListName, name, index, setIndex, changeItems, fetchData } = prop;

  const getListName = () => {
    setListName(name);
    console.log(name);
  };

  const handleClick = () => {
    setIndex(index);
    changeItems(index);
  };

  return (
    <div className="cursor-pointer border-b border-white border-opacity-70 rounded py-2 hover:bg-gray-100">
      <h3
        className=" py-2 text-center"
        onClick={() => {
          getListName();
          handleClick();
        }}
      >
        {name}
      </h3>
    </div>
  );
}