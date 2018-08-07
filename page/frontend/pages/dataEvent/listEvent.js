import React from 'react';
import { rootRef, RefEvent, RefBlog } from './../../../../db';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import {Redirect} from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export default class Listwarga extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
      }
    }
    detail(kd){
        localStorage.setItem("kd_event", kd);
        RefBlog.orderByChild("kd_event").equalTo(kd).on("value", snap =>{
            snap.forEach(shot => {
              console.log(snap.val());
              // localStorage.setItem("kd_event", snap.val().kd_event);
              this.setState({Redirect:true});
            });
        })
    }

  render() {
    if(this.state.Redirect){
        return (<Redirect to="/detailEvent/"/>)
    }
    // href={"/Event/detail/"+task.kd_event}
    const { task } = this.props;
    var desc = task.deskripsi;
    var text = desc.substring(0,55);
    var nama = task.nama.substring(0,30);
    return (
        <div className="col-md-4 col-sm-4">
            <div className="card">
                <div className="card-head overflow" style={{height:200+"px"}}>
                    <img src={task.urlfoto} alt="Wargaku.id" className="img-responsive"/>
                </div>
                <div className="card-body">
                    <h4 className="text-center">{nama}...</h4>
                    <p style={{height:44+"px"}} className="text-sm text-justify text-gray">{ReactHtmlParser(text)}...</p>
                    <a className='cursor' onClick={(e) =>this.detail(task.kd_event)}>Selengkapnya</a>
                </div>
            </div>

        </div>
    );
  }
}
