import React from "react";
import "./index.css";

export default class AddTask extends React.Component{
  

    render(){
      
        return (
            <form className="newTask" onChange={this.props.onChange}>
                <input type="text"  name="task"   autoFocus/>
                <input type="text" name="notes"   placeholder="Notes"/>
                <div>
                  <input type="date" name="date"/>
                  <select name="priority" id="priority">
                    <option defaultValue=""></option>
                    <option value="!">!</option>
                    <option value="!!">!!</option>
                    <option value="!!!">!!!</option>
                  </select>
                </div>
                <button onClick={this.props.handleChange}>+</button>
            </form>
      )
    }
}

