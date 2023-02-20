const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// POST: create todo list
/*
{
  "list_name": name of todo list
}
*/
app.post("/lists", async (req, res) => {
  try {
    const { list_name } = req.body;
    const newList = await pool.query(
      "INSERT INTO todolists (name) VALUES($1) RETURNING *", 
      [list_name]
    );
    
    res.json(newList.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// GET: get all todo lists
app.get("/lists", async(req, res) => {
  try {
    const allLists = await pool.query("SELECT * FROM todolists");

    res.json(allLists.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// POST: create todo item for list
/*
{
  "todo_name": todo item name
}
*/
app.post("/lists/:list_id", async (req, res) => {
  try {
    const { list_id } = req.params;
    const data = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todoitems (list_id, name, done) VALUES($1, $2, $3) RETURNING *",
      [list_id, data.todo_name, 0]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// GET: get all todo items in list
app.get("/lists/:list_id", async (req, res) => {
  try {
    const { list_id } = req.params;
    const allTodos = await pool.query(
      "SELECT * FROM todoitems WHERE list_id = $1",
      [list_id]
    );

    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// PUT: update todo item, mark it as done
/*
{
  "todo_id": todo id
}
*/
app.put("/lists/:list_id", async (req, res) => {
  try {
    const data = req.body;
    const updateTodo = await pool.query(
      "UPDATE todoitems SET done = $1 WHERE todo_id = $2",
      [1, data.todo_id]
    );

    res.json(`Todo item is marked as done.`);
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE: delete todo item from list
/*
{
  "todo_id": todo id
}
*/
app.delete("/lists/:list_id", async (req, res) => {
  try {
    const data = req.body;
    const deleteItem = await pool.query(
      "DELETE FROM todoitems WHERE todo_id = $1",
      [data.todo_id]
    );

    res.json(`Todo item was deleted.`);
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE: delete todo list
/*
{
  "list_id": list id
}
*/
app.delete("/lists", async (req, res) => {
  try {
    const data = req.body;

    const deleteList = await pool.query(
      "DELETE FROM todolists WHERE list_id = $1",
      [data.list_id]
    );
    const deleteItem = await pool.query(
      "DELETE FROM todoitems WHERE list_id = $1",
      [data.list_id]
    );

    res.json(`Todo list was deleted.`);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));