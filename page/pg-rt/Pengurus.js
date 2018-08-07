import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";

import { RefWarga, RefUser, RefRT, RefPengurus, upRefpengurus, RefKK } from '../../db';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import RandomKata from 'randomstring';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import Daftarpengurus from "./page/DataPengurus/daftarpengurus";
class Pengurus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arraywarga: [],
            email:'',password:'',
            nama:'',
            nikWarga:'',
            nikrt:'',
            multi:'',
            jabatan: '', nohp: '', alamat:'', tampil:'', tampilbtn:'block',
            avatar: '', showalert: 'hide', lihatbtn:'block',
            isUploading: false,
            progress: 0,
            tasks3:[],
        filename:'',
    urlfoto:'',
    displayButton:false};
    }
    componentDidMount(){
        // console.log(localStorage.getItem("idrt"))
        RefWarga.orderByChild("nort").equalTo(localStorage.getItem("idrt")).on('value', snap =>{
            const tasks3 = [];
            snap.forEach(shot => {
                    let hitung = 0;
                    let alamat='';
                    // console.log(shot.val())
                    RefPengurus.orderByChild("nort").equalTo(parseInt(shot.val().nort)).on('value', snap => {
                    snap.forEach(shott => {
                        ++hitung;
                        // console.log(shott.val().email)
                        });
                    });
                    // console.log("hitung "+shot.val().no_kk)
                    // RefKK.orderByChild("nokk").equalTo(shot.val().no_kk).on("value", snapp =>{
                    //     snapp.forEach(shottt => {
                    //         localStorage.setItem("alamat ",shottt.val().alamat);
                    //         console.log("alamatnya "+shottt.val().alamat)
                    //     })
                    // })
                    // console.log("alamat "+localStorage.getItem("alamat"))
                    if(hitung >= 1){

                    }else{
                        // console.log(shot.val())
                        console.log(shot.val())
                        tasks3.push({ ...shot.val(), key: shot.key});
                    }
            })
            this.setState({tasks3});
            // console.log("task 3 anda "+tasks3)
        })
    }
    handleUploadStart = () => this.setState({isUploading: true, progress: 0});
    handleProgress = (progress) => this.setState({progress});
    handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
    }
    handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    upRefpengurus.child(filename).getDownloadURL().then(function(url) {
      localStorage.setItem("urlfotowarga", url);
    }).catch(function(error) {

    console.log(error);
    })
    };
    
    handleChange = event => {
        this.setState({[event.target.name]:event.target.value})
        if(event.target.name === "email"){
            let hitung = 0;
            RefUser.orderByChild("email").equalTo(event.target.value).on('value', snap =>{
            snap.forEach(shot =>{
                hitung++;
            });
            if(hitung >= 1 ){
                this.setState({ showalert: 'block', tampilbtn:'hide'});
            }else{
                this.setState({ showalert: 'hide', tampilbtn:'block'});
                
            }
        });
        }
      }
      handleChangeRT = event =>{
        // RefKK.orderByChild("nokk").equalTo(event.no_kk).on("value", snap => {
            // snap.forEach(shot => {
                // this.setState({email:event.email, nama:event.nama, nohp:event.nohp, avatar:event.avatar})
        //     })
        // })
        try{
            if(event.urlfoto === "" || event.urlfoto === undefined){
                this.setState({displayButton:true})
            }else{
                this.setState({displayButton:false})
            }
            RefKK.orderByChild("nokk").equalTo(event.no_kk).on("value", snap => {
            snap.forEach(shot => {
                this.setState({alamat:shot.val().alamat, email:event.email, nama:event.nama, nohp:event.nohp, avatar:event.urlfoto, filename:event.filename, nikWarga:event.value, nikrt:event.value})
            })
            })
        }catch(error){
            console.log("error bos");
        }
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({email:'',password:'',
        nama:'', jabatan: '', nohp: '', tampil:'', alamat:'', tampilbtn:'block'});
      }

      notify(type){
        return () => {
            // let lastAtPos = this.state.email.lastIndexOf('@');
            // let lastDotPos = this.state.email.lastIndexOf('.');
        // if(this.state.nama === ""){
        //     toast.warn('Nama tidak Boleh Kosong', {
        //         position: toast.POSITION.TOP_RIGHT,
        //       });
          
        // }else if(this.state.jabatan === ""){
        //     toast.warn('Jabatan tidak boleh kosong', {
        //         position: toast.POSITION.TOP_RIGHT,
        //       });
        //   }else if(this.state.nohp === ""){
        //     toast.warn('No HP tidak boleh kosong', {
        //         position: toast.POSITION.TOP_RIGHT,
        //       });
        //   }else if(this.state.nohp === ""){
        //     toast.warn('No HP tidak boleh kosong', {
        //         position: toast.POSITION.TOP_RIGHT,
        //       });
        //   }else if(this.state.email === ""){
        //     toast.warn('Email tidak boleh kosong', {
        //         position: toast.POSITION.TOP_RIGHT,
        //       });
        //   }else  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
        //     toast.warn('Email tidak valid', {
        //         position: toast.POSITION.TOP_RIGHT,
        //       });
        //   }else 
           if(this.state.password === ""){
                toast.warn('Password tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            //   else if(this.state.alamat === ""){
            //     toast.warn('Alamat tidak boleh kosong', {
            //         position: toast.POSITION.TOP_RIGHT,
            //       });
              }else {
            const htg = {
                norw: localStorage.getItem("koderw"),
                alamat: this.state.alamat.trim(),
                nort: localStorage.getItem("idrt"),
                email: this.state.email.trim(),
                nohp: this.state.nohp.trim(),
                jabatan: this.state.jabatan.trim(),
                urlfoto:localStorage.getItem("urlfotowarga"),
                filename: this.state.avatar,
                nama: this.state.nama.trim()
              };

              const akundata = {
                kd_user:RandomKata.generate(10),
                nik: this.state.nikrt,
                password:this.state.password.trim(),
                level:this.state.jabatan.trim(),
                email:this.state.email.trim()
              }
            // rootRef.child('RT').push(htg);
            RefPengurus.push(htg);
            RefUser.push(akundata)
            this.setState({email:'',password:'', nama:'', avatar:'',progress:0, jabatan: '', nohp: '', alamat:'', tampil:'', tampilbtn:'block'});
            
            localStorage.setItem("urlfotowarga",""),
                toast.success('Data Berhasil Di Simpan', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                //window.location.reload();

                }
        };
      };

  render() {
    const { tampil, showalert, tasks3, displayButton } = this.state;
    let cekk, cekalert;
      if(showalert === 'hide'){
  
      }else if(showalert === 'block'){
          cekalert = (
              <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 0.5 + 'em'}}>
            Email Sudah Di Gunakan!!!
          </div>
          )
      }
      const options = [];
      { tasks3.map( task =>(
          options.push({value:task.nik, urlfoto:task.urlfoto,filename:task.filename,nohp:task.nohp,no_kk:task.no_kk, nama:task.nama, email:task.email,label:task.nama+"("+task.email+")"})
      ))}
      console.log(JSON.stringify(options))
      let upload = '';
      if(displayButton){
        upload = (
            <div className="col-md-4">
                                            <div className="form-group col-md-12">
                                                <label>Pilih Foto Pengurus</label>
                                                <div className="input-group">
                                                <div className="custom-file">
                                                    <CustomUploadButton
                                                        accept="image/*"
                                                        name="avatar"
                                                        filename={file => RandomKata.generate(10) + this.state.nama + file.name.split('.')[1] }
                                                        storageRef={upRefpengurus}
                                                        onUploadStart={this.handleUploadStart}
                                                        onUploadError={this.handleUploadError}
                                                        onUploadSuccess={this.handleUploadSuccess}
                                                        onProgress={this.handleProgress}
                                                        style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4}}
                                                        >
                                                        Pilih Foto
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
        )
      }
    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row"style={{marginTop: 1 + 'em'}}>
                <div className="col-sm-6">
                    <h1>Pengurus RT</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Pengurus RT</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Pengurus RT</h3>
                            
                        </div>
                        <div className="form-control">
                            <div className="card-body" style={{overflow: 'auto!important'}}>
                                    <div className="row">
                                        <div className='col-md-4'>
                                            <div className='form-group col-md-12'>
                                                <label>Pilih RT</label>
                                                <Select className="form-control" name="nikWarga" placeholder="Masukkan Nama RT"
                                                    value={this.state.nikWarga}
                                                    onChange={this.handleChangeRT}
                                                    options = { options }
                                                    />
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='form-group col-md-12'>
                                                <label>Jabatan</label>
                                                <select className="form-control" name='jabatan' value={this.state.jabatan} onChange={this.handleChange} style={{height: 3 + 'em'}}>
                                                    <option value="">Jabatan</option>
                                                    <option value='Sekretaris'>Sekretaris</option>
                                                    <option value='Bendahara'>Bendahara</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        {/* <div className="col-md-4">
                                            <div className="form-group col-md-12">
                                                <label>Nama Pengurus</label>
                                                <input type="text"
                                                onChange={this.handleChange}
                                                value={this.state.nama}
                                                name="nama"
                                                className="form-control" placeholder="Masukkan Nama"/>
                                           
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group col-md-12">
                                            <label>Jabatan </label>
                                            <select className="form-control" style={{height: 2.5 + 'em'}}  value={this.state.jabatan} name="jabatan" onChange={this.handleChange}>
                                                <option value="">Pilih Jabatan</option>
                                                <option value="Sekretaris">Sekretaris</option>
                                                <option value="Bendahara">Bendahara</option>
                                            </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group col-md-12">
                                                <label>No HP</label>
                                                <input type="number" min="1"
                                                name="nohp"
                                                onChange={this.handleChange}
                                                value={this.state.nohp}
                                                className="form-control" placeholder="Masukkan No HP"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group col-md-12">
                                                <label>Email</label>
                                                <input type="email"
                                                onChange={this.handleChange}
                                                name="email"
                                                value={this.state.email}
                                                className="form-control" placeholder="Masukkan Email"/>
                                            </div>
                                        </div> */}
                                        <div className="col-md-4">
                                            <div className="form-group col-md-12">
                                                <label>Password</label>
                                                <input type="password"
                                                name="password"
                                                onChange={this.handleChange} value={this.state.password}
                                                className="form-control" placeholder="Masukkan Password"/>
                                            </div>
                                        </div>
                                        {/* <div className="col-md-4">
                                            <div className="form-group col-md-12">
                                                <label>Alamat</label>
                                                <input type="text"
                                                onChange={this.handleChange}
                                                value={this.state.alamat}
                                                name="alamat"
                                                className="form-control" placeholder="Masukkan Alamat"/>
                                           
                                            </div>
                                        </div>
                                        */}
                                        {upload} 
                                        {cekalert}
                                    </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" id={this.state.tampilbtn} onClick={this.notify('success')}>Simpan</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
                            </div>
                        </div>
                    </div>
                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Pengurus RT {localStorage.getItem("idrt")}</h3>
                        </div>
                            <div className="card-body">
                                <Daftarpengurus/>
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

export default Pengurus;
