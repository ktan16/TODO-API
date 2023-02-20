import React, { Fragment, useState } from "react";

const InputList = () => {

  const [list_name , setListName] = useState("");

  const onSubmitForm = async e => {
    
    e.preventDefault();

    try {
      const body = { list_name };
      await fetch("http://localhost:5000/lists", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return(
    <Fragment>
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input 
          type="text" 
          className="form-control" 
          value={list_name}
          onChange={e => setListName(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputList;