import React, { Fragment } from "react";
import './App.css';

//components
import InputList from "./components/InputLists";
import ListLists from "./components/ListLists";

function App() {
  return(
    <Fragment>
      <div className="container">
        <InputList />
        <ListLists />
      </div>
    </Fragment>
  );
}

export default App;
