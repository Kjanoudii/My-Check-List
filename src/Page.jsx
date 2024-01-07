// Page.js
import { useState } from 'react';
import Checklist from './CheckList';
import Lists from './Lists';

export default function Page() {
    const [listName, setListName] = useState('');
    const[index, setIndex] = useState(0)
    const [data, setData] = useState([
        {
            name: 'Workout Log',
            items: [
                { id: 1, text: 'Exercise 1', checked: false },
                { id: 2, text: 'Exercise 2', checked: false }
            ]
        },
        {
            name: 'Groceries',
            items: [
                { id: 1, text: 'Milk', checked: false },
                { id: 2, text: 'Bread', checked: false }
            ]
        },
        {
            name: 'To-Do List',
            items: [
                { id: 1, text: 'Task 1', checked: false },
                { id: 2, text: 'Task 2', checked: false },
            ]
        }
    ]);


    const [items, setItems] = useState([data[index].items]);

    const changeItems = (index) => setItems(data[index].items)

    return (
        <div className="flex justify-center items-center h-full">
            <div id="test" className="flex w-1/2 my-20 h-96">

                {/* left */}
                <Lists setListName={setListName} 
                data={data} setData={setData} 
                    setIndex={setIndex} index={index} changeItems={changeItems}/>
                {/* right */}
                <Checklist listName={listName} 
                data={data} setData={setData} 
                    setIndex={setIndex} index={index}
                    items={items}
                    setItems={setItems}
                    />
            </div>
        </div>
    );
}
