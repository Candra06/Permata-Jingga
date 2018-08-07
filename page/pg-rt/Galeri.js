import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DaftarGaleri from "./page/Galeri/daftarGaleri";
import { RefUser, RefWarga, rootRef, upRefWarga } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
class Warga extends Component {

    constructor(props) {
        super(props);
        this.state = { 
        showalert: 'hide', 
        showalertnik: 'hide', 
        lihatbtn: '',
        teksalert:'',  
        tasksrt:[],   
        avatar: '',
        judul:'',
        no_rt:0,
        addwarga:false,
        isUploading: false,
        progress: 0,
        avatarURL: '' };
        
      }

      componentDidMount(){
        this.setState({norw:  localStorage.getItem("koderw"), nort:  localStorage.getItem("idrt")});
       
          localStorage.setItem("urlfotowarga", "");
          console.log(localStorage.getItem("idrt"))
      }

      tambahwarga = ()=>{
        this.setState({ addwarga: !this.state.addwarga})
    }
    
      
      handleUploadStart = () => this.setState({isUploading: true, progress: 0});
      handleProgress = (progress) => this.setState({progress});
      handleUploadError = (error) => {
      this.setState({isUploading: false});
      console.error(error);
      }
      handleUploadSuccess = (filename) => {
      this.setState({avatar: filename, progress: 100, isUploading: false});
      upRefWarga.child(filename).getDownloadURL().then(function(url) {
        localStorage.setItem("urlfotowarga", url);
      }).catch(function(error) {

      console.log(error);
      })
      };

      
      handleChangeJudul = event => {
        this.setState({ judul: event.target.value });
      };

      

      handleResetWarga = event => {
        event.preventDefault();
        this.setState({ judul: '' });
      }


      HandleTambahWarga(type){
        return () => {
                if(this.state.judul === ""){
                    toast.warn('Judul Harus diisi', {
                        position: toast.POSITION.TOP_RIGHT,
                      });
                    }else{
                        const htg = {
                            kd_foto: RandomKata.generate(10),
                            no_rt: parseInt(localStorage.getItem("idrt")),
                            judul: this.state.judul.trim(),
                            urlfoto:localStorage.getItem("urlfotowarga"),
                            filename: this.state.avatar,
                        }; 
                            rootRef.child('Galeri').push(htg);
                            this.setState({ judul: '',
                            lihatbtn: '',
                            progress:0, 
                            showalert: 'hide', 
                            showalertnik: 'hide', 
                            addwarga: false});
                            toast.success('Data Berhasil Di Simpan', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                            
                        }
        };
      };
  render() {
    
    const{showalert, teksalert, showalertnik } = this.state;
    let cekalert, lettambahwarga, letbtntambah;
    if(showalert === 'hide' && showalertnik === 'hide'){

    }else if(showalert === 'block'){
        cekalert = (
            <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 0.5 + 'em'}}>
          {teksalert}
        </div>
        )
    }else if(showalertnik === 'block'){
        cekalert = (
            <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 0.5 + 'em'}}>
              {teksalert}
            </div>
          )
    }
   
    if(this.state.addwarga){
        letbtntambah = (
          <div className="row col-md-12">
                      <button type="button" className="btn btn-danger float-left" onClick={this.tambahwarga}><i className="fa fa-minus"></i> Batal Menambahkan Foto</button>

          </div>
        )
      lettambahwarga = (
          <div className="form-control">
              <div className="card-body">
                  <div className="row">
                         
                        <div className="col-md-6">
                            <div className="form-group col-md-12">
                                <label>Judul<sup>*</sup></label>

                                <input type="text"
                                onChange={this.handleChangeJudul}
                                value={this.state.judul}
                                className="form-control" placeholder="Masukkan Judul foto"/>
                            </div>
                        </div>

                        
                <div className="col-md-6">
                    <div className="form-group col-md-12">
                        <label>Pilih Foto Untuk di Unggah</label>
                        <div className="input-group">
                        <div className="custom-file">
                            <CustomUploadButton
                                accept="image/*"
                                name="avatar"
                                filename={file => RandomKata.generate(10) + file.name.split('.')[1] }
                                storageRef={upRefWarga}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                                style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4}}
                                >
                                Pilih Foto Utama
                                </CustomUploadButton>
                        </div>
                        {this.state.isUploading &&

                                <p>Progres Upload: {this.state.progress} %</p>
                                }
                                {!this.state.isUploading && this.state.progress >= 100 &&
                                    <p>Upload Selesai</p>
                                }

                        </div>
                    </div>
                </div>
                    <div className="col-md-12">
                    {cekalert}
                    </div>
                </div>
              </div>

              <div className="card-footer col-12">
                      <button type="submit" className="btn btn-primary" id={this.state.lihatbtn} onClick={this.HandleTambahWarga('success')}>Tambahkan</button>
                      <span>  </span>
                      <button type="reset" className="btn btn-danger"  onClick={this.handleResetWarga}>Reset</button>
                  </div>

          </div>
      )
    }else{
      letbtntambah = (
          <div className="row col-md-12">
                      <button type="button" className="btn btn-success float-left" onClick={this.tambahwarga}><i className="fa fa-plus"></i> Unggah Foto</button>

         </div>
      )
    }

    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

                <div className="content-wrapper">
                    <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2" style={{marginTop: 1 + 'em'}}>
                        <div className="col-sm-6">
                            <h1>Galeri</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="">Home</a></li>
                            <li className="breadcrumb-item active">Galeri Foto</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="card card-info" style={{marginTop: 0 + 'em'}}>
                                <div className="card-header">
                                    <h3 className="card-title">Tambah Foto Galeri</h3>
                                </div>
                                <div className="form-control">
                                    <div className="card-body">
                                        
                                        {letbtntambah}
                                        {lettambahwarga}
                                </div>
                            </div>

                            </div>
                            <div className="card card-info">
                                <div className="card-header">
                                    <h3 className="card-title">Daftar Foto Galeri</h3>
                                </div>
                                    <div className="card-body">
                                    <DaftarGaleri/>
                                        <div>
                                            <ToastContainer
                                                hideProgressBar={false}
                                                newestOnTop={true}
                                                autoClose={2000}
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

export default Warga;
