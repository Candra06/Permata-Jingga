import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import orderBy from 'lodash/orderBy';
import DataAkun from "./page/DataAkun/daftarakun";
import DataWargaAkun from "./page/DataAkun/daftarwarga";
import { RefUser, RefWarga, RefRW } from '../../db';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { ToastContainer, toast } from 'react-toastify';
import RandomKata from 'randomstring';
import { Action } from "../../Action";
class Akun extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '',tasks:[],
        nikWarga: '',
        value: '',
        isi: '', password:'', level: '', tampil:'', tmpemail:'', showalert: 'hide', lihatbtn:'block'};
        
      }
      handleChangePassword = event => {
        this.setState({ password: event.target.value });
      };

      handleChangeLevel = event => {
        this.setState({ level: event.target.value });
      };

      handleChangeEmail = event => {
        this.setState({ email: event.target.value });
        let hitung = 0;
        RefUser.orderByChild("email").equalTo(event.target.value).on('value', snap =>{
            snap.forEach(shot =>{
                hitung++;
            });
            if(hitung >= 1 ){
                this.setState({ showalert: 'block', lihatbtn:'hide'});
            }else{
                this.setState({ showalert: 'hide', lihatbtn:'block'});
                
            }
        });
      };

      componentDidMount(){
        this.tampilpilihan()

    }
    handleChangePilihan = event => {

        try{
          this.setState({nikWarga: event.value, email: event.email});

        }catch(error){

        }
        
      }
    
      tampilpilihan = () => {
           RefWarga.on('value', snap =>{
                    const tasks = [];
                    snap.forEach(shot => {
                            const hitung = [];
                                var alamat = "";
                            RefUser.orderByChild("nik").equalTo(shot.val().nik).on('value', snap => {
                            snap.forEach(shot => {
                                hitung.push({ ...shot.val()});
                                });
                            });

                            if(hitung.length > 0){

                            }else{

                                tasks.push({ ...shot.val(), key: shot.key, alamatku: shot.val().email });
                            }
                    })
                    this.setState({tasks, taskLoading: false});
                })
      }

      handleReset = event => {
        event.preventDefault();
        this.setState({ email: '', nikWarga:'', password:'',  level: '', tampil:'hide', tmpemail:'' });
        
      }

      notify(type){
        return () => {

            let lastAtPos = this.state.email.lastIndexOf('@');
            let lastDotPos = this.state.email.lastIndexOf('.');
            if(this.state.nikWarga === ""){
                toast.warn('Pilih Warga !!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.email === ""){
                toast.warn('Email tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                toast.warn('Email tidak valid', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.password === ""){
                toast.warn('Password tidak boleh kosong', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else if(this.state.level === ""){
                toast.warn('Pilih Level Akun', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
              }else{
            const akundata = {
                kd_user:RandomKata.generate(10),
                nik: this.state.nikWarga,
                password:this.state.password.trim(),
                level:this.state.level.trim(),
                email:this.state.email.trim()
              }
            //   Action("addAkun", akundata).then ((result) => {
            //      //   console.log(result);
            //         if(result!==''){
            //             console.log("success");
            //         }else{
            //             console.log("errors");
            //         }
            //     })
                RefUser.push(akundata);
                this.setState({ email: '', password:'', nikWarga:'',  level: '', lihatbtn:'block', tmpemail:'', showalert:'hide' });
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
              });
              this.tampilpilihan()
            }
        
        };
      };
    //   adduser = () => {
    //       if(localStorage.getItem("NikAkun") === ""){
    //         toast.warn('Silahkan Pilih Warga', {
    //             position: toast.POSITION.TOP_RIGHT,
    //           });
    //       }else{
    //     RefWarga.orderByChild("nik").equalTo(localStorage.getItem("NikAkun")).on('value', snap => {
    //         snap.forEach(shot => {
    //           this.setState({email: shot.val().email});

    //           let hitung = 0;
    //           RefUser.orderByChild("email").equalTo(shot.val().email).on('value', snap =>{
    //               snap.forEach(shot =>{
    //                   hitung++;
    //               });
    //               if(hitung >= 1 ){
    //                   this.setState({ showalert: 'block', lihatbtn:'hide'});
    //               }else{
    //                       this.setState({ showalert: 'hide', lihatbtn:'block'});
                      
    //               }
    //           });


    //         });
    //       });
          
    //       this.setState({ tampil: "block" })
    //     }
    //   }
  render() {
    const { tampil, showalert } = this.state;
    let cekk, cekalert;
      if(showalert === 'hide'){
  
      }else if(showalert === 'block'){
          cekalert = (
              <div className="alert alert-danger col-md-4" role="alert" style={{marginTop: 0.5 + 'em'}}>
            Email Sudah Di Gunakan!!!
          </div>
          )
      }

      const {tasks } = this.state;
      const orderedTasks = orderBy(
          tasks
      );
      const options = []
      { orderedTasks.map( task =>(
          options.push({value:task.nik, email:task.email, label:task.nama+"("+task.nik+")"})
          
      ))}

      let taskListt;
      taskListt = (
          <Select className="form-control" name="form-field-name" placeholder="Masukkan Nama"
          value={this.state.nikWarga}
          multi={this.state.multi}
          onChange={this.handleChangePilihan}
          onSelect={ this.handleSelect }
          options = { options }
          />
      );

    return (
        <div className="wrapper">

          <Nav/>
           <Layout/>

        <div className="content-wrapper">
            <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2" style={{marginTop: 1 + 'em'}}>
                <div className="col-sm-6">
                    <h1>Data Akun</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Data Akun</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Akun</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body" style={{overflow: 'auto!important'}}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label>Pilih Warga</label>
                                                    {taskListt}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label>Email</label>
                                                <input type="email"
                                                onChange={this.handleChangeEmail}
                                                value={this.state.email}
                                                className="form-control" placeholder="Masukkan Email"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label>Password</label>
                                                <input type="password"
                                                onChange={this.handleChangePassword} value={this.state.password}
                                                className="form-control" placeholder="Masukkan Password"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                            <label>Level Akun </label>
                                            <select className="form-control" style={{height: 3 + 'em'}}  value={this.state.level} onChange={this.handleChangeLevel}>
                                                <option value="">Pilih Level Akun</option>
                                                <option value="RW">Ketua RW</option>
                                                <option value="RT">Ketua RT</option>
                                                <option value="Warga">Warga</option>
                                            </select>
                                            </div>
                                        </div>
                                        {cekalert}
                                    </div>
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" id={this.state.lihatbtn} onClick={this.notify()}>Simpan</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={this.handleReset}>Reset</button>
                            </div>
                            
                        </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Daftar Akun</h3>
                        </div>
                            <div className="card-body" style={{overflow: "auto!important"}}>
                            <DataAkun/>
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

export default Akun;
