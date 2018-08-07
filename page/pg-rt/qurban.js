import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DaftarGaleri from "./page/Qurban/daftarQurban";
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
        no_rt:0,
        nama:'',
        jenis:'',
        type:'',
        request:'',
        pembayaran:'',
        nomor:'',
        alamat:'',
        tgl_bayar:'',
        status:'',
        addwarga:false,
         };
        
      }

      componentDidMount(){
        this.setState({norw:  localStorage.getItem("koderw"), nort:  localStorage.getItem("idrt")});
       
          localStorage.setItem("urlfotowarga", "");
      }

      tambahwarga = ()=>{
        this.setState({ addwarga: !this.state.addwarga})
    }
    
    handleChange = event => {
        this.setState({[event.target.name]:event.target.value})
    }
      

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
                            nama: this.state.nama.trim(),
                            alamat: this.state.alamat.trim(),
                            hewan: this.state.hewan.trim(),
                            type: this.state.type.trim(),
                            request: this.state.request.trim(),
                            nomor: this.state.nomor.trim(),
                            pembayaran: this.state.pembayaran.trim(),
                            tgl_bayar: this.state.tgl_bayar.trim(),
                            status: this.state.status.trim(),
                        }; 
                            rootRef.child('Qurban').push(htg);
                            console.log(htg);
                            this.setState({ nama: '', alamat:'',hewan:'',type:'',request:'',nomor:'',pembayaran:'',
                            tgl_bayar:'',status:'',
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
    
    const{showalert, teksalert, showalertnik, hewan } = this.state;
    let cekalert, lettambahwarga, letbtntambah, pilih_type;
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

    if(hewan === 'Kambing'){
        pilih_type = (
            <select className='form-control' required onChange={this.handleChange} name="type" value={this.state.type} style={{height: 3 + 'em'}}>
                <option value="">Pilih Type</option>
                <option value="Reguler">Reguler</option>
                <option value="Exclusive">Exclusive</option>
                <option value="Super">Super</option>
                
            </select>
        )
    }else if(hewan === 'Sapi'){
        pilih_type = (
            <select className='form-control' required onChange={this.handleChange} name="type" value={this.state.type} style={{height: 3 + 'em'}}>
                <option value="">Pilih Type</option>
                <option value="Reguler">Reguler</option>
                <option value="Super">Super</option>
                <option value="Exclusive">Exclusive</option>
                
            </select>
        )
    }else{
        pilih_type = (
            <select className='form-control' required onChange={this.handleChange} name="type" value={this.state.type} style={{height: 3 + 'em'}}>
                <option value="">Pilih Type</option>
                <option value="Reguler">Reguler</option>
                <option value="Exclusive">Exclusive</option>
                <option value="Super">Super</option>
            </select>
        )
    }
   
    if(this.state.addwarga){
        letbtntambah = (
          <div className="row col-md-12">
                      <button type="button" className="btn btn-danger float-left" onClick={this.tambahwarga}><i className="fa fa-minus"></i> Batal Menambahkan Data</button>

          </div>
        )
      lettambahwarga = (
          <div className="form-control">
              <div className="card-body">
                  <div className="row">
                         
                        <div className="col-md-4">
                            <div className="form-group col-md-12">
                                <label>Nama<sup>*</sup></label>

                                <input type="text"
                                name="nama"
                                onChange={this.handleChange}
                                value={this.state.nama}
                                className="form-control" placeholder="Masukkan Nama Warga" style={{height: 3 + 'em'}}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group col-md-12">
                                <label>Alamat<sup>*</sup></label>

                                <input type="text"
                                name="alamat"
                                onChange={this.handleChange}
                                value={this.state.alamat}
                                className="form-control" placeholder="Masukkan Alamat" style={{height: 3 + 'em'}}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group col-md-12">
                                <label>Jenis Hewan<sup>*</sup></label>

                                <select className='form-control' required onChange={this.handleChange} name="hewan" value={this.state.hewan} style={{height: 3 + 'em'}}>
                                    <option value="">Pilih Hewan</option>
                                    <option value="Sapi">Sapi</option>
                                    <option value="Kambing">Kambing</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group col-md-12">
                                <label>Type<sup>*</sup></label>
                                    { pilih_type }
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group col-md-12">
                                <label>Request<sup>*</sup></label>

                                <textarea name="request" className='form-control' style={{height: 3 + 'em'}} placeholder="Masukkan Permintaan" onChange={this.handleChange} value={this.state.request}></textarea>
                                
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group col-md-12">
                                <label>Hewan Ke-<sup>*</sup></label>

                                <input type="text"
                                name="nomor"
                                onChange={this.handleChange}
                                value={this.state.nomor}
                                className="form-control" placeholder="Masukkan Nomor Hewan" style={{height: 3 + 'em'}}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group col-md-12">
                                <label>Pembayaran<sup>*</sup></label>

                                <input type="number"
                                name="pembayaran"
                                onChange={this.handleChange}
                                value={this.state.pembayaran}
                                className="form-control" placeholder="Masukkan Jumlah Pembayaran" style={{height: 3 + 'em'}}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group col-md-12">
                                <label>Tanggal Pembayaran<sup>*</sup></label>

                                <input type="date"
                                name="tgl_bayar"
                                onChange={this.handleChange}
                                value={this.state.tgl_bayar}
                                className="form-control" style={{height: 3 + 'em'}}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group col-md-12">
                                <label>Status<sup>*</sup></label>

                                <select className='form-control' required onChange={this.handleChange} name="status" value={this.state.status} style={{height: 3 + 'em'}}>
                                    <option value=''>Pilih Status</option>
                                    <option value="Lunas">Lunas</option>
                                    <option value="Belum Lunas">Belum Lunas</option>
                                </select>
                            </div>
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
                      <button type="button" className="btn btn-success float-left" onClick={this.tambahwarga}><i className="fa fa-plus"></i> Tambah Data</button>

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
                            <h1>Data Warga Qurban</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="">Home</a></li>
                            <li className="breadcrumb-item active">Data Qurban</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="card card-info" style={{marginTop: 0 + 'em'}}>
                                <div className="card-header">
                                    <h3 className="card-title">Tambah Data Qurban</h3>
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
                                    <h3 className="card-title">Daftar Warga Berqurban</h3>
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
