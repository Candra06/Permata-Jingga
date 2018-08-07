import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import { RefDataKK } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
class PengaturanKK extends Component {

    constructor(props) {
        super(props);
        this.state = { kodepos: '', kuncidata:'', keca: '', kab: '', prov:'', alamat:'', lat:'123', longi:'321', htgdata:''};

      }

      componentWillMount(){
          let htg = 0;
        RefDataKK.on('value', snap => {
            const tasks = [];
            snap.forEach(shot => {
                htg++;
              tasks.push({ ...shot.val(), key: shot.key });
            });
            this.setState({ tasks, htgdata: htg });
            tasks.map(task => (
                this.setState({ kodepos: task.kodepos, keca: task.kecamatan, kab: task.kabupaten, prov: task.provinsi, alamat: task.alamat ,lat: task.latitude, longi: task.longitude, kuncidata: task.key})
              ))
          });
      }
      handleChangeKode = event => {
        this.setState({ kodepos: event.target.value });
      };

      handleChangekec = event => {
        this.setState({ keca: event.target.value });
      };
      handleChangeAlamat = event =>{
        this.setState({ alamat: event.target.value });
      }

      handleChangeKab = event => {
        this.setState({ kab: event.target.value });
      };

      handleChangelat = event => {
        this.setState({ lat: event.target.value });
      };
      handleChangelongi = event =>{
        this.setState({ longi: event.target.value });
      }
      handleChangeProv = event =>{
        this.setState({ prov: event.target.value });
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ kodepos: '', keca: '', kab: '', prov:'', alamat:'', lat:'', longi:'' });
      }

      notify(type){
        return () => {
            const htg = {
                kodepos:this.state.kodepos.trim(),
                alamat: this.state.alamat.trim(),
                kecamatan: this.state.keca.trim(),
                kabupaten:this.state.kab.trim(),
                provinsi:this.state.prov.trim(),
                latitude:this.state.lat.trim(),
                longitude:this.state.longi.trim(),
              };
              console.log(htg);
              //Action("addKK", htg).then ((result) => {
                //    console.log(result);
                  //  if(result!=''){
                    //    console.log("success");
                      //  console.log(result);
                    //}else{
                      //  console.log("errors");
                    //}
               // })
              if (htg.kodepos.length && htg.alamat.length && htg.kecamatan.length && htg.kabupaten.length && htg.provinsi.length) {
                if(this.state.htgdata >= 1){
                    
                RefDataKK.child(this.state.kuncidata).update({kodepos : this.state.kodepos,kecamatan : this.state.keca,kabupaten : this.state.kab,provinsi : this.state.prov, alamat : this.state.alamat,latitude : this.state.lat,longitude : this.state.longi});
                window.location.reload();

                }else{
                    
                RefDataKK.push(htg);
                }
                this.setState({ kodepos: '', keca: '', kab: '', prov:'', alamat:'', lat:'', longi:''  });
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
    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2" style={{marginTop: 1 + 'em'}}>
                <div className="col-sm-6">
                    <h1>Pengaturan Data KK</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/Admin/Home">Home</a></li>
                    <li className="breadcrumb-item Active"><a href="/Admin/PengaturanKK">Pengaturan KK</a></li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Pengaturan KK</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                            <label>Kode Pos</label>

                                            <input type="number"
                                            onChange={this.handleChangeKode}
                                            value={this.state.kodepos}
                                            className="form-control" placeholder="Masukkan Kode Pos" min="1"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                            <label>Kecamatan</label>

                                            <input type="text"
                                            onChange={this.handleChangekec}
                                            value={this.state.keca}
                                            className="form-control" placeholder="Masukkan Kecamatan"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                            <label>Kabupaten</label>

                                            <input type="text"
                                            onChange={this.handleChangeKab}
                                            value={this.state.kab}
                                            className="form-control" placeholder="Masukkan Kabupaten"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group col-md-12">
                                            <label>Provinsi</label>

                                            <input type="text"
                                            onChange={this.handleChangeProv}
                                            value={this.state.prov}
                                            className="form-control" placeholder="Masukkan Provinsi"/>
                                        </div>
                                    </div>
                                    {/* <div className="col-md-3">
                                        <div className="form-group col-md-12">
                                            <label>Latitude Map</label>

                                            <input type="text"
                                            onChange={this.handleChangelat}
                                            value={this.state.lat}
                                            className="form-control" placeholder="Masukkan Latitude"/>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group col-md-12">
                                            <label>Longitude Map</label>

                                            <input type="text"
                                            onChange={this.handleChangelongi}
                                            value={this.state.longi}
                                            className="form-control" placeholder="Masukkan Longitude"/>
                                        </div>
                                    </div> */}
                                    <div className="col-md-12">
                                    <div className="form-group mb-12 col-12">
                                        <label>Alamat</label>
                                        <textarea className='form-control' onChange={this.handleChangeAlamat} value={this.state.alamat}></textarea>
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
                        
                                <div>
                                    <ToastContainer
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={5000}
                                    />
                                </div>

                </div>
            </section>
            </div>

          <Footer/>
        </div>
    );
  }
}

export default PengaturanKK;
