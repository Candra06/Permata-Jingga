import React, { Component } from "react";
import { connect } from 'react-redux';
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import Select from 'react-select';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import 'react-select/dist/react-select.css';
import ListPengumuman from "./page/Pengumuman/listPengumuman";
import { rootRef, RefKK, RefWarga, timeRef } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
import orderBy from 'lodash/orderBy';
import { Action } from "../../Action";
import TaskList from "./page/Pengumuman/select/daftarwarga";
class Pengumuman extends Component {

    constructor(props) {
        super(props);
        this.state = { search:'',no:'',idrt:'', multi:false, selectedOption: '',
        tasks: [], tasksLoading: true,id_pengumuman: '', type: 'rt', id_pembuat: '',
         isi:'', jenis:'', id_penerima:'', displayPenerima:"hide", status:'Belum Diterima', today:'',
       hasMoreItems: true,};
        localStorage.setItem("DataRW", "");
      }

      componentDidMount() {
        rootRef.child("Pengumuman").orderByChild("kd_pembuat").equalTo(localStorage.getItem("nik")).on('value', snap => {
            const tasks = [];
            var no=1;
            snap.forEach(shot => {
              console.log(no)
              no++;
            });
            console.log(no);
            this.setState({no:no});
          });
        rootRef.child("Pengumuman").orderByChild("kd_pembuat").equalTo(localStorage.getItem("nik")).limitToLast(10).on('value', snap => {
            const tasks = [];
            var no=this.state.no-1;
            snap.forEach(shot => {
              tasks.push({ ...shot.val(), key: shot.key, no:no });
              no--;
            });
            console.log(tasks);
            this.setState({ tasks, tasksLoading: false });
          });
        // rootRef.child("Pengumuman").on('value', snap => {
        //   snap.forEach(shott => {
        //     const tasks = [];
        //     RefWarga.orderByChild("nik").equalTo(shott.val().kd_penerima).on("value", snap => {
        //       snap.forEach(shot => {
        //         tasks.push({ ...shot.val(), key: shot.key, pengumuman:shott.val()});
        //         // console.log(shot.val());
        //       })
        //       this.setState({ tasks, tasksLoading: false });
        //     })
        //     // console.log(tasks);
        //   });


        // });

      }
      handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(selectedOption.value);
      }
      handleChangeWarga = event => {
        this.setState({ id_penerima: event.target.value });

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
        this.setState({ id_pengumuman: '', type: '', id_pembuat: '', isi:'', jenis:'', id_penerima:'' });
      }
      handleFilter = event => {
            this.setState({ search: event.target.value });
      };
      notify(type){
        return () => {
            let today =new Date();
            localStorage.setItem("isi", this.state.isi);
            localStorage.setItem("jenis", this.state.jenis);
            if(this.state.jenis == "umum"){
                RefKK.orderByChild("idrt").equalTo(localStorage.getItem("idrt")).on('value', snap => {
                  snap.forEach(shot => {
                    RefWarga.orderByChild("no_kk").equalTo(shot.val().nokk).on("value", snap => {
                      snap.forEach(shot => {
                        // tasks.push({ ...shot.val(), key: shot.key });
                        console.log(shot.val());
                        var htg = {
                          nama_pengirim:localStorage.getItem("nama"),
                          id_pengumuman: RandomKata.generate(10),
                          kd_pembuat:localStorage.getItem("nik").trim(),
                          kd_penerima:shot.val().nik,
                          isi: localStorage.getItem("isi"),
                          jenis: localStorage.getItem("jenis"),
                          time_notif:timeRef,
                          tanggal:today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()
                        };
                        var notif= {
                          nama_pengirim:localStorage.getItem("nama"),
                          nik_penerima:shot.val().nik,
                          nik_pengirim:localStorage.getItem("nik"),
                          teks:localStorage.getItem("isi"),
                          time_notif:timeRef,
                          tipe:"biru"
                        }
                        Action("addPengumuman", htg).then ((result) => {
                            if(result!=''){
                                console.log("success");
                            }else{
                                console.log("errors");
                            }
                        })
                        rootRef.child('Pengumuman').push(htg);
                        rootRef.child('Notifikasi').push(notif);
                      })
                    })

                });
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
            }else{
                var htg = {
                    nama_pengirim:localStorage.getItem("nama"),
                    id_pengumuman: RandomKata.generate(10),
                    kd_pembuat:localStorage.getItem("nik").trim(),
                    kd_penerima:localStorage.getItem("kd_penerima"),
                    isi: localStorage.getItem("isi"),
                    jenis: localStorage.getItem("jenis"),
                    time_notif:timeRef,
                    tanggal:today.getDay()+"-"+ today.getMonth() +"-"+today.getFullYear()
                  };
                  var notif = {
                    nama_pengirim:localStorage.getItem("nama"),
                    nik_penerima:this.state.id_penerima,
                    nik_pengirim:localStorage.getItem('nik'),
                    teks:"Pak RT Telah menambahkan Pengumuman baru",
                    tipe:"biru"
                  }
                  Action("addPengumuman", htg).then ((result) => {
                      if(result!==''){
                          console.log("success");
                      }else{
                          console.log("errors");
                      }
                  })
                  rootRef.child('Pengumuman').push(htg);
                  rootRef.child('Notifikasi').push(notif);
                  if (htg.jenis!='' && htg.kd_pembuat!='') {
                    this.setState({ id_pengumuman: '', type: '', id_pembuat: '', isi:'', jenis:'', id_penerima:'' });
                    localStorage.setItem("DataRW", "");
                    toast.success('Data Berhasil Di Simpan', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  localStorage.setItem("kd_penerima", "");
                }else{
                    toast.warn('Form Masih ada yang kosong', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }
            }

        };
      };
    delete(key){
      return "<b>"+key+"</b>";

    }
    deleteTask = (kun) => {
        const { key } = this.props.task;
        Pengumuman.child(key).remove();
        var kunci = {
            id_pengumuman:kun,
        }
        Action("deletePengumuman", kunci).then ((result) => {
          console.log(result);
          if(result!==''){
              console.log("success");
              // console.log(result);

          }else{
              console.log("errors");
          }
      })
      };
  render() {
    const { displayPenerima, tasks, tasksLoading, selectedOption, isi, search } = this.state;
    const orderedTasks = orderBy(
      tasks.filter(
        (ls) => {
          return ls.isi.indexOf(this.state.search)!==-1;
        }
      ),
      ['time_notif'],['desc']
    );
    const deleteRender =
      (val, row) =>
        <a href={'https://www.google.com/maps?q='}>
          Google Maps
        </a>
        ;
    const tableColumns = [
      { title: 'No', prop: 'no' },
      { title: 'Penerima', prop: 'penerima' },
      { title: 'Isi', prop: 'isi' },
      { title: 'Tanggal', prop: 'tanggal', defaultContent: '<no phone>' },
      { title: 'aksi', render: deleteRender, className: 'text-center' },
    ];
    let data= [];
    {orderedTasks.map(task => (
      data.push({ no: task.no, penerima: task.kd_penerima, isi: task.isi, tanggal: task.tanggal, aksi:deleteRender },)
    ))}
    console.log(data);
    var products = data;
  	const value = selectedOption && selectedOption.value;
    let taskList;
    if (tasksLoading) {
        taskList = <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
        <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
      </div>;
      }else if (tasks.length) {
          taskList = <div className='table-responsive'>
          <div className='col-md-4 right'>
            <input type='text' className='form-control' placeholder='cari data berdasarkan isi' value={search} onChange={this.handleFilter}/>
          </div>

          <table className="table" id='example'>
            <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Penerima</th>
                        <th scope="col">Isi</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
        {/*  {orderedTasks.map(task => (
            <ListPengumuman key={task.key} task={task} no={this.state.no}/>
          ))}*/}
          {orderedTasks.map(task=> (
                <ListPengumuman key={task.key} task={task} no={this.state.no}/>
            ))}
        </tbody>
        </table>
        </div>;
      }else{
        taskList = <div className="TaskList-empty">Tidak Ada Pengumuman</div>;
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
                                    <div className="input-group mb-3 col-md-6">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-id-card"></i></span>
                                        </div>
                                         <select className='form-control' required onChange={this.handleChangeJenis} value={this.state.jenis}>
                                            <option value=''>pilih jenis</option>
                                            <option value='umum'>Umum</option>
                                            <option value='pribadi'>Pribadi</option>
                                        </select>
                                    </div>
                                    <div className='form-group col-md-6' id={this.state.displayPenerima}>
                                      <TaskList/>

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
                            <h3 className="card-title">Daftar Pengumuman</h3>
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
export default Pengumuman;
