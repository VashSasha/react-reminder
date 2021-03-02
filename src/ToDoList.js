import React from "react";
import "./index.css";

import AddTask from "./addTask";
// import TaskList from "./TaskList";
// import App from "./newTask"

export default class ToDoList extends React.Component{
   constructor(props){
       super(props);
       this.state={add: false, edit: false, task:"", notes: "", date: "", priority: ""}
        this.taskList=this.props.taskList;
       this.press=this.press.bind(this);
       this.handleChange=this.handleChange.bind(this);
    //    this.editTask=this.editTask.bind(this)
       this.onChange=this.onChange.bind(this);
       this.removeTask=this.removeTask.bind(this)
       

       this.showTasks();
   }
   press(){
       this.setState({add: !this.state.add} );
   }
   showLine(){
    //    console.log(this.taskRef.current)
    if(this.state.add === true){
        return <AddTask
        onChange={this.onChange}s
        handleChange={this.handleChange} />
       }else if(
           this.state.add === true || this.props.taskList.length ===0){
           return (
               <div  className="noRem">
                   <h2>No reminders</h2>
               </div>
           )
       }else if(this.state.edit === true){
           return <AddTask/>
       }
   }

   

  onChange(e) {
    let value= e.target.value
      if(e.target.name=== "task"){
       return this.setState({task: value})
      }else if(e.target.name==="notes"){
        return this.setState({notes: value})
      }else if(e.target.name==="date"){
        return this.setState({date: value})
      }else if(e.target.name==="priority"){
        return this.setState({priority: value})
      }else(this.setState())

  }
handleChange(e){
    e.preventDefault();
   this.taskList.push(this.state)
   this.setState({edit: false, task: "", notes: "", date: "", priority: ""});
    this.showTasks();
    this.press();

   }

removeTask(e){
    e.preventDefault();

    let t = e.target.closest("div");
    let index= t.attributes.index.value;

    console.log(this.taskList)
    this.taskList.splice(index, 1);
    console.log(this.taskList)

    // this.handleChange()

}

// editTask(e){
    
  
// }
showTasks(){
    if(this.props.taskList.length>=0){
        return (
            <div>
                {this.props.taskList.map((item, i)=>{
                  return(
                      <div className="task" index={i} key={i+1} onDoubleClick={this.removeTask} >
                        <p > <span className="priority">{item.priority}</span>{item.task}</p>
                        <p className="coment">{item.notes}</p>
                        <p className="coment">{item.date}</p>
                    </div>

                  ) 
                })}
            </div>
        )
    }else{}
}
    render(){
        
        return (<div className="container">
            <button className="addTask" onClick={this.press}>+</button>
            <h1>To Do List <span></span></h1>
                {this.showTasks()}
                {this.showLine()}
            </div>)
            
    }
}