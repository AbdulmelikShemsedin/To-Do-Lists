import React, { useEffect, useState } from "react";

const TodoLists = () => {
    const [list, setList] = useState([]);
    const [input, setInput] = useState('');
    useEffect(() => {
        document.title = list.length + " To-Do's";
    }, [list])

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const addList = () => {
        if(document.getElementById("newListToAdd").value === ""){
            return;
        }
        setList(li => [...li, document.getElementById("newListToAdd").value]);
        setInput('');
    }

    const deleteList = (index) => {
        let newList = list.filter((_, i) => i !== index);
        setList(newList);
    }

    const moveUpList = (index) => {
        if(index > 0){
            const orderedList = [...list];
            [orderedList[index - 1], orderedList[index]] = [orderedList[index], orderedList[index - 1]]
            setList(orderedList);
        }
    }

    const moveDownList = (index) => {
        if(index < list.length - 1){
            const orderedList = [...list];
            [orderedList[index + 1], orderedList[index]] = [orderedList[index], orderedList[index + 1]];
            setList(orderedList);
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            addList();
        }
    }

    return(
        <div className="todo">
            <h1>To-Do Lists</h1>

            <div className="addInput">
                <input type="text" placeholder="Enter Your New List" id="newListToAdd" value={input} onChange={handleChange} onKeyDown={handleKeyDown} />
                <button onClick={addList}>Add List</button>
            </div>

            <ol>
                {list.map((el, i) => 
                    <li key={i}>
                        <div>
                            <span>{el}</span>
                            <div>
                                <button onClick={() => deleteList(i)}>Delete</button>
                                <button onClick={() => moveUpList(i)}>👆</button>
                                <button onClick={() => moveDownList(i)}>👇</button>
                            </div>
                        </div>
                    </li>
                )}
            </ol>
        </div>
    )
}
export default TodoLists