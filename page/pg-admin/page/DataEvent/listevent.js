import React from 'react';
import { RefEvent, rootRef, upRef, timeRef, RefHapus } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import RandomKata from 'randomstring';
import { toast } from 'react-toastify';
import ReactHtmlParser from 'react-html-parser';
 
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import {Redirect} from 'react-router-dom';
export default class Listevent extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        modal3: false,
        modal4: false,
        nama: '',
            deskripsi:'', redirect: false
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
      this.toggle4 = this.toggle4.bind(this);
    }

    toggle4() {
        this.setState({
          modal4: !this.state.modal4
        });
      }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle2(tkey) {
          localStorage.setItem("kunciblog", tkey);
        this.setState({
            redirect: true
        });
        //console.log(localStorage.getItem("kunciblog"))
      }

      
      toggle3() {
        this.setState({
          modal3: !this.state.modal3
        });
      }

      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };

      handleChangeDeskripsi = event => {
        this.setState({deskripsi:event.target.value});
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ nama: '',
        deskripsi:''});
      }
    deleteTask(filenya){
        const { key,  } = this.props.task;
        upRef.child(filenya).delete().then(function() {

          })

        RefEvent.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };

      notify(type, kunci, filenya){
        return () => {
        const newTask = {
            nama: this.state.nama.trim(),
                deskripsi: this.state.deskripsi.trim(),
                urlfoto:localStorage.getItem("urlfoto"),
                filename: this.state.avatar
        };
                if (newTask.nama.length && newTask.deskripsi.length) {
                   
                        RefEvent.child(kunci).update({ nama: this.state.nama,deskripsi: this.state.deskripsi});
                   

                this.setState({nama: '',
                deskripsi:''});
                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.toggle2();
                }else{
                    toast.warn('Form Masih ada yang kosong');
                }
            };
        };

        
  handleInputChange = (event) => {
    //const { key } = this.props.task;
        
        if(event.target.checked){
            
             const data = {
            kode: event.target.name,
            tipe: 'blog',
            kodehapus: localStorage.getItem("xkodeblog")
            }
        RefHapus.push(data);
           // RefHapus.child(kunci).remove();  
        }else{
            RefHapus.orderByChild("kode").equalTo(event.target.name).on('value', snap => {
                snap.forEach(shot => {
                   RefHapus.child(shot.key).remove();
                });
            });

        }
    
  }

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
  this.setState({isUploading: false});
  console.error(error);
  }
  handleUploadSuccess = (filename) => {
  this.setState({avatar: filename, progress: 100, isUploading: false});
  upRef.child(filename).getDownloadURL().then(function(url) {
    localStorage.setItem("urlfoto", url);
  }).catch(function(error) {

  console.log(error);
  })
  };
  EditFoto = (txtkunci, txtfile) => {
    try{
  const { key } = this.props.task;
  //RefWarga.child(key).remove();
 RefEvent.child(txtkunci).update({
    urlfoto : localStorage.getItem("urlfoto"),
    filename : this.state.avatar});
    localStorage.setItem("urlfoto", "")
    this.setState({ avatar:"", progress:0})
    toast.success('Foto Berhasil Di Update', {
        position: toast.POSITION.TOP_RIGHT,
    });
    this.toggle4();
  upRef.child(txtfile).delete().then(function() {

  })
}catch(error){

}
  }
  render() {
    const { task } = this.props;
    if(this.state.redirect){
        return (<Redirect to="/Admin/EditBlog"/>)
     }
    return (
        <tr>
            <td>
            
            <input
            name = {task.key}
            type="checkbox"
           // checked={this.state.isGoing}
            onClick={this.handleInputChange} 
            
            /></td>
        <td>{task.nomer}</td>
        <td>{task.nama}</td>
        <td>{task.tanggal}</td>
        <td>
        <Button color="primary" onClick={this.toggle3}>Lihat Deskripsi</Button>
                    <Modal isOpen={this.state.modal3} toggle={this.toggle3}>
                    <ModalHeader toggle={this.toggle3}>Detail Deskripsi {task.nama}</ModalHeader>
                    <ModalBody>
                        <p>Data Event { ReactHtmlParser(task.deskripsi)}</p>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle3}>Tutup</Button>{' '}
                    </ModalFooter>
                </Modal>
        
        </td>
        <td><img style={{width: 2 + 'em', height: 2 + 'em'}} src={task.urlfoto}/></td>
        <td><Button color="success" onClick={this.toggle4} title="Ganti Foto"><i className="fa fa-camera"></i></Button>
        
        <Modal isOpen={this.state.modal4} toggle={this.toggle4}>
                    <ModalHeader toggle={this.toggle4}>Edit Foto {task.nama}</ModalHeader>
                    <ModalBody>
                    <div className="form-group row col-md-12">
                                        <div className="form-group col-md-6">
                                            <label>Pilih Foto</label>
                                            <div className="custom-file">
                                                <CustomUploadButton
                                                    accept="image/*"
                                                    name="avatar"
                                                    filename={file => RandomKata.generate(10) + file.name.split('.')[1] }
                                                    storageRef={upRef}
                                                    onUploadStart={this.handleUploadStart}
                                                    onUploadError={this.handleUploadError}
                                                    onUploadSuccess={this.handleUploadSuccess}
                                                    onProgress={this.handleProgress}
                                                    style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4}}
                                                    >
                                                    Pilih Foto
                                                    </CustomUploadButton>
                                            </div>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Proses Upload</label>
                                          {this.state.isUploading &&
                                          
                                                <p>Upload: {this.state.progress} %</p>
                                                }
                                                {!this.state.isUploading && this.state.progress >= 100 &&
                                                   <div className="alert alert-success col-md-8" role="alert">
                                                   Upload Selesai
                                                    </div>
                                                }

                                        </div>
                                    </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle4}>Batal</Button>{' '}
                        <Button color="danger" onClick={(e) => this.EditFoto(task.key, task.filename)}>Simpan</Button>
                    </ModalFooter>
                </Modal>
        <span>  </span>
            <Button color="primary" onClick={() => this.toggle2(task.key)}><i className="fa fa-pencil"> Teks</i></Button>
            
                {/* <Modal isOpen={this.state.modal2} toggle={this.toggle2} frame position="top">
                <ModalHeader toggle={this.toggle2}>
                    Update Kiriman {task.nama}

                </ModalHeader>
                <ModalBody>
                <div className="card card-info">

                <div className="form-control">
                            <div className="card-body">

                            
                            <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                            <label>Judul Kiriman</label>

                                            <input type="text"
                                            onChange={this.handleChangeNama}
                                            value={this.state.nama}
                                            className="form-control" placeholder="Masukkan Judul Kiriman" />
                                        </div>
                                    </div>

                                    
                                <div className="col-md-12">
                                    <div className="form-group col-md-12">
                                        <label>Deskripsi</label>
                                        <textarea className='form-control' onChange={this.handleChangeDeskripsi} value={this.state.deskripsi}></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success', task.key)}>Update</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                </Modal> */}
            <span>  </span>
                <Button color="danger" onClick={this.toggle}><i className="fa fa-trash"></i></Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data Event {task.nama} Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={(e) => this.deleteTask(task.filename)}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
        </td>
    </tr>
    );
  }
}
