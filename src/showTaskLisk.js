import React from "react";
import "./index.css";

export default class ShowTaskLisk extends React.Component{
  constructor(props){
    super(props);
    this.taskList=this.props.taskList;
    this.state=this.props.state;

  }
  render(){
      return (
        <div>
            {this.taskList.map((item, i)=>{
              return(
                <div className="task" index={i} key={i+1}  >
                    <span className="delBtn" data-listtype="task" onClick={this.props.deleteTask}>+</span>
  
                    <input type="checkbox" defaultChecked={this.props.state.checkbox} disabled={this.props.state.checkbox} onChange={this.props.checked} id={i+"check"}  ></input>
                    <label htmlFor={i+"check"}></label>
  
                    <div onDoubleClick={this.props.editTask}>
                        <p > <span className="priority">{item.priority}</span>{item.task}</p>
                        <div className="coment">
                          <p>{item.notes} </p>
                          <p>{this.props.checkDate(item.date)}{item.time ? `, at: ${item.time}`:''}</p>
                        </div>	
                    </div>
                </div>
              ) 
            })}
        </div>
    )
    }
      // this.setState({checked: !this.props.state.checked})
      
}

