import React, { Component } from 'react';
// content
import orderBy from 'lodash/orderBy';
// import partials
import '../../../asset/css/custom.css';
import Header from "./../partials/header"
import Footer from "./../partials/footer"
import { RefRT, RefPengurus, RefWarga } from './../../../db';
class PengurusRT extends Component {
  constructor(){
    super();
  this.state = ({ 
    ketua:'',
    sekretaris:'',
    bendahara:'',
    fotobendahara:'',
    fotosekretaris:'',
    fotoketua:'',
    nikketua:'',
    nikbendahara:'',
    niksekretaris:'',
    tasksPengurus:[],
    modal: false,});

  }
  componentDidMount(){
    console.log("no rtnya "+localStorage.getItem("nort"))
    RefRT.orderByChild("no").equalTo(parseInt(localStorage.getItem("nort"))).on("value", snap => {
      snap.forEach(shot => {
        console.log(" shotnya "+shot.val().nik)
        this.setState({ketua:shot.val().nama, sekretaris:shot.val().namabendahara, bendahara:shot.val().namasekretaris})
          RefWarga.orderByChild("nik").equalTo(shot.val().nik).on("value", snapp =>{
            snapp.forEach(shott => {
              this.setState({fotoketua:shott.val().urlfoto})
            })
          })
          // if(shot.val().niksekretaris !=='' && shot.val().niksekretaris !== undefined && shot.val().niksekretaris !=="0" || shot.val().nikbendahara !== '' && shot.val().nikbendahara !== "0" && shot.val().nikbendahara !== undefined){
          //   RefWarga.orderByChild("nik").equalTo(shot.val().niksekretaris).on("value", snapp =>{
          //     snapp.forEach(shott => {
          //       this.setState({fotosekretaris:shott.val().urlfoto})
          //     })
          //   })
          //   RefWarga.orderByChild("nik").equalTo(shot.val().nikbendahara).on("value", snapp =>{
          //     snapp.forEach(shott => {
          //       console.log("foto bendahara anda "+shott.val().urlfoto);
          //       this.setState({fotobendahara:shott.val().urlfoto})
          //     })
          //   })
          // }
      })
    })
    RefPengurus.orderByChild("nort").equalTo(localStorage.getItem("nort")).on("value", snap =>{
      const tasksPengurus=[]
      snap.forEach(shot => {
        tasksPengurus.push({...shot.val(), key:shot.key})
      })
      this.setState({tasksPengurus})
    })
  }
  render() {
    const orderedTasks = orderBy(
      this.state.tasksPengurus
    );
    return (
     <div className='home'>
		 <Header/>
		 <div className="container top-80 text-center">
      <h3>Pengurus RT {localStorage.getItem("nort")}</h3>
      <div className="row text-center pengurus top-50">
        <div className="col-md-4">
              <div className="pengurus-list">
                <div className="bg-center relative shadow-card overflow" style={{background:"url("+this.state.fotoketua+")",height:250+"px", backgroundPosition:"top", backgroundSize:"cover"}}>
                </div>
                <div className="card-body">
                    <h5>{this.state.ketua}</h5>
                    <p className="text-gray font-sm">Ketua RT</p>
                </div>
              </div>
          </div>
        {orderedTasks.map(task => (
            <div className="col-md-4">
              <div className="pengurus-list">
                <div className="bg-center relative shadow-card overflow" style={{background:"url("+task.urlfoto+")",height:250+"px"}}>
                </div>
                <div className="card-body">
                    <h5>{task.nama}</h5>
                    <p className="text-gray font-sm">{task.jabatan}</p>
                </div>
              </div>
          </div>
          ))}
          
          {/* <div className="col-md-4">
              <div className="pengurus-list">
                <div className="bg-center relative shadow-card overflow" style={{background:"url("+this.state.fotobendahara+")",height:250+"px"}}>
                </div>
                <div className="card-body">
                    <h5>{this.state.sekretaris}</h5>
                    <p className="text-gray font-sm">Bendahara</p>
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
