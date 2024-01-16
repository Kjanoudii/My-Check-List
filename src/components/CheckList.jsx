/* eslint-disable no-unused-vars */
import {useEffect} from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config.js";
import CheckListItem from "./CheckListItem"
const Checklist = (prop) => {
  const {
    listName,
    setCheckListItems,
    checkListItems,
    addNewTask,
    id,
    fetchData,
  } = prop;



  const handleCheckboxChange = (id) => {
    setCheckListItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id? { ...item, checked: !item.checked } : item
      )
    );

    //      const clickedElement = document.getElementById(`item-${index}`);

    // clickedElement.classList.toggle("selected");
  };

  const handleCLick = () => {
    const newTaskName = prompt("Enter the name for the new task");

    if (newTaskName) {
      const newItem = {
        id: checkListItems.length + 1,
        text: newTaskName,
        checked: false,
      };

      addNewTask(id.toString(), newItem);
    }
  };

  console.log(checkListItems);
  return (
    <div className="bg-blue-300 w-1/2 p-4">
      <h1 className="text-white">{listName}</h1>
      <ul>
        {checkListItems.map((item, index) => (
          <CheckListItem
            key={index}
            index={index}
            name={item.text}
            id={item.id}
            handleCheckboxChange={handleCheckboxChange}
            checked={item.checked}/>
          // <li
          //   id={`item-${index}`}
          //   key={item.id}
          //   className={`mt-2 ${item.checked ? "line-through" : ""}`}
          //   onClick={() => handleCheckboxChange(id)}
          //   style={{ cursor: "pointer" }}
          // >
          //   {item.text}
          // </li>
          // />
        ))}
      </ul>

      <button
        onClick={handleCLick}
        className="block mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded transform transition-transform hover:scale-105"
      >
        Add New Task
      </button>
    </div>
  );
};

export default Checklist;













            // <li key={item.id}className={`mt-2 ${item.checked ? 'line-through' : ''}`}>
            //   <label className="flex items-center">
            //     <input
            //       type="checkbox"
            //       checked={item.checked}
            //       onChange={() => handleCheckboxChange(item.id)}
            //       className="mr-2"
            //     />
            //     <span>{item.text}</span>
            //   </label>
            // </li>