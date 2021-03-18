import React from "react";
import "./index.css";

export default class AddTask extends React.Component{
constructor(props){
  super(props);
  this.el=this.props.element? this.props.element: undefined;
}


  render(){
    // console.log(this.props.state.disabled)
    if(!this.el){

      return (
        <form className="newTask" onChange={this.props.onChange}>
            <input type="text" placeholder="Your task" name="task" required autoFocus/>
            <input type="text" name="notes"   placeholder="Notes"/>
            <div>
              <input type="date" name="date"/>
              <input type="time" name="time"  />
              <select name="priority" id="priority">
                
                <option defaultValue=""  ></option>
                <option value="!">!</option>
                <option value="!!">!!</option>
                <option value="!!!">!!!</option>
              </select>
            </div>
            <button type="submit" onClick={this.props.handleChange} disabled={this.props.state.disabled}>+</button>
        </form>
      )
    }else if(this.el){
      return(
      <form className="newTask" name="addForm" onChange={this.props.editTask}>
        <input type="text"  name="task"  placeholder="Your task"  defaultValue={this.el.task}  autoFocus/>
        <input type="text" name="notes"  defaultValue={this.el.notes}  placeholder="Notes"/>
        <div>
          <input type="date" name="date"  defaultValue={this.el.date}/>
          <input type="time" name="time" defaultValue={this.el.time} />
          <select name="priority" id="priority"  defaultValue={this.el?.priority}>
            <option ></option>
            <option value="!">!</option>
            <option value="!!">!!</option>
            <option value="!!!">!!!</option>
          </select>
        </div>
        <button onClick={this.props.onSubmit}  disabled={this.props.element.disabled}>✓</button>
    </form>)
    }
      
  }
}

