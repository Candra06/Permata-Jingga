import React, { Component } from 'react';
// content
import orderBy from 'lodash/orderBy';
// import partials
import '../../../asset/css/custom.css';
import Header from "./../partials/header"
import Footer from "./../partials/footer"
import { RefAgenda } from './../../../db';
import ListAgenda from "./listAgenda"
class PengurusRT extends Component {
  constructor(){
    super();
  this.state ={
    tasks:[]
  }

  }
  componentDidMount(){
    // console.log("no rtnya "+localStorage.getItem("nort"))
    RefAgenda.orderByChild("nort").equalTo(localStorage.getItem("nort")).on("value", snap =>{
      const tasks=[]
      snap.forEach(shot => {
        tasks.push({...shot.val(), key:shot.key})
        // console.log(shot.val())
      })
      this.setState({tasks})
    })
  }
  render() {
    const orderedTasks = orderBy(
      this.state.tasks
    );
    return (
     <div className='home'>
		 <Header/>
		 <div className="container top-80">
      <h3 className=" text-center">Agenda  RT {localStorage.getItem("nort")}</h3>
      <div className="row pengurus top-50">
      {orderedTasks.map(task => (
        <ListAgenda key={task.key} task={task}/>
      ))}
          {/* <div className="col-md-4">
              <div className="pengurus-list">
                <div className="bg-center relative shadow-card overflow" style={{background:"url("+sekretaris+")",height:250+"px"}}>
                </div>
                <div className="card-body">
                    <h5>Bpk Rendra</h5>
                    <p className="text-gray font-sm">Sekretaris</p>
                </div>
              </div>
          </div> */}
      </div>
    </div>
		<Footer/>
     </div>
    );
  }
}

export default PengurusRT;
