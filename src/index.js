import React from 'react';
import ReactDOM from "react-dom";

import ToDoList from "./ToDoList";

const taskList = []
const doneList=[]
ReactDOM.render(
<ToDoList taskList={taskList} doneList={doneList}/>,
  document.getElementById('root')
);

