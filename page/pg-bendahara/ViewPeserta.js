import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import { Redirect } from 'react-router-dom';
import DataPeserta from "./page/DataIuran/Peserta/daftarIuran";
import { rootRef, RefIuran, RefKK, Refpesertaiuran } from "../../db";
import Select from 'react-select';
import RandomKata from 'randomstring';
import 'react-select/dist/react-select.css';
import { ToastContainer, toast } from 'react-toastify';
class ViewPeserta extends Component {

    constructor(props) {
        super(props);
        this.state = { modal: false, redirect: false, tasks:[], loaddata:false, jumlah_iuran:0,
        judul:'', addagenda:false, arraykeluarga:[], nokk:'', namakepala:'', alamatkk:''};

      }
        componentWillMount(){
            RefIuran.orderByChild("kd_iuran").equalTo(localStorage.getItem("kiuran")).on('value', snap => {
                snap.forEach(shot => {
                 
                this.setState({ judul: shot.val().databulan, jumlah_iuran: shot.val().jumlah_iuran});
                });
              });
              this.tampilkeluarga();
        }
 
        tampilkeluarga=()=>{
            RefKK.orderByChild("idrw").equalTo(localStorage.getItem("koderw")).on("value", snap => {
                const arraykeluarga = [];
                snap.forEach(shot => {

                  // tasks.push({ ...shot.val(), key: shot.key });
                  if(shot.val().idrt === localStorage.getItem("idrt") ){
                    let q = 0;
                    Refpesertaiuran.orderByChild("nokk").equalTo(shot.val().nokk).on("value", snap => {
                        
                        snap.forEach(shott => {
                            if(shott.val().kd_iuran === localStorage.getItem("kiuran")){
                            q++;

                            }
                        })
                        if(q >= 1){

                        }else{
                            arraykeluarga.push({ ...shot.val(), key: shot.key });
                            //console.log(shot.val())
                        }
                    })
                  }
                })
                this.setState({
                    arraykeluarga
                })
            })
        }
        handleSelesai=()=>{
            localStorage.removeItem("kiuran")
            this.setState({
                redirect: true
            })
        }

        tambahagenda = () =>{
            this.setState({
                addagenda: !this.state.addagenda
            })
            this.tampilkeluarga();
        }

        addanggota = () => {
            if(this.state.nokk === ""){
                toast.warn('Pilih Keluarga', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else{
            const htg = {
                kd_iuran:localStorage.getItem("kiuran"),
                kd_peserta:RandomKata.generate(10),
                nama_keluarga:this.state.namakepala,
                alamat: this.state.alamatkk,
                nokk: this.state.nokk,
                status_bayar: "Pending",
              };
              Refpesertaiuran.push(htg);
           
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
            });
            this.handleReset();
            this.tampilkeluarga();
            }
        }

        handleReset= () =>{
            this.setState({
                nokk:'', namakepala:'', alamatkk:'', addagenda:false
            })
        }
        handleChangePilihan = event =>{
            try{
                this.setState({
                    nokk: event.value,
                    namakepala: event.nama,
                    alamatkk: event.alamat
                })
            }catch(error){
                
            }
        }
  render() {
    if(this.state.redirect){
    return (<Redirect to="/Bendahara/Iuran"/>)
 }
   const {judul, arraykeluarga} = this.state;
   const {addagenda} = this.state;
   let letbtntambah, formtambah, foo;
  //console.log(arraykeluarga)
   const options = [];
   { arraykeluarga.map( task =>(
       options.push({value:task.nokk, nama:task.kepala, alamat:task.alamat, label:task.kepala+" ("+task.alamat+")"})

   ))}
   if(addagenda){
     letbtntambah = (
         <div className="row col-md-12">
            <button type="button" className="btn btn-danger float-left" onClick={this.tambahagenda}><i className="fa fa-minus"></i> Batal Tambah Warga</button>

         </div>
       )

       formtambah = (
         <div className="card-body">
         <div className="row col-md-12">
             <div className="col-md-4">
               <div className="form-group col-md-12">
                   <label>Pilih Keluarga<sup>*</sup></label>
                   <Select className="form-control" name="form-field-name" placeholder="Pilih Keluarga"
                    value={this.state.nokk}
                    multi={this.state.multi}
                    onChange={this.handleChangePilihan}
                    onSelect={ this.handleSelect }
                    options = { options }
                    />
               </div>
             </div>
            
         </div>
     </div>
       )
       foo = (
         <div className="card-footer col-12">
         <button type="submit" className="btn btn-primary" onClick={(e) => this.addanggota()}>Simpan</button>
         {/* <span>  </span>
         <button type="reset" className="btn btn-danger"  onClick={(e) => this.handleReset}>Reset</button> */}
     </div>
       )
   }else{
     letbtntambah = (
         <div className="row col-md-12">
                     <button type="button" className="btn btn-success float-left" onClick={this.tambahagenda}><i className="fa fa-plus"></i>  Tambah Warga</button>

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
                <div className="col-sm-9">
                    <h1>Data Warga Iuran Bulan {judul}</h1>
                </div>
                <div className="col-sm-3">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/Bendahara/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/Bendahara/Iuran">Iuran</a></li>
                    <li className="breadcrumb-item active">Data Warga</li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Warga Iuran</h3>

                        </div>
                        <div className="form-control">
                            {letbtntambah}
                            {formtambah}
                           {foo}
                            </div>
                    </div>

                    <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Data Warga </h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">

                            <DataPeserta kode={localStorage.getItem("kiuran")} jumlah={this.state.jumlah_iuran} databulan={judul}/>
                            </div>
                            <div className="card-footer col-12">
                                <button type="button" className="btn btn-primary float-right"  onClick={this.handleSelesai}>Selesai  <i className="fa fa-chevron-right"></i></button>
                            </div>
                        </div>
                    </div>

                    <ToastContainer
                        hideProgressBar={false}
                        newestOnTop={true}
                        autoClose={2000}
                    />
                </div>
            </section>
            </div>

          <Footer/>
        </div>
    );
  }
}

export default ViewPeserta;
