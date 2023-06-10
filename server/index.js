const express =  require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")


// middleware
app.use(cors())
app.use(express.json())



// Routers

// create task
app.post("/todos", async (req, res) => {
    try{
        const {description} = req.body
        const addTodoQuery = `INSERT INTO todo (description) VALUES ($1) RETURNING *`

        const newTodo = await pool.query(addTodoQuery, [description])

        res.json(newTodo.rows[0])
    }
    catch (e) {
        console.log(e.message)
    }
})


// Get all task
app.get(`/todos`, async(req, res) => {
    try {
        const allTodoQuery = `SELECT * FROM TODO`
        const allTodo = await pool.query(allTodoQuery)
        res.json(allTodo.rows)
    }
    catch (e) {
        console.log(e.message);
    }
})




// get a task
app.get(`/todos/:id`, async (req, res) => {
    try {
        const {id} = req.params
        const singleTodoQuery = `SELECT * FROM TODO WHERE todoid = $1`
        const singleTodo = await pool.query(singleTodoQuery, [id])
        res.json(singleTodo.rows[0])
    }
    catch (e) {
        console.log(e.message)
    }
})


// update a task
app.put(`/todos/:id`, async (req, res) => {
    try {
        const {id} = req.params
        const {description} = req.body
        const updateTodoQuery = "UPDATE todo SET description = $1 WHERE todoid = $2"
        const updateTodo = await pool.query(updateTodoQuery, [description, id])

        res.json(req.body)
    } catch (e) {
        console.log(e.message)
    }
})


// delete a task
app.delete(`/todos/:id`, async (req, res) => {
    try{
        const {id} = req.params
        const deleteTodoQuery = `DELETE FROM todo WHERE todoid = $1`
        const deleteTodo = await pool.query(deleteTodoQuery, [id])
        res.json("Todo was deleted")
    }
    catch (e) {
        console.log(e.message)
    }
})



const PORT = 8080
app.listen(PORT, () => {
    console.log(`server on ${PORT}`)
})

