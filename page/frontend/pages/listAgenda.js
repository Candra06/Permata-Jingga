import React, { Component } from 'react';
// content
import orderBy from 'lodash/orderBy';
// import partials
import '../../../asset/css/custom.css';
import { RefAgenda } from './../../../db';
import ReactHtmlParser from 'react-html-parser';
class ListAgenda extends Component {
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
        <div className="col-md-4">
            <div className="pengurus-list"  data-toggle="modal" data-target={"#"+task.key}>
              <div style={{background:"url("+task.urlfoto+")",height:250+"px", backgroundPosition:"center"}}>
                
              </div>
              <div className="card-body">
                  <h5 className='text-center'>{task.judul}</h5>
                  <p className="text-gray font-sm top-10">
                  Nama Pengirim : {task.nama_pengirim}</p>
                  <p className="text-gray font-sm">Iuran : {task.perluiuran}</p>
                  <p className="text-gray font-sm">Jumlah Iuran : {task.jumlahiuran}</p>
                  <p className="text-gray font-sm">Status : {task.status_agenda}</p>
                  <p className="text-gray font-sm">Tanggal : {task.tanggal}</p>
              </div>
            </div>
            <div id={task.key} className="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{maxWidth:80+"%"}}>
                <div className="modal-content">
                        <div className="modal-body bg-center">
                            <div className='text-center'>
                                <img src={task.urlfoto}/>
                            </div>
                            <div className='container top-50'>
                                <h5 className='text-center'>{task.judul}</h5>
                                <p className="text-gray top-10">
                                Nama Pengirim : {task.nama_pengirim}</p>
                                <p className="text-gray">Iuran : {task.perluiuran}</p>
                                <p className="text-gray">Jumlah Iuran : {task.jumlahiuran}</p>
                                <p className="text-gray">Status : {task.status_agenda}</p>
                                <p className="text-gray">Tanggal : {task.tanggal}</p>
                                <p className="text-gray">{ReactHtmlParser(task.deskripsi)}</p>
                            </div>
                        </div>
                </div>
            </div>
          </div>
        </div>
        
    );
  }
}

export default ListAgenda;
