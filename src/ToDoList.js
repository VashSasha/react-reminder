import React from "react";
import "./index.css";

import AddTask from "./addTask";
import ShowDoneList from "./showDoneList";
import ShowTaskLisk from "./showTaskLisk";

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
       this.returnTask=this.returnTask.bind(this);
			 this.deleteTask=this.deleteTask.bind(this);
			 this.validate=this.validate.bind(this);
			 this.checkDate=this.checkDate.bind(this)

       this.showTasks();
   }
   press(){
		//  this.resetState();
		if(!this.state.add && this.state.edit) return this.setState({edit: false} );
		if(!this.state.add ) return this.setState({add: true} );
		this.resetState()
      
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
				time: "", 
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
	let el = this.taskList[index];
	let value= e.target.value
		if(e.target.name=== "task") return this.setState({task: value,disabled: this.validate(e.target)})
		if(e.target.name==="notes") return this.setState({notes: value,disabled: this.validate(e.target)})
		if(e.target.name==="date") return this.setState({date: value,disabled: this.validate(e.target)})
		if(e.target.name==="time") return this.setState({time: value, disabled: this.validate(e.target)})
		if(e.target.name==="priority") return this.setState({priority: value,disabled: this.validate(e.target)})


		if((this.state.add && !this.state.edit) || !this.state.edit) return this.setState({add: false, index: index, edit: true, task: el.task, notes: el.notes, date: el.date, time: el.time, priority: el.priority});
		// return ( this.setState({add: false, index: index, edit: true, task: el.task, notes: el.notes, date: el.date, time: el.time, priority: el.priority}));
}

checked(e){
	this.setState({checkbox: !this.state.checkbox})
	return this.removeTask(e)
}

getIndex(e){
    let t = e.target.closest(".task");
    let index= t.attributes.index.value;
    this.setState({index: index})
    return  index
}

deleteTask(e){
	let index=this.getIndex(e)
	if(e.target.dataset.listtype==="done") {
		this.doneList.splice(index, 1); 
		if(this.doneList.length<1)return this.setState({showD: false})
	}
	if(e.target.dataset.listtype==="task")return this.taskList.splice(index, 1);
}

changeShow(){
    this.setState({showD: !this.state.showD})
}

checkDate(e){
	let nd = e.split("-").join(',');
	let newDate = new Date(nd);
	let today = new Date();
	let yesterday = new Date();
	let tomorrow = new Date();
	let prevDate = new Date(nd);

	yesterday = yesterday.setDate(today.getDate() - 1);
	tomorrow = tomorrow.setDate(today.getDate() + 1);
	// prevDate = prevDate.setDate(today.getDate() + 1);

	let newYes = new Date(yesterday);
	let newTomorrow = new Date(tomorrow);

	let newDateDataString=newDate.toLocaleDateString()
	let todayDataString=today.toLocaleDateString()
	let yesterdayDataString=newYes.toLocaleDateString()
	let tomorrowDataString=newTomorrow.toLocaleDateString()
	if(newDateDataString === yesterdayDataString) return (<span className="expired">Yesterday</span>)
	if(newDateDataString === todayDataString) return ("Today")
	if(newDateDataString === tomorrowDataString) return ("Tomorrow")
	if(prevDate < today) return (<span className="expired">{e}</span>)
	return e

}

validate(e){
	let task = document.getElementsByName("task")[0].value;
	if(e.value <=0 || task.length <=1 )return true
	return false
}

handleChange(e){
	e.preventDefault();
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

showTasks(){
	if(this.taskList.length>0)return <ShowTaskLisk taskList={this.taskList} state={this.state} deleteTask={this.deleteTask} editTask={this.editTask} checked={this.checked}  checkDate={this.checkDate}/>
}

showDone(){
    if(this.doneList.length > 0 )return (
		<p className="show-doneList" >{this.doneList.length} Complited 
			<span onClick={this.changeShow}> {this.state.showD?"hide":"show"}</span>
		</p>)
}

showDoneList(){
    if(this.state.showD)return ( 
		<ShowDoneList checked={this.checked} state={this.state} doneList={this.doneList} returnTask={this.returnTask} checkDate={this.checkDate} deleteTask={this.deleteTask}/>)
}

    render(){
        return (<div className="container">
            <button className="addTask" onClick={this.press}>+</button>

            <h1>Reminders<span>{this.taskList.length}</span></h1>
            		{this.showDone()}
                {this.showTasks()}
                {this.showLine()}
                {this.showDoneList()}
            </div>)
    }
}