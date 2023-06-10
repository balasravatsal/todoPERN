import React, {useEffect, useState} from 'react';
import EditTodo from "./EditTodo";

const ListTodo = () => {
    const [todoList, setTodoList] = useState([])

    const getTodoList = async () => {
        try {
            const response = await fetch("http://localhost:8080/todos")
            const jsonData = await response.json()
            setTodoList(jsonData)
            console.log(jsonData)
        } catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        getTodoList()
    }, [])

    // delete
    const deleteTodo = async (id) => {
        try {
            const deleteTodoItem = await fetch(`http://localhost:8080/todos/${id}`, {
                method: "DELETE"
            })
            setTodoList(todoList.filter(todo => todo.todoid !== id))
            console.log(deleteTodoItem)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (<>
        <div className="container mt-3">
            <h2>Tasks</h2>
            <p>Maintain all the tasks and be on time</p>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {todoList.map((todo) => {
                    return (<tr key={todo.todoid}>
                        <td>{todo.description}</td>
                        <td><EditTodo todo = {todo}/></td>
                        <td>
                            <button className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todoid)}
                            >Delete
                            </button>
                        </td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    </>);
};

export default ListTodo;