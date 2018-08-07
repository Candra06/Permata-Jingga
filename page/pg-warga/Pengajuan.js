import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import ListPengajuan from "./page/DataPengajuan/daftarpengajuan";
import { rootRef, timeRef, RefKK, RefRT, RefRW, RefSurat } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
import Listoptions from "./page/DataPengajuan/options";
class RT extends Component {

    constructor(props) {
        super(props);
        this.state = { kebutuhan: '', jenis_kebutuhan: '',options:[], idpenerima:'', tmprw:'', idrt:'', idrw:'', tujuan: '', tgl_pengajuan:'', status: 'Pending', jmlku: 0 };

      }

      componentDidMount(){
        RefKK.orderByChild("nokk").equalTo(localStorage.getItem("no_kk")).on('value', snap => {
            const tasks = [];
            snap.forEach(shot => {
              tasks.push({ ...shot.val(), key: shot.key });
              this.setState({ idrt: shot.val().idrt, idrw: shot.val().idrw});
            });
            this.setState({ tasks});
          });

      }
      handleChangeKebutuhan = event => {
        this.setState({ kebutuhan: event.target.value });
      };

      handleChangeJenis = event => {
        this.setState({ jenis_kebutuhan: event.target.value });
      };

      handleChangeTujuan = event => {
       // console.log(this.state.idrt)
       //console.log(this.state.idrw)
        this.setState({ tujuan: event.target.value });
        //console.log(event.target.value)
        if(event.target.value  === "RT"){
            RefRT.orderByChild("no").equalTo(this.state.idrt).on('value', snap => {
                const tasks2 = [];
                snap.forEach(shot => {
                  tasks2.push({ ...shot.val(), key: shot.key });
                  if(this.state.idrw === shot.val().norw){
                    localStorage.setItem("terima", shot.val().nik);
                    RefSurat.orderByChild("kd_pembuat").equalTo(shot.val().nik).on('value', snap => {
                        const options = [];
                        snap.forEach(shot => {
                          //console.log(shot.val())
                          options.push({...shot.val(), key:shot.key})
                        });
                        this.setState({options})
                      });
                  }
                });
                this.setState({ tasks2});
              });

        }else if(event.target.value  === "RW"){
            RefRW.orderByChild("no").equalTo(this.state.idrw).on('value', snap => {
                const tasks3 = [];
                snap.forEach(shot => {
                  tasks3.push({ ...shot.val(), key: shot.key });

                  localStorage.setItem("terima", shot.val().nik);
                  RefSurat.orderByChild("kd_pembuat").equalTo(shot.val().nik).on('value', snap => {
                      const options = [];
                      snap.forEach(shot => {
                       // console.log(shot.val())
                        options.push({...shot.val(), key:shot.key})
                      });
                      this.setState({options})
                    });
                });
                //console.log(localStorage.getItem("terima"));
                this.setState({ tasks3});
              });
            //  console.log("idrw :"+this.state.idrw);
            //  console.log("RW :"+localStorage.getItem("terima"));
        }
      };
      handleReset = event => {
        event.preventDefault();
        this.setState({ kebutuhan: '', jenis_kebutuhan: '', tujuan: '', tgl_pengajuan:'', status: 'Pending' });
      }

      notify(type){
        return () => {
            let today = new Date();
            const htg = {
                kebutuhan: this.state.kebutuhan.trim(),
                idpenerima: localStorage.getItem("terima"),
                jenis_kebutuhan: this.state.jenis_kebutuhan.trim(),
                tujuan: this.state.tujuan.trim(),
                tgl_pengajuan: today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear(),
                ordertime: timeRef,
                status: this.state.status.trim(),
                pemohon: localStorage.getItem("nik")
              };
              let jenis = '';
              RefSurat.orderByChild("kd_surat").equalTo(htg.jenis_kebutuhan).on("value", snap => {
                snap.forEach(shot =>{
                  jenis = shot.val().jenis_surat;
                  // localStorage.setItem("jenis", shot.val().jenis_surat);
                })
              })
              const notif = {
                nik_penerima: localStorage.getItem("terima"),
                nama_pengirim : localStorage.getItem("nama"),
                nik_pengirim: localStorage.getItem("nik"),
                teks: localStorage.getItem("nama")+ " Membuat pengajuan "+ jenis +" pada tanggal ("+ htg.tgl_pengajuan +")" ,
                tipe: "biru",
                time_notif: timeRef
              };
              const notif2 = {
                nik_penerima: localStorage.getItem("nik"),
                nik_pengirim: localStorage.getItem("nik"),
                teks: " Membuat Pengajuan "+ htg.jenis_kebutuhan +" Kepada Ketua "+ htg.tujuan ,
                tipe: "teal",
                time_notif: timeRef
              };
              if (htg.kebutuhan.length && htg.jenis_kebutuhan.length && htg.tujuan.length) {
                rootRef.child('Pengajuan').push(htg);
                rootRef.child('Notifikasi').push(notif2);
                rootRef.child('Notifikasi').push(notif);
                this.setState({ kebutuhan: '', jenis_kebutuhan: '', tujuan: '', tgl_pengajuan:'', status: 'Pending', idpenerima:'' });
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
              });
                }else{
                    toast.warn('Form Masih ada yang kosong', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                }
        };
      };
  render() {
    const {options} = this.state;
    let daftarJenis;
    //console.log(options);

    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                <div className="col-sm-6">
                    <h1>Pengajuan</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Pengajuan</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Buat Pengajuan Baru</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <label>Tujuan Pengajuan</label>
                                        <select className="form-control" style={{height: 3 + 'em'}} value={this.state.tujuan} onChange={this.handleChangeTujuan}>
                                            <option value="">Tujuan Pengajuan</option>
                                            <option value="RT">RT</option>
                                            <option value="RW">RW</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <label>Jenis Kebutuhan </label>
                                        <select className="form-control" style={{height: 3 + 'em'}} value={this.state.jenis_kebutuhan} onChange={this.handleChangeJenis}>
                                            <option value="">Jenis Kebutuhan </option>
                                            {options.map(task => (
                                              <Listoptions task={task} key={task.key}/>
                                            ))}

                                        </select>
                                    </div>
                                    <div className="form-group col-sm-12">
                                        <label>Kebutuhan</label>

                                        <textarea className="form-control" onChange={this.handleChangeKebutuhan}
                                        value={this.state.kebutuhan} rows="3" placeholder="Masukkan Kebutuhan"></textarea>

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
                            <h3 className="card-title">Daftar Pengajuan Anda</h3>
                        </div>
                            <div className="card-body">
                            <ListPengajuan/>
                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={3000}
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
