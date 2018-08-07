import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import orderBy from 'lodash/orderBy';
import DataRW from "./page/DataRW/daftarrw";
import { rootRef, RefWarga, RefRW, RefKK } from '../../db';
import RandomKata from 'randomstring';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
class RW extends Component {

    constructor(props) {
        super(props);
        this.state = {tasks:[], modal: false, no: '',
        nikWarga: '',
        value: '',nama:'',
        isi: '', tmpno:'', nohp: '', email: '', alamat: '', lihatbtnedit:'block', tampil:'', tampilbtn:'block'};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }


    componentDidMount(){
        //this.setState({nikWarga: localStorage.getItem("NikRW")});
                RefWarga.on('value', snap =>{
                    const tasks = [];
                    snap.forEach(shot => {
                            let hitung = 0;
                                var alamat = "";
                            RefRW.orderByChild("nik").equalTo(shot.val().nik).on('value', snap => {
                            snap.forEach(shot => {
                                hitung++;
                                });
                            });

                            if(hitung >= 1){

                            }else{

                                tasks.push({ ...shot.val(), key: shot.key, alamatku: shot.val().email });
                            }
                    })
                    this.setState({tasks});
                })

    }


      handleChangeNo = event => {
        this.setState({ no: event.target.value });
        let hitung = 0;
        RefRW.orderByChild("no").equalTo(event.target.value).on('value', snap => {
          snap.forEach(shot => {
            hitung++;

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
        let hitung = 0;
        RefRW.orderByChild("no").equalTo(event.target.value).on('value', snap => {
          //const tasks = [];
          snap.forEach(shot => {
            hitung++;
            //tasks.push({ ...shot.val(), key: shot.key });

          });
          if(hitung >= 1){
          this.setState({ lihatbtnedit: 'hide'});
          }else{
            this.setState({ lihatbtnedit: 'block'});
          }
        });
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
        this.setState({ no: '', nohp: '', email: '', nama:'', alamat: '', tampil:'', tampilbtn:'block', nikWarga:''});
        //localStorage.setItem("NikRW", "");
      }


      tampildatarw = event =>{
        RefWarga.on('value', snap =>{
            const tasks = [];
            snap.forEach(shot => {
                    let hitung = 0;
                        var alamat = "";
                    RefRW.orderByChild("nik").equalTo(shot.val().nik).on('value', snap => {
                    snap.forEach(shot => {
                        hitung++;
                        });
                    });

                    if(hitung >= 1){

                    }else{

                        tasks.push({ ...shot.val(), key: shot.key, alamatku: shot.val().email });
                    }
            })
            this.setState({tasks});
        })

      }

      handleChangePilihan = event => {

        try{
            let htg = 0;
            RefRW.orderByChild("nik").equalTo(event.value).on('value', snap => {
            snap.forEach(shot => {
                htg++;
            });
        });
        if(htg >= 1){
            toast.warn('Warga ini telah menjadi RW');
        }else{

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
        }
        }catch(error){

        }

      }

      addrt(type) {
        return () => {
            //console.log("tesssssssssssss")
              if (this.state.no != "") {
            const htg = {
                no: this.state.notmp.trim(),
                alamat: "-",
                nohp: "0",
                email: "-",
                nik: "0",
                nama: "-"
              };
                rootRef.child('RW').push(htg);
                this.setState({ notmp: ''});
                toast.success('Data Berhasil Di Simpan', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                //window.location.reload();
                this.toggle();
             //   Action("addRW", this.state).then ((result) => {
               //     console.log(result);
                 ///   if(result!=''){
                    //    console.log("success");
                        // window.location='/AddEvent';
                   // }else{
                     //   console.log("errors");
                    //}
                //})
                }else{
                    toast.warn('No tidak boleh kosong');
                }
        };
      };

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
            }else if(this.state.no === ""){
                toast.warn('No RW tidak boleh kosong', {
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
                nik: this.state.nikWarga,
                nama: this.state.nama
              };
             rootRef.child('RW').push(htg);
                this.setState({ no: '', nohp: '', email: '', nama:'',alamat: '', tampilbtn:'block', tampil: 'hide', nikWarga:''});
                this.tampildatarw();
                toast.success('Data Berhasil Di Simpan', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                // Action("addRW", this.state).then ((result) => {
                //     console.log(result);
                //     if(result!=''){
                //         console.log("success");
                //         // window.location='/AddEvent';
                //     }else{
                //         console.log("errors");
                //     }
                // })
                }
        };
      };
  render() {
    const { tampil } = this.state;
    let cekk;
    if(tampil === 'hide'){

    }else if(tampil === 'block'){
         cekk = (

            <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 1 + 'em'}}>
                No RW Sudah Di Pakai
            </div>
        )
    }




    if(this.state.hasError){
        return alert('terjadi kesalahan :(');
    }
    const {tasks } = this.state;
    const orderedTasks = orderBy(
        tasks
    );
    const options = []
    { orderedTasks.map( task =>(
        options.push({value:task.nik, alamat:task.alamatku, nama:task.nama, label:task.nama+" ("+task.alamatku+")"})

    ))}

    let taskList;
    taskList = (
        <Select className="form-control" name="form-field-name" placeholder="Masukkan Nama"
        value={this.state.nikWarga}
        multi={this.state.multi}
        onChange={this.handleChangePilihan}
        onSelect={ this.handleSelect }
        options = { options }
        />
    );




    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row"style={{marginTop: -1 + 'em'}}>
                <div className="col-sm-6">
                    <h1>Data RW</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Data RW</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                <div className="card card-info" style={{marginTop: -1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah RW</h3>
                            <div className="card-tools">
                              <button type="button" className="btn btn-success" onClick={this.toggle} title="Menghapus Semua Pengumuman">
                                <i className="fa fa-plus"> RW Sementara</i>
                              </button>
                            </div>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                        <label>No RW</label>
                                            <input type="number"
                                            onChange={ this.handleChangeNo }
                                            value={this.state.no}
                                            className="form-control" placeholder="Masukkan No RW" min="1"/>
                                        </div>
                                    </div>

                                     <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                        <label>Pilih Ketua RW</label>
                                            {taskList}
                                        </div>
                                    </div>
                                     {/* <div className="col-md-1">
                                        <div className="form-group col-md-12">
                                            <button className="btn btn-primary" style={{height: 3 + 'em', width: 3 + 'em'}} onClick={this.tampildatarw}>
                                            <i className="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div> */}

                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                        <label>No HP</label>
                                            <input type="number"
                                            onChange={this.handleChangeNoHP}
                                            value={this.state.nohp}
                                            className="form-control" placeholder="Masukkan NO HP Kepala RW" min="1"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                        <label>Email</label>
                                            <input type="text"
                                            onChange={this.handleChangeEmail}
                                            value={this.state.email}
                                            className="form-control" placeholder="Masukkan Email Kepala RW" min="1"/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="from-group col-md-12">
                                        <label>Alamat</label>
                                            <textarea rows="3" placeholder='Alamat Ketua RW' className='form-control' onChange={this.handleChangeAlamat} value={this.state.alamat}></textarea>
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
                            <DataRW/>
                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={1000}
                                    />

                                     <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader toggle={this.toggle}>Tambah RW Sementara</ModalHeader>
                                        <ModalBody>
                                        <div className="col-md-12">
                                        <div className="form-group col-md-12">
                                            <input type="number"
                                            onChange={ this.handleChangeNoTmp }
                                            value={this.state.notmp}
                                            className="form-control" placeholder="Masukkan No RW" min="1"/>
                                        </div>
                                    </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" onClick={this.toggle}>Batal</Button>{' '}
                                            <Button color="primary" id={this.state.lihatbtnedit} onClick={this.addrt('success')}>Simpan</Button>
                                        </ModalFooter>
                                    </Modal>
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

export default RW;
