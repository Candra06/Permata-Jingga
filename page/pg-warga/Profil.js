import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";   
import { RefUser, rootRef } from './../../db';
import { ToastContainer, toast } from 'react-toastify';
class Profil extends Component {
  
  state = ({ niklogin : '', email: '', tempemail : '', pwlama:'', kunci: '', passwordlama:'', passwordbaru:'', konfirmasipasswordbaru:'', htgemail : 0})
  
  componentDidMount() {
    RefUser.orderByChild("nik").equalTo(localStorage.getItem("nik")).on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        tasks.push({ ...shot.val(), key: shot.key });
        this.setState({ email: shot.val().email, tempemail: shot.val().email,  pwlama: shot.val().password, kunci: shot.key});
      });
      this.setState({ tasks});
    });
  }
  handleChangeEmail = event => {
    this.setState({ email: event.target.value, htgemail: 0 });
    let hitung = 0;
    RefUser.orderByChild("email").equalTo(event.target.value).on('value', snap => {
      const tasks = [];
      snap.forEach(shot => {
        hitung++;
        tasks.push({ ...shot.val(), key: shot.key });
        
      });
      this.setState({ tasks, htgemail: hitung});
    });
  };

  handleChangePasswordLama = event => {
    this.setState({ passwordlama: event.target.value });
  };

  handleChangePasswordBaru = event => {
    this.setState({ passwordbaru: event.target.value });
  };
  handleChangeKonfirmasiPasswordBaru = event => {
    this.setState({ konfirmasipasswordbaru: event.target.value });
  };
  handlereset = event => {
    event.preventDefault();
    this.setState({ konfirmasipasswordbaru: '', passwordlama: '', passwordbaru: '' });
  };


  notify(){
    return () => {
        const htg = {
            email: this.state.email.trim(),
            passwordbaru: this.state.passwordbaru.trim()
          };
          if (this.state.passwordlama === this.state.pwlama) {
            if(this.state.htgemail >= 1 && this.state.email !== this.state.tempemail){

              toast.warn('Email anda masukkan sudah di pakai!!!', {
                position: toast.POSITION.TOP_RIGHT,
              });
            }else{
            if(htg.passwordbaru.length && htg.email.length){
              if (this.state.passwordbaru === this.state.konfirmasipasswordbaru) {
                rootRef.child('User').child(this.state.kunci).update({ email: this.state.email, password: this.state.passwordbaru });
                this.setState({ passwordlama : '', passwordbaru : '', konfirmasipasswordbaru : ''});
                toast.success('Email dan password berhasil di ganti', {
                position: toast.POSITION.TOP_RIGHT,
              });
              }else{
                toast.warn('Konfirmasi password salah!!!', {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }
            }
            else if(htg.email.length){
              if(htg.email.length){
                rootRef.child('User').child(this.state.kunci).update({ email: this.state.email});
                this.setState({ passwordlama : ''});
                toast.success('Email berhasil di ganti', {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }
                else{
                  toast.warn('Email tidak boleh kosong!!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }
            }else if(htg.passwordbaru.length){
              if (this.state.passwordbaru === this.state.konfirmasipasswordbaru) {
                rootRef.child('User').child(this.state.kunci).update({ password: this.state.passwordbaru});
                this.setState({ passwordlama : '', passwordbaru : '', konfirmasipasswordbaru : ''});
                toast.success('Password berhasil di ganti', {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }else{
                toast.warn('Konfirmasi password salah!!!', {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }
            }
              
              }
            }
            else{
              toast.warn('Password Lama Salah', {
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
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="m-0 text-dark">Pengaturan Akun</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="">Home</a></li>
                      <li className="breadcrumb-item active">Pengaturan Akun</li>
                    </ol>
                  </div>
                </div>
              </div>
              
            </div>
            
            <section className="content">
              <div className="container-fluid">

                <div className="row">
                  <section className="col-lg-12 connectedSortable">
                    <div className="card">
                      <div className="card-header p-2">
                        <ul className="nav nav-pills">
                          <li className="nav-item"><a className="nav-link">Detail Akun Anda</a></li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="form-horizontal">
                          <div className="form-group">
                            <label className="col-sm-2 control-label">Email</label>

                            <div className="col-sm-10">
                              <input type="email" value={this.state.email} onChange={this.handleChangeEmail} className="form-control" placeholder="Email" required="required"/>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">Password Lama</label>

                            <div className="col-sm-10">
                              <input type="password" value={this.state.passwordlama} onChange={this.handleChangePasswordLama} className="form-control" placeholder="Password Lama"/>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">Password Baru</label>

                            <div className="col-sm-10">
                              <input type="password" value={this.state.passwordbaru} onChange={this.handleChangePasswordBaru} className="form-control" placeholder="Kosongkan jika tidak ingin di ganti"/>
                            </div>
                          </div>
                          <div className="form-group">
                            <label  className="col-sm-3 control-label">Konfirmasi Password Baru</label>

                            <div className="col-sm-10">
                              <input type="password" value={this.state.konfirmasipasswordbaru} onChange={this.handleChangeKonfirmasiPasswordBaru} className="form-control" placeholder="Kosongkan jika tidak ingin di ganti"/>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                              <button type="submit" className="btn btn-primary" onClick={this.notify()}>Update</button>
                              <span> </span>
                              <button type="reset" className="btn btn-danger" onClick={this.handlereset}>Reset</button>
                            </div>
                          </div>
                      </div>
                      <div>
                                    <ToastContainer 
                                        hideProgressBar={false}
                                        newestOnTop={true}
                                        autoClose={3000}
                                    />
                                </div>                         
                    </div>
                    </div>
              </section>
                    </div>
                    </div>
                    </section>
                    </div>
                    
          <Footer/>
        
        </div>
    );
  }
}
 
export default Profil;