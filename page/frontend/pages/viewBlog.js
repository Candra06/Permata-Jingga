import React from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import {Redirect} from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
 
export default class Listwarga extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        Redirect: false,
      }
    }

  render() {
    // href={"/Event/detail/"+task.kd_event}
    const { task } = this.props;
    return (
      <div className='container shadow'>
          <h2>{task.nama}</h2>
          <label className='text-sm'>{task.tanggal}</label>
          <div className="col-md-4 item-photo" style={{margin: 0.5 + ' auto'}}>
            <img src={task.urlfoto} className='img-responsive' alt='gambar wargaku'/>
         </div>
         <div className="col-md-12">

          <p className='text-justify line'>{ReactHtmlParser(task.deskripsi)}</p>
         </div>
      </div>
    );
  }
}
