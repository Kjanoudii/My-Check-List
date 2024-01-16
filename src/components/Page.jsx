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
  setDoc,
  updateDoc,
} from "firebase/firestore";

export default function Page() {
  const [index, setIndex] = useState(0);
  const [id, setId] = useState("");
  const checklistsRef = collection(db, "Checklists");

  const [checkListsData, setCheckListsData] = useState([]);
  const [checkListItems, setCheckListItems] = useState([]);
  const [listName, setListName] = useState("");
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

  const changeItems = async (index) => {
    await fetchData();
    setId(index + 1);
    setCheckListItems(checkListsData[index].items);
  };

  let updatedCheckListItems;

  const addNewTask = async (id, newItem) => {
    const checklistRef = doc(db, "Checklists", id);

    try {
      const contactSnapshot = await getDoc(checklistRef);
      if (contactSnapshot.exists()) {
        const checklistData = contactSnapshot.data();
        updatedCheckListItems = [...checklistData.items, newItem];

        await updateDoc(checklistRef, { items: updatedCheckListItems });
        setCheckListItems(updatedCheckListItems);
        fetchData();
      } else {
        console.log("Contact document does not exist");
      }
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const addList = async (listName) => {
    try {
      const newId = checkListsData.length + 1; // Calculate the new ID
      const checklistRef = doc(db, "Checklists", newId.toString());

      await setDoc(checklistRef, {
        name: listName,
        items: [],
      });

      setCheckListsData((prevData) => [
        ...prevData,
        { name: listName, items: [] },
      ]);
      fetchData();
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex w-1/2 my-20 h-96 shadow-lg">
        {/* left */}
        <Lists
          listName={listName}
          setListName={setListName}
          setIndex={setIndex}
          checkListsData={checkListsData}
          index={index}
          changeItems={changeItems}
          addList={addList}
          fetchData={fetchData}
        />
        {/* right */}
        <Checklist
          checkListItems={checkListItems}
          setCheckListItems={setCheckListItems}
          addNewTask={addNewTask}
          id={id}
          listName={listName}
          fetchData={fetchData}
          changeItems={changeItems}
        />
      </div>
    </div>
  );
}
