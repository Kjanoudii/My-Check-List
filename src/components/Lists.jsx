/* eslint-disable no-unused-vars */
import List from "./List";

const Lists = (prop) => {
  const {
    setListName,
    data,
    setData,
    setIndex,
    changeItems,
    checklistsData,
    setChecklistsData,
  } = prop;

  // let id = 1;

  console.log(checklistsData);
  // const addNewList = () => {
  //   const newListName = prompt("Enter the name for the new list:");
  //   if (newListName) {
  //     setData((prevData) => [
  //       ...prevData,
  //       {
  //         name: newListName,
  //         items: [], // You can initialize items here if needed
  //       },
  //     ]);
  //   }
  //   console.log(data);
  // };

  return (
    <div className="w-1/3 bg-gray-200 p-4">
      {/* <h2 className="text-center">Add List</h2> */}
      {checklistsData.map((list, index) => (
        <List
          key={index}
          index={index}
          setListName={setListName}
          name={list.name}
          items={list.items}
          // addNewList={addNewList}
         
          setIndex={setIndex}
          changeItems={changeItems}
        />
      ))}
      <button
        // onClick={addNewList}
        className="block mt-4 mx-auto px-4 py-2
         bg-blue-500 text-white rounded 
         transform transition-transform hover:scale-105"
      >
        Add New List
      </button>
    </div>
  );
};

export default Lists;
