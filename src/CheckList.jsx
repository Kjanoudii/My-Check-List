
import {  } from 'react';

const Checklist = (prop) => {
    const { listName , items, setItems } = prop

    //   const myItems = data.forEach(element => {

    //       element.items;

    //     });
    
    
   
    const handleCheckboxChange = (id) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );

        
    };

    const addNewTask = () => {
        const newTaskName = prompt('Enter the name for the new task:');
        if (newTaskName) {
            const newItem = {
                id: items.length + 1, 
                text: newTaskName,
                checked: false,
            };
            setItems([...items, newItem]);
        }
    };

    return (
        <div className="bg-blue-300 w-1/2 p-4">
            <h1 className="text-white">{listName}</h1>
            <ul>
                {items.map((item) => (
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

            <button onClick={addNewTask}
                className="block mt-4 mx-auto px-4 py-2 bg-blue-500 text-white rounded" >
                Add New Task
            </button>
        </div>
    );
};

export default Checklist;