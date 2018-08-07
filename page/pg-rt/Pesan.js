import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import ListPesan from "./page/Pesan/listPesan";
import { rootRef, timeRef } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
class Pesan extends Component {

    constructor(props) {
        super(props);
        this.state = { idrt:'',search:'', tasks: [], tasksLoading: true,id_pengumuman: '', type: 'rt', id_pembuat: '', isi:'', jenis:'', id_penerima:'', displayPenerima:"block", status:'Belum Diterima', today:'', nama_penerima:localStorage.getItem('namarw')};
        localStorage.setItem("DataRW", "");
      }
      componentDidMount() {
        console.log(localStorage.getItem('namarw'));
        rootRef.child("Pengumuman").orderByChild("kd_penerima").equalTo(localStorage.getItem('nik')).on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            tasks.push({ ...shot.val(), key: shot.key, nama_rw:localStorage.getItem("namarw") });
          });

          this.setState({ tasks, tasksLoading: false });
        });

      }
      handleChangeWarga = event => {
        this.setState({ id_penerima: event.target.value });

      };
      handleChangeIsi = event => {
        this.setState({ isi: event.target.value });
      };

      handleChangeJenis = event => {
        this.setState({ jenis: event.target.value });
        if(event.target.value === "pribadi"){

            this.setState({displayPenerima:"block"});
        }else{
            this.setState({displayPenerima:"hide"});
        }
      };
      handlePenerima = event => {
        this.setState({id_penerima:event.target.value});
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ id_pengumuman: '', type: '', id_pembuat: '', isi:'', jenis:'', id_penerima:'' });
      }
      notify(type){
        return () => {
            let today =new Date();
            localStorage.setItem("isi", this.state.isi);
            localStorage.setItem("jenis", this.state.jenis);
                    var htg = {
                    nama_pengirim:localStorage.getItem("nama"),
                    id_pengumuman: RandomKata.generate(10),
                    kd_pembuat:localStorage.getItem("nik").trim(),
                    kd_penerima:localStorage.getItem('nikrw'),
                    isi: localStorage.getItem("isi"),
                    jenis: "pribadi",
                    time_notif:timeRef,
                    tanggal:today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()
                  };
                  var notif= {
                    nama_pengirim:localStorage.getItem("nama"),
                    nik_penerima:localStorage.getItem('nikrw'),
                    nik_pengirim:localStorage.getItem("nik"),
                    teks:localStorage.getItem("isi"),
                    time_notif:timeRef,
                    tipe:"biru"
                  }
                  rootRef.child('Pengumuman').push(htg);
                  rootRef.child('Notifikasi').push(notif);
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
                localStorage.setItem("isi", this.state.isi);
                localStorage.setItem("jenis", this.state.jenis);

        };
      };
  render() {
    const { tasks, tasksLoading, search} = this.state;

    let taskList;
    let data = tasks.filter(
      (ls) => {
        return ls.nama_rw.indexOf(this.state.search)!==-1;
      }
    );
    if (tasksLoading) {
        taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
        <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
      </div>;
      }else if (tasks.length) {
          taskList = <div className='table-responsive'>
          <div className='col-md-4 right'>
            <input type='text' className='form-control' placeholder='cari data dengan nama' value={search} onChange={this.handleFilter}/>
          </div>

          <table className="table" id='example'>
            <thead>
                    <tr>
                        <th scope="col">Pengirim</th>
                        <th scope="col">Penerima</th>
                        <th scope="col">Isi</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {data.map(task => (
            <ListPesan key={task.key} task={task}/>
          ))}
        </tbody>
        </table>
        </div>;
      }else{
        taskList = <div className="TaskList-empty">Tidak Ada Pesan</div>;
      }
    return (
        <div className="wrapper">
          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Data Pesan</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Kirim Pesan</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Kirim Pesan Ke Pak RW</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="col-md-12">
                                  <div className="card card-primary card-outline">
                                    <div className="card-header">
                                      <h3 className="card-title">Kirim Pesan</h3>
                                    </div>
                                    <div className="card-body">
                                      <div className="form-group">
                                        <input className="form-control" placeholder="To:" value={"Pak RW("+this.state.nama_penerima+")"} onChange={this.handleChangePenerima}/>
                                      </div>
                                      <div className="form-group">
                                          <textarea id="compose-textarea" placeholder='masukkan isi pesan' className="form-control" style={{height: 300+"px"}} onBlur={this.handleChangeIsi.bind(this)}>
                                          {this.state.isi}
                                          </textarea>
                                      </div>
                                    </div>
                                    <div className="card-footer">
                                      <div className="float-right">
                                        <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button> &nbsp;
                                        <button type="submit" className="btn btn-primary" onClick={this.notify('success')}><i className="fa fa-envelope-o"></i> Send</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Pesan</h3>
                        </div>
                            <div className="card-body">
                            {taskList}

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

export default Pesan;
