import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import ListSurat from "./page/Surat/listSurat";
import { rootRef, timeRef } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
import orderBy from 'lodash/orderBy';
//import { Action } from "../../Action";
class Surat extends Component {

    constructor(props) {
        super(props);
        this.state = { idrt:'',no:'',search:'',kode:'', alert:'', tampilalert:'hide',tasks: [], tasksLoading: true,jenis_surat:'', nama_penerima:localStorage.getItem('namarw')};
        localStorage.setItem("DataRW", "");
      }
      componentWillMount() {
        console.log(localStorage.getItem('namarw'));
        rootRef.child("Surat").orderByChild("kd_pembuat").equalTo(localStorage.getItem("nik")).on('value', snap => {
            var no=1;
            snap.forEach(shot => {
              console.log(no)
              no++;
            });

            this.setState({no:no});
          });
        rootRef.child("Surat").orderByChild("kd_pembuat").equalTo(localStorage.getItem('nik')).on('value', snap => {
          const tasks = [];
          var no=this.state.no-1;
          snap.forEach(shot => {
            tasks.push({ ...shot.val(), key: shot.key, no:no});
              no--;
          });

          this.setState({ tasks, tasksLoading: false });
        });

      }
      handleFilter = event => {
            this.setState({ search: event.target.value });
      };
      handleChangeJenis = event => {
        this.setState({ jenis_surat: event.target.value });

    }
      handleChangeKode = event => {
        this.setState({kode:event.target.value});


        // console.log(this.state.kode);
      }
      handleReset = event => {
        event.preventDefault();
          this.setState({ jenis_surat: '', kode_surat: ''});
      }

      notify(type){
        return () => {
                    var htg = {
                    kd_surat:RandomKata.generate(10),
                    kd_pembuat:localStorage.getItem("nik"),
                    jenis_surat:this.state.jenis_surat,
                    kode_surat:this.state.kode,
                    time_notif:timeRef
                  };
                //   rootRef.child("Surat").orderByChild("kd_pembuat").equalTo(localStorage.getItem('nik')).on('value', snap => {
                //     snap.forEach(shot => {
                //       if(shot.val().jenis_surat === this.state.jenis_surat){
                //         console.log(this.state.jenis_surat);
                //           this.setState({ tampilalert: 'block', alert:'Jenis Surat Sudah ada'});
                //       }else{
                //           this.setState({ tampilalert: 'hide'});
                //           rootRef.child("Surat").orderByChild("kd_pembuat").equalTo(localStorage.getItem('nik')).on('value', snap => {
                //             snap.forEach(shot => {
                //               // console.log(shot.val().jenis_surat);
                //               if(shot.val().kode_surat === this.state.kode){
                //                   this.setState({ tampilalert: 'block', alert:'Kode Surat Sudah ada'});
                //               }else{
                //                   this.setState({ tampilalert: 'hide'});
                //
                //               }
                //             });
                //           });
                //       }
                //     });
                // });
                  rootRef.child('Surat').push(htg);
                  this.setState({ jenis_surat: '', kode: ''});
                  toast.success('Data Berhasil Di Simpan', {
                  position: toast.POSITION.TOP_RIGHT,
                });
          // window.location.replace('s')
        };
      };
  render() {
    const { tasks, tasksLoading, search,tampilalert} = this.state;
    const orderedTasks = orderBy(
      tasks.filter(
        (ls) => {
          return ls.jenis_surat.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
        }
      ),
      ['time_notif'],['desc']
    );
    let taskList;
    let data = tasks.filter(
      (ls) => {
        return ls.jenis_surat.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
      }
    );
    let cekalert = (
        <div className="alert alert-danger" id={this.state.tampilalert} role="alert" style={{marginTop: 0.5 + 'em'}}>
      {this.state.alert}!!!
    </div>);
    let button;
    if(tampilalert === "hide"){
      if(this.state.jenis_surat.length && this.state.kode.length){
        button =
          <div>
          <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>&nbsp;
                  <button type="submit" className="btn btn-primary" onClick={this.notify('success')}><i className="fa fa-envelope-o"></i> Send</button>
          </div>
          ;
      }
    }else{
      button = (
        <div>Silahkan isi form</div>
      )
    }
    if (tasksLoading) {
        taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
        <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
      </div>;
      }else if (tasks.length) {
          taskList = <div className='table-responsive'>
          <div className='col-md-4 right'>
            <input type='text' className='form-control' placeholder='cari data dengan jenis surat' value={search} onChange={this.handleFilter}/>
          </div>

          <table className="table" id='example'>
            <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Kode Surat</th>
                        <th scope="col">Jenis Surat</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
          {orderedTasks.map(task => (
            <ListSurat key={task.key} task={task}/>
          ))}
        </tbody>
        </table>
        </div>;
      }else{
        taskList = <div className="TaskList-empty">Tidak Ada Surat</div>;
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
                    <li className="breadcrumb-item active">Pengaturan Surat</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Pengaturan Surat</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="col-md-12">
                                  <div className="card card-primary card-outline">

                                    <div className="card-body">
                                      <div className='row'>
                                        <div className="form-group col-md-6">
                                          <label>Jenis Surat</label>
                                          <input className="form-control" type='text' placeholder="Jenis Surat, contoh:SKTM" value={this.state.jenis_surat} onChange={this.handleChangeJenis}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                          <label>Kode Surat</label>
                                          <input className="form-control" type='text' placeholder="Kode Surat, contoh:SJKK" value={this.state.kode} onChange={this.handleChangeKode}/>
                                        </div>
                                      </div>
                                    </div>
                                    {cekalert}
                                    <div className="card-footer">
                                      <div className="float-right">
                                        {button}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Surat</h3>
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

export default Surat;
