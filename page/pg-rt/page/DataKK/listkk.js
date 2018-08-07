import React from 'react';
import { RefKK, rootRef, RefWarga, RefUser, RefRW, RefRT,RefKelurahan } from './../../../../db';
import { Redirect } from 'react-router-dom';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import orderBy from 'lodash/orderBy';

import Listwarga from "./../../page/DataWarga/selectdatawarga/listwarga";
import ListRW from './../../page/DataRW/selectrw/listitemrw';
import ListRT from './../../page/DataRW/selectrw/listitemrt';
import Listkelurahan from "./../../page/DataKelurahan/selectkelurahan/listkelurahan";
import { ToastContainer, toast } from 'react-toastify';
export default class Listkk extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        modal: false,
        modal2: false,
        nokk: '', alamat: '', tmpnokk:'', tampilbtn:'', tampilalert:'hide',norw:'', nort:'',kepala:'',kelurahan:'',
        arrayrw:[], arrayrt:[], arraykelurahan:[], arrayselectkepala:[]
      }
      this.toggle = this.toggle.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.tutupmodal2 = this.tutupmodal2.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }
    tutupmodal2(){
        this.setState({
          modal2: !this.state.modal2
        });
    }
    componentWillMount(){
      this.setState({norw:localStorage.getItem("koderw")});
      this.setState({nort:localStorage.getItem("idrt")});
    }
      toggle2(txtidrt, txtalamat, txtno, txtidrw, txtkepala, txtkelurahan) {
      
        this.setState({
            tmpnokk: txtno,
            nokk: txtno,            
            alamat: txtalamat,
            kelurahan: txtkelurahan,
            kepala: txtkepala,
          modal2: !this.state.modal2
        });
        try{
      

          RefKelurahan.on('value', snap => {
            const arraykelurahan = [];
            snap.forEach(shot => {
                arraykelurahan.push({ ...shot.val(), key: shot.key });
            });
            this.setState({ arraykelurahan });
          });

          RefWarga.orderByChild("no_kk").equalTo(txtno).on('value', snap => {
            const arrayselectkepala = [];
            snap.forEach(shot => {
                arrayselectkepala.push({ ...shot.val(), key: shot.key });
            });
            this.setState({ arrayselectkepala });
          });
        }catch(error){

        }
      }

      handleChangeNo = event => {
        this.setState({ nokk: event.target.value });
        const { tmpnokk } = this.state;
        let hitung = 0;
              RefKK.orderByChild("nokk").equalTo(event.target.value).on('value', snap => {
                snap.forEach(shot => {
                    if(shot.val().nokk != tmpnokk){
                    hitung++;
                    }else{

                    }
                });

            });

            if(hitung >= 1){
                this.setState({ tampilalert: 'block', tampilbtn:'hide'});
            }else{
                this.setState({ tampilalert: 'hide', tampilbtn:'block'});

            }
      };

      handleChangeAlamat = event => {
        this.setState({ alamat: event.target.value });
      };
      
      handleChangeOptionKepala = event => {
        this.setState({ kepala: event.target.value });
      };
      
     

      handleChangeOptionKelurahan = event => {
        this.setState({kelurahan: event.target.value});
        
      }
      handleReset = event => {
        //event.preventDefault();
        this.setState({ nokk: '', alamat: '',  tampilalert: 'hide', tampilbtn:'block' });
      }

      tampilkandata = () => {
        const { nokk, idrt, idrw } = this.props.task;
        localStorage.setItem("NoKKTampil", nokk)
        localStorage.setItem("nortview", idrt)
        localStorage.setItem("norwview", idrw)
          this.setState({ redirect: true});
      }

    deleteTask = () => {
        const { key, nokk } = this.props.task;
        let tmpnikuser = "";
        RefWarga.orderByChild("no_kk").equalTo(nokk).on('value', snap => {
            snap.forEach(shot => {
                tmpnikuser = shot.val().nik;
                RefUser.orderByChild("nik").equalTo(tmpnikuser).on('value', snap => {
                    snap.forEach(shott => {
                        RefUser.child(shott.key).remove();
                    });
                  });
                  RefWarga.child(shot.key).remove();

            });
          });
        RefKK.child(key).remove();
        toast.success('Data Berhasil Di Hapus', {
            position: toast.POSITION.TOP_RIGHT,
        });
      };

      notify(type, kunci){
        return () => {
            if (this.state.nokk === "") {
                toast.warn('No KK Tidak Boleh Kosong!!', {
                         position: toast.POSITION.TOP_RIGHT,
                       });
                 }else if(this.state.norw === ""){
                     toast.warn('No RW Tidak Boleh Kosong!!', {
                         position: toast.POSITION.TOP_RIGHT,
                       });
                 }else if(this.state.nort === ""){
                     toast.warn('No RT Tidak Boleh Kosong!!', {
                         position: toast.POSITION.TOP_RIGHT,
                       });
                 }else if(this.state.alamat === ""){
                     toast.warn('Alamat Tidak Boleh Kosong!!', {
                         position: toast.POSITION.TOP_RIGHT,
                       });
                 }else{
                    if(this.state.nokk != this.state.tmpnokk){
                        RefWarga.orderByChild("no_kk").equalTo(this.state.tmpnokk).on('value', snap => {
                            snap.forEach(shot => {
                                RefWarga.child(shot.key).update({ no_kk: this.state.nokk, nort:  this.state.nort, norw: this.state.norw})
                            });
                          });
                    }else{
                        RefWarga.orderByChild("no_kk").equalTo(this.state.nokk).on('value', snap => {
                            snap.forEach(shot => {
                                RefWarga.child(shot.key).update({ nort: this.state.nort, norw: this.state.norw})
                            });
                          });
                    }
                rootRef.child('KK').child(kunci).update({ nokk: this.state.nokk, alamat: this.state.alamat,
                idrt:  this.state.nort, idrw: this.state.norw,
                kelurahan: this.state.kelurahan, kepala:this.state.kepala });


                this.setState({ nokk: '', alamat: '',  tampilalert: 'hide', tampilbtn:'block',norw:'', nort:'',kepala:'',kelurahan:''});

                toast.success('Data Berhasil Di Update', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    this.tutupmodal2();
                }
            };
        };
  render() {
    if(this.state.redirect){
        return (<Redirect to="/RT/ViewKK"/>)
     }
    const { task } = this.props;
    const { tampilalert, arrayrw, arraykelurahan, arrayselectkepala } = this.state;
  let cekalert;

  const orderkelurahan = orderBy(
    arraykelurahan, ['nama'],['asc']
  );
  const orderkeluarga = orderBy(
    arrayselectkepala
  );

  if(tampilalert === "hide"){

  }else if(tampilalert === "block"){
    cekalert = (
        <div className="alert alert-danger col-md-12" role="alert" style={{marginTop: 0.5 + 'em'}}>
      No KK Sudah Di Gunakan!!!
    </div>
    )

  }
    return (
        <tr>
        <td>{task.nomer}</td>
        <td>{task.nokk}</td>
        <td>{task.kepala}</td>
        <td>
            <Button color="primary" onClick={() => this.toggle2(task.idrt, task.alamat, task.nokk, task.idrw, task.kepala, task.kelurahan)}><i className="fa fa-pencil"></i></Button>
                <Modal isOpen={this.state.modal2} toggle={() => this.tutupmodal2} frame position="top">
                <ModalHeader toggle={this.toggle2}>
                <div className="card-header">
                            <h3 className="card-title">Update Data KK {task.nokk}</h3>
                            </div>

                </ModalHeader>
                <ModalBody>
                <div className="card card-info">

                <div className="form-control">
                    <div className="card-body">

                                <div className="row">
                                  
                                    <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                            <label>No KK <sup>*</sup></label>

                                            <input type="number"
                                            onChange={this.handleChangeNo}
                                            value={this.state.nokk}
                                            className="form-control" placeholder="Masukkan No KK" min="1"/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <label>Pilih Kelurahan</label>
                                                <select className="form-control" value={this.state.kelurahan} onChange={this.handleChangeOptionKelurahan} style={{height: 3 + 'em'}}>
                                                    <option value="">Pilih Kelurahan</option>
                                                    {orderkelurahan.map(task => (
                                                        <Listkelurahan key={task.key} task={task} />
                                                    ))}
                                                    </select>
                                            </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                            <label>Pilih Kepala KK <sup>*</sup></label>
                                            <select className="form-control" value={this.state.kepala} onChange={this.handleChangeOptionKepala} style={{height: 3 + 'em'}}>
                                            <option value="">Pilih Kepala Keluarga</option>
                                            {orderkeluarga.map(task => (
                                                <Listwarga key={task.key} task={task} />
                                            ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                    <div className="form-group mb-12 col-12">
                                        <label>Alamat <sup>*</sup></label>
                                        <textarea className='form-control' placeholder="Masukkan Alamat Lengkap" onChange={this.handleChangeAlamat} value={this.state.alamat}></textarea>
                                    </div>
                                    </div>
                                </div>
                                {cekalert}
                            </div>

                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" id={this.state.tampilbtn} onClick={this.notify('success', task.key)}>Update</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.tutupmodal2}>Batal</button>
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
                        Data KK {task.nokk} Akan di Hapus!!!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                        <Button color="danger" onClick={this.deleteTask}>Konfirmasi</Button>
                    </ModalFooter>
                </Modal>
            <span>  </span>
                <Button color="success" onClick={this.tampilkandata}><i className="fa fa-list"></i></Button>
        </td>
    </tr>
    );
  }
}
