import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DataRT from "./page/DataRT/daftarrt";
//import SelectRW from "./page/DataRW/selectrw/daftarrw";

import orderBy from 'lodash/orderBy';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { rootRef, RefWarga, RefRW, RefRT, RefKK } from '../../db';
import RandomKata from 'randomstring';
import { Action } from "../../Action";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
class RT extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            tasks2: [],
            tasks3: [],
            idrw:'',idrt:'',
            kd_rw:'',
            nikWarga: '', modal: false, no: '', nohp: '',
             notmp:'', email: '', alamat: '', tampil:'', tampilbtn:'block'};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    componentWillMount() {
        this.setState({idrw:localStorage.getItem("koderw")});
        RefWarga.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on('value', snap =>{
            const tasks3 = [];
            snap.forEach(shot => {
                    let hitung = 0;
                    RefRT.orderByChild("nik").equalTo(shot.val().nik).on('value', snap => {
                    snap.forEach(shott => {
                        hitung++;
                        });
                    });
                    if(hitung >= 1){

                    }else{

                        tasks3.push({ ...shot.val(), key: shot.key, alamatku: shot.val().email });
                    }
            })
            this.setState({tasks3});
        })
      }
      handleChangePilihan = event => {

        try{
          this.setState({nikWarga: event.value});
          RefWarga.orderByChild("nik").equalTo(event.value).on('value', snap => {
            snap.forEach(shot => {
              this.setState({email: shot.val().email, nohp: shot.val().nohp, nama: shot.val().nama});

              RefKK.orderByChild("nokk").equalTo(shot.val().no_kk).on('value', snap => {
                snap.forEach(shot => {
                    this.setState({ alamat: shot.val().alamat})
                });
            });

            });
          });
          this.nameInput.focus();
        }catch(error){

        }

      }

      

    handleChangeNo = event => {
        const {idrw} = this.state;
      this.setState({ no: event.target.value });
      let hitung = 0;
      RefRT.orderByChild("no").equalTo(event.target.value).on('value', snap => {
        snap.forEach(shot => {
            if(shot.val().norw === idrw){
          hitung++;
            }else{

            }

        });
        if(hitung >= 1){
        this.setState({ tampilbtn: 'hide', tampil: 'block'});
        }else{
          this.setState({ tampilbtn: 'block', tampil: 'hide'});
        }
      });
    };
    handleChangeNoTmp = event => {
      this.setState({ notmp: event.target.value });
    };

      handleChangeAlamat = event => {
        this.setState({ alamat: event.target.value });

      };
      handleChangeNoHP = event => {
        this.setState({ nohp: event.target.value });

      };

      handleChangeEmail = event => {
        this.setState({ email: event.target.value });

      };
      handleReset = event => {
        event.preventDefault();
        this.setState({ no: '', nohp: '', email: '', alamat: '', tampil:'', tampilbtn:'block', nikWarga:''});
        //localStorage.setItem("DataRW", "")
        //localStorage.setItem("NikRW", "");
      }


 
      notify(type){
        return () => {
            let lastAtPos = this.state.email.lastIndexOf('@');
                let lastDotPos = this.state.email.lastIndexOf('.');
            if(this.state.nama === ""){
                toast.warn('Nama tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(!this.state.nama.match(/^[a-zA-Z]+$/) && !this.state.nama.match(" ")){
                toast.warn('Nama harus berisi huruf', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else if(this.state.idrw === ""){
                toast.warn('No RW tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.no === ""){
                toast.warn('No RT tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.nikWarga === ""){
                toast.warn('Nik tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.nohp === ""){
                toast.warn('No HP tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.alamat === ""){
                toast.warn('Alamat tidak boleh kosong', {
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
              }else{
            const htg = {
                no: this.state.no.trim(),
                alamat: this.state.alamat.trim(),
                nohp: this.state.nohp.trim(),
                email: this.state.email.trim(),
                nik: this.state.nikWarga.trim(),
                nama: this.state.nama.trim(),
                norw: this.state.idrw.trim()
              };
             rootRef.child('RT').push(htg);
                this.setState({ no: '', nohp: '', email: '',  alamat: '', tampilbtn:'block', nikWarga:'', tampil: 'hide'});
               
                toast.success('Data Berhasil Di Simpan', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                //window.location.reload();

                }
        };
      };

      tampildatarw = () => {
        RefWarga.orderByChild("nik").equalTo(localStorage.getItem("NikRT")).on('value', snap => {
            snap.forEach(shot => {
              this.setState({email: shot.val().email, nohp: shot.val().nohp});
              RefKK.orderByChild("nokk").equalTo(shot.val().no_kk).on('value', snap => {
                snap.forEach(shot => {
                    this.setState({ alamat: shot.val().alamat})
                });
            });

            });
          });
      }
  render() {
    const { tampil } = this.state;
    let cekk;
    const { tasks, tasks3, option } = this.state;
    const orderedTasks = orderBy(
      tasks, ['no'],['asc']
    );

      const options = [];
        { tasks3.map( task =>(
            options.push({value:task.nik, nohp:task.nohp, alamat:task.alamatku, nama:task.nama, label:task.nama+"("+task.alamatku+")"})

        ))}

    if(tampil === 'hide'){

    }else if(tampil === 'block'){
         cekk = (

            <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 1 + 'em'}}>
                No RT Sudah Di Pakai
            </div>
        )
    }
    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row"style={{marginTop: -1 + 'em'}}>
                <div className="col-sm-6">
                    <h1>Data RT</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Data RT</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                <div className="card card-info" style={{marginTop: -1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah RT</h3>
                         
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                            <div className="row">
                           
                                <div className="col-md-6">
                                    <div className="form-group col-md-12">
                                    <label>Pilih Ketua RT <sup>*</sup></label>
                                    <Select className="form-control" name="form-field-name" placeholder="Masukkan Nama RT"
                                    value={this.state.nikWarga}
                                    multi={this.state.multi}
                                    onChange={this.handleChangePilihan}
                                    onSelect={ this.handleSelect }
                                    options = { options }
                                    />

                                    </div>
                                </div>


                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                        <label>No RT <sup>*</sup></label>
                                            <input type="number"
                                            onChange={ this.handleChangeNo }
                                            value={this.state.no}
                                            ref={(input) => { this.nameInput = input; }}
                                            className="form-control" placeholder="Masukkan No RT" min="1"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                        <label>No HP <sup>*</sup></label>
                                            <input type="number"
                                            onChange={this.handleChangeNoHP}
                                            value={this.state.nohp}
                                            className="form-control" placeholder="Masukkan NO HP Kepala RT" min="1"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                        <label>Email <sup>*</sup></label>
                                            <input type="text"
                                            onChange={this.handleChangeEmail}
                                            value={this.state.email}
                                            className="form-control" placeholder="Masukkan Email Kepala RT" min="1"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="from-group col-md-12">
                                        <label>Alamat <sup>*</sup></label>
                                            <textarea rows="3" placeholder='Alamat Ketua RT' className='form-control' onChange={this.handleChangeAlamat} value={this.state.alamat}></textarea>
                                        </div>
                                    </div>
                                        <div className="col-md-12">
                                            {cekk}
                                        </div>
                                </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" id={this.state.tampilbtn  } onClick={this.notify('success')}>Simpan</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar RW</h3>
                        </div>
                            <div className="card-body">
                            <DataRT/>
                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={2000}
                                    />

                                </div>
                            </div>
                    </div>

                </div>
            </section>
            </div>

          <Footer/>
        </div>
    );
  }
}

export default RT;
