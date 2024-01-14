/* eslint-disable no-unused-vars */
// Page.js
import { useEffect, useState } from "react";
import Checklist from "./CheckList";
import Lists from "./Lists";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

export default function Page() {
  // console.log(db)

  const checklistsRef = collection(db, "Checklists");
  // eslint-disable-next-line no-unused-vars

  const [checklistsData, setChecklistsData] = useState([]);

  const getChecklists = async () => {
    try {
      const data = await getDocs(checklistsRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      setChecklistsData(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getChecklists();
    console.log(checklistsData);
    const newData = checklistsData;
    console.log(newData);
  }, []);

  const [listName, setListName] = useState("");
  const [index, setIndex] = useState(0);
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

  const [items, setItems] = useState([data[index].items]);

  const changeItems = (index) => setItems(data[index].items);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex w-1/2 my-20 h-96 shadow-lg">
        {/* left */}
        <Lists
          setListName={setListName}
          data={data}
          setData={setData}
          setIndex={setIndex}
          checklistsData={checklistsData}
          setChecklistsData={setChecklistsData}
          index={index}
          changeItems={changeItems}
        />
        {/* right */}
        <Checklist
          listName={listName}
          data={checklistsData}
          setData={setData}
          setIndex={setIndex}
          index={index}
          items={items}
          setItems={setItems}
          checklistsData={checklistsData}
          setChecklistsData={setChecklistsData}
        />
      </div>
    </div>
  );
}
