import React from "react";
import "./index.css";

export default class ShowDoneList extends React.Component{
  constructor(props){
    super(props);
    this.doneList=this.props.doneList;
    this.state=this.props.state;

  }



    render(){
      if(this.state.showD){
        return (
        <div className="doneList">
          {this.doneList.map((item, i)=>{
            return(
                <div className="task " index={i} key={i+1} >
                    <input type="checkbox"  checked={true} id={i} name="switch" onChange={this.props.returnTask} ></input>
              <label htmlFor={i}></label>
                  <div>
                      <p > <span className="priority">{item?.priority}</span>{item?.task}</p>
                      <div className="coment">
												<p>{item?.notes} </p>
												<p>{item?.date}</p>
												<p>{item?.time}</p>
											</div>
                  </div>
              </div>
            ) 
          })}
        </div>
        )
      } 
      }
      // this.setState({checked: !this.props.state.checked})
      
}

