import {} from "react";
import {
  
} from "firebase/firestore";
const Checklist = (prop) => {
  const { listName, setCheckListItems, checkListItems, addNewTask, id } = prop;


  console.log(checkListItems)
  //   const myItems = data.forEach(element => {

  //       element.items;

  //     });

  const handleCheckboxChange = (id) => {
    setCheckListItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleClick = () => {
    // const newTaskName = prompt("Enter the name for the new task:");
      const newTaskName ="This is a task";
    if (newTaskName) {
      const newItem = {
        id: checkListItems.length + 1,
        text: newTaskName,
        checked: false,
      };
      addNewTask(id,newItem)
    }
  };
   
  return (
    <div className="bg-blue-300 w-1/2 p-4">
      <h1 className="text-white">{listName}</h1>
      <ul>
        {checkListItems.map((item) => (
          <li key={item.id} className="mt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(item.id)}
                className="mr-2"
              />
              <span>{item.text}</span>
            </label>
          </li>
        ))}
      </ul>

      <button
        onClick={handleClick}
        className="block mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded transform transition-transform hover:scale-105"
      >
        Add New Task
      </button>
    </div>
  );
};

export default Checklist;
