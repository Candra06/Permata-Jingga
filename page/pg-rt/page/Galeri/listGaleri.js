import React from 'react';
import { rootRef, RefGaleri } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

export default class ListGaleri extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        redirect:false,
        nama: '',
            cek: true,
            up:'',
            jumlah:0, tasks:[], tasksLoading: true
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }

    componentWillMount(){
      const {task} = this.props;    
      console.log("Keynya", task.key)
      RefGaleri.orderByKey().equalTo(task.key).on('value', snap => {      
        let no = 0;
        const tasks = [];
        snap.forEach(shot => {
          tasks.push({ ...shot.val() })
        });
        this.setState({ tasks, tasksLoading: false, });
      });
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2() {
        this.setState({
          modal2: !this.state.modal2
        });
      }

   
      deleteTask = () => {
        const {task} = this.props;
        RefGaleri.child(task.key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };
      ;

      keview = () => {
        const { task } = this.props;
        localStorage.setItem("kevent", task.kd_event)
        this.setState({
          redirect: true
        })
      }

  render() {
    if(this.state.redirect){
    return (<Redirect to="/RT/ViewPeserta"/>)
 }
    const { task } = this.props;
    const { tasks } = this.state;
    let show, btnshow, btntutup;
    var NumberFormat = require('react-number-format');
  

    return (
        <tr>
        <td>{task.no}</td>
        <td>{task.judul}</td>
        <td>
        <Button color="primary" onClick={this.toggle2}><i className="fa fa-list" title="Detail Event"></i> </Button>
        <span>  </span>
        
        <span>  </span>
        <Button color="danger" onClick={this.toggle}><i className="fa fa-trash" title="Hapus Event"></i> </Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
            <ModalBody>
                Data Event {task.judul} Akan di Hapus!!!<br/>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                <Button color="danger" onClick={(e) => this.deleteTask()}>Konfirmasi</Button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
            <ModalHeader toggle={this.toggle2}>Detail {task.judul}</ModalHeader>
            <ModalBody>
            
            <div className="row col-12">
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                
                <div className="widget-user-image" align="center">
                    <img src={task.urlfoto} style={{ width: 110+'px', height: 200+'px'}} className="img-responsive"/>
                </div>
                </div>
                <div className="col-md-4">
                </div>

            </div>
            <table className="table">
              <tbody>
                  <tr>
                      <td>Judul</td>
                      <td>{task.judul}</td>
                  </tr>
                 
              </tbody>
            </table>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle2}>Tutup</Button>{' '}
                {btnshow}{' '}
                {btntutup}
            </ModalFooter>
        </Modal>
        </td>
    </tr>
    );
  }
}
