import React, { Component } from 'react';
// content
// import partials
import '../../../asset/css/custom.css';
import Header from "./../partials/header"
import Footer from "./../partials/footer"
import { RefProgram } from './../../../db';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class ProgramKerja extends Component {
  constructor(){
    super();
  this.state = ({ deskripsi:'',modal: false,});

  }
  componentDidMount(){
    RefProgram.orderByChild("no_rt").equalTo(localStorage.getItem("nort")).on("value", snap =>{
      snap.forEach(shot =>{
        this.setState({deskripsi:shot.val().deskripsi});
      })
    })
  }
  render() {
    return (
     <div className='home'>
		 <Header/>
		 <div className="container top-80 program-kerja">
      <h3 className="text-center">Program kerja RT{localStorage.getItem("nort")}</h3>
      <div className="row pengurus top-50">
          { ReactHtmlParser(this.state.deskripsi)}
      </div>
    </div>
		<Footer/>
     </div>
    );
  }
}

export default ProgramKerja;
