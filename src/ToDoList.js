import React from "react";
import "./index.css";

import AddTask from "./addTask";
import ShowDoneList from "./showDoneList";

export default class ToDoList extends React.Component{
   constructor(props){
       super(props);
       this.state={
				index: "", 
				task:"", 
				notes: "", 
				date: "", 
				time:"",
				priority: "",
				add: false, 
				edit: false, 
        done: 0,
        showD: false,
				disabled: true,
				checkbox: false}
        this.taskList=this.props.taskList;
        this.doneList=this.props.doneList;

       this.press=this.press.bind(this);
       this.handleChange=this.handleChange.bind(this);
       this.checked=this.checked.bind(this);
       this.editTask=this.editTask.bind(this);
       this.onChange=this.onChange.bind(this);
       this.removeTask=this.removeTask.bind(this);
       this.showDone=this.showDone.bind(this);
       this.onSubmit=this.onSubmit.bind(this);
       this.showDoneList=this.showDoneList.bind(this);
       this.changeShow=this.changeShow.bind(this);
       this.returnTask=this.returnTask.bind(this)
			 this.deleteTask=this.deleteTask.bind(this);
			 this.validate=this.validate.bind(this)

       this.showTasks();
   }
   press(){
       this.setState({add: !this.state.add} );
   }
   showLine(){
    if(this.state.add === true)return <AddTask onChange={this.onChange} handleChange={this.handleChange} state={this.state}/>
		if( this.taskList.length === 0)return (this.noTasks())
    if(this.state.edit ===true)return <AddTask element={this.state} editTask={this.editTask} onSubmit={this.onSubmit}  validate={this.validate}/>
   }
	 resetState(){
		 return(
			this.setState({add: false, 
				index: "", 
				edit: false, 
				task:"", 
				notes: "", 
				date: "", 
				priority: "",
				done: 0,
				showD: false,
				disabled: true,
				checkbox: false})
		 )
	 }

noTasks(){
    return (
        <div  className="noRem">
            <h2>No reminders</h2>
        </div>
    )
}

onChange(e) {
	let value= e.target.value
		if(e.target.name=== "task") return this.setState({task: value, disabled: this.validate(e.target)})
		if(e.target.name==="notes")return this.setState({notes: value, disabled: this.validate(e.target)})
		if(e.target.name==="date") return this.setState({date: value, disabled: this.validate(e.target)})
		if(e.target.name==="time") return this.setState({time: value,disabled: this.validate(e.target)})
		if(e.target.name==="priority") return this.setState({priority: value, disabled: this.validate(e.target)})
}
removeTask(e){
	e.target.checked=false
	let index = this.getIndex(e);
	this.doneList.push(this.taskList[index]);
	this.taskList.splice(index, 1);
	this.resetState();
}
returnTask(e){
	let index = this.getIndex(e);
	this.taskList.push(this.doneList[index]);
	this.doneList.splice(index, 1);
	if(this.doneList.length<1) return this.setState({showD:false})
}
editTask(e){
	let index= this.state.index?this.state.index: this.getIndex(e);
	console.log(index)
	let el = this.taskList[index];
	let value= e.target.value
		if(e.target.name=== "task") return this.setState({task: value,disabled: this.validate(e.target)})
		if(e.target.name==="notes") return this.setState({notes: value,disabled: this.validate(e.target)})
		if(e.target.name==="date") return this.setState({date: value,disabled: this.validate(e.target)})
		if(e.target.name==="time") return this.setState({time: value, disabled: this.validate(e.target)})
		if(e.target.name==="priority") return this.setState({priority: value,disabled: this.validate(e.target)})

		return ( this.setState({add: false, index: index, edit: true, task: el.task, notes: el.notes, date: el.date, time: el.time, priority: el.priority}));
}

validate(e){
	console.log(e)
	console.log(e.value)
	let task = document.getElementsByName("task")[0].value;
	console.log(task)
	if(e.value <=0 || task.length <=1 )return true
	return false

	// if(e.length >= 0) return false
	// if(e.langht === 0) return this.resetState();
	
	
}
checked(e){
	// this.setState({checkbox: true});
	// this.showTasks()
	return setTimeout(() =>  this.removeTask(e), 1000)
}


handleChange(){
    console.log(this.state)
    this.taskList.push(this.state);
		this.resetState();
    this.showTasks();
    this.press();
   }

onSubmit(e){
	e.preventDefault();
	this.taskList.splice(this.state.index, 1,this.state); 
	this.resetState();
	this.showTasks();
}


getIndex(e){
    let t = e.target.closest(".task");
    let index= t.attributes.index.value;
    this.setState({index: index})
    return  index
}


deleteTask(e){
	console.log(e.target);
	let index=this.getIndex(e)
	this.taskList.splice(index, 1);
}

showTasks(){
    if(this.taskList.length>0)return (
			<div>
					{this.taskList.map((item, i)=>{
						return(
							<div className="task" index={i} key={i+1}  >
									<span className="delBtn" onClick={this.deleteTask}>+</span>
										<input type="checkbox" defaultChecked={this.state.checkbox} disabled={this.state.checkbox} onChange={this.checked} id={i+"check"}  ></input>
										<label htmlFor={i+"check"}></label>
									<div onDoubleClick={this.editTask}>
											<p > <span className="priority">{item.priority}</span>{item.task}</p>
											<div className="coment">
												<p>{item.notes} </p>
												<p>{item.date} {item.time ? ` at: ${item.time}`:''}</p>
											</div>	
									</div>
							</div>
						) 
					})}
			</div>
	)
}
showDone(){
    if(this.doneList.length > 0 )return (
		<p className="show-doneList" >{this.doneList.length} Complited <span onClick={this.changeShow}>{this.state.showD?"hide":"show"}</span></p>)
}
changeShow(){
    this.setState({showD: !this.state.showD})
}
showDoneList(){
    if(this.state.showD)return ( 
		<ShowDoneList checked={this.checked} state={this.state} doneList={this.doneList} returnTask={this.returnTask}/>)
}
    render(){
        return (<div className="container">
            <button className="addTask" onClick={this.press}>+</button>
            <h1>To Do List <span>{this.taskList.length}</span></h1>
            		{this.showDone()}
                {this.showTasks()}
                {this.showLine()}
                {this.showDoneList()}
            </div>)
            
    }
}