import React from 'react';
import ReactDOM from "react-dom";

import ToDoList from "./ToDoList";

const taskList = [
]

ReactDOM.render(
<ToDoList taskList={taskList}/>,
  document.getElementById('root')
);

