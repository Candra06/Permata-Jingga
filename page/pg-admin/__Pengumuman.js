import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import ListPengumuman from "./page/Pengumuman/listPengumuman";
import { rootRef,RefWarga, RefKK, timeRef } from '../../db';
import DaftarWarga from "./page/DataWarga/selectwarga/daftarwarga";
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
import orderBy from 'lodash/orderBy';
import { Action } from "../../Action";
class Pengumuman extends Component {
  
    constructor(props) {
        super(props);
        this.state = { idrt:'01', tasks: [],id_pengumuman: '', type: 'rt', id_pembuat: '3811080512990002', isi:'', jenis:'', id_penerima:'', displayPenerima:"block", status:'Belum Diterima', today:''};        localStorage.setItem("DataRW", "");
            let today =new Date();
        var days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
        console.log("tanggal "+today.getDate()+" "+today.getMonth()+1+" "+today.getFullYear());
      }
      componentDidMount() {
        rootRef.child("Pengumuman").on('value', snap => {
          const tasks = [];
          snap.forEach(annouc => {
            rootRef.child("WARGA").on('value', snapshot => {
              snapshot.forEach(warga => {
                if(warga.val().nik == annouc.val().kd_penerima){
                    console.log("data "+annouc.val());
                    // data.push({ ...annouc.val()});
                    // data.push({ ...warga.val()});
                    // var data=(annouc.val()).push({warga.val()});
                    var data = ([annouc.val()]).concat([warga.val()]);
                    tasks.push(data);
                    
                }
              });
            });
          });
          console.log(tasks);
          this.setState({ tasks, tasksLoading: false });
        });

      }
      handleChangeWarga = event => {
        this.setState({ id_penerima: event.target.value });
        // console.log(event.target.value);
      };
      handleChangeIsi = event => {
        this.setState({ isi: event.target.value });
      };

      handleChangeJenis = event => {
        this.setState({ jenis: event.target.value });
        if(event.target.value == "pribadi"){
            
            console.log("pribadi");
            this.setState({displayPenerima:"block"});
        }else{
            console.log("umum");
            this.setState({displayPenerima:"hide"});
        }
      };
      handlePenerima = event => {
        this.setState({id_penerima:event.target.value});
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ id_pengumuman: '', type: '', id_pembuat: 'Mochamad Ludfi Rahman', isi:'', jenis:'', id_penerima:'' });
      }
      notify(type){
        return () => {
            let today =new Date();
        var days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
            if(this.state.jenis == "umum"){
                RefKK.orderByChild("idrt").equalTo(this.state.idrt).on('value', snap => {
                  snap.forEach(shot => {
                    var htg = {
                    id_pengumuman: RandomKata.generate(10),
                    kd_pembuat:"3811080512990002",
                    kd_penerima:shot.val().nokk,
                    isi: this.state.isi.trim(),
                    jenis: this.state.jenis.trim(),
                    time_notif:timeRef,
                    tanggal:today.getDate()+"-"+ today.getMonth()+1 +"-"+today.getFullYear()
                  };
                  rootRef.child('Pengumuman').push(htg);
                  var bool = 1;
                   if (bool) {
                        this.setState({ id_pengumuman: '', type: '', id_pembuat: '', isi:'', jenis:'', id_penerima:'' });
                        localStorage.setItem("DataRW", "");
                        toast.success('Data Berhasil Di Simpan', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                    }else{
                        toast.warn('Form Masih ada yang kosong', {
                            position: toast.POSITION.TOP_RIGHT,
                          });
                    }
                  });
                  console.log("htg anda "+htg);
                });
            }else{
                var htg = {
                    id_pengumuman: RandomKata.generate(10),
                    kd_pembuat:"3811080512990002",
                    kd_penerima:this.state.id_penerima,
                    isi: this.state.isi.trim(),
                    jenis: this.state.jenis.trim(),
                    time_notif:timeRef,
                    tanggal:today.getDay()+"-"+ today.getMonth() +"-"+today.getFullYear()
                  };
                  rootRef.child('Pengumuman').push(htg);
                  if (htg.jenis!='' && htg.kd_pembuat!='') {
                    this.setState({ id_pengumuman: '', type: '', id_pembuat: '', isi:'', jenis:'', id_penerima:'' });
                    localStorage.setItem("DataRW", "");
                    toast.success('Data Berhasil Di Simpan', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }else{
                    toast.warn('Form Masih ada yang kosong', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }
            }
              // Action("addKK", htg).then ((result) => {
              //       console.log(result);
              //       if(result!=''){
              //           console.log("success");
              //           console.log(result);    
              //       }else{
              //           console.log("errors");
              //       }
              //   })
              console.log(htg);
        };
      };
  render() {
    const { displayPenerima, tasks } = this.state;
    const orderedTasks = orderBy(
      tasks
    );
    return (
        <div className="wrapper">
          <Nav/>
           <Layout/>
        
        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Data Pengumuman</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Pengumuman</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Tambah Pengumuman Baru</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="row col-12">
                                    <div className="input-group mb-3 col-6">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-id-card"></i></span>
                                        </div>
                                         <select className='form-control' required onChange={this.handleChangeJenis} value={this.state.jenis}>
                                            <option value=''>pilih jenis</option>
                                            <option value='umum'>Umum</option>
                                            <option value='pribadi'>Pribadi</option>
                                        </select>
                                    </div>
                                    <div className="input-group mb-3 col-6" id={displayPenerima}>
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                        </div>
                                        <input type='number' className='form-control' placeholder='masukkan no nik' required onChange={this.handleChangeWarga} value={this.state.id_penerima}/>
                                        {/*<DaftarWarga/>*/}
                                    </div>
                                    <div className="input-group mb-12 col-12">
                                        <textarea rows='5' placeholder='masukkan isi Pengumuman' className='form-control' required onBlur={this.handleChangeIsi.bind(this)} >{this.state.isi}</textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success')}>Simpan</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Pengumuman Wargaku</h3>
                        </div>
                            <div className="card-body">
                            <table className="table">
                                <thead>
                                        <tr>
                                            <th scope="col">No KK</th>
                                            <th scope="col">Nama Warga</th>
                                            <th scope="col">NIK</th>
                                            <th scope="col">Jenis Kelamin</th>
                                            <th scope="col">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                              {orderedTasks.map(task => (
                                <ListPengumuman key={task.key} task={task}/>
                              ))}
                            </tbody>
                            </table>
                                <div>
                                    <ToastContainer 
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={5000}
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
 
export default Pengumuman;