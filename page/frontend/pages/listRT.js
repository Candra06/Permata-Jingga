import React, { Component } from 'react';
// content
import {Link} from "react-router-dom";
// import partials
import '../../../asset/css/custom.css';
import { RefGaleri } from './../../../db';
class ListRT extends Component {
  constructor(){
    super();
  this.state ={
    tasks:[],
    urlfoto:''
  }

  }
  componentDidMount(){
    const {task}  = this.props;
    RefGaleri.orderByChild("no_rt").equalTo(task.no).on("value", snap => {
		snap.forEach(shot => {
			this.setState({urlfoto:shot.val().urlfoto})
		})
	  })
            {/*<div className={"col-md-"+task.grid +" grid"} >*/}
  }
  redirect(no, nama){
	localStorage.setItem("nort", parseInt(no));
	localStorage.setItem("namart", nama)
  }
  render() {
    const {task}  = this.props;
    return (

        <div className={"col-md-"+task.grid +" grid"}>
            <Link onClick={(e) =>this.redirect(task.no, task.nama)} to={"/RT"+task.no} >
                {/* <a href="/blog/Pengertian-Biaya-Akad/testing"> */}
                <div className="overflow">
                    <div className={(this.state.urlfoto === '' ? "bg-center relative shadow-card overflow" : "bg-center bg-rt relative shadow-card overflow")} style={{background:(this.state.urlfoto === '' ? task.color : "url("+this.state.urlfoto+")"),height:167+"px",borderRadius:5+"px",}}>
                        {/* <h4 className="title-menu absolute text-white">RT 1</h4> */}
                        <div className="title-menu absolute text-white">
                            <h4>RT {task.no}</h4>
                            <p className='text-center'>{task.nama}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>  
    );
  }
}

export default ListRT;
