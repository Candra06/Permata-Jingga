import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import ListPengumuman from "./page/Pengumuman/listPengumuman";
import { rootRef, RefKK, timeRef, RefWarga, RefPengumuman, RefRW, RefRT, RefHapus } from '../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
import orderBy from 'lodash/orderBy';
import TaskList from './page/DataRT/daftarWarga';
class Pengumuman extends Component {

    constructor(props) {
        super(props);
        this.state = { idrt:'', search:'',tasks: [],id_pengumuman: '', type: 'admin', id_pembuat: '', isi:'', jenis:'', id_penerima:'', displayPenerima:"hide ", status:'Belum Diterima', today:'', tasksLoading:true, modal: false, modal2: false};
        localStorage.setItem("DataRW", "");
            let today =new Date();

  this.toggle = this.toggle.bind(this);

  this.toggle2 = this.toggle2.bind(this);
}

toggle2() {
    this.setState({
      modal2: !this.state.modal2
    });
}
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
      componentWillMount() {

        rootRef.child("Pengumuman").on('value', snap => {
          const tasks = [];
          let no = 0;
          snap.forEach(shot => {

              no++;
            tasks.push({ ...shot.val(), key: shot.key, nomer:no });
            console.log(shot.val())
          });
         // console.log(tasks);
          this.setState({ tasks, tasksLoading: false });
        });

        localStorage.setItem("xkodepengumuman", RandomKata.generate(10))
        RefHapus.orderByChild("tipe").equalTo('pengumuman').on('value', snap => {
          snap.forEach(shot => {
              if(shot.val().kodehapus === localStorage.getItem("xkodepengumuman")){

              }else{
              RefHapus.child(shot.key).remove();
              }
          });
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
        if(event.target.value === "pribadi"){

            console.log("pribadi");
            this.setState({displayPenerima:"block"});
        }else{
            console.log("warga");
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
            // localStorage.setItem("nik", "3811080512990002");
            // localStorage.setItem("nama", "Abiyu Candra");
        // var days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
        // var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            localStorage.setItem("isi", this.state.isi);
            localStorage.setItem("jenis", this.state.jenis);
            if(this.state.jenis === "warga"){

                RefKK.on('value', snap => {
                  snap.forEach(shot => {

                    var htg = {
                    nama_pengirim:'Admin',
                    id_pengumuman: RandomKata.generate(10),
                    kd_pembuat:'Admin',
                    kd_penerima:shot.val().nokk,
                    isi: localStorage.getItem("isi"),
                    jenis: localStorage.getItem("jenis"),
                    time_notif:timeRef,
                    tanggal:today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()
                  };
                  RefWarga.orderByChild("no_kk").equalTo(shot.val().nokk).on('value', snap => {
                    snap.forEach(shott => {
                       // console.log(shott.val())
                  var notif= {
                    nama_pengirim:"Admin",
                    nik_penerima:shott.val().nik,
                    nik_pengirim:'Admin',
                    teks:localStorage.getItem("isi"),
                    time_notif:timeRef,
                    tipe:"biru"
                  }
                  //console.log(notif)
                  rootRef.child('Notifikasi').push(notif);

                    })
                })

                  rootRef.child('Pengumuman').push(htg);
                  var bool = 1;
                   if (bool) {
                        this.setState({ id_pengumuman: '', type: '', id_pembuat: '', isi:'', jenis:'', id_penerima:'' });
                        localStorage.setItem("DataRW", "");

                    }else{
                        toast.warn('Form Masih ada yang kosong', {
                            position: toast.POSITION.TOP_RIGHT,
                          });
                    }
                  });

                });
                toast.success('Data Berhasil Di Simpan', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                localStorage.setItem("isi", this.state.isi);
                localStorage.setItem("jenis", this.state.jenis);
            }else if(this.state.jenis === "RW"){
                RefRW.on('value', snap => {
                  snap.forEach(shot => {
                     // console.log(shott.val())
              var htg = {
                  nama_pengirim:'Admin',
                  id_pengumuman: RandomKata.generate(10),
                  kd_pembuat:'Admin',
                  kd_penerima:shot.val().nik,
                  isi: localStorage.getItem("isi"),
                  jenis: localStorage.getItem("jenis"),
                  time_notif:timeRef,
                  tanggal:today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()
                };
                var notif= {
                  nama_pengirim:"Admin",
                  nik_penerima:shot.val().nik,
                  nik_pengirim:'Admin',
                  teks:localStorage.getItem("isi"),
                  time_notif:timeRef,
                  tipe:"biru"
                }
                //console.log(notif)
                rootRef.child('Notifikasi').push(notif);
                rootRef.child('Pengumuman').push(htg);

                  })
              })
              this.setState({isi:'', jenis:''})
              toast.success('Data Berhasil Di Simpan', {
                  position: toast.POSITION.TOP_RIGHT,
                });
          }else if(this.state.jenis === "RT"){
            RefRT.on('value', snap => {
              snap.forEach(shot => {
                 // console.log(shott.val())
          var htg = {
              nama_pengirim:'Admin',
              id_pengumuman: RandomKata.generate(10),
              kd_pembuat:'Admin',
              kd_penerima:shot.val().nik,
              isi: localStorage.getItem("isi"),
              jenis: localStorage.getItem("jenis"),
              time_notif:timeRef,
              tanggal:today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()
            };
            var notif= {
              nama_pengirim:"Admin",
              nik_penerima:shot.val().nik,
              nik_pengirim:'Admin',
              teks:localStorage.getItem("isi"),
              time_notif:timeRef,
              tipe:"biru"
            }
            //console.log(notif)
            rootRef.child('Notifikasi').push(notif);
            rootRef.child('Pengumuman').push(htg);

              })
          })
          this.setState({isi:'', jenis:''})
          toast.success('Data Berhasil Di Simpan', {
              position: toast.POSITION.TOP_RIGHT,
            });
      }

            else{
                var htg = {
                    nama_pengirim:'Admin',
                    id_pengumuman: RandomKata.generate(10),
                    kd_pembuat:'Admin',
                    kd_penerima:localStorage.getItem("NikPenerima").trim(),
                    isi: localStorage.getItem("isi"),
                    jenis: localStorage.getItem("jenis"),
                    time_notif:timeRef,
                    tanggal:today.getDay()+"-"+ today.getMonth() +"-"+today.getFullYear()
                  };
                  var notif= {
                    nama_pengirim:"Admin",
                    nik_penerima:localStorage.getItem("NikPenerima").trim(),
                    nik_pengirim:'Admin',
                    teks:localStorage.getItem("isi"),
                    time_notif:timeRef,
                    tipe:"biru"
                  }

                  rootRef.child('Notifikasi').push(notif);
                  rootRef.child('Pengumuman').push(htg);
                  if (htg.jenis!=='' && htg.kd_pembuat!=='') {
                    this.setState({ id_pengumuman: '',displayPenerima:"hide ", type: '', id_pembuat: '', isi:'', jenis:'', id_penerima:'' });
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

        };
      };


  deleteTask() {
    RefPengumuman.on('value', snap => {
      snap.forEach(shot => {
        RefPengumuman.child(shot.key).remove();
      });
    });

    toast.success('Data Berhasil Di Hapus', {
        position: toast.POSITION.TOP_RIGHT,
    });
    this.toggle();
  };
  handleFilter = event => {
    this.setState({ search: event.target.value });
  };
  deletePengumuman(){
    //console.log("terrrrrr")
    RefHapus.orderByChild("kodehapus").equalTo(localStorage.getItem("xkodepengumuman")).on('value', snap => {
      snap.forEach(shot => {
          RefPengumuman.child(shot.val().kode).remove();
          RefHapus.child(shot.key).remove();

      });
  });
  toast.success('Data Berhasil Di Hapus', {
    position: toast.POSITION.TOP_RIGHT,
});
localStorage.setItem("xkodepengumuman", RandomKata.generate(10))
this.toggle2();
//window.location.reload();
  }


  render() {
    const { displayPenerima, tasks, tasksLoading } = this.state;
    const orderedTasks = orderBy(
      tasks.filter(
        (ls) => {
          return ls.nama_pengirim.indexOf(this.state.search)!==-1|| ls.jenis.indexOf(this.state.search)!==-1 || ls.tanggal.indexOf(this.state.search)!==-1 || ls.isi.indexOf(this.state.search)!==-1;
        }
      ),
    );
    let tampil, pilihan;

    if(displayPenerima === "block"){
        pilihan = (
            <div className="form-group col-md-12">
             <label>Pilih Penerima <sup>*</sup></label>
                <TaskList/>
            </div>
        )
    }else if(displayPenerima === "hide"){

    }

    if (tasksLoading) {
        tampil = ( <div className="overlay" style={{marginTop: 10 + 'em', marginLeft: -2 + 'em'}} >
        <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>);
      } else if (tasks.length) {
        tampil = (
            orderedTasks.map(task => (
                <ListPengumuman key={task.key} task={task}/>
            ))
        )
      }else {
      tampil = ( <div className="TaskList-empty">Tidak Ada Data Pengumuman</div>);
      }
    return (
        <div className="wrapper">
          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2"style={{marginTop: -1 + 'em'}}>
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
                    <div className="card card-info"style={{marginTop: -1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Pengumuman</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                        <label>Jenis Pengumuman</label>
                                            <select className='form-control' required onChange={this.handleChangeJenis} value={this.state.jenis} style={{height: 3 + 'em'}}>
                                                <option value=''>pilih jenis</option>
                                                <option value='warga'>Warga</option>
                                                <option value='RW'>RW</option>
                                                <option value='RT'>RT</option>
                                                <option value='pribadi'>Pribadi</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        {pilihan}
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-12 col-12">
                                        <label>Isi Pengumuman</label>
                                            <textarea rows='5' placeholder='masukkan isi Pengumuman' className='form-control' onChange={this.handleChangeIsi} value={this.state.isi}></textarea>
                                        </div>
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
                            <div className="card-tools">
                              <button type="button" className="btn btn-tool" data-widget="collapse">
                                <i className="fa fa-minus"></i>
                              </button>
                              <button type="button" className="btn btn-danger" onClick={this.toggle} title="Menghapus Semua Pengumuman">
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                        </div>
                            <div className="card-body">
                                <div className="row col-md-12">
                                    <div className="col-md-4">
                                    <button className="btn btn-danger" onClick={this.toggle2}><i className="fa fa-trash"></i> Hapus Data Terpilih</button>
                                    </div>
                                    <div className="col-md-4">
                                    </div>
                                    <div className='col-md-4 float-right'>
                                        <input type='text' className='form-control' placeholder='Masukkan Keyword' value={this.state.search} onChange={this.handleFilter}/>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                                <tr>
                                                    <th scope="col"><i className="fa fa-check"></i></th>
                                                    <th scope="col">No</th>
                                                    <th scope="col">Pengirim</th>
                                                    <th scope="col">Penerima</th>
                                                    <th scope="col">Isi</th>
                                                    <th scope="col">Jenis</th>
                                                    <th scope="col">Tanggal</th>
                                                    <th scope="col">Aksi</th>
                                                </tr>
                                            </thead>
                                        <tbody>
                                        {tampil}
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={3000}
                                    />

                                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader toggle={this.toggle}>Konfirmasi Penghapus Data</ModalHeader>
                                        <ModalBody>
                                            Semua Pengumuman akan di hapus oleh system!!
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.toggle}>Batal</Button>{' '}
                                            <Button color="danger" onClick={() => this.deleteTask()}>Konfirmasi</Button>
                                        </ModalFooter>
                                    </Modal>
                                    <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
                                        <ModalHeader toggle={this.toggle2}>Konfirmasi Penghapus Data</ModalHeader>
                                        <ModalBody>
                                            Data Pengumuman Yang Di Pilih Akan di Hapus!!!
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.toggle2}>Batal</Button>{' '}
                                            <Button color="danger" onClick={(e) => this.deletePengumuman()}>Konfirmasi</Button>
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

export default Pengumuman;
