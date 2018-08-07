import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import Daftarrw from "./page/DataRW/selectrw/daftarrw";
import DaftarKK from "./page/DataKK/daftarkk";
import Daftarrt from "./page/DataRT/selectrt/daftarrt";
import { RefWarga, rootRef, RefKK } from '../../db';
import { Action } from "../../Action";
import RandomKata from 'randomstring';
import { ToastContainer, toast } from 'react-toastify';
class KK extends Component {

    constructor(props) {
        super(props);
        this.state = { nokk: '', jml: '', cek: true, alamat:'', htgkk:0, display:'hide', idrt:localStorage.getItem('idrt'), idrw:localStorage.getItem("koderw"), step:1, pesan:''};

      }

      handleChangeNo = event => {
        this.setState({ nokk: event.target.value });
        let hitung = 0;
        RefKK.orderByChild("nokk").equalTo(event.target.value).on('value', snap => {
          const tasks = [];
          snap.forEach(shot => {
            hitung++;
            tasks.push({ ...shot.val(), key: shot.key });

          });
          this.setState({  htgkk: hitung});
        });
      };
      handleChangeRW = event => {
        this.setState({idrw:event.target.value});
      }
      handleChangeRT = event => {
        this.setState({idrt:event.target.value});
      }
      handleChangeJml = event => {
        this.setState({ jml: event.target.value });
      };
      handleChangeAlamat = event =>{
        this.setState({ alamat: event.target.value });
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ nokk: '', jml: '' });
      }
      step(){
        if(this.state.step === 1){
          if(this.state.nokk.length && this.state.alamat.length){
            this.setState({step:2});
            console.log("step 1 berjalan");
          }else{
            this.setState({pesan:'silahkan isi form dengan lengkap'});
          }
        }
      }
      notify(type){
        return () => {
            const htg = {
                kd_kk:RandomKata.generate(10),
                nokk: this.state.nokk.trim(),
                jml: this.state.jml.trim(),
                idrt: localStorage.getItem("idrt"),
                idrw: localStorage.getItem("koderw"),
                alamat:this.state.alamat.trim(),
              };
              Action("addKK", htg).then ((result) => {
                    if(result!=''){
                        console.log("success");
                    }else{
                        console.log("errors");
                    }
                })
                if(this.state.htgkk >= 1){
                  toast.warn('NO KK anda masukkan sudah di pakai!!!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                  // console.log("tidak aman");
                }else{
                  if (htg.nokk.length && htg.jml.length) {
                      rootRef.child('KK').push(htg);
                      this.setState({nokk: '', jml: '' });
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
  render() {
    const {step, pesan}  = this.state;
    let button, langkah, msg;
    if(pesan === ''){
      msg = (
        <div></div>
      )
    }else{
      msg = (
        <div className='alert alert-warning'>{pesan}</div>
      )
    }
    if(step ===3){
      langkah = (
        <div className={"row "}>
            <div className="col-md-6">
                <div className="form-group mb-3 col-md-12">
                <label>No KK</label>
                <input type="number"
                onChange={this.handleChangeNo}
                value={this.state.nokk}
                className="form-control" placeholder="Masukkan No KK" min="1"/>
                </div>
            </div>
                <div className="col-md-6">
                    <div className="form-group mb-3 col-md-12">
                    <label>Jumlah Keluarga</label>

                    <input type="number"
                    onChange={this.handleChangeJml}
                    value={this.state.jml}
                    className="form-control" placeholder="Jumlah Keluarga" min="1"/>
                </div>
            </div>
              <div className="col-md-12">
                  <div className="form-group mb-3 col-md-12">
                  <label>Alamat</label>
                  <textarea className='form-control' onChange={this.handleChangeAlamat}>{this.state.alamat}</textarea>
              </div>
            </div>
        </div>
      )
        button = (
          <div>
          <button type="submit" className="btn btn-primary" onClick={(e) =>this.step()}>Simpan</button>
          <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
          </div>
        )
    }else if(step === 2){
      langkah = (
        <div className={"row "}>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Nama warga</label>
                <input type="number"
                onChange={this.handleChangeNo}
                value={this.state.nokk}
                className="form-control" placeholder="Masukkan No KK" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Nik</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Pekerjaan</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>=
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Tempat Lahir</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Tanggal Lahir</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Status di Keluarga</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Kepala Keluarga</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Jenis Kelamin</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>No Hp</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
              <label>Email</label>
              <input type="number"
              onChange={this.handleChangeJml}
              value={this.state.jml}
              className="form-control" placeholder="Jumlah Keluarga" min="1"/>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Password</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>No Wa</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Nama/Link Facebook</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Nama/Link Instagram</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-6">
              <div className="form-group mb-3 col-md-12">
                <label>Nama/Link Twitter</label>
                <input type="number"
                onChange={this.handleChangeJml}
                value={this.state.jml}
                className="form-control" placeholder="Jumlah Keluarga" min="1"/>
              </div>
          </div>
          <div className="col-md-12">
              <div className="form-group mb-3 col-md-12">
                <label>Alamat</label>
                <textarea className='form-control' onChange={this.handleChangeAlamat}>{this.state.alamat}</textarea>
              </div>
          </div>
          <div className="col-md-12">
              <div className="form-group mb-3 col-md-12">
                  <label>Alamat</label>
                  <textarea className='form-control' onChange={this.handleChangeAlamat}>{this.state.alamat}</textarea>
              </div>
          </div>
        </div>
    </div>
      )
      button = (
        <div>Silahkan isi form diatas</div>
      )
    }else{
      button = (
        <div>Silahkan isi form diatas</div>
      )
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
                    <h1>Data KK</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/Admin/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/Admin/Warga">Warga</a></li>
                    <li className="breadcrumb-item active">Data KK</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Tambah KK Baru</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3 col-md-12">
                                        <label>No RT</label>

                                        <input type="number"
                                        onChange={this.handleChangeRT}
                                        value={this.state.idrt}
                                        className="form-control" placeholder="Masukkan No KK" min="1"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3 col-md-12">
                                        <label>No RW</label>

                                        <input type="number"
                                        onChange={this.handleChangeRW}
                                        value={this.state.idrw}
                                        className="form-control" placeholder="Masukkan No KK" min="1"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3 col-md-12">
                                        <label>No KK</label>

                                        <input type="number"
                                        onChange={this.handleChangeNo}
                                        value={this.state.nokk}
                                        className="form-control" placeholder="Masukkan No KK" min="1"/>
                                        </div>
                                    </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3 col-md-12">
                                            <label>Jumlah Keluarga</label>

                                            <input type="number"
                                            onChange={this.handleChangeJml}
                                            value={this.state.jml}
                                            className="form-control" placeholder="Jumlah Keluarga" min="1"/>
                                        </div>
                                    </div>
                                      <div className="col-md-12">
                                          <div className="form-group mb-3 col-md-12">
                                          <label>Alamat</label>
                                          <textarea className='form-control' value={this.state.alamat} onChange={this.handleChangeAlamat}>{this.state.alamat}</textarea>
                                      </div>
                                    </div>
                                </div>
                                {langkah}
                                <div>
                                  <button type="submit" className="btn btn-success pull-right" onClick={(e) =>this.step()}>selanjutnya</button>
                                </div>
                            </div>
                            <div className="card-footer col-12">
                                {/*<button type="submit" className="btn btn-primary" onClick={this.notify('success')}>Simpan</button>*/}
                                {button}
                            </div>
                        </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar KK Wargaku</h3>
                        </div>
                            <div className="card-body">
                                <DaftarKK/>
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

export default KK;
