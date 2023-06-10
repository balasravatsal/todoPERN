import React, {useState} from 'react';

const InputTodo = () => {
    const [description, setDescription] = useState("")

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const body = {description}
            const response = await fetch("http://localhost:8080/todos", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                }
            )
            window.location = '/'
            console.log(response)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <h1 className="text-center mt-5">Task Tracker</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitHandler}>
                <input type="text"
                       className="form-control"
                       value={description}
                       onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </>
    );
};

export default InputTodo;