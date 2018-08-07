import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DaftarKK from "./page/DataEvent/daftarevent";
import { rootRef, upRef, timeRef, RefHapus } from '../../db';
//import { Action } from "../../Action";
import RandomKata from 'randomstring';
import { ToastContainer, toast } from 'react-toastify';
//import firebase from 'firebase';
//import FileUploader from 'react-firebase-file-uploader';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nama: '',
            deskripsi:'',
            cek: true,
            avatar: '',
            isUploading: false,
            progress: 0,
            avatarURL: '',
            showbtn:true
        };

      }

      componentWillMount(){
        localStorage.setItem("xkodeblog", RandomKata.generate(10))
        RefHapus.orderByChild("tipe").equalTo('blog').on('value', snap => {
          snap.forEach(shot => {
              if(shot.val().kodehapus === localStorage.getItem("xkodeblog")){
    
              }else{
              RefHapus.child(shot.key).remove();
              }           
          });
      });
      }
      handleUploadStart = () => this.setState({isUploading: true, progress: 0});
      handleProgress = (progress) => this.setState({progress});
      handleUploadError = (error) => {
      this.setState({isUploading: false});
      console.error(error);
      }
      handleUploadSuccess = (filename) => {
      this.setState({avatar: filename, progress: 100, isUploading: false});
      upRef.child(filename).getDownloadURL().then(function(url) {
        localStorage.setItem("urlfoto", url);
      }).catch(function(error) {

      console.log(error);
      })
      };

      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };

      handleChangeDeskripsi = event => {
        this.setState({deskripsi:event.target.value});
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ nama: '',  deskripsi:'', 
        showbtn:true });
      }

      notify(type){
        return () => {
            let tgl = new Date();
            const htg = {
                kd_event:RandomKata.generate(10),
                nama: this.state.nama.trim(),
                tanggal: tgl.getDate()+"-"+(tgl.getMonth()+1)+"-"+tgl.getFullYear(),
                deskripsi: this.state.deskripsi.trim(),
                urlfoto:localStorage.getItem("urlfoto"),
                filename: this.state.avatar,
                ordertime: timeRef
              };
              // Action("addEvent", htg).then ((result) => {
              //       console.log(result);
              //       if(result!=''){
              //           console.log("success");
              //           console.log(result);
              //       }else{
              //           console.log("errors");
              //       }
              //   })
              if (htg.nama.length && htg.deskripsi.length) {
                rootRef.child('Blog').push(htg);
                this.setState({nama: '', jml: '', deskripsi:'', progress: 0, 
                showbtn:true });
                localStorage.setItem("urlfoto", "")
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


      
      updateContent = (value) => {
        this.setState({deskripsi:value})
    }
    /**
     * @property Jodit jodit instance of native Jodit
     */
	jodit;
	setRef = jodit => this.jodit = jodit;
	
	config = {
		readonly: false // all options from https://xdsoft.net/jodit/doc/
    }
    
    tambahwarga = event =>{
        this.setState({ showbtn: !this.state.showbtn})
    }
  render() {
      let page, btna;

      if(this.state.showbtn){
        btna = (
            <div className="row col-md-12">
                        <button type="button" className="btn btn-success float-left" onClick={this.tambahwarga}><i className="fa fa-plus"></i> Tambah Kiriman</button>

            </div>
        )
      }else{
        btna = (
            <div className="row col-md-12">
                        <button type="button" className="btn btn-danger float-left" onClick={this.tambahwarga}><i className="fa fa-minus"></i> Batal Menambahkan Kiriman</button>

            </div>
        )
        page =(
                <div className="row">

                <div className="col-md-6">
                    <div className="form-group col-md-12">
                        <label>Judul Kiriman</label>

                        <input type="text"
                        onChange={this.handleChangeNama}
                        value={this.state.nama}
                        className="form-control" placeholder="Masukkan Judul Kiriman" />
                    </div>
                </div>

                <div className="col-md-6">
                <div className="form-group col-md-12">
                    <label>File input</label>
                    <div className="input-group">
                    <div className="custom-file">
                        <CustomUploadButton
                            accept="image/*"
                            name="avatar"
                            filename={file => RandomKata.generate(10) + file.name.split('.')[1] }
                            storageRef={upRef}
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
                    
                            <p>Progress: {this.state.progress}</p>
                            }
                            {!this.state.isUploading && this.state.progress >= 100 &&
                                <p>Upload Selesai</p>
                            }
                    </div>
                </div>
                </div>

                {/*<textarea class="textarea" placeholder="Place some text here"
                style={{width: '100%',  height: 20 + 'em', fontSize: 2 + 'em',
                        lineHeight: 1+'em', border: 1+'em', padding: 0.11+ 'em'}}></textarea>*/}


                <div className="col-md-12">
                <div className="form-group col-md-12">
                    <label>Deskripsi</label>
                    <JoditEditor
                        editorRef={this.setRef}
                        value={this.state.deskripsi}
                        config={this.config}
                        onChange={this.updateContent}
                    />
                </div>
                </div>
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
                    <h1>Blog</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/Admin/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/Admin/Blog">Blog</a></li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Kiriman</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
                                {btna}
                                {page}
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success')}>Simpan</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={(e) => this.handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Kiriman</h3>
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

export default Event;
