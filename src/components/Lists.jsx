/* eslint-disable no-unused-vars */
import List from "./List";

const Lists = (prop) => {
  const {
    setListName,
    listName,
    setIndex,
    changeItems,
    checkListsData,
    setId,
    addList,
  } = prop;

  console.log(checkListsData);

  return (
    <div className="lg:w-1/3 w-full bg-gray-200 p-4">
      {checkListsData.map((list, index) => (
        <List
          key={index}
          index={index}
          name={list.name}
          items={list.items}
          addList={addList}
          setIndex={setIndex}
          changeItems={changeItems}
          listName={listName}
          setListName={setListName}
         
        />
      ))}
      <button
        onClick={() => {
          const listName = prompt("Enter the name for the new task:");
          addList(listName);
        }}
        className="block mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded  transform transition-transform hover:scale-105"
      >
        Add New List
      </button>
    </div>
  );
};

export default Lists;
