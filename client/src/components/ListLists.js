import React, { Fragment, useEffect, useState } from "react";

const ListLists = () => {
  const [lists, setLists] = useState([]);
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  
  // get todos for a list
  const getTodos = async (list_id) => {
    try {
      const response = await fetch(`http://localhost:5000/lists/${list_id}`);
      const jsonData = await response.json();

      console.log(jsonData);

      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  // create todo for list
  const createTodo = async (e, list_id) => {
    
    e.preventDefault();

    try {
      const body = { todoName };
      const response = await fetch (`http://localhost:5000/lists/${list_id}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });

      console.log(response);
      getTodos(list_id);
    } catch (error) {
      console.error(error.message);
    }
  }

  // delete a todo
  const deleteTodo = async (list_id, todo_id) => {
    try {
      await fetch(`http://localhost:5000/lists/${list_id}/${todo_id}`, {
        method: "DELETE"
      });

      console.log(deleteTodo);

      setTodos(todos.filter(todo => todo.todo_id !== todo_id));
    } catch (error) {
      console.error(error.message);
    }
  }

  // delete a list
  const deleteList = async (list_id) => {
    try {
      await fetch(`http://localhost:5000/lists/${list_id}`, {
        method: "DELETE"
      });

      setLists(lists.filter(list => list.list_id !== list_id));
    } catch (error) {
      console.error(error.message);
    }
  };

  // get all lists
  const getLists = async () => {
    try {
      const response = await fetch("http://localhost:5000/lists");
      const jsonData = await response.json();

      setLists(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getLists();
    getTodos();
  }, []);

  return( 
    <Fragment>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>List</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*
            <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr>
          */}
          {lists.map(list => (
            <tr key ={list.list_id}>
              <td>{list.name}</td>
              <td>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#id${list.list_id}`} onClick={() => getTodos(list.list_id)}>
                  View List
                </button>

                <div class="modal" id={`id${list.list_id}`}>
                  <div class="modal-dialog">
                    <div class="modal-content">

                      <div class="modal-header">
                        <h4 class="modal-title">Todos</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                      </div>

                      <div class="modal-body">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Done</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {todos.map (todo => (
                              <tr key ={todo.todo_id}>
                                <td>{todo.name}</td>
                                <td>{todo.done}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodo(list.list_id, todo.todo_id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div class="modal-footer">
                        <form className="d-flex">
                          <input
                            type="text" 
                            className="form-control" 
                            value = {todoName}
                            onChange={e => setTodoName(e.target.value)}
                          />
                          <button
                            type="button"
                            class="btn btn-success"
                            onClick = {e => createTodo(e, list.list_id)}
                          >
                            Add
                          </button>
                        </form>
                      </div>

                    </div>
                  </div>
                </div>
              </td>
              <td>
                <button 
                  className="btn btn-danger"
                  onClick={() => deleteList(list.list_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListLists;