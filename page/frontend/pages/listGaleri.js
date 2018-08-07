import React, { Component } from 'react';
// content
import orderBy from 'lodash/orderBy';
// import partials
import '../../../asset/css/custom.css';
import { RefAgenda } from './../../../db';
class PengurusRT extends Component {
  constructor(){
    super();
  this.state ={
    tasks:[]
  }

  }
  componentDidMount(){
    // console.log("no rtnya "+localStorage.getItem("nort"))
    
  }
  render() {
    const {task}  = this.props;
    return (
        <div className="col-md-3" >
            <div className="overflow" data-toggle="modal" data-target={"#"+task.key}>
                <div className="thumbnail thumbnail1 bg-center relative shadow-card overflow" style={{background:"url("+task.urlfoto+")",height:250+"px"}}>
                </div>
            </div>
            <div id={task.key} className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                        <div className="modal-body bg-center" style={{background:"url("+task.urlfoto+")",height: 400+"px",backgroundSize: "cover"}}>
                        </div>
                </div>
            </div>
        </div>
        </div>
        
    );
  }
}

export default PengurusRT;
