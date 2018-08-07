import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import DaftarAgenda from "./page/ProgramKerja/daftaragenda";
import { RefWarga, rootRef, timeRef, RefProgram } from './../../db';
import RandomKata from 'randomstring';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { ToastContainer, toast } from 'react-toastify';

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
class Agenda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            no_rt:'',
            judul:'',
            deskripsi:'',
            addagenda: false,
            cek: true,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
      }

      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }
    //   deleteTask(){
    //     RefAgenda.orderByChild("kd_pembuat").equalTo(localStorage.getItem("nik")).on('value', snap => {
    //       const tasks = [];
    //       snap.forEach(shot => {
    //         tasks.push({ ...shot.val(), key: shot.key });
    //         RefAgenda.child(shot.key).remove();
    //       });
    //     });
    //     toast.success('Data Berhasil Di Hapus', {
    //         position: toast.POSITION.TOP_RIGHT,
    //     });
    //     this.toggle()
    //   };

      handleChangeDeskripsi = (value) => {
        this.setState({deskripsi:value});
      }

      handleChangejudul = event => {
        this.setState({ judul: event.target.value });
      };

      handleReset = event => {
        event.preventDefault();
        this.setState({  deskripsi:'' });
      }
     
    /**
     * @property Jodit jodit instance of native Jodit
     */
	jodit;
	setRef = jodit => this.jodit = jodit;
	
	config = {
        readonly: false,
        height: 400
        // all options from https://xdsoft.net/jodit/doc/
    }
    

      notify(type){

        // console.log(localStorage.getItem("idrt"));
        return () => {
            
            if(this.state.deskripsi === ""){
                toast.warn('Masukkan Deskripsi', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else{
                const { deskripsi } = this.state;
                let kode = RandomKata.generate(10);
                const dataevente = {
                    kd_event:kode,
                    judul: this.state.judul,
                    no_rt:localStorage.getItem("idrt"),
                    deskripsi: this.state.deskripsi,
                    ordertime: timeRef
                  };
                  console.log(dataevente)
                  RefProgram.push(dataevente);
          
                toast.success('Data Berhasil Di Simpan', {
                position: toast.POSITION.TOP_RIGHT,
              });
            this.bersih();
             // window.location.reload();
            }
           
        };
      };

      tambahagenda = () =>{
          this.setState({
              addagenda: !this.state.addagenda
          })
      }
      bersih = () =>{
          this.setState({ deskripsi:'', judul:'' });
      }
  render() {
      const {perluiuran, addagenda} = this.state;
      let showjml, letbtntambah, formtambah, foo, bulan, hari;
        let tdy = new Date();
        
        let hariini = tdy.getFullYear()+"-"+bulan+"-"+hari;

      if(addagenda){
        letbtntambah = (
            <div className="row col-md-12">
                <button type="button" className="btn btn-danger float-left" onClick={this.tambahagenda}><i className="fa fa-minus"></i> Batal Menambahkan Program Kerja</button>

            </div>
          )

          formtambah = (
            <div className="card-body">
            <div className="row col-md-12">
                <div className="form-group col-md-12">
                      <label>Judul <sup>*</sup></label>
                      <div className="input-group">
                        <input type="text" placeholder="Judul Program Kerja" onChange={this.handleChangejudul} value={this.state.judul} className="form-control"/>
                      </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group col-md-12">
                        <label>Deskripsi <sup>*</sup></label>
                        <JoditEditor
                            editorRef={this.setRef}
                            value={this.state.deskripsi}
                            config={this.config}
                            onChange={this.handleChangeDeskripsi}
                        />
                    </div>
                </div>
            </div>
        </div>
          )
          foo = (
            <div className="card-footer col-12">
            <button type="submit" className="btn btn-primary" onClick={this.notify('success')}>Simpan</button>
            <span>  </span>
            <button type="reset" className="btn btn-danger"  onClick={(e) => this.handleReset}>Reset</button>
        </div>
          )
      }else{
        letbtntambah = (
            <div className="row col-md-12">
                        <button type="button" className="btn btn-success float-left" onClick={this.tambahagenda}><i className="fa fa-plus"></i> Tambah Program Kerja</button>

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
                    <h1>Program Kerja</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/RT/Home">Home</a></li>
                    <li className="breadcrumb-item"><a href="/RT/Agenda">Program Kerja</a></li>
                    </ol>
                </div>
                </div>
            </div>
            </section>

            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info" style={{marginTop: 1 + 'em'}}>
                        <div className="card-header">
                            <h3 className="card-title">Tambah Program Kerja</h3>

                        </div>
                        <div className="form-control">
                            {letbtntambah}
                            {formtambah}
                           {foo}
                            </div>
                    </div>

                    <div className="card card-info">
                        <div className="card-header">
                            <h3 className="card-title">Program Kerja</h3>
                           
                        </div>
                            <div className="card-body">
                                <DaftarAgenda/>
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

export default Agenda;
