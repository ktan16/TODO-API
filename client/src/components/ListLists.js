import React, { Fragment, useEffect, useState } from "react";

import EditList from "./EditLists";

const ListLists = () => {
  const [lists, setLists] = useState([]);

  // delete lists

  const deleteList = async list_id => {
    try {
      await fetch(`http://localhost:5000/lists/${list_id}`, {
        method: "DELETE"
      });

      setLists(lists.filter(list => list.list_id !== list_id));
    } catch (error) {
      console.error(error.message);
    }
  };

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
  }, []);

  return( 
    <Fragment>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>List</th>
            <th>Edit</th>
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
            <tr>
              <td>{list.name}</td>
              <td>Edit</td>
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