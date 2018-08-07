import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import ListPengumuman from "./page/Pengumuman/listPengumuman";
import { rootRef, timeRef, RefWarga, RefPengumuman, RefRT, RefHapus } from '../../db';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
import orderBy from 'lodash/orderBy';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Pengumuman extends Component {

    constructor(props) {
        super(props);
        this.state = { idrw:'', no: '', search: '', tasks: [],id_pengumuman: '', type: 'rw', id_pembuat: '',
         isi:'', jenis:'', id_penerima:'', displayPenerima:"hide",nikWarga:'',
          status:'Belum Diterima', today:'', tasksLoading:true, arraywarga:[]};
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
       
              RefWarga.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on("value", snap => {
                const dataWarga = [];
                snap.forEach(shot => {
                  dataWarga.push({ ...shot.val(), key: shot.key });
                })
                this.setState({dataWarga});
               // localStorage.setItem('fullWarga', dataWarga);
              })
           
          //console.log(localStorage.getItem("nik"));
        
          rootRef.child("Pengumuman").orderByChild("kd_pembuat").equalTo(localStorage.getItem("nik")).on('value', snap => {
            var no=1;
            snap.forEach(shot => {
              no++;
            });
            this.setState({no:no});
          });
          
        rootRef.child("Pengumuman").orderByChild("kd_pembuat").equalTo(localStorage.getItem("nik")).on('value', snap => {
          const tasks = [];
          var no=this.state.no-1;
          snap.forEach(shot => {
            tasks.push({ ...shot.val(), key: shot.key, no: no });
            no--;
          });
          this.setState({ tasks, tasksLoading: false });
        });

        rootRef.child("RW").on('value', snap => {
            const tasks2 = [];
            snap.forEach(shot => {
              tasks2.push({ ...shot.val(), key: shot.key });
              this.setState({idrw : shot.val().no});
            });
          });

          localStorage.setItem("xkodepengumumanRW", RandomKata.generate(10))
          RefHapus.orderByChild("tipe").equalTo('pengumumanRW').on('value', snap => {
            snap.forEach(shot => {
                if(shot.val().kodehapus === localStorage.getItem("xkodepengumumanRW")){
      
                }else{
                RefHapus.child(shot.key).remove();
                }           
            });
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
            RefWarga.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on('value', snap =>{
                const arraywarga = [];
                snap.forEach(shot => {
                 if(shot.val().nort === localStorage.getItem("idrt")){
                   
                            arraywarga.push({ ...shot.val(), key: shot.key, alamatku: shot.val().email });
                 }
                        
                })
                this.setState({arraywarga});
            })
        }else if(event.target.value === "warga"){
            this.setState({displayPenerima:"hide"});
        }else if(event.target.value === "rt"){
            this.setState({displayPenerima:"hide"});
        }
      };
      handlePenerima = event => {
        this.setState({id_penerima: event.target.value});
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ id_pengumuman: '', type: '', id_pembuat: '', isi:'', jenis:'', id_penerima:'', displayPenerima:"hide" });
      }

      handleFilter = event => {
        this.setState({ search: event.target.value });
      };
      notify(type){
        return () => {
            let today =new Date();

            // localStorage.setItem("nik", "3811080512990002");
            // localStorage.setItem("nama", "Abiyu Candra");
        // var days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
        // var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if(this.state.jenis === ""){
            toast.warn('Pilih Jenis Pengumuman', {
                position: toast.POSITION.TOP_RIGHT,
              });
        }else if(this.state.isi === ""){
            toast.warn('Masukkan Isi Pengumuman', {
                position: toast.POSITION.TOP_RIGHT,
              });
        }else{
            localStorage.setItem("isi", this.state.isi);
            localStorage.setItem("jenis", this.state.jenis);
            localStorage.setItem("kd_penerima", this.state.id_penerima)
            if(this.state.jenis === "warga"){

                    //   alert(localStorage.getItem("koderw"))
                    RefWarga.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on("value", snap => {
                    snap.forEach(shot => {
                      
                        var htg = {
                            nama_pengirim:localStorage.getItem("nama"),
                            id_pengumuman: RandomKata.generate(10),
                            kd_pembuat:localStorage.getItem("nik"),
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
                          if(shot.val().nort === localStorage.getItem("idrt")){
                          if(shot.val().nik === localStorage.getItem("nik")){

                        }else{
                            rootRef.child('Notifikasi').push(notif);
                        }
                  rootRef.child('Pengumuman').push(htg);
                      }
                  var bool = 1;
                   if (bool) {
                        this.setState({ id_pengumuman: '', type: '', id_pembuat: '', isi:'', jenis:'', id_penerima:'' });
                        //localStorage.setItem("DataRW", "");

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
            
            }else if(this.state.jenis === "rt"){
                // alert()
                // RefKK.orderByChild("idrw").equalTo(localStorage.getItem("koderw")).on('value', snap => {
                //     snap.forEach(shot => {
                      RefRT.orderByChild("norw").equalTo(localStorage.getItem("koderw")).on("value", snap => {
                      snap.forEach(shot => {
                        // alert(localStorage.getItem("koderw"))
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
                    //console.log(htg);
                    rootRef.child('Pengumuman').push(htg);
                    rootRef.child('Notifikasi').push(notif);
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
                  // });
                  toast.success('Data Berhasil Di Simpan', {
                          position: toast.POSITION.TOP_RIGHT,
                        });
                  localStorage.setItem("isi", this.state.isi);
                  localStorage.setItem("jenis", this.state.jenis);
              // })

            }else{
                // RefKK.orderByChild("idrw").equalTo(localStorage.getItem("koderw")).on("value", snap => {
                //     snap.forEach(shot => {
                // RefWarga.orderByChild("no_kk").equalTo(shot.val().nokk).on("value", snap => {
                //     snap.forEach(shot => {
                    if(this.state.nikWarga === ""){
                        toast.warn('Pilih Penerima', {
                            position: toast.POSITION.TOP_RIGHT,
                          });
                    }else{

                    
                var htg = {
                    nama_pengirim:localStorage.getItem("nama"),
                    id_pengumuman: RandomKata.generate(10),
                    kd_pembuat:localStorage.getItem("nik"),
                    kd_penerima: this.state.nikWarga,
                    isi: localStorage.getItem("isi"),
                    jenis: localStorage.getItem("jenis"),
                    time_notif:timeRef,
                    tanggal:today.getDate()+"-"+ (today.getMonth()+1) +"-"+today.getFullYear()
                  };
                  var notif= {
                    nama_pengirim:localStorage.getItem("nama"),
                    nik_penerima: this.state.nikWarga,
                    nik_pengirim:localStorage.getItem("nik"),
                    teks:localStorage.getItem("isi"),
                    time_notif:timeRef,
                    tipe:"biru"
                  }
                //   console.log(htg);
                //   console.log(notif);
                //   localStorage.setItem("kd_penerima", "");
                  rootRef.child('Pengumuman').push(htg);
                  rootRef.child('Notifikasi').push(notif);
                  if (htg.jenis !=='' && htg.kd_pembuat!=='') {
                    this.setState({ id_pengumuman: '', type: '', kd_pembuat: '', isi:'', jenis:'', kd_penerima:'' , displayPenerima:"hide"});
                    //localStorage.setItem("DataRW", "");
                    toast.success('Data Berhasil Di Simpan', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }else{
                    toast.warn('Form Masih ada yang kosong', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }
            };
        // });
        //         });
        //     });
        // };
              // console.log(htg);
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
    
    
      deletePengumuman= () => {
        //console.log("terrrrrr")
        RefHapus.orderByChild("kodehapus").equalTo(localStorage.getItem("xkodepengumumanRW")).on('value', snap => {
          snap.forEach(shot => {
              RefPengumuman.child(shot.val().kode).remove();
              RefHapus.child(shot.key).remove();
                     
          });
      });
      toast.success('Data Berhasil Di Hapus', {
        position: toast.POSITION.TOP_RIGHT,
    });
    localStorage.setItem("xkodepengumumanRW", RandomKata.generate(10))
    this.toggle2();
  }
  handleChangePilihan = event => {
    this.setState({
      nikWarga: event.value
    })
  }
  render() {
    const { displayPenerima,  tasks, tasksLoading, search, arraywarga } = this.state;
    const options = [];
        arraywarga.map( task =>{
            options.push({value:task.nik , label:task.nama+"("+task.alamatku+"/"+task.tipewarga+")"})

        })
    const orderedTasks = orderBy(
        tasks.filter(
          (ls) => {
            return ls.jenis.indexOf(this.state.search)!==-1 || ls.tanggal.indexOf(this.state.search)!==-1 || ls.isi.indexOf(this.state.search)!==-1;
        }
        ),
        ['time_notif'],['desc']
    );
    // console.log(tasks.length)
    let tampil;
    if (tasksLoading) {
        tampil = ( <div className="overlay" style={{marginTop: 7 + 'em', marginLeft: -2 + 'em'}} >
        <i className="fa fa-refresh fa-spin fa-lg" style={{color: '#3cc1c7', fontSize: 3 +'em'}}></i>
    </div>);
      } else if (tasks.length) {
        tampil = (
            orderedTasks.map(task => (
                <ListPengumuman key={task.key} task={task} no={this.state.no}/>
            ))
        )
      }
      else {
      tampil = ( <div className="TaskList-empty">Tidak Ada Data Pengumuman</div>);
      }
    return (
        <div className="wrapper">
          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2"style={{marginTop: 1 + 'em'}}>
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
                    <div className="card card-info"style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Kirim Pengumuman</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                        <label>Pilih Tujuan Pengumuman</label>
                                            <select className='form-control' required onChange={this.handleChangeJenis} value={this.state.jenis} style={{height: 3 + 'em'}}>
                                                <option value=''>pilih jenis</option>
                                                <option value='warga'>Warga</option>
                                                <option value='pribadi'>Pribadi</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    
                                        <div className="form-group col-md-12" id={displayPenerima}>
                                        <label>Pilih Penerima</label>
                                        <Select className="form-control" name="form-field-name" placeholder="Pilih Warga"
                                    value={this.state.nikWarga}
                                    multi={this.state.multi}
                                    onChange={this.handleChangePilihan}
                                    onSelect={ this.handleSelect }
                                    options = { options }
                                    />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-12 col-md-12">
                                        <label>Isi Pengumuman</label>
                                            <textarea rows='5' placeholder='masukkan isi Pengumuman' className='form-control' required onChange={this.handleChangeIsi} value={this.state.isi}></textarea>
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
                            <h3 className="card-title">Daftar Pengumuman Wargaku</h3>
                        </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <button className="btn btn-danger" onClick={this.toggle2}><i className="fa fa-trash"></i> Hapus Data Terpilih</button>
                                    </div>
                                    <div className="col-md-4">
                                    </div>
                                    <div className='col-md-4 right'>
                                        <input type='text' className='form-control' placeholder='Masukkan Keyword' value={search} onChange={this.handleFilter}/>
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
                                        autoClose={2000}
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
