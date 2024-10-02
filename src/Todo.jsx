import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
// import './Todo.css'

export default function Todo() {
    let [todos, setTodos] = useState([{task: "Sample task", id: uuidv4(), isDone: false}])
    let [newTodo, setNewTodo] = useState("")

    // for editing

    let [editID , setEditId] = useState(null)
    let [editValue, setEditValue] =useState("")

    let editTodo = (id,task) => {
        setEditId(id)
        setEditValue(task)
    }

    let saveEdit = (id) => {
        setTodos((preTodo) => 
            preTodo.map((todo) => 
               todo.id == id ?
                 {...todo, task: editValue} : todo
            )
        )
        setEditId(null);
        setEditValue("");
    }

    let addNewTask = () => {
        setTodos((preTodo) => {
            return [...preTodo, {task: newTodo, id: uuidv4(), isDone: false}]
         })
        setNewTodo("")
    }

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value)
    }

    let deleteTodo = (id) => {
        setTodos((preTodo) => {
            return (preTodo.filter((todo) => todo.id!= id))
        })
    }

    let markAsDone = (id) => {
        setTodos((preTodo) => 
            preTodo.map((todo)=> 
                todo.id == id ? {...todo, isDone: true} : todo
            )
        )
    }


    return(
        <div>
            <h2>----------- Todo -----------</h2>
            <br></br>
            <input placeholder="add a task" value={newTodo} onChange={updateTodoValue}/>
            &nbsp;
            <button onClick={addNewTask}><i className="fa-solid fa-plus"></i></button>
            <br></br><br></br>
            <hr />
            <br></br><br></br>
            <ul style={{listStyleType: "none",
                            paddingLeft: "0"}}>
                {
                    todos.map((todo) => ( 
                        <li key={todo.id} >
                            {
                                editID === todo.id ? (
                                    <input type="text"
                                     value={editValue}
                                     onChange={(event) => setEditValue(event.target.value)}
                                    />
                                ) : (<span style={todo.isDone ? { textDecoration: "line-through" } : {}}>
                                {todo.task}
                                </span>)
                            }
                            &nbsp;&nbsp;
                            <button onClick={() => markAsDone(todo.id)}><i className="fa-solid fa-check"></i></button>
                            &nbsp;&nbsp;
                            {
                                editID === todo.id ? (
                                    <button onClick={() => saveEdit(todo.id)}><i className="fa-regular fa-floppy-disk"></i></button>
                                ) : ( 
                                <button onClick={() => editTodo(todo.id, todo.task)}><i className="fa-regular fa-pen-to-square"></i></button>
                            )
                            }
                            &nbsp;&nbsp;
                            <button onClick={() => {
                                deleteTodo(todo.id)
                            }}><i className="fa-solid fa-trash"></i></button>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}