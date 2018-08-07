import React from 'react';
import Layout from './page/Layout';
import Nav from './page/Nav';
import Footer from './page/Footer';
import ListPengajuan from './page/DataPengajuan/DaftarPengajuan';
import { RefPengajuan } from './../../db';

import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import { ToastContainer, toast } from 'react-toastify';
class Pengajuan extends React.Component{

  constructor(){
    super();
  this.state = ({ modal: false});
    this.toggle = this.toggle.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  deleteTask(){
    RefPengajuan.orderByChild("status").equalTo("Selesai").on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
       if(shot.val().idpenerima === localStorage.getItem("nik")){
        RefPengajuan.child(shot.key).remove();
       }
      });
    });
    toast.success('Data Berhasil Di Hapus', {
        position: toast.POSITION.TOP_RIGHT,
    });
    this.toggle()
  };
    render() {
        return (
            <div className="wrapper">
              <Nav/>
              <Layout/>
            
              <div className="content-wrapper">
                <div className="content-header">
                  <div className="container-fluid">
                    <div className="row mb-2">
                      <div className="col-sm-6">
                        <h1 className="m-0 text-dark">Data Pengajuan</h1>
                      </div>
                      <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                          <li className="breadcrumb-item"><a href="">Home</a></li>
                          <li className="breadcrumb-item active">Data Pengajuan</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  
                </div>
                
                <section className="content">
                  <div className="container-fluid">
                    
                    <div className="row" style={{marginTop: -2 + 'em'}}>
                    <section className="col-lg-12 connectedSortable">
                        <div className="card">
                          <div className="card-header p-2">Pemberitahuan Pengajuan yang Diterima
                            <button type="button" onClick={this.toggle} className="btn btn-danger btn-sm float-right"><i className="fa fa-trash"></i></button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                          <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                          <ModalBody>
                              Data Pengajuan Yang Telah Selesai Akan di Hapus!!!
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                              <Button color="danger" onClick={(e) =>this.deleteTask()}>Konfirmasi</Button>
                          </ModalFooter>
                      </Modal>
                          </div>
                          <div className="card-body">
                              <ListPengajuan/>  
                              <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={5000}
                                    />
                                </div>                            
                          </div>
                        </div>
                      </section>
                    </div>
                  </div> 
                </section>
                
              </div>
              <Footer/>
            
              <aside className="control-sidebar control-sidebar-dark">
              </aside>
            </div>
        );
      }
}
export default Pengajuan