import React, { Component } from "react";
import Footer from "./page/Footer";
import Layout from "./page/Layout";
import Nav from "./page/Nav";
import { RefEvent } from '../../db';
import { toast } from 'react-toastify';

import {Redirect} from 'react-router-dom';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";
class EditEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nama: '',
            deskripsi:'', 
            redirect: false
        };

      }

      componentWillMount(){
        RefEvent.orderByKey().equalTo(localStorage.getItem("kunciblog")).on('value', snap => {
           
            snap.forEach(shot => {
            
                this.setState({ nama: shot.val().nama, deskripsi: shot.val().deskripsi });
            });
          });
      }
 

      handleChangeNama = event => {
        this.setState({ nama: event.target.value });
      };

   
      handleChangeDeskripsi = event => {
        this.setState({deskripsi:event.target.value});
      }
      handleReset = event => {
        event.preventDefault();
        this.setState({ nama: '', deskripsi:'' });
      }

      notify(type){
        return () => {
            const htg = {
                nama: this.state.nama.trim(),
                deskripsi: this.state.deskripsi.trim()
              };
         
              if (htg.nama.length && htg.deskripsi.length) {
                
                RefEvent.child(localStorage.getItem("kunciblog")).update({ nama: this.state.nama,deskripsi: this.state.deskripsi});
                
                this.setState({nama: '',
                deskripsi:'', redirect: true});
                localStorage.setItem("kunciblog", "")
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
    
  render() {
    if(this.state.redirect){
        return (<Redirect to="/Admin/Blog"/>)
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
                    <h1> Edit Blog</h1>
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
                            <h3 className="card-title">Edit Kiriman</h3>
                        </div>
                        <div className="form-control">
                            <div className="card-body">
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
                            </div>
                            <div className="card-footer col-12">
                                <button type="submit" className="btn btn-primary" onClick={this.notify('success')}>Simpan</button>
                                <span>  </span>
                                <button type="reset" className="btn btn-danger"  onClick={(e) => this.handleReset}>Reset</button>
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

export default EditEvent;
