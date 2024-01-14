/* eslint-disable no-unused-vars */
// Page.js
import { useEffect, useState } from "react";
import Checklist from "./CheckList";
import Lists from "./Lists";
import { db } from "../firebase-config.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Page() {
  // console.log(db)

  const [index, setIndex] = useState(0);
  const[id, setId]=useState(index+1)
  const checklistsRef = collection(db, "Checklists");
  // eslint-disable-next-line no-unused-vars

  const [checkListsData, setCheckListsData] = useState([]);
  const [checkListItems, setCheckListItems] = useState([]);

  const getChecklists = async () => {
    try {
      const data = await getDocs(checklistsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      setCheckListsData(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   getChecklists();
  //   console.log(checkListsData);
  //   const newData = checkListsData;
  //   console.log(checkListsData[index].items);
  // }, [checkListItems]);

  const fetchData = async () => {
    await getChecklists();
    console.log(checkListsData);
    const newData = checkListsData;
    console.log(newData[index].items);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(checkListsData);

  const [listName, setListName] = useState("");
  const [data, setData] = useState([
    {
      name: "Workout Log",
      items: [
        { id: 1, text: "Exercise 1", checked: false },
        { id: 2, text: "Exercise 2", checked: false },
      ],
    },
    {
      name: "Groceries",
      items: [
        { id: 1, text: "Milk", checked: false },
        { id: 2, text: "Bread", checked: false },
      ],
    },
    {
      name: "To-Do List",
      items: [
        { id: 1, text: "Task 1", checked: false },
        { id: 2, text: "Task 2", checked: false },
      ],
    },
  ]);

  console.log(checkListsData[index]);
  // const [items, setItems] = useState([data[index].items]);

  const changeItems = (index) => setCheckListItems(checkListsData[index].items);

  let updatedCheckListItems;

  const addNewTask = async (id, newItem) => {
    const checklistRef = doc(db, "Checklists", id);

    try {
      const contactSnapshot = await getDoc(checklistRef);
      if (contactSnapshot.exists()) {
        const checklistData = contactSnapshot.data();
        updatedCheckListItems = [...checklistData.items, newItem];

        await updateDoc(checklistRef, {items: updatedCheckListItems });
        setCheckListItems(updatedCheckListItems);

        getChecklists();
      } else {
        console.log("Contact document does not exist");
      }
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex w-1/2 my-20 h-96 shadow-lg">
        {/* left */}
        <Lists
          setListName={setListName}
          data={data}
          setData={setData}
          setIndex={setIndex}
          checkListsData={checkListsData}
          setCheckListsData={setCheckListsData}
          index={index}
          changeItems={changeItems}
        />
        {/* right */}
        <Checklist
          listName={listName}
          data={checkListsData}
          setData={setData}
          setIndex={setIndex}
          index={index}
          // items={items}
          // setItems={setItems}
          checkListItems={checkListItems}
          setCheckListItem={setCheckListItems}
          checklistsData={checkListsData}
          setCheckListsData={setCheckListsData}
          addNewTask={addNewTask}
          id={id}
        />
      </div>
    </div>
  );
}
