import React from 'react';
import { rootRef, upRefpengurus, RefPengurus, RefUser } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { toast } from 'react-toastify';
import RandomKata from 'randomstring';
export default class Listpengurus extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        modal3: false,
        modal4: false,
        email:'',
        nama:'',
        jabatan: '', nohp: '', alamat:'', password:'',
        isUploading: false,
        progress: 0,
        avatar:'',
        tasks:[],
        tasksLoading:[]
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
      this.toggle4 = this.toggle4.bind(this);
    }

        // componentDidMount() {
        //     console.log("emailnya",this.props.nik)
        //     RefUser.orderByChild("nik").equalTo(this.props.nik).on('value', snap =>{
        //         const tasks = [];
        //         snap.forEach(shot => {
        //             tasks.push({...shot.val(), key: shot.key})
        //         })
        //         this.setState({ tasks, tasksLoading: false });
        //     })
        //   }

    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
    }
    handleUploadSuccess = (filename) => {
        // try{
        //     if(this.state.filename === ""){

        //     }else{
        //         upRefWarga.child(this.state.filename).delete().then(function() {

        //         })
        //     }
        // }catch(error){

        // }
        
      //localStorage.setItem("urlfotowarga", "");
    this.setState({avatar: filename, progress: 100, isUploading: false});
    upRefpengurus.child(filename).getDownloadURL().then(function(url) {
      localStorage.setItem("urlfotowarga", url);
    }).catch(function(error) {

    console.log(error);
    })

    //this.setState({ avatarURL: localStorage.getItem("urlfotowarga")})
    };

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
      toggle3() {
        this.setState({
          modal3: !this.state.modal3
        });
      }
      toggle4() {
        this.setState({
          modal4: !this.state.modal4
        });
      }
      toggle2(xnama, xjabatan, xnohp, xalamat, xemail) {
        this.setState({
            nama: xnama, jabatan: xjabatan, nohp: xnohp, alamat: xalamat, email: xemail,
          modal2: !this.state.modal2
        });
      }

      handleChange = event => {
        this.setState({[event.target.name]:event.target.value})
      }

      deleteTask = (txtemail, txtfile) => {
          try{
        const { key, nik, email } = this.props.task;
        RefPengurus.child(key).remove();
        upRefpengurus.child(txtfile).delete().then(function() {

        })
        rootRef.child('User').orderByChild("email").equalTo(email).on('value', snap => {
            snap.forEach(shot => {            
              rootRef.child('User').child(shot.key).remove();
            });
        });
        }catch(error){

        }

      };

      EditFoto = (txtkunci, txtfile) => {
        if(this.state.avatar === ""){
            toast.warn('Pilih Foto', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else{
        try{
      const { key } = this.props.task;
      //RefWarga.child(key).remove();
     RefPengurus.child(txtkunci).update({
        urlfoto : localStorage.getItem("urlfotowarga"),
        filename : this.state.avatar});
        localStorage.setItem("urlfotowarga", "")
        this.setState({ avatar:"", progress:0})
        toast.success('Foto Berhasil Di Update', {
            position: toast.POSITION.TOP_RIGHT,
        });
        this.toggle4();
      upRefpengurus.child(txtfile).delete().then(function() {

      })
        }catch(error){
            RefPengurus.child(txtkunci).update({
                urlfoto : localStorage.getItem("urlfotowarga"),
                filename : this.state.avatar});
                localStorage.setItem("urlfotowarga", "")
                this.setState({ avatar:"", progress:0})
                toast.success('Foto Berhasil Di Update', {
                    position: toast.POSITION.TOP_RIGHT,
                });
        }
    }

    };
      notify(type, kunci, kunciUser){
        return () => {
            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
        if(this.state.nama === ""){
            toast.warn('Nama tidak Boleh Kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          
        }else if(this.state.jabatan === ""){
            toast.warn('Jabatan tidak boleh kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.nohp === ""){
            toast.warn('No HP tidak boleh kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.nohp === ""){
            toast.warn('No HP tidak boleh kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.email === ""){
            toast.warn('Email tidak boleh kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
            toast.warn('Email tidak valid', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.alamat === ""){
            toast.warn('Alamat tidak boleh kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else{
                    
                RefPengurus.child(kunci).update({ nama: this.state.nama,
                    jabatan: this.state.jabatan, nohp: this.state.nohp,
                    alamat: this.state.alamat,
                    email: this.state.email });
                
                console.log(this.props.keyUser)
                RefUser.child(kunciUser).update({ password: this.state.password });
                  
                    this.toggle2()
                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                
            }
            };
        };
  render() {
    const { task } = this.props;
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.nama}</td>
        <td>{task.jabatan}</td>
        <td>{task.nohp}</td>
        <td>{task.email}</td>
        <td>
        <Button color="success" onClick={this.toggle4} title="Ganti Foto"><i className="fa fa-camera"></i></Button>
        
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
                                                    filename={file => RandomKata.generate(10)+ task.nama + file.name.split('.')[1] }
                                                    storageRef={upRefpengurus}
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
        <Button color="success" onClick={this.toggle3}><i className="fa fa-list"></i></Button>
        <Modal isOpen={this.state.modal3} toggle={this.toggle3} frame position="top">
                <ModalHeader toggle={this.toggle3}>
                            <h3 className="card-title">Biodata  {task.nama}</h3>
                </ModalHeader>
                <ModalBody>
                <div className="card-body">
                    <div className="col-12">
                        <div className="row col-12">
                            <div className="col-md-4">
                            </div>
                            <div className="col-md-4">
                            
                            <div className="widget-user-image" align="center">
                                <img src={task.urlfoto} style={{ width: 6+'em', height: 6+'em'}} className="img-responsive"/>
                            </div>
                            </div>
                            <div className="col-md-4">
                            </div>

                        </div>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Nama</td>
                                <td>{task.nama}</td>
                            </tr>
                            <tr>
                                <td>Jabatan</td>
                                <td>{task.jabatan}</td>
                            </tr>
                            <tr>
                                <td>No HP</td>
                                <td>{task.nohp}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{task.email}</td>
                            </tr>
                            <tr>
                                <td>Alamat</td>
                                <td>{task.alamat}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                </ModalBody>
                <ModalFooter>
                        <Button color="primary" onClick={this.toggle3}>Tutup</Button>{' '}
                    </ModalFooter>
                </Modal>
                <span>  </span>



            <Button color="primary" onClick={() => this.toggle2(task.nama, task.jabatan, task.nohp, task.alamat, task.email)}><i className="fa fa-pencil"></i></Button>
                <Modal isOpen={this.state.modal2} toggle={this.toggle2}  size="fluid">
                <ModalHeader toggle={this.toggle2}>
                            <h3>Update Data {task.nama}</h3>
                        
                </ModalHeader>
                <ModalBody>
                <div className="card card-info">

                <div className="form-control">
                            <div className="card-body">
                            <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Nama Pengurus</label>
                                                <input type="text"
                                                onChange={this.handleChange}
                                                value={this.state.nama}
                                                name="nama"
                                                className="form-control" placeholder="Masukkan Nama"/>
                                           
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                            <label>Jabatan </label>
                                            <select className="form-control" style={{height: 2.5 + 'em'}}  value={this.state.jabatan} name="jabatan" onChange={this.handleChange}>
                                                <option value="">Pilih Jabatan</option>
                                                <option value="Sekretaris">Sekretaris</option>
                                                <option value="Bendahara">Bendahara</option>
                                            </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>No HP</label>
                                                <input type="number" min="1"
                                                name="nohp"
                                                onChange={this.handleChange}
                                                value={this.state.nohp}
                                                className="form-control" placeholder="Masukkan No HP"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Alamat</label>
                                                <input type="text"
                                                onChange={this.handleChange}
                                                value={this.state.alamat}
                                                name="alamat"
                                                className="form-control" placeholder="Masukkan Alamat"/>
                                           
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Email</label>
                                                <input type="email"
                                                onChange={this.handleChange}
                                                name="email"
                                                value={this.state.email}
                                                className="form-control" placeholder="Masukkan Email"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>password</label>
                                                <input type="text"
                                                onChange={this.handleChange}
                                                name="password"
                                                value={this.state.password}
                                                className="form-control" placeholder="Kosongkan jika tidak ingin dirubah"/>
                                            </div>
                                        </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success', task.key, task.keyUser)}>Update</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.toggle2}>Batal</button>
                            </div>
                        </div>
                    </div>
                </ModalBody>

                </Modal>
            <span>  </span>
                <Button color="danger" onClick={this.toggle}><i className="fa fa-trash"></i></Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                    <ModalBody>
                        Data  {task.nama} Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={(e) => this.deleteTask(task.email, task.filename)}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>

        </td>
    </tr>
    );
  }
}
