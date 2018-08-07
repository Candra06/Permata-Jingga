import React from 'react';
import { rootRef, RefQurban } from './../../../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

export default class ListGaleri extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal1: false,
        modal2: false,
        redirect:false,
        nama:'',
        task:[],
        jenis:'',
        type:'',
        request:'',
        pembayaran:0,
        nomor:'',
        alamat:'',
        tgl_bayar:'',
        status:'',
            cek: true,
            up:'',
            jumlah:0, tasks:[], tasksLoading: true
      }
      this.toggle = this.toggle.bind(this);
      this.toggle1 = this.toggle1.bind(this);
      this.toggle2 = this.toggle2.bind(this);
    }

    componentWillMount(){
      const {task} = this.props;    
      console.log("Keynya", task.key)
      RefQurban.orderByKey().equalTo(task.key).on('value', snap => {      
        let no = 0;
        const tasks = [];
        snap.forEach(shot => {
          tasks.push({ ...shot.val() })
        });
        this.setState({ tasks, tasksLoading: false, });
      });
    }

    handleChange = event => {
        this.setState({[event.target.name]:event.target.value})
      }

    toggle() {
        const { task } = this.props;
        this.setState({
            nama: task.nama,
            alamat: task.alamat,
            hewan: task.hewan,
            type: task.type,
            nomor: task.nomor,
            pembayaran: task.pembayaran,
            tgl_bayar: task.tgl_bayar,
            status: task.status,
            request: task.request,
          modal: !this.state.modal
        });
      }
      toggle1() {
        this.setState({
          modal1: !this.state.modal1
        });
      }
      toggle2() {
        this.setState({
          modal2: !this.state.modal2
        });
      }

   
      deleteTask = () => {
        const {task} = this.props;
        RefQurban.child(task.key).remove();
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

      notify(type, kunci, kunciUser){
        return () => {
        if(this.state.nama === ""){
            toast.warn('Nama tidak Boleh Kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          
        }else if(this.state.alamat === ""){
            toast.warn('Alamat tidak boleh kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.hewan === ""){
            toast.warn('Harus Memilih jenis hewan', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.type === ""){
            toast.warn('Harus Memilih Type', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.nomor === ""){
            toast.warn('Harus memasukkan nomor hewan', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.pembayaran === ""){
            toast.warn('Pembayaran tidak boleh kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.tgl_bayar === ""){
            toast.warn('Tanggal pembayaran tidak boleh kosong', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else if(this.state.status === ""){
            toast.warn('Harus Memilih status', {
                position: toast.POSITION.TOP_RIGHT,
              });
          }else{
                    
                RefQurban.child(kunci).update({ nama: this.state.nama,
                    hewan: this.state.hewan, type: this.state.type,
                    alamat: this.state.alamat, pembayaran: this.state.pembayaran, tgl_bayar: this.state.tgl_bayar,
                    nomor: this.state.nomor, status: this.state.status,request: this.state.request });
                console.log("keynya kunci", this.props.key)
                
                  
                    this.toggle()
                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                
            }
            };
        };

  render() {
    if(this.state.redirect){
    return (<Redirect to="/RT/ViewPeserta"/>)
 }
    const { task } = this.props;
    const { tasks, hewan } = this.state;
    let show, btnshow, btntutup, pilih_type;
    var NumberFormat = require('react-number-format');

    if(hewan === 'Kambing'){
        pilih_type = (
            <select className='form-control' required onChange={this.handleChange} name="type" value={this.state.type} style={{height: 3 + 'em'}}>
                <option value="">Pilih Type</option>
                <option value="Extra">Extra</option>
                <option value="Super">Super</option>
                <option value="Reguler">Reguler</option>
            </select>
        )
    }else if(hewan === 'Kambing'){
        pilih_type = (
            <select className='form-control' required onChange={this.handleChange} name="type" value={this.state.type} style={{height: 3 + 'em'}}>
                <option value="">Pilih Type</option>
                <option value="Super">Super</option>
                <option value="Exclusive">Exclusive</option>
                <option value="Reguler">Reguler</option>
            </select>
        )
    }else{
        pilih_type = (
            <select className='form-control' required onChange={this.handleChange} name="type" value={this.state.type} style={{height: 3 + 'em'}}>
                <option value="">Pilih Type</option>
                <option value="Super">Super</option>
                <option value="Exclusive">Exclusive</option>
                <option value="Reguler">Reguler</option>
                <option value="Extra">Extra</option>
            </select>
        )
    }

    return (
        
        <tr>
        <td>{task.no}</td>
        <td>{task.nama}</td>
        <td>{task.hewan}</td>
        <td>{task.pembayaran}</td>
        <td>{task.status}</td>
        <td>{task.request}</td>

        <td>
        <Button color="primary" onClick={this.toggle2}><i className="fa fa-list" title="Detail Event"></i> </Button>
        <span>  </span>
        <Button color="success" onClick={() => this.toggle()}><i className="fa fa-pencil"></i></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}  size="fluid">
                <ModalHeader toggle={this.toggle}>
                            <h3>Update Data {task.nama}</h3>
                        
                </ModalHeader>
                <ModalBody>
                <div className="card card-info">

                <div className="form-control">
                            <div className="card-body">
                            <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Nama</label>
                                                <input type="text"
                                                onChange={this.handleChange}
                                                value={this.state.nama}
                                                name="nama"
                                                className="form-control" placeholder="Masukkan Nama"/>
                                           
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                            <label>Alamat </label>
                                            <input type="text"
                                                onChange={this.handleChange}
                                                value={this.state.alamat}
                                                name="alamat"
                                                className="form-control" placeholder="Masukkan Alamat"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Jenis Hewan</label>
                                                <select className='form-control' required onChange={this.handleChange} name="hewan" value={this.state.hewan} style={{height: 3 + 'em'}}>
                                                    <option value="">Pilih Hewan</option>
                                                    <option value="Sapi">Sapi</option>
                                                    <option value="Kambing">Kambing</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Type</label>
                                                { pilih_type }
                                           
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Permintaan</label>
                                                <input type="email"
                                                onChange={this.handleChange}
                                                name="request"
                                                value={this.state.request}
                                                className="form-control" placeholder="Masukkan Permintaan"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Nomor Hewan</label>
                                                <input type="text"
                                                onChange={this.handleChange}
                                                name="nomor"
                                                value={this.state.nomor}
                                                className="form-control" placeholder="Masukkan Nomor Hewan"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Pembayaran</label>
                                                <input type="number"
                                                onChange={this.handleChange}
                                                name="pembayaran"
                                                value={this.state.pembayaran}
                                                className="form-control" placeholder="Masukkan Jumlah pembayaran terbaru"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Tanggal Pembayaran</label>
                                                <input type="date"
                                                onChange={this.handleChange}
                                                name="tgl_bayar"
                                                value={this.state.tgl_bayar}
                                                className="form-control" placeholder="Masukkan Email"/>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Status</label>
                                                <select className='form-control' required onChange={this.handleChange} name="status" value={this.state.status} style={{height: 3 + 'em'}}>
                                                    <option value=''>Pilih Status</option>
                                                    <option value="Lunas">Lunas</option>
                                                    <option value="Belum Lunas">Belum Lunas</option>
                                                </select>
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
        <Button color="danger" onClick={this.toggle1}><i className="fa fa-trash" title="Hapus Event"></i> </Button>
            <Modal isOpen={this.state.modal1} toggle={this.toggle1}>
            <ModalHeader toggle1={this.toggle1}>Konfirmasi Penghapus Data</ModalHeader>
            <ModalBody>
                Data Akan di Hapus!!!<br/>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggle1}>Batal</Button>{' '}
                <Button color="danger" onClick={(e) => this.deleteTask()}>Konfirmasi</Button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
            <ModalHeader toggle={this.toggle2}>Detail </ModalHeader>
            <ModalBody>
            
            <table className="table">
              <tbody>
                  <tr>
                      <td>Nama</td>
                      <td>{task.nama}</td>
                  </tr>
                  <tr>
                      <td>Alamat</td>
                      <td>{task.alamat}</td>
                  </tr>
                  <tr>
                      <td>Jenis Hewan</td>
                      <td>{task.hewan}</td>
                  </tr>
                  <tr>
                      <td>Type</td>
                      <td>{task.type}</td>
                  </tr>
                  <tr>
                      <td>Request</td>
                      <td>{task.request}</td>
                  </tr>
                  <tr>
                      <td>Nomor Hewan</td>
                      <td>{task.nomor}</td>
                  </tr>
                  <tr>
                      <td>Pembayaran</td>
                      <td>{task.pembayaran}</td>
                  </tr>
                  <tr>
                      <td>Tanggal Pembayaran</td>
                      <td>{task.tgl_bayar}</td>
                  </tr>
                  <tr>
                      <td>Status</td>
                      <td>{task.status}</td>
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
